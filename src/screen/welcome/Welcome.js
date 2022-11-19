import { StyleSheet, Image } from "react-native";
import React from "react";
import { Box } from "native-base";
// import NativeBaseIcon from "../../../components/NativeBaseIcon";

const Welcome = () => {
  return (
    <Box
      style={styles.container}
      _dark={{ bg: "blueGray.400" }}
      _light={{ bg: "blueGray.100" }}
    >
      {/* <NativeBaseIcon /> */}
      <Image style={styles.logo} source={require('../../../assets/adaptive-icon1.png')}/>
    </Box>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 160,
    height: 160 
  },
});
