/* eslint-disable prettier/prettier */
import { useState } from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Identification from "./screens/Identification";
import Home from "./screens/Home";
import Accueil from "./screens/Accueil";
import ColorContext from "./ColorContext";
import Register from "./screens/Register";

global.data = {};
global.session = {};

const Stack = createNativeStackNavigator();

export default function App() {
  const [color, setColor] = useState(null);
  return (
    <ColorContext.Provider value={[color, setColor]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Identification" component={Identification} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Accueil" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </ColorContext.Provider>
  );
}

registerRootComponent(App);
