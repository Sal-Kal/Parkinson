import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useFonts } from "expo-font";

export default function Info() {
  const fonts = useFonts({
    Lota: require("../assets/fonts/Lota.otf"),
    LotaBold: require("../assets/fonts/Lota-Grotesque-Bold.otf"),
  });
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollBody}
    >
      <Text style={styles.heading}>Parkinson's Disease Detection System</Text>
      <Text style={styles.instructionHeading}>Example Images:</Text>
      <View style={styles.exampleWrapper}>
        <Image
          style={styles.example}
          source={require("../assets/spiral.png")}
        />
        <Image style={styles.example} source={require("../assets/wave.png")} />
      </View>
      <Text style={styles.instructionHeading}>How to use:</Text>
      <Text style={styles.instruction}>
        1. Use a blank sheet of paper and a black pen to draw either a spiral or
        a wave.
      </Text>
      <Text style={styles.instruction}>
        2. Use the Capture button to take a photo of your drawing.
      </Text>
      <Text style={styles.instruction}>
        3. Alternatively, you could choose the Upload button to upload an image
        from your file system.
      </Text>
      <Text style={styles.instruction}>
        4. Wait for the image to upload and for the test to complete.
      </Text>
      <Text style={styles.instruction}>
        5. Wait for the image to upload and for the test to complete.
      </Text>
      <Text style={styles.instruction}>
        6. The test will show you a score between 0 and 100. If the score is
        below 50, it may indicate early symptoms of Parkinson's disease.
      </Text>
      <View style={styles.bottomOffset}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollBody: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  heading: {
    fontFamily: "LotaBold",
    fontSize: 35,
    fontWeight: "bold",
  },
  exampleWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  example: {
    marginVertical: 20,
  },
  instructionHeading: {
    marginTop: 20,
    fontFamily: "LotaBold",
    fontSize: 30,
  },
  instruction: {
    marginTop: 15,
    fontFamily: "Lota",
    fontSize: 25,
  },
  bottomOffset: {
    height: 100,
  },
});
