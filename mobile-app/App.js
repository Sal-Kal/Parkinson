import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Info from "./components/Info";
import { useFonts } from "expo-font";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons/faCamera";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons/faArrowRotateLeft";
import CircularProgress from "react-native-circular-progress-indicator";
import Donut from "./components/DonutChart";

const bgColor = "#EDF5E1";
const fgColor = "black";

export default function App() {
  const fonts = useFonts({
    Lota: require("./assets/fonts/Lota.otf"),
    LotaBold: require("./assets/fonts/Lota-Grotesque-Bold.otf"),
  });

  const [result, setResult] = useState(null);
  const [viewState, setViewState] = useState("info");

  const handleCameraButtonPress = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      const image = await ImagePicker.launchCameraAsync();
      if (!image.canceled) {
        setViewState("loading");
        console.log("image taken");
        let formData = new FormData();
        formData.append("image", {
          uri: image.assets[0].uri,
          type: "image/jpeg",
          name: "image.jpg",
        });
        formData.append("bg", "237 245 225");
        formData.append("fg", "0 0 0");
        axios
          .post("http://192.168.43.140:8000/classify/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
            setResult(response.data.response);
            setViewState("result");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setViewState("info");
      alert("Permission to access camera is required.");
    }
  };

  const handleUploadButtonPress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 1,
      });
      if (!image.canceled) {
        setViewState("loading");
        console.log("image taken");
        let formData = new FormData();
        formData.append("image", {
          uri: image.assets[0].uri,
          type: "image/jpeg",
          name: "image.jpg",
        });
        formData.append("bg", "237 245 225");
        formData.append("fg", "0 0 0");
        axios
          .post("http://192.168.43.140:8000/classify/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
            setResult(response.data.response);
            setViewState("result");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setViewState("info");
      alert("Permission to access camera is required.");
    }
  };

  const handleGoBack = async () => {
    setViewState("info");
  };

  switch (viewState) {
    case "info":
      return (
        <View style={styles.appBody}>
          <Info />
          <View style={styles.buttonWrapper}>
            <Pressable onPress={handleCameraButtonPress} style={styles.button}>
              <FontAwesomeIcon icon={faCamera} style={{ color: bgColor }} />
              <Text style={styles.buttonText}>Capture</Text>
            </Pressable>
            <Pressable onPress={handleUploadButtonPress} style={styles.button}>
              <FontAwesomeIcon icon={faUpload} style={{ color: bgColor }} />
              <Text style={styles.buttonText}>Upload</Text>
            </Pressable>
          </View>
        </View>
      );
    case "loading":
      return (
        <View style={styles.appBody}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    case "result":
      return (
        <View style={styles.appBody}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollBody}
          >
            <View style={styles.resultWrapper}>
              <Text style={styles.resultHeading}>Score:</Text>
              <Donut percentage={result.score} />
              <Text style={styles.resultHeading}>Detected Image:</Text>
              <Image
                style={styles.image}
                source={{
                  uri: `data:image/png;base64,${result.image}`,
                }}
              />
              <Text style={styles.resultHeading}>Shape: {result.shape}</Text>
              <Text style={styles.resultHeading}>
                Prediction: {result.prediction}
              </Text>
            </View>
            <View style={styles.bottomOffset}></View>
          </ScrollView>
          <View style={styles.buttonWrapper}>
            <Pressable onPress={handleGoBack} style={styles.button}>
              <FontAwesomeIcon
                icon={faArrowRotateLeft}
                style={{ color: bgColor }}
              />
              <Text style={styles.buttonText}>Go Back</Text>
            </Pressable>
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  appBody: {
    display: "flex",
    height: "100%",
    backgroundColor: bgColor,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
    gap: 20,
    marginHorizontal: 20,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    gap: 15,
    borderRadius: 20,
    backgroundColor: fgColor,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: bgColor,
    fontSize: 17,
    fontFamily: "Lota",
  },
  image: {
    height: 170,
    width: 170,
  },
  scrollBody: {
    marginTop: 20,
  },
  resultWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 30,
  },
  resultHeading: {
    fontFamily: "LotaBold",
    fontSize: 30,
  },
  bottomOffset: {
    height: 100,
  },
});
