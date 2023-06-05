import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { gStyle } from '../styles/style';

export default function CatalogPlants({navigation}) {
  const loadScene = () => {
        navigation.navigate('MyPlants');
  }
  return (
    <View style={gStyle.main}>
      <Text style={gStyle.title}>Каталог растений</Text>
          <Button title='Следующая страница' onPress={loadScene}/>
          <Button title="Предыдущая страница" onPress={() => navigation.goBack()} />
    </View>
        );
  }
  const styles = StyleSheet.create ({
  });