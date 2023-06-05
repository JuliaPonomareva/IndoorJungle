// import React from 'react';
// import { StyleSheet, Text, View, Button, Image } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { gStyle } from '../styles/style';


// export default function Article({navigation, route}) {
//   const loadScene = () => {
//         navigation.navigate('CatalogPlants');
//   }
//   return (
//     <View style={gStyle.main}>
//       <Image style={styles.image} source={{uri: route.params.img}}/>
//       <Text style={gStyle.title}></Text>
//       <Text style={gStyle.title}>{route.params.name}</Text>
//       <Text style={styles.title}>{route.params.anons}</Text>
//           <Button title='Следующая страница' onPress={loadScene}/>
//     </View>
//         );
//   }
//   const styles = StyleSheet.create ({
//       anons: {
//       fontSize: 16,
//       textAlign: 'center',
//       color: 'green',
//       marginTop: 5,
//       },
//       image: {
//         width: '70%',
//         height: 150,
//       }
//   });