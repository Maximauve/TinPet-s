/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet } from "react-native";

function Projects() {
  return (
    <View style={styles.root}>
      <Text>Pas de projets.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 16,
  },
});

export default Projects;
