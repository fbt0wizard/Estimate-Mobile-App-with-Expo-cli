import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Box, Text, Input, Button, Checkbox, Container } from "native-base";

const BottomModal = ({ row, handleCheck, setInput, error }) => {
  return (
    <React.Fragment>
      <ScrollView>
      <Box style={styles.container}>
        <Box
          w="90%"
          marginX={3}
          paddingX={3}
          paddingY={1}
          borderRadius={5}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          _dark={row.selected ? { bg: "success.800" } : { bg: "blueGray.700" }}
          _light={row.selected ? { bg: "success.300" } : { bg: "trueGray.300" }}
        >
          <Box flexDirection="row" maxW="77%" alignItems="center">
            <Text _dark={{ color: "white" }} _light={{ color: "black" }}>
              {row.OZ}
            </Text>
            <Text
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              style={styles.child}
            >
              {row.Beschreibung}
            </Text>
          </Box>
          <Checkbox
            isChecked={row.selected}
            colorScheme="green"
            size={50}
            value="test"
            accessibilityLabel="select item"
          />
        </Box>
        <Box alignItems="center" my={3}>
          {error && (
            <Text color="danger.500" fontWeight="600">
              Please enter a unit
            </Text>
          )}
        </Box>
        <Box
          flexDirection="row"
          w="100%"
          justifyContent="center"
          alignItems="center"
          // marginVertical={40}
          // marginTop={8}
          marginBottom={4}
        >
          <Text style={styles.units}>Menge</Text>
          <Input
            keyboardType="numeric"
            onChangeText={(value) => setInput(value)}
            w={150}
            h={55}
            size="2xl"
            variant="filled"
          />
          <Text style={styles.units}>{row.Einheit}</Text>
        </Box>
        <Box style={styles.price}>
          <Text mr={2} fontSize={28}>
            EP
          </Text>
          <Text fontSize={28}>{row.EP}</Text>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-around"
          style={styles.control}
        >
          <Button
            flex="1"
            size="sm"
            variant="outline"
            m={1}
            onPress={() => handleCheck(false)}
          >
            REMOVE
          </Button>
          <Button
            m={1}
            flex="1"
            h="10"
            size="sm"
            onPress={() => handleCheck(true)}
          >
            SAVE
          </Button>
        </Box>
      </Box>
      </ScrollView>
    </React.Fragment>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 10,
    borderRadius: 5,
    paddingTop: 10,
    marginHorizontal: 15,
  },
  units: {
    margin: 10,
    fontSize: 20,
    fontWeight: "600",
  },
  control: {
    paddingHorizontal: 20,
  },
  title: {
    width: "80%",
    maxWidth: 320,
  },
  price: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  child: {
    padding: 8,
    fontSize: 15,
    fontWeight: "600",
    // maxWidth: "95%",
  },
});
