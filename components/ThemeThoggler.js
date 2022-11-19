import { StyleSheet } from "react-native";
import React from "react";
import { Text, HStack, Switch, useColorMode } from "native-base";
import { engine } from "../src/engine";

const ThemeThoggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleTheme = () => {
    toggleColorMode()
    setTimeout(async function(){
     await engine.setItem('theme', colorMode)
    },1000)
  }

  return (
    <HStack space={2} alignItems="center">
      <Text>Dunkel</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={handleTheme}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Licht</Text>
    </HStack>
  );
};

export default ThemeThoggler;

const styles = StyleSheet.create({});
