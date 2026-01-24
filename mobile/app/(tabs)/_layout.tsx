import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/constants/colors";
import { Platform, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Esconde o texto, deixa só o ícone (mais moderno)
        
        // Estilo da Barra
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0, // Remove a linha feia em cima
          height: Platform.OS === "ios" ? 85 : 70, // Altura confortável
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          paddingTop: 10,
          
          // Sombra para destacar do fundo preto
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
        },
        tabBarActiveTintColor: colors.primary, // Cor do ícone selecionado (Roxo)
        tabBarInactiveTintColor: "#555", // Cor do ícone apagado
      }}
    >
      {/* Botão HOME */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 5 }}>
              <Ionicons name={focused ? "home" : "home-outline"} size={28} color={color} />
            </View>
          ),
        }}
      />

      {/* Botão PRODUTOS */}
      <Tabs.Screen
        name="products"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 5 }}>
              <Ionicons name={focused ? "cube" : "cube-outline"} size={28} color={color} />
            </View>
          ),
        }}
      />

     {/* Botão CONFIGURAÇÕES (Settings) */}
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 5 }}>
              <Ionicons name={focused ? "settings" : "settings-outline"} size={28} color={color} />
            </View>
          ),
        }}
      />

      {/* Botão ORDENS (Novo) */}
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 5 }}>
              <Ionicons name={focused ? "list" : "list-outline"} size={28} color={color} />
            </View>
          ),
        }}
      />

      {/* Botão CLIENTES */}
      <Tabs.Screen
        name="clients"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 5 }}>
              <Ionicons name={focused ? "people" : "people-outline"} size={28} color={color} />
            </View>
          ),
        }}
      />

      {/* Botão DADOS (Analytics) */}
      <Tabs.Screen
        name="analytics"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 5 }}>
              <Ionicons name={focused ? "stats-chart" : "stats-chart-outline"} size={28} color={color} />
            </View>
          ),
        }}
      />

      {/* Botão PERFIL */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 5 }}>
              <Ionicons name={focused ? "person" : "person-outline"} size={28} color={color} />
            </View>
          ),
        }}
      />

      {/* Botão FORNECEDORES */}
      <Tabs.Screen
        name="suppliers"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 5 }}>
              <Ionicons name={focused ? "business" : "business-outline"} size={28} color={color} />
            </View>
          ),
        }}
      />

    </Tabs>
  );
}