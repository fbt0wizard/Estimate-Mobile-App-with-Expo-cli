import {
  StyleSheet,
  TouchableOpacity,
  View,
  LayoutAnimation,
  useWindowDimensions,
  Platform,
  UIManager,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Checkbox,
  ChevronDownIcon,
  ChevronUpIcon,
  HStack,
  Text,
  useColorMode,
} from "native-base";
import { updateEstimateContext } from "../context/EstimateContext";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomModal from "./BottomModal";
import { engine } from "../engine";
import { priceLists } from "../context/PriceListContext";
import { Badge } from "react-native-elements";

const Collapsible = ({ shouldRemoveItemFromcart, sKey }) => {
  const dimensions = useWindowDimensions();
  const refRBSheet = useRef();
  const { colorMode } = useColorMode();

  // Get 40% ox the screen
  const h = Math.round(dimensions.height * 0.40);

  const [content, setContent] = useState([]);
  const [row, setRow] = useState({});
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const upDateEstimate = updateEstimateContext();
  const defaultP = priceLists();

  useEffect(() => {
    setContent(defaultP);
  }, []);

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggle = (uuid) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...content];
    const index = array.findIndex((x) => x.group_uuid === uuid);
    array[index]["isExpanded"] = !array[index]["isExpanded"];
    setContent(array);
  };

  const handleBottom = (obj) => {
    setRow(obj);
    refRBSheet.current.open();
  };

  const handleCheck = (action) => {
    if (action && input === "") {
      setError(true);
      return;
    }
    setError(false);

    setTimeout(function () {
      refRBSheet.current.close();
    }, 200);

    const array = [...content];
    array.map((item) => {
      if (item.group_uuid === row.group_uuid) {
        item.sub.map((v) => {
          if (v.item_uuid === row.item_uuid) {
            return (v["selected"] = action);
          }
        });
      }
    });
    let temp = row;
    temp["quantity"] = input;
    upDateEstimate(row, action);
    setContent(array);
    setInput("");
    engine.setJsonItem("price", array);
  };

  // Remote item from cart and unselect it
  const removeAndUpdate = () => {
    if (shouldRemoveItemFromcart) {
      const array = [...content];
      array.map((item) => {
        if (item.group_uuid === shouldRemoveItemFromcart.split("/")[1]) {
          item.sub.map((v) => {
            if (v.item_uuid === shouldRemoveItemFromcart.split("/")[0]) {
              return (v["selected"] = false);
            }
          });
        }
      });
      setContent(array);
    }
  };

  const preSearched = content.map((element) => {
    return {
      ...element,
      sub: element.sub.filter(
        (subElement) =>
          subElement.OZ.includes(sKey) ||
          subElement.Beschreibung.toLowerCase().includes(sKey)
      ),
    };
  });

  const searched = preSearched.filter((row) => {
    return row.sub.length > 0;
  });

  useEffect(() => {
    removeAndUpdate();
  }, [shouldRemoveItemFromcart]);

  return (
    <View style={styles.container}>
      {searched.length > 0 &&
        searched.map((row) => (
          <Box
            style={styles.accordionItem}
            key={row.group_uuid}
            _dark={{ bg: "blueGray.800" }}
            _light={{ bg: "indigo.100" }}
          >
            <TouchableOpacity
              style={{ zIndex: 1 }}
              onPress={() => toggle(row.group_uuid)}
            >
              <Box
                _dark={{ bg: "blueGray.800" }}
                _light={{ bg: "indigo.300" }}
                style={styles.themeBox}
              >
                <Text
                  style={styles.title}
                >{`${row.OZ} ${row.Beschreibung}`}</Text>
                <Box flexDirection="row" alignItems="center">
                  <HStack mr={2}>
                    <Badge status="primary" size="" value={row.sub.length} />
                  </HStack>
                  {row.isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </Box>
              </Box>
            </TouchableOpacity>
            {row.isExpanded &&
              row.sub.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.head}
                  onPress={() => handleBottom(data)}
                >
                  <Box
                    paddingX={3}
                    paddingY={1}
                    borderRadius={5}
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    _dark={
                      data.selected
                        ? { bg: "success.800" }
                        : { bg: "blueGray.700" }
                    }
                    _light={
                      data.selected
                        ? { bg: "success.300" }
                        : { bg: "trueGray.300" }
                    }
                  >
                    <Box flexDirection="row" maxW="77%" alignItems="center">
                      <Text
                        _dark={{ color: "white" }}
                        _light={{ color: "black" }}
                      >
                        {data.OZ}
                      </Text>
                      <Text
                        _dark={{ color: "white" }}
                        _light={{ color: "black" }}
                        style={styles.child}
                      >
                        {data.Beschreibung}
                      </Text>
                    </Box>
                    <Checkbox
                      onChange={() => handleBottom(data)}
                      isChecked={data.selected}
                      colorScheme="green"
                      size={50}
                      value="test"
                      accessibilityLabel="select item"
                    />
                  </Box>
                </TouchableOpacity>
              ))}
          </Box>
        ))}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={400}
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
        <BottomModal
          row={row}
          handleCheck={handleCheck}
          setInput={setInput}
          error={error}
        />
      </RBSheet>
    </View>
  );
};

export default Collapsible;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 1,
  },
  themeBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    // margin: 1
  },
  accordionItem: {
    marginHorizontal: 17,
    marginVertical: 3,
    borderRadius: 10,
  },
  title: {
    padding: 10,
    paddingLeft: 2,
    fontSize: 16,
    fontWeight: "600",
  },
  head: {
    margin: 3,
    marginHorizontal: 6,
    marginVertical: 6,
  },
  child: {
    padding: 8,
    fontSize: 15,
    fontWeight: "600",
    // maxWidth: "95%",
  },
});
