import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box } from "native-base";
import { useDrawerUpdate } from "../context/DrawerContext";

const SideNav = () => {
  const switchDrawer = useDrawerUpdate();

  return (
    <Box style={styles.container}>
      <Box zIndex={10} bg="white" style={styles.content}>
        <Text onPress={switchDrawer}>Navigationsmenü</Text>
      </Box>
    </Box>
  );
};

export default SideNav;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#000000b5",
  },
  content: {
    width: "60%",
    height: "100%",
    paddingTop: "20%",
  },
});
