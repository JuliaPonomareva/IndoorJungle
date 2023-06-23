import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { BounceOutLeft, add } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyle } from '../styles/style';
import { View } from 'react-native-web';

const Tasks = () => {
  const [text, onChangeText] = React.useState('Введите имя задачи');
  const addNewTask = ({Task}) => {
    console.log('Task', Task)
  }
  const AddButton = () => {}
  function handleClick() {
    console.log('clicked!');
  }
  return (
    <div><h1 style={gStyle.h1}>Мои задачи</h1>
    <View style = {gStyle.main}>
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />  
    </SafeAreaView>
    <button className="addButton" style={gStyle.addButton} onClick={handleClick}>+</button>
    </View>
    </div>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

});
export default Tasks;




