import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Google_Map_Key } from "../constants/googleMapKey";



const AddressPickup = (Props: { placeholder: any; fetchAddress: any; }) => {
    const { placeholder, fetchAddress } = Props;
    

    const onPressAddress = (data: any, details: any) => {
      const lat = details.geometry.location.lat;
      const lng = details.geometry.location.lng;
      console.log("details==>>>>", details)

      fetchAddress(lat, lng);
    };
    return (
      <View style={styles.View}>
        <GooglePlacesAutocomplete
          placeholder={placeholder}
          onPress={onPressAddress}
          query={{
            key: Google_Map_Key,
            language: "en",
          }}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              backgroundColor: "white",
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 48,
              color: "#000",
              fontSize: 16,
              backgroundColor: "#f3f3f3",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  View: {
    flex: 1,
  },
});

export default AddressPickup;