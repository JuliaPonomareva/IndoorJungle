import * as React from "react";
import { debounce } from 'lodash';
import { useEffect, useState, useCallback } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { NavigationContainer } from "@react-navigation/native";
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import uuid from 'react-native-uuid';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons, MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";
import {
  NativeBaseProvider,
  Button,
  Box,
  Pressable,
  Heading,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
  Image,
  Stack,
  Spinner,
  Input,
  FormControl,
  Select,
  CheckIcon,
  ScrollView
} from "native-base";

global.__reanimatedWorkletInit = () => { };
const Drawer = createDrawerNavigator();

const apiHost = 'http://192.168.1.164:5259';
const apiPlantsPath = '/api/plants/{userId}';
const apiPlantPath = '/api/plants/{userId}/{plantId}';
const apiPlantTasksPath = '/api/planttasks/{userId}';
const apiPlantTaskPath = '/api/planttasks/{userId}/{taskId}';
const apiPlantTaskTypesPath = '/api/planttasktypes';

async function getUserId() {
  try {
    let value = await AsyncStorage.getItem('userId2');
    if (value) {
      return value;
    }
    value = uuid.v4();
    await AsyncStorage.setItem('userId2', value);
    return value;
  } catch (error) {
    Alert.alert('Ошибка', '', [{ text: 'Ok' }]);
    throw error;
  }

}

function HomeComponent(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [plants, setPlants] = useState([]);

  const fetchData = async (filter) => {
    try {
      const userId = await getUserId();
      const response = await axios.get(`${apiHost}${apiPlantsPath.replace('{userId}', userId)}`, {
        params: {
          filter: filter
        }
      });
      setPlants(response.data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Ошибка', '', [{ text: 'Ok' }]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async text => {
    setIsLoading(true);
    fetchData(text);
  };
  //отложенный поиск на 0.5 сек
  const handleSearchDebouncer = useCallback(debounce(handleSearch, 500), []);

  const plantChangeState = async (plant) => {
    let existingPlant = plants.find(p => p.id === plant.id);
    if (existingPlant) {
      existingPlant.isLoading = true;
      setPlants([...plants]);
      const userId = await getUserId();
      if (plant.isMy) {
        await axios.delete(`${apiHost}${apiPlantPath.replace('{userId}', userId).replace('{plantId}', plant.id)}`);
      }
      else {
        await axios.put(`${apiHost}${apiPlantPath.replace('{userId}', userId).replace('{plantId}', plant.id)}`);
      }
      existingPlant.isMy = !plant.isMy;
      existingPlant.isLoading = false;
      setPlants([...plants]);
    }
  };

  return (
    <ScrollView>
      <Box alignItems="center">
        <VStack w="80" mt="2" space={5} alignSelf="center">
          <Input onChangeText={handleSearchDebouncer} placeholder="Найти" width="100%" borderRadius="4" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} />
        </VStack>
        {
          isLoading
            ? <Spinner size="lg" mt="5" />
            : plants.length > 0
              ? plants.map((plant, index) => (
                <Box key={index} my="2" w="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                  borderColor: "coolGray.600",
                  backgroundColor: "gray.700"
                }} _web={{
                  shadow: 2,
                  borderWidth: 0
                }} _light={{
                  backgroundColor: "gray.50"
                }}>
                  <Box w="100%" h="200px">
                    <Image resizeMode="cover" source={{ uri: `${apiHost}/images/${plant.image}` }} alt={plant.name} style={{ width: '100%', height: '100%' }} />
                    <Center bg="violet.500" _dark={{
                      bg: "violet.400"
                    }} _text={{
                      color: "warmGray.50",
                      fontWeight: "700",
                      fontSize: "xs"
                    }} position="absolute" bottom="0" px="3" py="1.5">
                      Фото
                    </Center>
                  </Box>
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Heading size="md" ml="-1">
                        {plant.name}
                      </Heading>
                    </Stack>
                    <Text fontWeight="400">
                      {plant.description}
                    </Text>
                    <Button isLoading={plant.isLoading} onPress={() => plantChangeState(plant)} colorScheme={plant.isMy ? "secondary" : "primary"}>
                      {
                        plant.isMy
                          ? "Удалить из моих растений"
                          : "Добавить в мои растения"
                      }
                    </Button>
                    <Button onPress={() => props.navigation.navigate('CreateTask', { plantId: plant.id })} colorScheme="success">
                      Создать задачу
                    </Button>
                  </Stack>
                </Box>
              ))
              : <Text>Ничего не найдено.</Text>
        }
      </Box>
    </ScrollView>
  );
}

