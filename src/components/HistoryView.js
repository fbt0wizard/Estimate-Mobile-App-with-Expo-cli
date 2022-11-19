import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, Text } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

const HistoryView = ({ row, setDialog, setUuid }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => {
        setUuid(row.history_uuid);
        setDialog(true);
      }}
    >
      <Box
        style={[styles.clientWrapper]}
        w="100%"
        // rounded="md"
        shadow={1}
        _dark={{ bg: "blueGray.800", borderWidth: 0 }}
        _light={{ bg: "trueGray.100", borderWidth: 1 }}
      >
        <Box flexDirection="row" alignItems="center" w="100%">
          <FontAwesome name="file-pdf-o" size={28} color="red" />
          <Box marginLeft={4} flex={1}>
            <Box flexDirection="row" justifyContent="space-between">
              <Text style={styles.date}>
                {moment(row.date_created).format("LLL")}
              </Text>
              <Text style={styles.clientName}>{row.total_price}</Text>
            </Box>
            <Box flexDirection="row" alignItems="center" mt={1}>
              <Ionicons name="person" size={15} color="#999" />
              <Text style={styles.clientName}>{parseData(row.client)}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
const parseData = (obj) => {
  const data = JSON.parse(obj);
  return `${data.first_name} ${data.last_name}`;
};

export default HistoryView;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  clientWrapper: {
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#c6c5c5",
    borderRadius: 5,
  },
  clientName: {
    fontWeight: "400",
    fontSize: 14,
    marginLeft: 1,
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
  },
  debug: {
    borderWidth: 1,
    borderColor: "green"
  }
});
