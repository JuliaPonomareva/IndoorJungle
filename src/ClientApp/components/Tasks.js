import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { gStyle } from '../styles/style';

export default function Tasks({navigation}) {
  const loadScene = () => {
    navigation.navigate('Mainn');
  }
  return (
    <View style={gStyle.main}>
      <Text style={gStyle.title}>Мои задачи</Text>
      <Button title='Главная страница' onPress={loadScene}/>
      <Button title="Предыдущая страница" onPress={() => navigation.goBack()} />
    </View>
        );
  }
  const styles = StyleSheet.create ({

  });