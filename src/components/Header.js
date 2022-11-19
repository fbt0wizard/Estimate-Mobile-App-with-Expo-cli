import { StyleSheet } from "react-native";
import React from "react";
import { Box, HStack, StatusBar, Text, useColorMode } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Header = ({ navigation, title, back, estimate, fullHeader }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <StatusBar
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
      />
      <Box
        safeAreaTop
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "trueGray.200" }}
        h={55}
      />
      <HStack
        px="4"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "trueGray.200" }}
      >
        {back && (
          <HStack w="30%" justifyContent="flex-start">
            <MaterialCommunityIcons
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={30}
              color={colorMode === "light" ? "black" : "white"}
            />
          </HStack>
        )}
        {estimate && (
          <HStack w="30%" justifyContent="flex-start">
            <TouchableOpacity onPress={() => navigation.navigate("Estimate")}>
              <Text style={styles.continue}>Weiter</Text>
            </TouchableOpacity>
          </HStack>
        )}
        <HStack alignItems="center" justifyContent={fullHeader ? "center" : "flex-start"} w={fullHeader ? "40%": "70%"}>
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "blueGray.900" }}
            fontSize="21"
            fontWeight="600"
          >
            {title}
          </Text>
        </HStack>
        <HStack w="30%" justifyContent="flex-end">
          <MaterialCommunityIcons
            onPress={() => navigation.openDrawer()}
            name="account-circle"
            size={30}
            color={colorMode === "light" ? "black" : "white"}
          />
        </HStack>
      </HStack>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  continue: {
    fontSize: 17,
    fontWeight: '600'
  },
  debug: {
    borderWidth: 1,
    borderColor: "red"
  }
});
