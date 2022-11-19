import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import Header from "../../components/Header";
import { Box, ScrollView, useColorMode } from "native-base";
import Collapsible from "../../components/Collapsible";
import Search from "../../components/Search";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SidebarContent from "../../components/SidebarContent";
import History from "../history/History";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import Cart from "../cart/Cart";
import { priceLists } from "../../context/PriceListContext";
import { Badge } from "react-native-elements";
import { estimationContext } from "../../context/EstimateContext";
import { Ionicons } from "@expo/vector-icons";
import { setPriceLists } from "../../context/PriceListContext";
import { updateEstimateContext } from "../../context/EstimateContext";
import HoldDownMenu from "../../components/HoldDownMenu";

// import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const Drawer = createDrawerNavigator();

const Estimation = () => {
  return ( <Estimate />
    // <Drawer.Navigator
    //   initialRouteName="Create Estimate"
    //   screenOptions={{
    //     headerShown: false,
    //   }}
    //   drawerContent={(props) => <SidebarContent {...props} />}
    // >
    //   <Drawer.Screen name="Create Estimate" component={Estimate} />
    //   <Drawer.Screen name="History" component={History} />
    // </Drawer.Navigator>
  );
};

export default Estimation;

export const Estimate = ({ navigation }) => {
  // context
  const content = priceLists();
  const estimations = estimationContext();
  const resetPriceLists = setPriceLists();
  const resetCart = updateEstimateContext();

  const refRBSheet = useRef();
  const { colorMode } = useColorMode();
  const dimensions = useWindowDimensions();

  const [sKey, setSkey] = useState("");
  const [visible, setVisible] = useState(false);
  const [shouldRemoveItemFromcart, setShouldRemoveItemFromcart] = useState("");

  // console.log(content)

  // Get 85% ox the screen
  const h = Math.round(dimensions.height * 0.85);

  // reset all carts item
  const reset = () => {
    resetPriceLists({}, "reset");
    resetCart({}, "reset");
    setVisible(false);
  };

  // Search handler
  const searchKey = (value) => {
    setSkey(value.toLowerCase());
  };

  return (
    <React.Fragment>
      <Box
        style={styles.container}
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        paddingBottom={5}
      >
        <Header navigation={navigation} title="Budget erstellen" back={true} fullHeader={true} />
        <Box
          paddingX={5}
          paddingY={5}
          // shadow={1}
          borderBottomWidth={1}
          _light={{ borderColor: "#f1f1f1" }}
          _dark={{ borderColor: "coolGray.800" }}
        >
          <Search placeholder="Suchen..." searchKey={searchKey} />
        </Box>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 10 }}
        >
          {content.length > 0 && (
            <Collapsible
              shouldRemoveItemFromcart={shouldRemoveItemFromcart}
              sKey={sKey}
            />
          )}
        </ScrollView>
      </Box>
      <Box position="relative" h={100} w="100%">
        <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
          // onPress={() => setDialog(true)}
        >
          <Box
            style={styles.fab}
            _light={{ bg: "green.500" }}
            _dark={{ bg: "green.500" }}
          >
            <Badge
              status="error"
              size=""
              value={estimations.length}
              containerStyle={{ position: "absolute", top: -3, right: -3 }}
            />
            <MaterialCommunityIcons name="basket" size={30} color="white" />
          </Box>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setVisible(true)}>
          <Box
            style={styles.rightFab}
            _light={{ bg: "green.500" }}
            _dark={{ bg: "green.500" }}
          >
            <Ionicons name="md-refresh-circle" size={40} color="white" />
          </Box>
        </TouchableOpacity>
      </Box>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        height={h}
        customStyles={{
          container: {
            backgroundColor: colorMode === "light" ? "white" : "#030d23",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          wrapper: {
            backgroundColor: "#00000070",
          },
          draggableIcon: {
            backgroundColor: colorMode === "light" ? "#000" : "#fff",
          },
        }}
      >
        <ScrollView>
          <TouchableOpacity activeOpacity={1}>
            <Cart setShouldRemoveItemFromcart={setShouldRemoveItemFromcart} />
          </TouchableOpacity>
        </ScrollView>
      </RBSheet>
      <HoldDownMenu
        message="Alles löschen und neu anfangen?"
        visible={visible}
        setVisible={setVisible}
        updateItem={reset}
      />
    </React.Fragment>
  );
};

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
    bottom: 30,
  },
  rightFab: {
    position: "absolute",
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    left: 25,
    bottom: 30,
  },
});

// import React, { Component } from 'react';
// import {
//   View
// } from 'react-native';
// import SectionedMultiSelect from 'react-native-sectioned-multi-select';

// const items = [
//   {
//     name: "Fruits",
//     id: 0,
//     children: [{
//         name: "Apple",
//         id: 10,
//       },{
//         name: "Strawberry",
//         id: 17,
//       },{
//         name: "Pineapple",
//         id: 13,
//       },{
//         name: "Banana",
//         id: 14,
//       },{
//         name: "Watermelon",
//         id: 15,
//       },{
//         name: "Kiwi fruit",
//         id: 16,
//       }]
//   },
//   {
//     name: "Gems",
//     id: 1,
//     children: [{
//         name: "Quartz",
//         id: 20,
//       },{
//         name: "Zircon",
//         id: 21,
//       },{
//         name: "Sapphire",
//         id: 22,
//       },{
//         name: "Topaz",
//         id: 23,
//       }]
//   },
//   {
//     name: "Plants",
//     id: 2,
//     children: [{
//         name: "Mother In Law\'s Tongue",
//         id: 30,
//       },{
//         name: "Yucca",
//         id: 31,
//       },{
//         name: "Monsteria",
//         id: 32,
//       },{
//         name: "Palm",
//         id: 33,
//       }]
//   },
// ]

// export  class Estimate extends Component {
//   constructor(){
//     super()
//     this.state = {
//       selectedItems: [],
//     }
//   }
//   onSelectedItemsChange = (selectedItems) => {
//     this.setState({ selectedItems });
//   }

//   render() {
//     return (
//       <View>

//         <SectionedMultiSelect
//           items={items}
//           uniqueKey='id'
//           subKey='children'
//           selectText='Choose some things...'
//           showDropDowns={true}
//           readOnlyHeadings={true}
//           onSelectedItemsChange={this.onSelectedItemsChange}
//           selectedItems={this.state.selectedItems}
//         />

//       </View>
//     );
//   }
// }

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// export const Estimate = () => {
//   return (
//     <View>
//       <Text>Estimation</Text>
//     </View>
//   )
// }

// export default Estimation

// const styles = StyleSheet.create({})
