import { React, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function App() {
  const [photo, setPhoto] = useState(null);

  const handleCameraButtonPress = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        console.log("image taken");
        let formData = new FormData();
        formData.append("image", {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          name: "image.jpg",
        });
        axios
          .post("http://192.168.43.140:8000/classify/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      alert("Permission to access camera is required.");
    }
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Button title="Take Photo" onPress={handleCameraButtonPress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
  },
  container: {
    backgroundColor: "#EDF5E1",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
