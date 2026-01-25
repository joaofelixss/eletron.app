import React from "react";
import { View, ScrollView, StatusBar, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";

// IMPORTANDO OS COMPONENTES NOVOS
import { QuickActions } from "./home/components/QuickActions";
import { ModulesGrid } from "./home/components/ModulesGrid";
import { ShareStoreCard } from "./home/components/ShareStoreCard";
import { PerformanceStats } from "./home/components/PerformanceStats";
import { PlanStatusCard } from "./home/components/PlanStatusCard";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* 1. HEADER (Perfil + Notificações) */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
            <Image 
              source={{ uri: "https://ui-avatars.com/api/?name=Joao+Silva&background=F2C94C&color=000" }} 
              style={styles.avatar} 
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.welcome}>Olá, João 👋</Text>
            <Text style={styles.storeName}>Eletron HQ</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.notifButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.text.main} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  welcome: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: colors.text.body,
  },
  storeName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },
  notifButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  notifDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
    borderWidth: 1,
    borderColor: colors.surface,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});