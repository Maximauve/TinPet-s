/* eslint-disable prettier/prettier */
/* eslint-disable handle-callback-err */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { useState } from "react";
// import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

function Accueil() {
  const [cat, setCat] = useState("");

  const getCat = async () => {
    await fetch("https://api.thecatapi.com/v1/images/search")
    .then(response => response.json())
    .then(async data => {
      setCat([data[0].url, data[0].id]);
    });
  };


  if (!cat) {
    getCat();
  }
  
  return (
    <View style={styles.root}>
      <Text>Accueil.</Text>
      <Image source={{ uri: cat[0], width: 200, height: 200 }} />
      <Button title="Changer de chat" onPress={getCat} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 16,
  },
});

export default Accueil;
