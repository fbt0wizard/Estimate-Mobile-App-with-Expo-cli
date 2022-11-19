import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Text, useColorMode } from "native-base";
import Header from "../../components/Header";
import HistoryView from "../../components/HistoryView";
import Search from "../../components/Search";
import { db, engine } from "../../engine";
import { updateEstimateContext } from "../../context/EstimateContext";
import { setPriceLists } from "../../context/PriceListContext";
import HistoryDialog from "../../components/HistoryDialog";

const History = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [dialog, setDialog] = useState(false);
  const [uuid, setUuid] = useState("");
  const [sKey, setSkey] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // contexts
  const setClient = updateEstimateContext();
  const setPrice = setPriceLists();

  const { colorMode } = useColorMode();


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getHistory()
    // wait(2000).then(() => setRefreshing(false));
  }, []);

  const getLocalHistory = async () => {
    const localHistory = await engine.getJsonItem("his")
    if(!localHistory) {
      setMessage("...loading");
    }
    setHistory(localHistory || [])
  }

  const getHistory = async () => {
    setMessage("");
    const res = await db.communicate("GET", "history");
    switch (res.status) {
      case 200:
        if(res.data.status === 200) {
          setHistory(res.data.data)
          engine.setJsonItem("his", res.data.data)
        }
        if(res.data.status === 404) {
          setHistory([])
          setMessage("No record found");
          engine.deleteStorageItem("his")
        }
        setRefreshing(false)
        break;
      case 404:
        setHistory([]);
        setRefreshing(false)
        break;
        case 500:
          setRefreshing(false)
          setTimeout(engine.networkError, 1000)
          break;
      default:
        console.log(res);
        setRefreshing(false)
    }
  };

  const deleteHistory = async () => {
    setDialog(false);
    const res = await db.communicate("DELETE", `history/${uuid}`);
    switch (res.status) {
      case 200:
        getHistory();
        break;
      default:
        console.log(res);
        engine.networkError()
    }
  };

  const editHistory = () => {
    const selected = history.filter((row) => row.history_uuid === uuid);
    const cl = JSON.parse(selected[0].client);
    const est = JSON.parse(selected[0].estimations);
    const pri = JSON.parse(selected[0].prices);
    setClient(cl);
    setClient(est, "edit");
    setPrice(pri, "price");
    setDialog(false);
    navigation.navigate("Estimate");
  };

  useEffect(() => {
    getLocalHistory()
    getHistory();
  }, []);

  // Search handler
  const searchKey = (value) => {
    setSkey(value.toLowerCase());
  };

  const searched = history.filter(
    (row) =>
      JSON.parse(row.client).first_name.toLowerCase().includes(sKey) ||
      JSON.parse(row.client).last_name.toLowerCase().includes(sKey)
  );

  return (
    <React.Fragment>
      <Box
        h="100%"
        style={styles.container}
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        paddingBottom={5}
      >
        <Header navigation={navigation} title="Budgetgeschichte" back={true} fullHeader={true} />
        <Box
          paddingX={5}
          paddingY={5}
          // shadow={1}
          borderBottomWidth={1}
          _light={{ borderColor: "#f1f1f1" }}
          _dark={{ borderColor: "coolGray.800" }}
        >
          <Search placeholder="Suchbudget..." searchKey={searchKey} />
        </Box>
        <ScrollView
        refreshControl={<RefreshControl tintColor={colorMode === "light" ? undefined: "#fff"} refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 10 }}
        >
          {searched.length > 0 &&
            searched.map((row) => (
              <Box key={row.id} marginY={1} marginX={3}>
                <HistoryView
                  row={row}
                  setDialog={setDialog}
                  setUuid={setUuid}
                />
              </Box>
            ))}
          {message.length > 0 && (
            <Box alignItems="center">
              <Text fontSize={17}>{message}</Text>
            </Box>
          )}
        </ScrollView>
      </Box>
      <HistoryDialog
        visible={dialog}
        setVisible={setDialog}
        updateItem={deleteHistory}
        editHistory={editHistory}
        message="Zum Bearbeiten oder Löschen des Verlaufs bestätigen?"
      />
    </React.Fragment>
  );
};

export default History;

const styles = StyleSheet.create({
  actionBtn: {
    borderWidth: 1,
    borderColor: "blue",
  },
});
