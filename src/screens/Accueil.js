/* eslint-disable handle-callback-err */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Button } from "react-native";
import { useState } from "react";
import get from "https";

function Accueil() {
  const [cat, setCat] = useState("");
  const getCat = async () => {
    await fetch("https://api.thecatapi.com/v1/images/search")
    .then(response => response.json())
    .then(async data => {
      setCat([data[0].url, data[0].id]);
      // readdirSync("./../tmp", (err, files) => {
      //   console.log(files);
      //   files.forEach(file => {
      //     alert(file);
      //   });
      // });
      // let localPath = fs.createWriteStream("./../tmp");
      // let request = get(data[0].url, function (response) {
      //   console.log(response);
      //   response.pipe(localPath);
      // })
    });
  };



  if (!cat) {
    getCat();
  }
  return (
    <View style={styles.root}>
      <Text>Accueil.</Text>
      <Text>{cat}</Text>
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
