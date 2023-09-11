import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CustomBtn from "../components/customBtn";
import { router } from "expo-router";
import AddressPickup from "./addressPickup";
import { showMessage } from "react-native-flash-message";

const showError = (err: any) => {
  showMessage({
    message: err,
    type: "danger",
    icon: "danger",
    autoHide: true,
    duration: 3000,
  });
};

const chooseLocation = (props: any) => {
  const [state, setState] = React.useState({
    destinationCords: {},
  });

  const { destinationCords } = state;

  const checkValid = () => {
    if (Object.keys(destinationCords).length === 0) {
      showError("Please enter a valid location");
      return false;
    }
    return true;
  };

  const onDone = () => {
    if (checkValid()) {
      props?.route?.params.getCordinates({
        destinationCords,
      });
      router.back();
    }
  }

  const fetchDestinationCords = (lat: any, lng: any = null,zipCode:any,cityText:any) => {
    console.log("zip code==>>>",zipCode)
    console.log("city==>>>",cityText)
    console.log("props",props)
    setState({
      ...state,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  return (
    <View style={styles.View}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          padding: 15,
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ marginBottom: 16}} />
        <AddressPickup
          placeholder="Enter your destination location"
          fetchAddress={fetchDestinationCords}
        />
        <CustomBtn
          btnText="Done"
          onPress={onDone}
          btnStyle={{marginTop: 24}}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
    top: 40,
  },
});

export default chooseLocation;
