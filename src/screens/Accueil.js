/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
// eslint-disable-next-line react-native/no-inline-styles
/* eslint-disable prettier/prettier */
/* eslint-disable handle-callback-err */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Button, Image } from "react-native";
import React, { useState } from "react";
import IconButton from "./../components/IconButton";
import styles from "./../components/styles/App_styles";
import Faker from "./../hooks/faker";
import { registerCat } from "./../hooks/registerCat";

function Accueil() {
  const [cat, setCat] = useState("");
  const [myText, setText] = useState("");

  const handleOnSwipedLeft = () => {
    setText("You swiped left!");
    getCat();
  };
  const handleOnSwipedRight = () => {
    registerCat(cat[0]);
    getCat();
  };

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
    <View
      style={styles.container}
    >
        <Text style={styles.text}>{myText}</Text>
      <Image source={{uri: cat[0]}} style={{width: 300, height: 300}} />
      <View style={styles.buttonsContainer}>
        <IconButton
          name="close"
          onPress={handleOnSwipedLeft}
          color="white"
          backgroundColor="#E5566D"
        />
        <IconButton
          name="heart"
          onPress={handleOnSwipedRight}
          color="white"
          backgroundColor="#4CCC93"
        />
      </View>
    </View>
  );
}

export default Accueil;
