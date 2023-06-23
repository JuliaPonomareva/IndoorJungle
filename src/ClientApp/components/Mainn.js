import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { gStyle } from '../styles/style';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {
  createDrawerNavigator,DrawerContentScrollView,} from "@react-navigation/drawer";
import { MaterialCommunityIcons, MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";

export default function Mainn({ navigation }) {
  const list = [
    {id: '1', route: 'CatalogPlants', name: 'Каталог Растений', anons:'Каталог растений с описанием', key: '1', img: 'https://avatars.mds.yandex.net/i?id=0fd1089a109bb7e8fabb6461a82b92682fb15227-7759147-images-thumbs&n=13'},
    {id: '2', route: 'MyPlants', name: 'Мои растения', anons:'Список моих растений', key: '2', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaYIItFDzQ1HnPJXwWavPHrBcPxMPAN1vDioGPeWO6vQ&s'},
    {id: '3', route: 'Tasks', name: 'Задачи', anons:'Задачи по поливу и подкормке растений', key: '3', img: 'https://cdn.botanichka.ru/wp-content/uploads/2017/07/garden-watering-01.jpg'},
  ];
  function MyMenu() {}

  return (
    <div>
      <h1 style={gStyle.h1}>Добро пожаловать в комнатные джунгли</h1>
    <View style={gStyle.main}>
      <Text style={[gStyle.title, gStyle.header, gStyle.item]}></Text>
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={({item}) =>
         (
            <TouchableOpacity onPress={() => navigation.navigate(item.route, item)}>
              <Image style={gStyle.image} source={{uri: item.img}}/>
              <Text style={gStyle.title1}>{item.name}</Text>
              <Text style={gStyle.anons}>{item.anons}</Text>
            </TouchableOpacity>
          )
        }
      /> 
    </View>
    <Box safeArea flex={1}>
        <Drawer.Navigator
          drawerContent={(props) => <MyMenuContent {...props} />}
        >
          <Drawer.Screen name="Mainn" options={{ title: `Indoor Jungle - ${getTitle('Mainn')}`, unmountOnBlur: true }} component={MainnComponent} />
          <Drawer.Screen name="CatalogPlants" options={{ title: `Indoor Jungle - ${getTitle('CatalogPlants')}`, unmountOnBlur: true }} component={CatalogPlantsComponent} />
          <Drawer.Screen name="MyPlants" options={{ title: `Indoor Jungle - ${getTitle('MyPlants')}`, unmountOnBlur: true }} component={MyPlantsComponent} />
          <Drawer.Screen name="Tasks" options={{ title: `Indoor Jungle - ${getTitle('Tasks')}`, unmountOnBlur: true }} component={TasksComponent} />
        </Drawer.Navigator>
      </Box>
    </div>
  );
}

