import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, Button, Input, Text } from "native-base";
import { db, engine } from "../engine";

const AddClient = ({ getClients, setShowModal }) => {
  const [submitting, setSubmitting] = useState(false);
  const [details, setDetails] = useState({ firstName: "", lastName: "" });
  const [error, setError] = useState("")

  const addClient = async () => {
    if(details.firstName === "" || details.lastName === "") {
      setError("All fields are required")
      return
    }
    setError("")
    setSubmitting(true);
    const res = await db.communicate("POST", "clients", details);
    switch (res.status) {
      case 200:
        setSubmitting(false);
        getClients();
        setShowModal();
        break;
      default:
        engine.networkError()
        setSubmitting(false);
        console.log(res);
    }
  };

  return (
    <Box style={styles.container}>
      <Text style={styles.error}>{error}</Text>
      <Box mb={3}>
        <Text>Vorname</Text>
        <Input
          size="xl"
          style={styles.input}
          onChangeText={(value) => setDetails({ ...details, firstName: value })}
        />
      </Box>
      <Box>
        <Text>Nachname</Text>
        <Input
          size="xl"
          style={styles.input}
          onChangeText={(value) => setDetails({ ...details, lastName: value })}
        />
      </Box>
      <Box style={styles.controle}>
        <Button m={2} size="sm" variant="outline" onPress={()=> setShowModal()}>
          ABBRECHEN
        </Button>
        <Button
          m={2}
          size="sm"
          isLoading={submitting}
          isLoadingText="BITTE WARTEN"
          onPress={addClient}
        >
          VORLEGEN
        </Button>
      </Box>
    </Box>
  );
};

export default AddClient;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
    // borderWidth: 1,
    // borderColor: "red"
  },
  controle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  input: {
    height: 35,
  },
  error: {
    color: 'red',
    textAlign: "center"
  }
});
