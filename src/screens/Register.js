/* eslint-disable prettier/prettier */
import { useContext, useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
// import bcrypt from "bcryptjs";

import app from "../../app.json";
import Button from "../components/Button";
// import Greetings from "../components/Greetings";
import { getAll, register } from "../firebase";

function Identification({ navigation }) {
  const [name, setName] = useState("");
  const [mdp, setMdp] = useState("");
  const [confirmMdp, setConfirmMdp] = useState("");
  const [email, setEmail] = useState("");
  const [num, setNumero] = useState("");
  const [member, setMember] = useState(null);
  const [error, setError] = useState(false);
  const styles = createStyles({
    error,
    member: Boolean(member),
  });
  const ChangeName = (text) => {
    setError(false);
    setName(text);
  };
  const ChangeMdp = (text) => {
    setError(false);
    setMdp(text);
  };
  const ChangeConfirmMdp = (text) => {
    setError(false);
    setConfirmMdp(text);
  };
  const ChangeEmail = (text) => {
    setError(false);
    setEmail(text);
  };
  const ChangeNumero = (text) => {
    setError(false);
    setNumero(text);
  };

  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    if (!global.data.users) {
      try {
        global.data.users = await getAll("user");
      } catch (error) {
        console.error(error);
      };
    }
    setUsers(global.data.users);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const Register = async () => {
    if (name.length > 0 && mdp.length > 0 && mdp === confirmMdp && email.length > 0 && num.length > 0) {
        // let hashedMdp = await bcrypt.hash(mdp, 10);
        let hashedMdp = mdp;
        if (users.length === 0) {
            register(0, name, hashedMdp, email, num);
            global.data.users += { "id": 0, "name" : name, "password" : hashedMdp, "email" : email, "num" : num };
            global.session = {"id":0,"name" : name, "password" : hashedMdp, "email" : email, "num" : num};
            onNavigateToHome();
        } else {
            let id = users[users.length - 1].id + 1;
            global.data.users += { "id": id, "name" : name, "password" : hashedMdp, "email" : email, "num" : num };
            global.session = {"id": id,"name" : name, "password" : hashedMdp, "email" : email, "num" : num};
            register(id, name, hashedMdp, email, num);
            onNavigateToHome();
        }
    } else {
        console.log("Ils sont vide !");
    }
  };
  const onNavigateToHome = () => {
    navigation.navigate("Home");
  };
  const onNavigateToIdentification = () => {
    navigation.navigate("Identification");
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
        <TextInput
          placeholder="Confirmer le mot de passe"
          secureTextEntry={true}
          style={styles.input}
          value={confirmMdp}
          onChangeText={ChangeConfirmMdp}
        />
        <TextInput
          placeholder="Email"
          textContentType="emailAddress"
          style={styles.input}
          value={email}
          onChangeText={ChangeEmail}
        />
        <TextInput
          placeholder="Numero de téléphone"
          textContentType="telephoneNumber"
          style={styles.input}
          value={num}
          onChangeText={ChangeNumero}
        />
        <View style={styles.actions}>
          <Button title="J'ai un compte !" onPress={onNavigateToIdentification} />
          <Button title="Creer un compte" onPress={Register} />
        </View>
      </View>
    </View>
  );
}

export default Identification;

const createStyles = ({ error, member }) =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: "center",
    },
    header: {
      flexDirection: error || member ? "row" : "column",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: error || member ? 1 : 0,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: error || member ? 12 : 32,
      fontWeight: "700",
    },
    logo: {
      height: error || member ? 32 : 192,
      width: error || member ? 32 : 192,
      marginLeft: error || member ? 8 : 0,
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
