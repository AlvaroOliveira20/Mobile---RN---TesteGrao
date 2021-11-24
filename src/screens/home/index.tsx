import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export interface HomeProps {}

export default function HomeFuncaoScreen(props: HomeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          }}
        />
        <Text style={styles.text}>Nome: ?</Text>
        <Text style={styles.text}>Espécie: ?</Text>
        <Text style={styles.text}>Status: ?</Text>
      </View>
      <View style={styles.containerHorizontal}>
        <RectButton style={styles.button}>
          <Text>PREV</Text>
        </RectButton>
        <RectButton style={styles.button}>
          <Text>HOME</Text>
        </RectButton>
        <RectButton style={styles.button}>
          <Text>NEXT</Text>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#DDD",
    justifyContent: "space-around",
    alignItems: "center",
  },
  containerHorizontal: {

    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderColor: "#ddd",
    borderStyle: "solid",
    borderWidth: 4,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.58,
    shadowRadius: 1.0,

    elevation: 2,
  },
  card: {
    width: "90%",
    height: "80%",
    borderRadius: 10,
    flexDirection: "column",
    backgroundColor: "#FFF",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  image: {
    borderRadius: 10,
    width: "90%",
    height: "70%",
  },
  text: {
    fontSize: 18,
  },
});
