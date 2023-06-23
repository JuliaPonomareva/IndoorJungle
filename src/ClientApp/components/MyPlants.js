import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { gStyle } from '../styles/style';

export default function MyPlants({navigation}) {
  const loadScene = () => {
        navigation.navigate('Tasks');
  }
  return (
   <div><h1 style={gStyle.h1}>Мои растения</h1>
    <View style={gStyle.main}>
          <Button title='Следующая страница' onPress={loadScene}/>
          <Button title="Предыдущая страница" onPress={() => navigation.goBack()} />
    </View>
    </div>
        );
  }
  const styles = StyleSheet.create ({
  });
// import React from 'react';
// import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
// import {View, StyleSheet} from 'react-native';
// import DatePicker from 'react-native-date-picker';
// import React, { useState } from 'react';

// function TextInputExample() {
//   const [text, onChangeText] = React.useState('Введите имя задачи');

//   const [date, setDate] = useState(new Date());
//   const handleCalendarClose = () => console.log("Calendar closed");
//   const handleCalendarOpen = () => console.log("Calendar opened");

//   return (
//     <SafeAreaView>
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeText}
//         value={text} />
//       <DatePicker
//         selected={date}
//         onChange={(date) => setDate(date)}
//         onCalendarClose={handleCalendarClose}
//         onCalendarOpen={handleCalendarOpen} />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
// });

// export default TextInputExample;
