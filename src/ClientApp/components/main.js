import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { gStyle } from '../styles/style';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function main({ navigation }) {
  const loadScene = () => {
  navigation.navigate('CatalogPlants');
   }
const [list, setList] = useState([
  { name: 'Алоказия', anons:'Уход за алоказией', key: '1', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaYIItFDzQ1HnPJXwWavPHrBcPxMPAN1vDioGPeWO6vQ&s'},
  { name: 'Филодендрон', anons:'Уход за филодендроном', key: '2', img: 'https://avatars.mds.yandex.net/i?id=0fd1089a109bb7e8fabb6461a82b92682fb15227-7759147-images-thumbs&n=13'},
  { name: 'Хамедорея', anons:'Уход за хамедореей', key: '3', img: 'https://cdn.botanichka.ru/wp-content/uploads/2017/07/garden-watering-01.jpg'},
]);

  return (
    <View style={gStyle.main}>
      <Ionicons name="add-circle" size={24} color="black" />
      <AntDesign name="bars" size={24} color="black" />
      <Text style={[gStyle.title, styles.header]}>Добро пожаловать в комнатные джунгли</Text>
          <FlatList data={list} renderItem={({item})=>(
        <TouchableOpacity onPress={() => navigation.navigate('CatalogPlants', item)}>
          <Image style={styles.image} source={{uri: item.img}}/>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.anons}>{item.anons}</Text>
          </TouchableOpacity>
     )}/> 
    </View>
        );
  }
  const styles = StyleSheet.create ({
    image: {
      width: '100%',
      height: 200,
    },
    header: {
      marginBottom: 30
      
    },
    // item: {
    //   width: '70%',
    //   height: 5,
    //   marginBottom: 5,
    // },
    title: {
      fontSize: 22,
      textAlign: 'center',
      color: 'green',
      marginTop: 20,
     },
     anons: {
      fontSize: 16,
      textAlign: 'center',
      color: 'green',
      marginTop: 5,
     },
  
  });
  