function MyPlantsComponent(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [plants, setPlants] = useState([]);

  const fetchData = async (filter) => {
    try {
      const userId = await getUserId();
      const response = await axios.get(`${apiHost}${apiPlantsPath.replace('{userId}', userId)}`, {
        params: {
          filter: filter,
          isMy: true
        }
      });
      setPlants(response.data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Ошибка', '', [{ text: 'Ok' }]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async text => {
    setIsLoading(true);
    fetchData(text);
  };
  //отложенный поиск на 0.5 сек
  const handleSearchDebouncer = useCallback(debounce(handleSearch, 500), []);

  const plantChangeState = async (plant) => {
    let existingPlant = plants.find(p => p.id === plant.id);
    if (existingPlant) {
      existingPlant.isLoading = true;
      setPlants([...plants]);
      const userId = await getUserId();
      if (plant.isMy) {
        await axios.delete(`${apiHost}${apiPlantPath.replace('{userId}', userId).replace('{plantId}', plant.id)}`);
      }
      else {
        await axios.put(`${apiHost}${apiPlantPath.replace('{userId}', userId).replace('{plantId}', plant.id)}`);
      }
      existingPlant.isMy = !plant.isMy;
      existingPlant.isLoading = false;
      setPlants([...plants.filter(p => p.isMy)]);
    }
  };

  return (
    <ScrollView>
      <Box alignItems="center">
        <VStack w="80" mt="2" space={5} alignSelf="center">
          <Input onChangeText={handleSearchDebouncer} placeholder="Найти" width="100%" borderRadius="4" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} />
        </VStack>
        {
          isLoading
            ? <Spinner size="lg" mt="5" />
            : plants.length > 0
              ? plants.map((plant, index) => (
                <Box key={index} my="2" w="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                  borderColor: "coolGray.600",
                  backgroundColor: "gray.700"
                }} _web={{
                  shadow: 2,
                  borderWidth: 0
                }} _light={{
                  backgroundColor: "gray.50"
                }}>
                  <Box w="100%" h="200px">
                    <Image resizeMode="cover" source={{ uri: `${apiHost}/images/${plant.image}` }} alt={plant.name} style={{ width: '100%', height: '100%' }} />
                    <Center bg="violet.500" _dark={{
                      bg: "violet.400"
                    }} _text={{
                      color: "warmGray.50",
                      fontWeight: "700",
                      fontSize: "xs"
                    }} position="absolute" bottom="0" px="3" py="1.5">
                      Фото
                    </Center>
                  </Box>
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Heading size="md" ml="-1">
                        {plant.name}
                      </Heading>
                    </Stack>
                    <Text fontWeight="400">
                      {plant.description}
                    </Text>
                    <Button isLoading={plant.isLoading} onPress={() => plantChangeState(plant)} colorScheme={plant.isMy ? "secondary" : "primary"}>
                      {
                        plant.isMy
                          ? "Удалить из моих растений"
                          : "Добавить в мои растения"
                      }
                    </Button>
                    <Button onPress={() => props.navigation.navigate('CreateTask', { plantId: plant.id })} colorScheme="success">
                      Создать задачу
                    </Button>
                  </Stack>
                </Box>
              ))
              : <Text>Ничего не найдено.</Text>
        }
      </Box>
    </ScrollView>
  );
}

