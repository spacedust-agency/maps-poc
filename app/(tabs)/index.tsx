import { Dimensions, StyleSheet, Text } from "react-native";

import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useRef } from "react";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import { View } from "../../components/Themed";
import { Google_Map_Key } from "../../constants/googleMapKey";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = () => {
  const [state, setState] = React.useState({
    curLocation: {
      latitude: 30.7046,
      longitude: 77.1025,
    },
    destinationCords: {
      latitude: 30.7046,
      longitude: 77.1025,
    },
    isLoading: false,
    time: 0,
    distance: 0,
    heading: 0,
  });

  const { curLocation, destinationCords, isLoading, time, distance, heading } =
    state;

  const updateState = (data: any) => setState({ ...state, ...data });
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude, heading } = location.coords;
        updateState({
          curLocation: {
            latitude,
            longitude,
          },
          heading: heading,
        });
      })();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onPressLocation = () => {
    router.push("/chooseLocation"), { getCordinates : fetchValue };
  };

  const fetchValue = (data: any) => {
    console.log(data,"sasa");
    updateState({
      destinationCords: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    })
  }

  const fetchTime = (d: any, t: any) => {
    updateState({ distance: d, time: t });
  };

  return (
    <View style={styles.container}>
      {
        distance !== 0 && time !== 0 && (<View style= {{
          alignItems: "center",
          marginVertical: 20,
        }}>
          <Text style={styles.text}>Distance : {distance.toFixed(0)} km</Text>
          <Text style={styles.text}>Time : {time.toFixed(0)} min</Text>
        </View>)
      }

      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          ...curLocation,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        ref={mapRef}
      >
        <Marker
          coordinate={{
            ...curLocation,
          }}
        />
        <MapViewDirections
          origin={curLocation}
          destination={destinationCords}
          apikey={Google_Map_Key}
          strokeWidth={3}
          strokeColor="red"
          optimizeWaypoints={true}
          onReady={(result: any) => {
            console.log("Distance: " + result.distance + " km");
            console.log("Duration: " + result.duration + " min.");
            fetchTime(result.distance, result.duration);
            if (mapRef.current !== null) {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 50,
                  bottom: 50,
                  left: 50,
                  top: 50,
                },
              });
            }
          }}
        />
        <Marker coordinate={destinationCords} />
      </MapView>
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Where are you going..?</Text>

        <TouchableOpacity style={styles.inputStyle} onPress={onPressLocation}>
          <Text style={styles.text}>Choose Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  inputStyle: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 300,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});

export default Map;
