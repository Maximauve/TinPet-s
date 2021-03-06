/* eslint-disable prettier/prettier */
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//import Members from "./Members";
import ColorContext from "../ColorContext";
// import Projects from "./Projects";
import Bibliotheque from "./Biblioteque";
import Profil from "./Profil";
import Accueil from "./Accueil";

const Tab = createBottomTabNavigator();

function Home() {
  const [color] = useContext(ColorContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: color,
        tabBarStyle: styles.tabBar,
        headerTitleStyle: styles.title,
      }}
    >
      <Tab.Screen
        name="Bibliotheque"
        component={Bibliotheque}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="bookmark-multiple-outline" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Accueil"
        component={Accueil}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="home-circle" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="account-multiple" {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 20,
    fontWeight: "700",
    height: 32,
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  tabBar: {
    height: 72,
  },
});

export default Home;
