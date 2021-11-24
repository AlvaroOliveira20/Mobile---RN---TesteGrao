import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export interface HomeProps {}

export default function HomeScreen(props: HomeProps) {
  const nav = useNavigation();

  /** Navega para a página de personagens. */
  function navigateToPersonagens() {
    //@ts-ignore
    nav.navigate("personagens");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem Vindo!</Text>
      <RectButton onPress={navigateToPersonagens} style={styles.button}>
        <Text>Personagens</Text>
      </RectButton>
      <RectButton onPress={() => BackHandler.exitApp()} style={styles.button}>
        <Text>Sair</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: "90%",
    marginTop: 20,
    height: 40,
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

  text: {
    fontSize: 25,
  },
});
