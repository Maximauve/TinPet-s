/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet } from "react-native";

function Bibliotheque() {
  return (
    <View style={styles.root}>
      <Text>Pas de chats.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 16,
  },
});

export default Bibliotheque;
