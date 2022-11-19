import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";

// Import Screens
import Login from "../screen/login/Login";
import Clients from "../screen/clients/Clients";
import Estimation from "../screen/estimation/Estimation";

import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Welcome from "../screen/welcome/Welcome";
import { auth } from "../context/AuthContext";

const Stack = createStackNavigator();

function MainNavigation() {
  const authStatus = auth()

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  // Check if user is logged in
  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      } else setIsLoggedIn(false);
    } catch (error) {
      setSubmiting(false);
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [authStatus]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoggedIn === null && <Stack.Screen name="Welcome" component={Welcome} />}
      {isLoggedIn === false && <Stack.Screen name="Login" component={Login} />}
      {isLoggedIn && <Stack.Screen name="Clients" component={Clients} />}
      {/* {isLoggedIn && <Stack.Screen name="Estimate" component={Estimation} />} */}
    </Stack.Navigator>
  );
}

const Routes = () => {
  return (
    <SafeAreaProvider>
      <MainNavigation />
    </SafeAreaProvider>
  );
};

export default Routes;
