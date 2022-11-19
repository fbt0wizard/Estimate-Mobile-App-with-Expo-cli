import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, HStack, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ThemeThoggler from "../../components/ThemeThoggler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { switchAuth } from "../context/AuthContext";
import { engine } from "../engine";

const SidebarContent = ({ navigation }) => {
  const logoutHandler = switchAuth();

  const [user, setUser] = useState({});

  const getUser = async () => {
    const u = await engine.getJsonItem("user");
    setUser(u);
  };

  useEffect(() => {
    getUser();
  }, []);

  // Logout handler
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      logoutHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const navlinks = [
    {
      id: 1,
      translate: "Kuden",
      name: "Clients",
      icon: "bag-personal-outline",
      action: navigation.navigate,
    },
    {
      id: 2,
      translate: "Budgets",
      name: "History",
      icon: "history",
      action: navigation.navigate,
    },
    {
      id: 3,
      translate: "Ausloggen",
      name: "Logout",
      icon: "logout",
      action: logout,
    },
  ];
  return (
    <Box
      w="100%"
      h="100%"
      px={15}
      _dark={{ bg: "blueGray.800" }}
      _light={{ bg: "white" }}
      style={styles.container}
    >
      <Box marginBottom={5}>
        <HStack marginTop={5}>
          <MaterialCommunityIcons
            name="account-circle"
            size={150}
            color="grey"
          />
        </HStack>
      </Box>
      <HStack marginBottom={5}>
        <Text style={styles.username}>{user.name || "--"}</Text>
      </HStack>
      {navlinks.map((row) => (
        <TouchableOpacity
          onPress={() =>
            row.name === "Logout"
              ? row.action()
              : navigation.reset({
                  index: 0,
                  routes: [{ name: row.name }],
                })
          }
          key={row.id}
          style={styles.navButton}
        >
          <Box
            flexDirection="row"
            alignItems="center"
            style={styles.nav}
            _dark={{ bg: "blueGray.700" }}
            _light={{ bg: "trueGray.200" }}
          >
            <MaterialCommunityIcons name={row.icon} size={20} color="grey" />
            <Text marginLeft={1} style={styles.navLink}>
              {row.translate}
            </Text>
          </Box>
        </TouchableOpacity>
      ))}
      <HStack my={3} flex={2} position="absolute" bottom={5}>
        <ThemeThoggler />
      </HStack>
    </Box>
  );
};

export default SidebarContent;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    paddingTop: "20%",
  },
  navButton: {
    width: "100%",
    marginVertical: 5,
  },
  nav: {
    width: "100%",
    textAlign: "center",
    padding: 12,
    borderRadius: 5,
  },
  navLink: {
    fontSize: 16,
    fontWeight: "500",
  },
  username: {
    fontSize: 22,
    fontWeight: "600",
  },
});

// row.action(row.name)
