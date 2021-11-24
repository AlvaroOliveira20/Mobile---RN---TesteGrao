import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
//import {  } from "react-native-elements";
import { RectButton, ScrollView } from "react-native-gesture-handler";

export interface PersonagensProps {}

export default function PersonagensScreen(props: PersonagensProps) {
  const nav = useNavigation();

  const [personagens, setPersonagens] = React.useState([]);
  const [informacoes, setInformacoes] = React.useState({
    pages: "?",
    prev: null,
    next: null,
  });
  const [paginaAtual, setPaginaAtual] = React.useState(1);
  const [carregando, setCarregando] = React.useState(true);

  /** Navega para a página inicial. */
  function navigateToHome() {
    //@ts-ignore
    nav.navigate("home");
  }
  /** Navega para a próxima página. */
  async function proxima() {
    setCarregando(true);
    try {
      if (informacoes.next) {
        let json = await getPessonagens(paginaAtual + 1);
        setPersonagens(json.results);
        setInformacoes(json.info);
      }
    } catch (e) {
      showAlert();
    }

    setCarregando(false);
  }
  /** Navega para a página anterior. */
  async function anterior() {
    setCarregando(true);
    try {
      if (informacoes.prev) {
        let json = await getPessonagens(paginaAtual - 1);
        setPersonagens(json.results);
        setInformacoes(json.info);
      }
    } catch (e) {
      showAlert();
    }

    setCarregando(false);
  }
  /** Exibe um alerta de erro de conexão ou servidor. */
  const showAlert = () =>
    Alert.alert("ERRO", "Ocorreu um erro ao conectar com o servidor.", [
      {
        text: "Tentar Novamente",
        onPress: async () => {
          setCarregando(true);
          let json = await getPessonagens(1);
          setPersonagens(json.results);
          setInformacoes(json.info);
          setCarregando(false);
        },
      },
    ]);

  /** Carrega personagens. */
  const getPessonagens = async (pagina?: any) => {
    try {
      if (!pagina) pagina = 1;
      setPaginaAtual(pagina);
      let jsonData = null;

      await fetch("https://rickandmortyapi.com/api/character?page=" + pagina)
        .then((response) => response.json())
        .then((json) => {
          jsonData = json;
        });

      return jsonData;
    } catch (e) {
      showAlert();
    }
  };

  React.useEffect(() => {
    (async () => {
      let json = await getPessonagens();
      setPersonagens(json.results);
      setInformacoes(json.info);
      setCarregando(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {carregando && (
        <View style={styles.card}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size={150}></ActivityIndicator>
            <Text style={[styles.text, { marginTop: 20, fontSize: 25 }]}>
              Carregando...
            </Text>
          </View>
        </View>
      )}
      {!carregando && (
        <ScrollView style={{ width: "100%" }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={personagens}
            horizontal={true}
            pagingEnabled
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.image,
                  }}
                />
                <Text style={styles.text}>Nome: {item.name}</Text>
                <Text style={styles.text}>Espécie: {item.species}</Text>
                <Text style={styles.text}>Status: {item.status}</Text>
              </View>
            )}
          />
        </ScrollView>
      )}

      <Text style={styles.text}>
        Página {paginaAtual} de {informacoes.pages}{" "}
      </Text>
      <View style={styles.containerHorizontal}>
        <RectButton
          onPress={anterior}
          enabled={informacoes.prev}
          style={styles.button}
        >
          <Text>PREV</Text>
        </RectButton>
        <RectButton onPress={navigateToHome} style={styles.button}>
          <Text>HOME</Text>
        </RectButton>
        <RectButton
          onPress={proxima}
          enabled={informacoes.next}
          style={styles.button}
        >
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
    paddingVertical: 20,
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
    padding: 10,
    flex: 1,
    margin: "5vw",
    minHeight: "80vh",
    minWidth: "90vw",
    borderRadius: 10,
    flexDirection: "column",
    backgroundColor: "#FFF",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  image: {
    minWidth: "100%",
    maxHeight: "70%",
    borderRadius: 10,
    flex: 1,
  },
  text: {
    fontSize: 18,
  },
});