import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Box, Button, Text } from "native-base";
import {
  estimationContext,
  estimateContext,
  updateEstimateContext,
} from "../../context/EstimateContext";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { PrintTemplate } from "../../components/PrintTemplate";
import { db, engine } from "../../engine";
import HoldDownMenu from "../../components/HoldDownMenu";

const Cart = ({ setShouldRemoveItemFromcart }) => {
  const estimations = estimationContext();
  const client = estimateContext();
  const removeEstimate = updateEstimateContext();

  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");
  const [submiting, setSubmiting] = useState(false);

  const preparePdf = async () => {
    setSubmiting(true);
    const prep = [];
    estimations.map((row) => {
      prep.push(row.item_uuid);
    });
    const res = await db.communicate("POST", "pdfstructure", {
      item_uuids: prep,
    });
    if (res.status === 200) {
      setSubmiting(false);
      res.data.map((row) => {
        row.sub.map((data) => {
          const quantity = estimations.find(
            (x) => x.item_uuid === data.item_uuid
          ).quantity;
          const newEP = formart(data.EP, quantity);
          data["EP"] = newEP;
          data["quantity"] = quantity;
        });
      });
      printToFile(res.data);
    } else {
      setSubmiting(false);
      engine.networkError()
      console.log(res);
    }
  };

  const printToFile = async (obj) => {
    const totalP = getTotalprice(estimations);
    const html = PrintTemplate(obj, totalP, `${client.first_name} ${client.last_name}`);

    const price = await engine.getJsonItem("price");
    const prep = {
      client: client,
      pdfStructure: obj,
      estimation: estimations,
      prices: price,
      totalPrice: totalP,
    };

    // Save to database history
    await db.communicate("POST", "history", prep);

    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const response = await Print.printToFileAsync({
      html: html,
      margins: {
        left: 10,
        top: 50,
        right: 10,
        bottom: 50,
      },
    });
    const pdfName = `${response.uri.slice(
      0,
      response.uri.lastIndexOf("/") + 1
    )}budget.pdf`;

    await FileSystem.moveAsync({
      from: response.uri,
      to: pdfName,
    });
    sharePdf(pdfName);
  };

  const sharePdf = (url) => {
    Sharing.shareAsync(url);
  };

  const formart = (a, b) => {
    const removeCurrency = a.replace(/\s/g, "").slice(0, -1);
    const cop = removeCurrency.split(".").join("");
    const second = cop.split(",").join(".");
    const out = Number(second) * Number(b);

    const result = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(out.toString());
    return result;
  };

  const getTotalprice = (arr) => {
    const prices = [];
    arr.map((row) => {
      if (row.EP !== "") {
        const removeCurrency = row.EP.replace(/\s/g, "").slice(0, -1);
        const cop = removeCurrency.split(".").join("");
        const second = cop.split(",").join(".");
        const sub = Number(second) * Number(row.quantity);
        prices.push(sub);
      }
    });

    const out = prices.reduce((a, b) => a + b, 0);
    const result = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(out.toString());
    return result;
  };

  const updateItem = () => {
    setShouldRemoveItemFromcart(id);
    const item_uuid = id.split("/")[0];
    removeEstimate(item_uuid, "unselect");
    setVisible(false);
  };

  return (
    <React.Fragment>
      <HoldDownMenu
        visible={visible}
        setVisible={setVisible}
        updateItem={updateItem}
        message="Element aus Budget entfernen?"
      />
      <Box style={styles.container}>
        <Box shadow={3} style={styles.clientName}>
          <Text fontWeight="600" fontSize={16}>
            Kundenname:
          </Text>
          <Text
            fontSize={16}
            ml={1}
          >{`${client.first_name} ${client.last_name}`}</Text>
        </Box>
        {estimations.length > 0 && (
          <Box
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
            mb={1}
          >
            <Box shadow={3} style={styles.clientName}>
              <Text fontWeight="600" fontSize={16}>
                Gesamt:
              </Text>
              <Text fontSize={16} ml={1}>
                {getTotalprice(estimations)}
              </Text>
            </Box>
            <Button
              colorScheme="success"
              isLoading={submiting}
              onPress={preparePdf}
            >
              PDF GENERIEREN
            </Button>
          </Box>
        )}
        {estimations.length > 0 &&
          estimations.map((row, i) => (
            <TouchableOpacity
              key={i}
              style={styles.box}
              onLongPress={() => {
                setId(`${row.item_uuid}/${row.group_uuid}`);
                setVisible(true);
              }}
            >
              <Box
                style={styles.item}
                _dark={{ bg: "blueGray.800", borderWidth: 0 }}
                _light={{ bg: "trueGray.100", borderWidth: 1 }}
              >
                <Text maxW={250} fontSize={16} style={styles.itemName}>
                  {`${row.OZ} - ${row.Beschreibung} x${row.quantity}`}
                </Text>
                <Box style={styles.rightSide}>
                  <Text
                    style={styles.itemName}
                  >{`${row.quantity} ${row.Einheit}`}</Text>
                  <Text style={styles.itemName}>
                    {formart(row.EP, row.quantity) || "--"}
                  </Text>
                </Box>
              </Box>
            </TouchableOpacity>
          ))}
      </Box>
    </React.Fragment>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  itemName: {
    fontWeight: "600",
  },
  rightSide: {
    alignItems: "flex-end",
  },
  clientName: {
    borderRadius: 2,
    flexDirection: "row",
    padding: 10,
    marginBottom: 2,
  },
  popitem: {
    borderRadius: 8,
    borderColor: "#333",
    borderWidth: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});
