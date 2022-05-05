/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, ScrollView, Button, Pressable, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { deleteCat, getAll } from "../firebase";
import { CardViewWithImage } from "react-native-simple-card-view";

function Bibliotheque() {
  const [isCat, setIsCat] = useState(false);
  const [oneCat, setCat] = useState({});
  const [isUp, setUp] = useState(false);
  const [registerCat, setRegisterCat] = useState(false);
  const [printError, setPrintError] = useState(false);
  const [name, setName] = useState("");
  const [sexe, setSexe] = useState("");
  const [race, setRace] = useState("");
  const [poils, setPoils] = useState("");
  const [caractere, setCarac] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");

  const ChangeName = (text) => {
    setName(text);
  };
  const ChangeSexe = (text) => {
    setSexe(text);
  };
  const ChangeRace = (text) => {
    setRace(text);
  };
  const ChangePoils = (text) => {
    setPoils(text);
  };
  const ChangeCarac = (text) => {
    setCarac(text);
  };
  const ChangeBirthDate = (text) => {
    setBirthDate(text);
  };
  const ChangeDescription = (text) => {
    setDescription(text);
  };

  // const NyanCat = () => {
  //   return [{ id : 0, name: "Nyan Cat", sexe: "F", race }]
  // }

  const getCats = async () => {
    await getAll("cats").then(cats => {
      cats = cats.filter((cat) => cat.userId === global.session.id);
      cats.sort((a, b) => b.id - a.id);
      // if (cats.length === 0) {
      //   global.cats = NyanCat();
      // } else {
      global.cats = cats;
      // }
      // setCats(cats);
      setUp(true);
    });
  };

  const viewCat = (id) => {
    let res = global.cats.filter((elem) => elem.id === id);
    setIsCat(true);
    setCat(res[0]);
  };

  const addCat = () => {
    setRegisterCat(true);
  };

  const sendCat = () => {
    setRegisterCat(false);
    setPrintError(true);
  };

  const goBack = () => {
    setRegisterCat(false);
    setPrintError(false);
  };

  if (!isUp) {
    getCats();
  };

  if (isCat) {
    return (
      <View style={styles.container}>
          <Image source={{uri: oneCat.url}} style={{ width: 300, height: 300 }} />
          <Text style={styles.text}>Nom : {oneCat.name}</Text>
          <Text style={styles.text}>Sexe : {oneCat.sexe === "M" ? "Male" : "Femelle"}</Text>
          <Text style={styles.text}>Date de naissance : {oneCat.birthDate}</Text>
          <Text style={styles.text}>Race : {oneCat.race}</Text>
          <Text style={styles.text}>Poils : {oneCat.poils}</Text>
          <Text style={styles.text}>Caractere : {oneCat.caractere}</Text>
          <Text style={styles.text}>Description : {oneCat.description}</Text>
          <Text style={styles.text}>Organisation : {oneCat.organisation}</Text>
          <Text style={styles.text}>Contact : {oneCat.nbTelOrga}</Text>
          <Button title="Retour" onPress={() => setIsCat(false)} />
      </View>
    );
  } else if (registerCat) {
    return (
    <View style={styles.root}>
      <View style={styles.content}>
        <TextInput
          placeholder="Nom"
          style={styles.input}
          value={name}
          onChangeText={ChangeName}
        />
        <TextInput
          placeholder="Sexe"
          secureTextEntry={true}
          style={styles.input}
          value={sexe}
          onChangeText={ChangeSexe}
        />
        <TextInput
          placeholder="Race"
          secureTextEntry={true}
          style={styles.input}
          value={race}
          onChangeText={ChangeRace}
        />
        <TextInput
          placeholder="Caractere"
          style={styles.input}
          value={caractere}
          onChangeText={ChangeCarac}
        />
        <TextInput
          placeholder="Type de pelage"
          style={styles.input}
          value={poils}
          onChangeText={ChangePoils}
        />
        <TextInput
          placeholder="Date de naissance"
          style={styles.input}
          value={birthDate}
          onChangeText={ChangeBirthDate}
        />
        <TextInput
          placeholder="Description"
          style={styles.input}
          value={description}
          onChangeText={ChangeDescription}
        />
        <View style={styles.actions}>
          <Button title="Envoyer !" onPress={sendCat} />
          <Button title="Retour" onPress={goBack} />
        </View>
      </View>
    </View>
    );
  } else if (printError) {
    return (
      <View style={styles.root}>
        <Text style={styles.text}>Pour des raisons de fonctionnalités, nous obtenons nos chats en API, il n'est donc pas possible d'ajouter un chat pour l'instant.
        Mais, dans l'optique d'une publication de l'application, l'ajout de chats dans l'application sera nécéssaire.
        </Text>
        <Button title="Retour" onPress={goBack} />
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Button title="Proposer un chat à l'adoption" onPress={addCat}/>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {global.cats.map((cat) => (
          <View key={`view-${cat.id}`}><CardViewWithImage
            width={(300)}
            content={cat.description}
            source={{ uri: cat.url }}
            title={cat.name}
            imageWidth={300}
            imageHeight={300}
            onPress={() => viewCat(cat.id)}
            roundedImage={false}
            imageMargin={{ top: 10 }}
            key={`card-${cat.id}`} />
            <Button title="Supprimer" onPress={() => {deleteCat(cat.id); getCats();}} key={`button-${cat.id}`}/></View>
        ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 16,
  },
  scrollView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default Bibliotheque;
