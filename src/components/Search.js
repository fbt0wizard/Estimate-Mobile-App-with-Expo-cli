import { StyleSheet } from "react-native";
import React from "react";
import { Input, Icon, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const Search = (props) => {
  return (
    <VStack w="100%" space={5} alignSelf="center">
      <Input
        _light={{bg: "coolGray.100"}}
        onChangeText={(value)=> props.searchKey(value)}
        placeholder={props.placeholder}
        width="100%"
        size="xl"
        // borderRadius="4"
        py="3"
        px="1"
        fontSize="14"
        variant="rounded"
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="search" />}
          />
        }
      />
    </VStack>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    height: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
