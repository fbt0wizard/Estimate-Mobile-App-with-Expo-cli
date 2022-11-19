import { StyleSheet } from "react-native";
import React from "react";
import { Alert, HStack, VStack, Text } from "native-base";

const AlertComponent = (props) => {
  return (
    <Alert w="100%" status={props.alert.type}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
            {props.alert.message}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
};

export default AlertComponent;

const styles = StyleSheet.create({});
