import React, { useEffect, useRef } from "react";
import { 
  View, 
  Platform, 
  Animated, 
  StyleSheet
} from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/constants/colors";

// --- COMPONENTE DE ÍCONE ANIMADO ---
const AnimatedIcon = ({ name, focused, color, size }: any) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (focused) {
      // Animação de "Pulo" quando selecionado
      Animated.spring(scaleValue, {
        toValue: 1.2, // Aumenta um pouco
        friction: 4,  // Efeito elástico
        useNativeDriver: true,
      }).start();
    } else {
      // Volta ao tamanho normal
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();
    }
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Só ícones, sem texto
        
        // Estilo da Barra Fixa e Clean
        tabBarStyle: {
          backgroundColor: "#FFFFFF", // Fundo Branco
          borderTopWidth: 1,          // Linha fina no topo
          borderTopColor: "#E5E7EB",  // Cinza claro suave
          height: Platform.OS === "ios" ? 90 : 70, // Altura confortável
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          paddingTop: 10,
          elevation: 0, // Remove sombra padrão do Android
          shadowOpacity: 0, // Remove sombra padrão do iOS
        },
        tabBarActiveTintColor: colors.primary, // Amarelo quando ativo
        tabBarInactiveTintColor: "#9CA3AF",    // Cinza quando inativo
      }}
    >
      {/* 1. INÍCIO (Casinha) */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIcon 
              name={focused ? "home" : "home-outline"} 
              size={26} 
              color={color} 
              focused={focused} 
            />
          ),
        }}
      />

      {/* 2. PEDIDOS (Carrinho) */}
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIcon 
              name={focused ? "cart" : "cart-outline"} 
              size={28} 
              color={color} 
              focused={focused} 
            />
          ),
        }}
      />

      {/* 3. CHAT ELETRON IA (2 Balões) */}
      {/* Agora aponta para o arquivo 'chat.tsx' que criamos */}
      <Tabs.Screen
        name="chat" 
        options={{
          title: "Chat IA",
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIcon 
              name={focused ? "chatbubbles" : "chatbubbles-outline"} 
              size={26} 
              color={color} 
              focused={focused} 
            />
          ),
        }}
      />

      {/* 4. PRODUTOS (Caixinha) */}
      <Tabs.Screen
        name="products"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIcon 
              name={focused ? "cube" : "cube-outline"} 
              size={26} 
              color={color} 
              focused={focused} 
            />
          ),
        }}
      />

      {/* 5. MENU (3 Tracinhos) -> Linkado para Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIcon 
              name={focused ? "menu" : "menu-outline"} 
              size={30} 
              color={color} 
              focused={focused} 
            />
          ),
        }}
      />

      {/* --- TELAS OCULTAS DA BARRA (href: null) --- */}
      {/* Elas existem mas não aparecem como botão na barra */}
      
      <Tabs.Screen name="clients" options={{ href: null }} />  {/* Removido visualmente */}
      <Tabs.Screen name="clients/add" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
      <Tabs.Screen name="analytics" options={{ href: null }} />
      <Tabs.Screen name="suppliers" options={{ href: null }} />
      <Tabs.Screen name="scanner" options={{ href: null }} />
      <Tabs.Screen name="trade-in/index" options={{ href: null }} />

    </Tabs>
  );
}