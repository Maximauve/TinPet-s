/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import bcrypt from "bcryptjs";

import app from "../../app.json";
import Button from "../components/Button";
// import Greetings from "../components/Greetings";
import { getAll } from "../firebase";

function Identification({ navigation }) {
  const [name, setName] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState(false);
  const styles = createStyles({
    error,
  });
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    if (!global.data.users) {
      try {
        global.data.users = await getAll("user");
      // eslint-disable-next-line no-catch-shadow
      } catch (err) {
        console.error(err);
      }
    }
    setUsers(global.data.users);
  };
  useEffect(() => {
      getUsers();
    }, []);
  const ChangeName = (text) => {
    setError(false);
    setName(text);
  };

  const ChangeMdp = (text) => {
    setError(false);
    setMdp(text);
  };

  const onPress = async () => {
    if (name.length > 0 && mdp.length > 0) {
      await users.find(async (user) => {
        if (user.name === name && await bcrypt.compare(mdp, user.password)) {
          global.session = user;
          onNavigateToHome();
        }
      });
      setError(true);
    } else {
      setError(true);
    }
  };
  const onNavigateToHome = () => {
    navigation.navigate("Accueil");
  };
  const onNavigateToRegister = () => {
    navigation.navigate("Register");
  };
  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>{app.expo.name}</Text>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
    </View>
  );
  if (error) {
    return (
      <View style={styles.root}>
        {header}
        <View style={styles.content}>
          <View>
          <TextInput
          placeholder="Identifiant"
          style={styles.input}
          value={name}
          onChangeText={ChangeName}
          />
          <TextInput
            placeholder="Mot de passe"
            secureTextEntry={true}
            style={styles.input}
            value={mdp}
            onChangeText={ChangeMdp}
          />
            <Text style={styles.error}>Désolé, tu n'es pas enregistré·e.</Text>
          </View>
          <View style={styles.actions}>
            <Button title="S'enregistrer" />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.root}>
      {header}
      <View style={styles.content}>
        <TextInput
          placeholder="Identifiant"
          style={styles.input}
          value={name}
          onChangeText={ChangeName}
        />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry={true}
          style={styles.input}
          value={mdp}
          onChangeText={ChangeMdp}
        />
        <View style={styles.actions}>
          <Button title="S'identifier" onPress={onPress} />
          <Button title="Créer un compte" onPress={onNavigateToRegister} />
        </View>
      </View>
    </View>
  );
}

export default Identification;

const createStyles = ({ error }) =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: "center",
    },
    header: {
      flexDirection: error ? "row" : "column",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: error ? 1 : 0,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: error ? 12 : 32,
      fontWeight: "700",
    },
    logo: {
      height: error ? 32 : 192,
      width: error ? 32 : 192,
      marginLeft: error ? 8 : 0,
    },
    input: {
      borderColor: error ? "red" : "black",
      borderWidth: 4,
      borderStyle: "solid",
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: 8,
      width: Dimensions.get("window").width - 64,
      fontSize: 20,
      fontWeight: "700",
      marginVertical: 8,
    },
    error: {
      color: "red",
    },
    actions: {
      marginVertical: 16,
    },
  });
