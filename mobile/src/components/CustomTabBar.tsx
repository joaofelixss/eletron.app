import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Image, Easing, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { useRouter } from "expo-router";
import { styles } from "./CustomTabBar.styles";

// CONFIGURAÇÃO DOS BOTÕES
const TAB_ITEMS = [
  { 
    name: "home", 
    label: "Início", 
    icon: "home", 
    path: "/(tabs)/home/home", // <--- ROTA AJUSTADA (HOME DUPLO)
    badge: 0 
  },
  { 
    name: "orders", 
    label: "Pedidos", 
    icon: "cart", 
    path: "/(tabs)/orders",
    badge: 2 
  },
  { 
    name: "chat", 
    label: "Chat IA", 
    icon: "chatbubbles", 
    path: "/(tabs)/chat", 
    badge: 3 
  },
  { 
    name: "products", 
    label: "Estoque", 
    icon: "cube", 
    path: "/(tabs)/products",
    badge: 0 
  },
  { 
    name: "settings", 
    label: "Menu", 
    icon: "menu", 
    path: "/(tabs)/settings",
    badge: 0 
  },
];

export function CustomTabBar({ state, descriptors, navigation }: any) {
  const router = useRouter();
  const [showAssistant, setShowAssistant] = useState(true);
  
  // AVATAR DO GLAUBER (Homem de Óculos) 🤓
  // seed=Felix (Rosto masculino) | glasses=prescription02 (Óculos) | hair=short02 (Cabelo curto)
  const glauberAvatar = "https://api.dicebear.com/9.x/avataaars/png?seed=guix&glasses=prescription02&hair=short02&backgroundColor=c0aede";

  return (
    <View style={styles.container} pointerEvents="box-none">
      
      {/* --- ASSISTENTE FLUTUANTE --- */}
      {showAssistant && (
        <View style={styles.assistantContainer} pointerEvents="box-none">
          {/* Balão de Fala */}
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>
              <Text style={{fontWeight: 'bold'}}>Glauber:</Text> Estoque de iPhone 11 baixo! 📉
            </Text>
            <View style={styles.bubbleArrow} />
          </View>

          {/* Container do Avatar */}
          <View style={{position: 'relative'}}>
             {/* Botão de Fechar */}
             <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setShowAssistant(false)}
             >
               <Ionicons name="close" size={12} color="#FFF" />
             </TouchableOpacity>

             {/* Avatar Redondo */}
             <TouchableOpacity 
               activeOpacity={0.9} 
               onPress={() => router.push("/(tabs)/chat")}
               style={[styles.avatarButton, { overflow: 'hidden' }]} // Garante o corte redondo
             >
               <Image 
                  source={{ uri: glauberAvatar }} 
                  style={[styles.avatarImage, { borderRadius: 27 }]} // Círculo perfeito na imagem
                  resizeMode="cover"
               />
               <View style={styles.notifBadge} />
             </TouchableOpacity>
          </View>
        </View>
      )}

      {/* --- BARRA DE NAVEGAÇÃO --- */}
      <View style={styles.bar}>
        {TAB_ITEMS.map((item, index) => {
          // Verifica se o item está focado
          const isFocused = state.routes[state.index].name === item.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: state.routes.find((r: any) => r.name === item.name)?.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              router.push(item.path as any);
            }
          };

          return (
            <TabIcon 
              key={item.name} 
              item={item} 
              isFocused={isFocused} 
              onPress={onPress} 
            />
          );
        })}
      </View>
    </View>
  );
}

// ÍCONE INDIVIDUAL
const TabIcon = ({ item, isFocused, onPress }: any) => {
  const bgScale = useRef(new Animated.Value(0)).current;
  const iconTranslate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFocused) {
      Animated.parallel([
        Animated.spring(bgScale, {
          toValue: 1,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.spring(iconTranslate, {
          toValue: -2,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(bgScale, {
          toValue: 0,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(iconTranslate, {
          toValue: 0,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isFocused]);

  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={styles.tabButton} 
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        {/* Background Preto Animado */}
        <Animated.View 
          style={[
            styles.activeBackground, 
            { transform: [{ scale: bgScale }] } 
          ]} 
        />
        
        {/* Ícone */}
        <Animated.View style={{ transform: [{ translateY: iconTranslate }] }}>
          <Ionicons 
            name={isFocused ? item.icon : `${item.icon}-outline` as any} 
            size={24} 
            color={isFocused ? colors.primary : "#9CA3AF"} 
          />
        </Animated.View>

        {/* Badge de Notificação */}
        {item.badge > 0 && !isFocused && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>
              {item.badge > 9 ? "9+" : item.badge}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};