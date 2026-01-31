import React, { useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { colors } from "../../../../src/constants/colors";
import { styles } from "./PerformanceStats.styles"; 

// API E AUTH
import { api } from "../../../../src/services/api";
import { useAuth } from "../../../../src/context/AuthContext";

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
      
      {/* Trend Mockado por enquanto */}
      <View style={styles.trendBox}>
        <Ionicons 
            name={trend >= 0 ? "caret-up" : "caret-down"} 
            size={10} 
            color={trend >= 0 ? colors.success : colors.danger} 
        />
        <Text style={[styles.trend, { color: trend >= 0 ? colors.success : colors.danger }]}>
          {Math.abs(trend)}%
        </Text>
      </View>
    </View>
  </View>
);

export const PerformanceStats = () => {
  const router = useRouter();
  const { user } = useAuth(); // <--- 1. PEGAR USUÁRIO

  const [period, setPeriod] = useState("Hoje");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- BUSCAR DADOS DE VENDAS ---
  const fetchSalesData = async () => {
    if (!user?.id) return;

    try {
      // 2. FILTRAR POR USERID
      const response = await api.get('/orders', {
          params: { userId: user.id }
      });
      setOrders(response.data);
    } catch (error) {
      console.log("Erro stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSalesData();
    }, [user])
  );

  // --- CÁLCULOS DINÂMICOS ---
  const stats = useMemo(() => {
    const now = new Date();
    
    // Filtrar pedidos pela data selecionada
    const filteredOrders = orders.filter((o: any) => {
        const orderDate = new Date(o.createdAt);
        
        // Zera as horas para comparar datas corretamente
        const isSameDay = (d1: Date, d2: Date) => 
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();

        if (period === "Hoje") {
            return isSameDay(orderDate, now);
        }
        if (period === "7d") {
            const sevenDaysAgo = new Date(now);
            sevenDaysAgo.setDate(now.getDate() - 7);
            return orderDate >= sevenDaysAgo;
        }
        if (period === "30d") {
            const thirtyDaysAgo = new Date(now);
            thirtyDaysAgo.setDate(now.getDate() - 30);
            return orderDate >= thirtyDaysAgo;
        }
        return true;
    });

    // Calcular Métricas
    const revenue = filteredOrders.reduce((acc, o) => acc + Number(o.total), 0);
    const count = filteredOrders.length;
    
    // Ticket Médio
    const avgTicket = count > 0 ? revenue / count : 0;

    // Simulação de Lucro (Ex: 30% de margem fixa por enquanto)
    const estimatedProfit = revenue * 0.30; 

    return { revenue, count, avgTicket, estimatedProfit };
  }, [orders, period]);


  return (
    <View style={styles.container}>
      
      {/* HEADER DO CARD */}
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
        
        {/* HERO SECTION (RECEITA) */}
        <View style={styles.heroSection}>
            <View>
                <Text style={styles.heroLabel}>
                    {period === "Hoje" ? "Vendas de Hoje" : `Vendas (${period})`}
                </Text>
                {loading ? (
                    <ActivityIndicator color={colors.primary} style={{ marginTop: 5, alignSelf: 'flex-start' }} />
                ) : (
                    <Text style={styles.heroValue}>
                        {stats.revenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </Text>
                )}
            </View>
            <View style={styles.heroBadge}>
                <Ionicons name="trending-up" size={16} color="#15803d" />
                <Text style={styles.heroBadgeText}>+12%</Text>
            </View>
        </View>

        {/* Barra de Meta (Fixa por enquanto) */}
        <View style={styles.goalContainer}>
            <View style={styles.goalHeader}>
                <Text style={styles.goalLabel}>Meta do Período</Text>
                <Text style={styles.goalValue}>65%</Text>
            </View>
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: "65%" }]} />
            </View>
        </View>

        <View style={styles.divider} />

        {/* LISTA DE MÉTRICAS */}
        <View style={styles.statsList}>
            <StatRow 
                icon="cart" 
                label="Pedidos Realizados" 
                value={stats.count.toString()} 
                trend={10} 
                color="#3B82F6" 
            />
            <StatRow 
                icon="cash" 
                label="Lucro Estimado (30%)" 
                value={stats.estimatedProfit.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} 
                trend={5} 
                color="#10B981" 
            />
            <StatRow 
                icon="pricetag" 
                label="Ticket Médio" 
                value={stats.avgTicket.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} 
                trend={-2} 
                color="#8B5CF6" 
            />
        </View>

        {/* FOOTER ACTION */}
        <TouchableOpacity 
          style={styles.linkButton}
          // Se ainda não tiver a rota analytics, pode apontar para orders ou deixar vazio
          onPress={() => router.push("/(tabs)/analytics")} 
        >
          <Text style={styles.linkText}>Ver Relatório Detalhado</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.text.main} />
        </TouchableOpacity>
      </View>
    </View>
  );
};