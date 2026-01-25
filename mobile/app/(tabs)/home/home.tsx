import React from "react";
import { View, ScrollView, StatusBar, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../src/constants/colors";

// IMPORTANDO ESTILOS SEPARADOS
import { styles } from "./home.styles";

// IMPORTANDO COMPONENTES
import { QuickActions } from "./components/QuickActions";
import { ModulesGrid } from "./components/ModulesGrid";
import { ShareStoreCard } from "./components/ShareStoreCard";
import { PerformanceStats } from "./components/PerformanceStats";
import { PlanStatusCard } from "./components/PlanStatusCard";

export default function HomeScreen() {
  const router = useRouter();
  
  // O estado 'showAssistant' foi removido daqui porque agora ele vive na CustomTabBar

  // URL do Avatar do Usuário (DiceBear)
  const userAvatar = "https://api.dicebear.com/9.x/avataaars/png?seed=Joao&backgroundColor=b6e3f4";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* 1. HEADER (Perfil + Notificações) */}
      <View style={styles.header}>
        {/* Perfil */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
            <Image 
              source={{ uri: userAvatar }} 
              style={styles.avatar} 
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.welcome}>Olá, João 👋</Text>
            <Text style={styles.storeName}>Eletron HQ</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* BANNER DO PLANO */}
          <TouchableOpacity 
            style={styles.planBadge}
            onPress={() => router.push("/subscription/plans")}
          >
            <Ionicons name="star" size={10} color="#B45309" />
            <Text style={styles.planText}>START</Text>
          </TouchableOpacity>

          {/* Botão Notificações */}
          <TouchableOpacity 
            style={styles.notifButton}
            onPress={() => router.push("/notifications")}
          >
            <Ionicons name="notifications-outline" size={24} color={colors.text.main} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* 2. AÇÕES RÁPIDAS (+ Pedido / + Cliente) */}
        <QuickActions />

        {/* 3. GRID DE MÓDULOS (6 Cards) */}
        <ModulesGrid />

        {/* 4. DESTAQUE: COMPARTILHAR LOJA */}
        <ShareStoreCard />

        {/* 5. DASHBOARD FINANCEIRO */}
        <PerformanceStats />

        {/* 6. STATUS DO PLANO & UPSELL */}
        <PlanStatusCard />

      </ScrollView>

      {/* O Assistente Flutuante foi removido daqui para não duplicar.
         Ele agora aparece automaticamente através do _layout.tsx (CustomTabBar).
      */}

    </View>
  );
}