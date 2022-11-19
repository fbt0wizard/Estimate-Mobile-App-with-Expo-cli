import { StyleSheet, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { Box, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const HistoryDialog = ({
  setVisible,
  visible,
  updateItem,
  editHistory,
  message,
}) => {
  return (
    <Modal transparent visible={visible}>
      <Box style={styles.modal}>
        <Box
          _dark={{ bg: "blueGray.900" }}
          _light={{ bg: "white" }}
          style={styles.popup}
        >
          <Box style={styles.warning}>
            <Ionicons name="warning" size={24} color="#e3c105" />
            <Text style={styles.warnText} mt={1}>
              {message}
            </Text>
          </Box>
          <Box style={styles.control}>
            <TouchableOpacity
              style={[
                styles.controlButton,
                {
                  borderBottomLeftRadius: 19,
                  borderRightWidth: 0.2,
                  borderLeftWidth: 0,
                },
              ]}
              onPress={editHistory}
            >
              <Text style={styles.button}>Bearbeiten</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.controlButton,
                { borderRightWidth: 0, borderLeftWidth: 0 },
              ]}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.button}>Abbrechen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.controlButton,
                {
                  borderBottomRightRadius: 19,
                  borderLeftWidth: 0.2,
                  borderRightWidth: 0,
                },
              ]}
              onPress={updateItem}
            >
              <Text style={[styles.button, { color: "red" }]}>Löschen</Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default HistoryDialog;

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000066",
    height: "100%",
  },
  popup: {
    borderRadius: 20,
    borderColor: "#333",
    borderWidth: 0,
    width: "90%",
    maxWidth: 390,
    height: 150,
    position: "relative",
  },
  control: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },
  controlButton: {
    borderWidth: 0.4,
    borderColor: "#000",
    height: 40,
    width: "33.33%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0,
  },
  warning: {
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
    paddingHorizontal: 5,
  },
  warnText: {
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
  },
  button: {
    fontWeight: "400",
    color: "#4040f6",
    fontSize: 22,
  },
});
