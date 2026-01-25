import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../src/constants/colors";

const StatRow = ({ label, value, trend }: any) => (
  <View style={styles.statRow}>
    <Text style={styles.statLabel}>{label}</Text>
    <View style={{ alignItems: "flex-end" }}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={[styles.trend, { color: trend > 0 ? colors.success : colors.danger }]}>
        {trend > 0 ? "+" : ""}{trend}%
      </Text>
    </View>
  </View>
);

export const PerformanceStats = () => {
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
        <StatRow label="Pedidos" value="12" trend={5} />
        <View style={styles.divider} />
        <StatRow label="Receita" value="R$ 1.240" trend={12} />
        <View style={styles.divider} />
        <StatRow label="Visitas" value="45" trend={-2} />
        <View style={styles.divider} />
        
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Lucro Líquido</Text>
          <Text style={styles.totalValue}>R$ 890,00</Text>
        </View>

        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Ver Relatório Completo</Text>
          <Ionicons name="arrow-forward" size={14} color={colors.primary} />
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
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  statLabel: {
    fontFamily: "Poppins_500Medium",
    color: colors.text.body,
  },
  statValue: {
    fontFamily: "Poppins_600SemiBold",
    color: colors.text.main,
  },
  trend: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  totalLabel: {
    fontFamily: "Poppins_700Bold",
    color: colors.text.main,
  },
  totalValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: colors.success,
  },
  linkButton: {
    marginTop: 16,
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