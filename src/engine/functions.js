import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// setting headers
export const setHeaders = async () => {
  const token = await getItem("token");
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "bearer-token": token,
    };
};

// setItem to localstorage
export const setItem = async (key, item) => {
  try {
    await AsyncStorage.setItem(key, item);
  } catch (error) {
    console.log(error);
  }
};

// setJsonItem
export const setJsonItem = async (key, item) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

// getItem to localstorage
export const getItem = async (key) => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item || "";
  } catch (error) {
    console.log(error);
  }
};

// getJsonItem
export const getJsonItem = async (key) => {
  try {
    const item = await AsyncStorage.getItem(key);
    return JSON.parse(item) || [];
  } catch (error) {
    console.log(error);
  }
};

//delete storage item
export const deleteStorageItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

// connection error
export const networkError = () =>
Alert.alert('Fehler', 'Bitte überprüfen Ihre Verbindung', [
  {
    text: 'Ablassen',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  },
  { text: 'OK', onPress: () => console.log('OK Pressed') },
]);