function TasksComponent(props) {
  const [isCalendarPermissionsGranted, setCalendarPermissionsGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const fetchData = async (filter) => {
    try {
      const userId = await getUserId();
      const response = await axios.get(`${apiHost}${apiPlantTasksPath.replace('{userId}', userId)}`, {
        params: {
          filter: filter
        }
      });
      setTasks(response.data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Ошибка', '', [{ text: 'Ok' }]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        setCalendarPermissionsGranted(true);
      }
    })();
  }, []);

  const handleSearch = async text => {
    setIsLoading(true);
    fetchData(text);
  };
  //отложенный поиск на 0.5 сек
  const handleSearchDebouncer = useCallback(debounce(handleSearch, 500), []);

  const removeTask = async (task) => {
    let existingTask = tasks.find(p => p.id === task.id);
    if (existingTask) {
      existingTask.isLoading = true;
      setTasks([...tasks]);
      try {
        await Calendar.deleteEventAsync(existingTask.eventId);
        const userId = await getUserId();
        await axios.delete(`${apiHost}${apiPlantTaskPath.replace('{userId}', userId).replace('{taskId}', task.id)}`);
      } catch (e) { }
      existingTask.isLoading = false;
      setTasks([...tasks.filter(p => p.id !== existingTask.id)]);
    }
  };

  return (
    <ScrollView>
      <Box alignItems="center">
        <VStack w="80" mt="2" space={5} alignSelf="center">
          <Input onChangeText={handleSearchDebouncer} placeholder="Найти" width="100%" borderRadius="4" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} />
        </VStack>
        {
          isLoading
            ? <Spinner size="lg" mt="5" />
            : tasks.length > 0
              ? tasks.map((task, index) => (
                <Box key={index} my="2" w="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                  borderColor: "coolGray.600",
                  backgroundColor: "gray.700"
                }} _web={{
                  shadow: 2,
                  borderWidth: 0
                }} _light={{
                  backgroundColor: "gray.50"
                }}>
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Heading size="md" ml="-1">
                        {task.name}
                      </Heading>
                      <Text fontSize="xs" _light={{
                        color: "violet.500"
                      }} _dark={{
                        color: "violet.400"
                      }} fontWeight="500" ml="-0.5" mt="-1">
                        {task.typeName} - {task.plantName}
                      </Text>
                    </Stack>
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                      <HStack alignItems="center">
                        <Text color="coolGray.600" _dark={{
                          color: "warmGray.200"
                        }} fontWeight="400">
                          {task.dateProcessing.toLocaleString()}
                        </Text>
                      </HStack>
                    </HStack>
                    <Button disabled={!isCalendarPermissionsGranted} isLoading={task.isLoading} onPress={() => removeTask(task)} colorScheme="secondary">
                      Удалить
                    </Button>
                  </Stack>
                </Box>
              ))
              : <Text>Ничего не найдено.</Text>
        }
      </Box>
    </ScrollView>
  );
}

