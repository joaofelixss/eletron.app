import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // <--- IMPORTANTE
import { colors } from "../../../../src/constants/colors";

const StatRow = ({ icon, label, value, trend, color }: any) => (
  <View style={styles.statRow}>
    <View style={styles.rowLeft}>
      <View style={[styles.iconBox, { backgroundColor: color + "15" }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text style={styles.statLabel}>{label}</Text>
    </View>

    <View style={{ alignItems: "flex-end" }}>
      <Text style={styles.statValue}>{value}</Text>
      <View style={styles.trendBox}>
        <Ionicons 
            name={trend > 0 ? "caret-up" : "caret-down"} 
            size={10} 
            color={trend > 0 ? colors.success : colors.danger} 
        />
        <Text style={[styles.trend, { color: trend > 0 ? colors.success : colors.danger }]}>
          {Math.abs(trend)}%
        </Text>
      </View>
    </View>
  </View>
);

export const PerformanceStats = () => {
  const router = useRouter(); // <--- INICIALIZANDO O ROUTER
  const [period, setPeriod] = useState("Hoje");

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Desempenho</Text>
        <View style={styles.tabs}>
          {["Hoje", "7d", "30d"].map((t) => (
            <TouchableOpacity 
              key={t} 
              onPress={() => setPeriod(t)}
              style={[styles.tab, period === t && styles.activeTab]}
            >
              <Text style={[styles.tabText, period === t && styles.activeTabText]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        
        {/* HERO SECTION (LUCRO) */}
        <View style={styles.heroSection}>
            <View>
                <Text style={styles.heroLabel}>Lucro Líquido</Text>
                <Text style={styles.heroValue}>R$ 890,00</Text>
            </View>
            <View style={styles.heroBadge}>
                <Ionicons name="trending-up" size={16} color="#15803d" />
                <Text style={styles.heroBadgeText}>+12%</Text>
            </View>
        </View>

        {/* Barra de Meta */}
        <View style={styles.goalContainer}>
            <View style={styles.goalHeader}>
                <Text style={styles.goalLabel}>Meta Diária</Text>
                <Text style={styles.goalValue}>89%</Text>
            </View>
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: "89%" }]} />
            </View>
        </View>

        <View style={styles.divider} />

        {/* LISTA DE MÉTRICAS */}
        <View style={styles.statsList}>
            <StatRow 
                icon="cart" 
                label="Pedidos" 
                value="12" 
                trend={5} 
                color="#3B82F6" 
            />
            <StatRow 
                icon="cash" 
                label="Receita Bruta" 
                value="R$ 1.240" 
                trend={12} 
                color="#F59E0B" 
            />
            <StatRow 
                icon="eye" 
                label="Visitas Loja" 
                value="45" 
                trend={-2} 
                color="#8B5CF6" 
            />
        </View>

        {/* FOOTER ACTION (ATUALIZADO) */}
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => router.push("/analytics")} // <--- NAVEGAÇÃO AQUI
        >
          <Text style={styles.linkText}>Ver Relatório Detalhado</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.text.main} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 2,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#6B7280",
  },
  activeTabText: {
    color: "#000",
    fontFamily: "Poppins_600SemiBold",
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  heroSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  heroLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#6B7280",
  },
  heroValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: colors.text.main,
    marginTop: -4,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  heroBadgeText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: "#15803d",
  },
  goalContainer: {
    marginBottom: 16,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  goalLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: "#9CA3AF",
  },
  goalValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 11,
    color: colors.primary,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 16,
  },
  statsList: {
    gap: 16,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  statLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: colors.text.body,
  },
  statValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.text.main,
  },
  trendBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  trend: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
  },
  linkButton: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  linkText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: colors.text.main,
  },
});