import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, Box, ChevronRightIcon, Text } from "native-base";
import { updateEstimateContext } from "../context/EstimateContext";
import { setPriceLists } from "../context/PriceListContext";

const ClientView = ({ navigation, row, setDialog, setUuid }) => {
  const setData = updateEstimateContext();
  const reset = setPriceLists()

  const selectClientAndNavigate = () => {
    setData(row);
    reset(row, "reset")
    navigation.navigate("Estimate");
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={selectClientAndNavigate}
      onLongPress={()=> {
        setUuid(row.client_uuid)
        setDialog(true)
      }}
    >
      <Box
        style={styles.clientWrapper}
        w="100%"
        // rounded="md"
        shadow={1}
        _dark={{ bg: "blueGray.800", borderWidth: 0 }}
        _light={{ bg: "trueGray.100", borderWidth: 1 }}
      >
        <Box flexDirection="row" alignItems="center">
          <Avatar
            width={10}
            height={10}
            bg="green.500"
            mr="1"
            source={{
              uri: "",
            }}
          >
            {getAvatar(`${row.first_name} ${row.last_name}`)}
          </Avatar>
          <Text
            style={styles.clientName}
          >{`${row.first_name} ${row.last_name}`}</Text>
        </Box>
        <ChevronRightIcon />
      </Box>
    </TouchableOpacity>
  );
};

export default ClientView;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  clientWrapper: {
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#c6c5c5",
    borderRadius: 5,
  },
  clientName: {
    fontWeight: "500",
    fontSize: 17,
    marginLeft: 6,
  },
});

const getAvatar = (data) => {
  const prep = data.match(/\b(\w)/g);
  const result = prep.join("");
  return result.toUpperCase();
};
