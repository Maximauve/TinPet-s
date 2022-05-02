/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Button, TextInput, Dimensions } from "react-native";
import React, { useState } from "react";

import { modifyProfil } from "../firebase";

function Profil() {
  const [change, setChange] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [num, setNumero] = useState("");

  const ChangeName = (text) => {
    setName(text);
  };
  const ChangeEmail = (text) => {
    setEmail(text);
  };
  const ChangeNumero = (text) => {
    setNumero(text);
  };
  const Modify = () => {
    setChange(true);
  };

  const modif = async () => {
    if (name.length > 0 && email.length > 0 && num.length > 0) {
        global.session.name = name;
        global.session.email = email;
        global.session.num = num;
        setChange(false);
        let tmp = await global.data.users.find((user) => { global.session.id === user.id;});
        let index = global.data.users.indexOf(tmp);
        global.data.users.splice(index, 1);
        global.data.users.push(global.session);
        await modifyProfil(global.session.id, name, email, global.session.password, num);
    }
  };

  if (change) {
    return (
        <View style={styles.root}>
            <Text>Profil</Text>
            <TextInput
            placeholder="Nouvel identifiant"
            style={styles.input}
            value={name}
            onChangeText={ChangeName}
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
                <Button title="Modifier" onPress={modif}/>
            </View>
        </View>
    );
  }
  return (
    <View style={styles.root}>
      <Text>Profil</Text>
      <Text>Nom : {global.session.name}</Text>
      <Text>Email : {global.session.email}</Text>
      <Text>Numero de téléphone : {global.session.num}</Text>
        <View>
          <Button title="Modifier" onPress={Modify} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 16,
  },
  input: {
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
    width: Dimensions.get("window").width - 64,
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 8,
  },
});

export default Profil;
