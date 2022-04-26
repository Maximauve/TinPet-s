/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet } from "react-native";

import Home from "./Home";

function Accueil() {
  return (
    <View style={styles.root}>
      <Text>Accueil.</Text>
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
