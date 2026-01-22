import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212", // Fundo Dark (Preto Tech)
      }}
    >
      <Text style={{ color: "#7F00FF", fontSize: 32, fontWeight: "bold", marginBottom: 10 }}>
        ⚡ Eletron
      </Text>
      <Text style={{ color: "#00E676", fontSize: 18 }}>
        Ambiente Mobile Configurado!
      </Text>
      <Text style={{ color: "#888", marginTop: 20 }}>
        Go Software House
      </Text>
    </View>
  );
}