import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Box, Icon, VStack, useColorMode, Text } from "native-base";
import Header from "../../components/Header";
import ClientView from "../../components/ClientView";
import Search from "../../components/Search";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SidebarContent from "../../components/SidebarContent";
import History from "../history/History";
import { AntDesign } from "@expo/vector-icons";
import { db, engine } from "../../engine";
import AddClient from "../../components/AddClient";
import {
  setPriceLists,
  clientInformation,
} from "../../context/PriceListContext";
import { Estimate } from "../estimation/Estimation";
import { estimationContext } from "../../context/EstimateContext";
import HoldDownMenu from "../../components/HoldDownMenu";
import RBSheet from "react-native-raw-bottom-sheet";


const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Drawer = createDrawerNavigator();

const ClientWrap = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <SidebarContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Clients} />
      <Drawer.Screen name="History" component={History} />
      <Drawer.Screen name="Estimate" component={Estimate} />
    </Drawer.Navigator>
  );
};

const Clients = ({ navigation }) => {
  const { colorMode } = useColorMode();
  const refRBSheet = useRef();

  // contexts
  const addPrices = setPriceLists();
  const clients = clientInformation();
  const estimations = estimationContext();

  const [dialog, setDialog] = useState(false);
  const [uuid, setUuid] = useState("");
  const [sKey, setSkey] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getClients()
    // wait(2000).then(() => setRefreshing(false));
  }, []);

  // Fetch Client information
  const getClients = async () => {
    setMessage("")
    const res = await db.communicate("GET", "clients");
    switch (res.status) {
      case 200:
        if(res.data.status === 200) {
          addPrices(res.data.data, "clients");
          engine.setJsonItem("clientsLists", res.data.data)
        }
        if(res.data.status === 404){
          addPrices([], "clients");
          engine.deleteStorageItem("clientsLists")
          setMessage("No record found");
        }
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

  // Fetch all price Lists
  const getPrices = async () => {
    const res = await db.communicate("GET", "estimates");
    switch (res.status) {
      case 200:
        addPrices(res.data, "price");
        engine.setJsonItem("priceLists", res.data)
        setRefreshing(false)
        break;
      default:
        console.log(res);
        setRefreshing(false)
    }
  };

  const deleteClient = async () => {
    setDialog(false);
    const res = await db.communicate("DELETE", `clients/${uuid}`);
    switch (res.status) {
      case 200:
        getClients();
        break;
      default:
        console.log(res);
        engine.networkError()
    }
  };

  useEffect(() => {
    if (clients.length === 0) {
      getClients();
      getPrices();
    }
  }, []);

  // Search handler
  const searchKey = (value) => {
    setSkey(value.toLowerCase());
  };

  const searched = clients.filter(
    (row) =>
      row.first_name.toLowerCase().includes(sKey) ||
      row.last_name.toLowerCase().includes(sKey)
  );

  return (
    <React.Fragment>
        <Box
          style={styles.container}
          _dark={{ bg: "blueGray.900" }}
          _light={{ bg: "blueGray.50" }}
        >
          <Header
            navigation={navigation}
            title="Kunden"
            estimate={estimations.length > 0 ? true : undefined}
            fullHeader={estimations.length > 0 ? true : undefined}
          />
          <Box
            paddingX={5}
            paddingY={3}
            borderBottomWidth={1}
            style={styles.searchBox}
            _light={{ borderColor: "#f1f1f1" }}
            _dark={{ borderColor: "coolGray.800" }}
          >
            <Search placeholder="Kunde suchen..." searchKey={searchKey} />
          </Box>
          <ScrollView
            refreshControl={<RefreshControl tintColor={colorMode === "light" ? undefined: "#fff"} refreshing={refreshing} onRefresh={onRefresh} />}
            showsVerticalScrollIndicator={false}
            style={{ paddingTop: 10 }}
          >
            <VStack paddingX={4} marginTop={2} space={4} alignItems="center">
              {searched.length > 0 &&
                searched.map((row, i) => (
                  <Box key={row.client_uuid} w="100%">
                    <ClientView
                      row={row}
                      navigation={navigation}
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
            </VStack>
          </ScrollView>
          <Box position="relative" h={100} w="100%">
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <Box
                style={styles.fab}
                _light={{ bg: "green.500" }}
                _dark={{ bg: "green.500" }}
              >
                <Icon color="white" as={<AntDesign name="plus" />} size="xl" />
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
              <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        customStyles={{
          container: {
            backgroundColor: colorMode === "light" ? "white" : "#030d23",
          },
          wrapper: {
            backgroundColor: "#00000070",
          },
          draggableIcon: {
            backgroundColor: colorMode === "light" ? "#000" : "#fff"
          },
        }}
      >
         <AddClient getClients={getClients} setShowModal={()=> refRBSheet.current.close()} />
      </RBSheet>
        <HoldDownMenu
          updateItem={deleteClient}
          visible={dialog}
          setVisible={setDialog}
          message="Kunden löschen bestätigen?"
        />
    </React.Fragment>
  );
};

export default ClientWrap;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  fab: {
    position: "absolute",
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    right: 25,
    // bottom: 0
  },
});
