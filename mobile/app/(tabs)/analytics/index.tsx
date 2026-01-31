import React, { useState, useEffect, useMemo } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  Alert,
  Share,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../src/constants/colors";

// IMPORTANDO OS ESTILOS
import { styles } from "./analytics.styles";

// API E AUTH
import { api } from "../../../src/services/api";
import { useAuth } from "../../../src/context/AuthContext";

export default function AnalyticsScreen() {
  const router = useRouter();
  const { user } = useAuth(); // <--- 1. PEGAR USUÁRIO

  const [period, setPeriod] = useState("30 dias");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 2. BUSCAR DADOS REAIS ---
  useEffect(() => {
    async function fetchData() {
      if (!user?.id) return;

      try {
        // Filtra por userId
        const response = await api.get('/orders', {
            params: { userId: user.id }
        });
        setOrders(response.data);
      } catch (error) {
        console.log("Erro analytics:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (user?.id) fetchData();
  }, [user]);

  // --- 3. CÁLCULOS (Engine de Dados) ---
  const reportData = useMemo(() => {
    const now = new Date();
    
    // Filtrar Pedidos pela Data
    const filtered = orders.filter(o => {
        const d = new Date(o.createdAt);
        
        // Função auxiliar para zerar horas e comparar apenas datas
        const isSameDay = (d1: Date, d2: Date) => 
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();

        if (period === "Hoje") {
            return isSameDay(d, now);
        }
        if (period === "7 dias") {
            const date7 = new Date(now); 
            date7.setDate(now.getDate() - 7);
            return d >= date7;
        }
        if (period === "30 dias") {
            const date30 = new Date(now); 
            date30.setDate(now.getDate() - 30);
            return d >= date30;
        }
        if (period === "Mês Atual") {
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }
        return true;
    });

    // Somatórios
    const revenue = filtered.reduce((acc, o) => acc + Number(o.total), 0);
    const count = filtered.length;
    
    // Simulação de Custos e Lucros (Baseado em margem média de 33% de lucro líquido)
    const profitMargin = 0.33; 
    const profit = revenue * profitMargin;
    const expenses = revenue - profit;
    const ticket = count > 0 ? revenue / count : 0;

    return {
        revenueRaw: revenue,
        revenue: revenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
        expenses: expenses.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
        profit: profit.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
        margin: "33%",
        orders: count,
        ticket: ticket.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
        growth: "+12%" // Mock de crescimento
    };
  }, [orders, period]);

  // --- AÇÕES ---
  const handleShare = async () => {
    try {
      await Share.share({
        message: `📊 *Relatório Eletron (${period})*\n\nReceita: ${reportData.revenue}\nLucro Líquido: ${reportData.profit}\nPedidos: ${reportData.orders}`,
      });
    } catch (error) {
      Alert.alert("Erro ao compartilhar");
    }
  };

  const handlePDF = () => {
    Alert.alert("Gerando PDF...", `Relatório financeiro de ${period} enviado para impressão.`);
  };

  if (loading) {
      return (
          <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
              <ActivityIndicator size="large" color={colors.primary} />
          </View>
      );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.main} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Relatório Detalhado</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* FILTROS DE DATA */}
        <View style={styles.filterRow}>
          {["Hoje", "7 dias", "30 dias", "Mês Atual"].map((p) => (
            <TouchableOpacity 
              key={p} 
              style={[styles.filterChip, period === p && styles.filterChipActive]}
              onPress={() => setPeriod(p)}
            >
              <Text style={[styles.filterText, period === p && styles.filterTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 1. ANÁLISE IA (Glauber) */}
        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <Image 
              source={{ uri: "https://api.dicebear.com/9.x/avataaars/png?seed=Glauber&size=100&backgroundColor=c0aede" }} 
              style={styles.aiAvatar} 
            />
            <View>
              <Text style={styles.aiTitle}>Análise do Glauber</Text>
              <Text style={styles.aiDate}>Baseado em {reportData.orders} vendas</Text>
            </View>
          </View>
          <Text style={styles.aiText}>
            {reportData.revenueRaw > 0 
                ? `O fluxo está ótimo! Você faturou ${reportData.revenue} neste período. A margem de lucro se mantém saudável em torno de 33%.`
                : "Ainda não temos dados suficientes neste período para uma análise detalhada. Tente mudar o filtro."
            }
          </Text>
        </View>

        {/* 2. BIG NUMBERS (Resumo) */}
        <View style={styles.summaryGrid}>
          {/* Card Lucro (Destaque) */}
          <View style={[styles.card, styles.profitCard]}>
            <View style={styles.cardIconRow}>
              <View style={[styles.iconBox, { backgroundColor: "#DCFCE7" }]}>
                <Ionicons name="trending-up" size={20} color={colors.success} />
              </View>
              <Text style={[styles.trendText, { color: colors.success }]}>{reportData.growth}</Text>
            </View>
            <Text style={styles.cardLabel}>Lucro Líquido (Est.)</Text>
            <Text style={styles.cardValue}>{reportData.profit}</Text>
          </View>

          {/* Grid Menor */}
          <View style={styles.smallGrid}>
            <View style={styles.card}>
              <Text style={styles.cardLabelSmall}>Receita</Text>
              <Text style={styles.cardValueSmall}>{reportData.revenue}</Text>
              <View style={styles.barContainer}>
                  <View style={[styles.barFill, { width: '100%', backgroundColor: '#3B82F6' }]} />
              </View>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardLabelSmall}>Despesas (Est.)</Text>
              <Text style={styles.cardValueSmall}>{reportData.expenses}</Text>
              <View style={styles.barContainer}>
                  <View style={[styles.barFill, { width: '67%', backgroundColor: colors.danger }]} />
              </View>
            </View>
          </View>
        </View>

        {/* 3. KPI SECUNDÁRIOS */}
        <View style={styles.kpiRow}>
          <View style={styles.kpiItem}>
            <Ionicons name="cart-outline" size={20} color="#666" />
            <Text style={styles.kpiValue}>{reportData.orders}</Text>
            <Text style={styles.kpiLabel}>Pedidos</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.kpiItem}>
            <Ionicons name="wallet-outline" size={20} color="#666" />
            <Text style={styles.kpiValue}>{reportData.ticket}</Text>
            <Text style={styles.kpiLabel}>Ticket Médio</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.kpiItem}>
            <Ionicons name="pie-chart-outline" size={20} color="#666" />
            <Text style={styles.kpiValue}>{reportData.margin}</Text>
            <Text style={styles.kpiLabel}>Margem</Text>
          </View>
        </View>

        {/* 4. DETALHAMENTO SIMPLIFICADO */}
        <Text style={styles.sectionTitle}>Resumo Financeiro</Text>
        <View style={styles.breakdownCard}>
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownLeft}>
              <View style={[styles.dot, { backgroundColor: "#3B82F6" }]} />
              <Text style={styles.breakdownLabel}>Vendas Totais</Text>
            </View>
            <Text style={styles.breakdownValue}>{reportData.revenue}</Text>
          </View>

          <View style={styles.breakdownItem}>
            <View style={styles.breakdownLeft}>
              <View style={[styles.dot, { backgroundColor: colors.danger }]} />
              <Text style={styles.breakdownLabel}>Custo Operacional (67%)</Text>
            </View>
            <Text style={styles.breakdownValue}>- {reportData.expenses}</Text>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.breakdownItem}>
            <View style={styles.breakdownLeft}>
              <View style={[styles.dot, { backgroundColor: colors.success }]} />
              <Text style={[styles.breakdownLabel, { fontWeight: 'bold' }]}>Resultado Líquido</Text>
            </View>
            <Text style={[styles.breakdownValue, { color: colors.success, fontWeight: 'bold' }]}>
                {reportData.profit}
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* FOOTER FIXO */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleShare}>
          <Ionicons name="share-social-outline" size={20} color={colors.text.main} />
          <Text style={styles.secondaryButtonText}>Compartilhar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handlePDF}>
          <Ionicons name="document-text-outline" size={20} color="#000" />
          <Text style={styles.primaryButtonText}>Baixar PDF</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}