function CreateTaskComponent(props) {
  const [isCalendarPermissionsGranted, setCalendarPermissionsGranted] = useState(false);
  const [myCalendarId, setMyCalendarId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ name: '', type: '' });
  const [taskTypes, setTaskTypes] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dateProcessing, setDateProcessing] = useState(new Date());


  const fetchData = async (filter) => {
    try {
      const response = await axios.get(`${apiHost}${apiPlantTaskTypesPath}`);
      setTaskTypes(response.data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Ошибка', '', [{ text: 'Ok' }]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const existingCalendar = calendars.find(s => s.name === 'IndoorJungle');
        if (!existingCalendar) {
          const defaultCalendarSource = { isLocalAccount: true, name: 'Справочник комнатных растений' };
          const newCalendarID = await Calendar.createCalendarAsync({
            title: 'Справочник комнатных растений',
            color: 'green',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'IndoorJungle',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
          });
          setMyCalendarId(newCalendarID);
        }
        else {
          setMyCalendarId(existingCalendar.id);
        }
        setCalendarPermissionsGranted(true);
      }
    })();
  }, []);

  const validate = () => {
    let isValid = true;
    let errors = { name: '', type: '' };
    if (name.length === 0) {
      errors.name = 'Обязательное поле.';
      isValid = false;
    }
    if (type.length === 0) {
      errors.type = 'Обязательное поле.';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const onSubmit = async () => {
    if (validate()) {
      setIsSubmitting(true);
      const event = {
        title: name,
        startDate: dateProcessing,
        endDate: dateProcessing,
        timeZone: Localization.timeZone,
        alarms: [
          {
            relativeOffset: 0,
            method: Calendar.AlarmMethod.ALERT,
          },
        ],
      };
      try {
        const eventId = await Calendar.createEventAsync(myCalendarId, event);
        const newTask = {
          name: name,
          dateProcessing: dateProcessing,
          plantId: props.route.params.plantId,
          typeId: type,
          eventId: eventId
        };
        const userId = await getUserId();
        await axios.post(`${apiHost}${apiPlantTasksPath.replace('{userId}', userId)}`, newTask);
        props.navigation.navigate('Tasks');
      } catch (e) {
        Alert.alert('Ошибка', '', [{ text: 'Ok' }]);
      }
    }
  };

  const onChangeDateProcessing = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateProcessing(currentDate);
  };

  return (
    <ScrollView>
      <Box alignItems="center">
        {
          isLoading
            ? <Spinner size="lg" mt="5" />
            : <VStack w="80">
              <FormControl isRequired isInvalid={errors.name}>
                <FormControl.Label _text={{
                  bold: true
                }}>Название</FormControl.Label>
                <Input placeholder="Название" onChangeText={value => setName(value)} />
                {
                  errors.name
                    ? <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
                    : <FormControl.HelperText></FormControl.HelperText>
                }
              </FormControl>
              <FormControl isRequired isInvalid={errors.type}>
                <FormControl.Label _text={{
                  bold: true
                }}>Тип</FormControl.Label>
                <Select selectedValue={type} minWidth="200" accessibilityLabel="Выберите тип" placeholder="Выберите тип" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} onValueChange={itemValue => setType(itemValue)}>
                  {taskTypes.map((item, index) => <Select.Item key={index} label={item.name} value={`${item.id}`} />)}
                </Select>
                {
                  errors.type
                    ? <FormControl.ErrorMessage>{errors.type}</FormControl.ErrorMessage>
                    : <FormControl.HelperText></FormControl.HelperText>
                }
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{
                  bold: true
                }}>Дата обработки: {dateProcessing.toLocaleString()}</FormControl.Label>
                <Button.Group>
                  <Button onPress={() => DateTimePickerAndroid.open({
                    value: dateProcessing,
                    mode: 'date',
                    is24Hour: true,
                    onChange: onChangeDateProcessing
                  })}>Изменить дату</Button>
                  <Button onPress={() => DateTimePickerAndroid.open({
                    value: dateProcessing,
                    mode: 'time',
                    is24Hour: true,
                    onChange: onChangeDateProcessing
                  })}>Изменить время</Button>
                </Button.Group>
              </FormControl>
              <Button disabled={!isCalendarPermissionsGranted} isLoading={isSubmitting} onPress={onSubmit} mt="5">
                Создать
              </Button>
            </VStack>
        }
      </Box>
    </ScrollView>
  );
}

const getIcon = (screenName) => {
  switch (screenName) {
    case "Home":
      return <MaterialCommunityIcons name="home" />;
    case "MyPlants":
      return <Entypo name="add-to-list" />;
    case "Tasks":
      return <FontAwesome name="tasks" />;
    default:
      return undefined;
  }
};

const getTitle = (screenName) => {
  switch (screenName) {
    case "Home":
      return 'Главная';
    case "MyPlants":
      return 'Мои растения';
    case "Tasks":
      return 'Задачи';
    case "CreateTask":
      return 'Новая задача';
    default:
      return '';
  }
};

function MyMenuContent(props) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            Справочник комнатных растений
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.filter(s => s !== 'CreateTask').map((name, index) => (
              <Pressable
                key={index}
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? "rgba(6, 182, 212, 0.1)"
                    : "transparent"
                }
                onPress={(event) => {
                  props.navigation.navigate(name);
                }}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color={
                      index === props.state.index ? "primary.500" : "gray.500"
                    }
                    size="5"
                    as={getIcon(name)}
                  />
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? "primary.500" : "gray.700"
                    }
                  >
                    {getTitle(name)}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}
function MyMenu() {
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => <MyMenuContent {...props} />}
      >
        <Drawer.Screen name="Home" options={{ title: `${getTitle('Home')}`, unmountOnBlur: true }} component={HomeComponent} />
        <Drawer.Screen name="MyPlants" options={{ title: `${getTitle('MyPlants')}`, unmountOnBlur: true }} component={MyPlantsComponent} />
        <Drawer.Screen name="Tasks" options={{ title: `${getTitle('Tasks')}`, unmountOnBlur: true }} component={TasksComponent} />
        <Drawer.Screen name="CreateTask" options={{ title: `${getTitle('CreateTask')}`, unmountOnBlur: true }} component={CreateTaskComponent} />
      </Drawer.Navigator>
    </Box>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MyMenu />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
