import React from "react";
import "react-native-gesture-handler";
// import 'react-native-reanimated';
import { NativeBaseProvider, extendTheme } from "native-base";
import Routes from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import { EstimateProvider } from "./src/context/EstimateContext";
import { ModalPortal } from "react-native-modals";
import { PriceListProvider } from "./src/context/PriceListContext";
// import { engine } from "./src/engine";



// Define the config
const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {

  return (
    <React.Fragment>
      <NavigationContainer>
        <NativeBaseProvider>
          <AuthProvider>
            <PriceListProvider>
              <EstimateProvider>
                <Routes />
              </EstimateProvider>
            </PriceListProvider>
          </AuthProvider>
          <ModalPortal />
        </NativeBaseProvider>
      </NavigationContainer>
    </React.Fragment>
  );
}
