import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import {
  Button,
  Center,
  Heading,
  VStack,
  Box,
  Input,
  FormControl,
  StatusBar,
  useColorMode,
} from "native-base";
// import NativeBaseIcon from "../../../components/NativeBaseIcon";
import ThemeThoggler from "../../../components/ThemeThoggler";
import AlertComponent from "../../components/AlertComponent";
import { switchAuth } from "../../context/AuthContext";
import { db, engine } from "../../engine";

const Login = () => {
  const { colorMode } = useColorMode();

  const authenticateUser = switchAuth();

  const [submiting, setSubmiting] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    display: false,
  });

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const submit = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (credentials.email === "" || credentials.password === "") {
      setAlert({
        ...alert,
        message: "E-Mail und Passwort sind erforderlich",
        type: "error",
        display: true,
      });
      return;
    }
    setAlert({ ...alert, display: false });
    setSubmiting(true);
    const timing = setTimeout(fallbackOnError, 20000);
    const auth = await db.communicate("POST", "auth", credentials);

    switch (auth.data.status) {
      case 200:
        clearTimeout(timing);
        await engine.setItem("token", auth.data.token);
        await engine.setJsonItem("user", auth.data.data);
        setSubmiting(false);
        authenticateUser();
        break;
      case 400:
        clearTimeout(timing);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAlert({
          ...alert,
          message: auth.data.message,
          type: "error",
          display: true,
        });
        setSubmiting(false);
        break;
      case 500:
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAlert({
          ...alert,
          message: auth.data.message,
          type: "error",
          display: true,
        });
        setSubmiting(false);
        break;
      default:
        console.log(auth);
        setSubmiting(false);
    }
  };

  const fallbackOnError = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAlert({
      ...alert,
      message: "Server nicht erreichbar",
      type: "error",
      display: true,
    });
    setSubmiting(false);
  };

  return (
    <>
      <StatusBar
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box
            style={styles.container}
            _dark={{ bg: "blueGray.900" }}
            _light={{ bg: "blueGray.50" }}
          >
            <Center px={4}>
              <VStack space={3} alignItems="center" w="80%">
                {/* <NativeBaseIcon /> */}
                <Image
                  style={styles.logo}
                  source={require("../../../assets/adaptive-icon1.png")}
                />
                <Heading size="lg">Willkommen zurück</Heading>
                {alert.display && <AlertComponent alert={alert} />}
                <Box space={2} w="100%" alignItems="flex-start">
                  <FormControl isRequired>
                    <FormControl.Label>E-mail</FormControl.Label>
                    <Input
                      onChangeText={(value) =>
                        setCredentials({ ...credentials, email: value })
                      }
                      style={styles.input}
                      size="2xl"
                      shadow={2}
                      _light={{
                        bg: "coolGray.100",
                      }}
                      _dark={{
                        bg: "coolGray.800",
                      }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormControl.Label>Passwort</FormControl.Label>
                    <Input
                      onChangeText={(value) =>
                        setCredentials({ ...credentials, password: value })
                      }
                      style={styles.input}
                      type="password"
                      size="2xl"
                      shadow={2}
                      _light={{
                        bg: "coolGray.100",
                      }}
                      _dark={{
                        bg: "coolGray.800",
                      }}
                    />
                  </FormControl>
                </Box>
                <Button
                  _text={{ fontSize: 20, fontWeight: "700" }}
                  style={styles.button}
                  size="lg"
                  w="100%"
                  shadow={2}
                  onPress={submit}
                  isLoading={submiting}
                  isLoadingText="Bitte warten..."
                  mb={5}
                >
                  Einloggen
                </Button>
                <ThemeThoggler />
              </VStack>
            </Center>
          </Box>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    // maxWidth: 400,
    // margin: "auto"
  },
  logo: {
    width: 160,
    height: 160,
  },
  button: {
    height: 50,
    marginTop: 10,
  },
  input: {
    height: 40,
  },
  noAuth: {
    fontSize: 24,
  },
});
