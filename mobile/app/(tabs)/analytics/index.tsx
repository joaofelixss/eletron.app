import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  Alert,
  Share
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../src/constants/colors";

// IMPORTANDO OS ESTILOS
import { styles } from "./analytics.styles";

export default function AnalyticsScreen() {
  const router = useRouter();
  const [period, setPeriod] = useState("30d");

  // Mock Data
  const reportData = {
    revenue: "R$ 12.450,00",
    expenses: "R$ 8.250,00",
    profit: "R$ 4.200,00",
    margin: "33%",
    orders: 142,
    ticket: "R$ 87,00"
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Relatório Financeiro Eletron - Lucro Líquido: ${reportData.profit}`,
      });
    } catch (error) {
      Alert.alert("Erro ao compartilhar");
    }
  };

  const handlePDF = () => {
    Alert.alert("Gerando PDF...", "O arquivo 'Relatorio_Jan_2026.pdf' foi salvo nos seus documentos.");
  };

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
              <Text style={styles.aiDate}>Atualizado agora</Text>
            </View>
          </View>
          <Text style={styles.aiText}>
            Parabéns! Seu lucro subiu <Text style={{fontWeight: 'bold', color: colors.success}}>12%</Text> em relação ao mês passado. O destaque foi a venda de acessórios, que teve margem de 60%.
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
              <Text style={[styles.trendText, { color: colors.success }]}>+12%</Text>
            </View>
            <Text style={styles.cardLabel}>Lucro Líquido</Text>
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
              <Text style={styles.cardLabelSmall}>Despesas</Text>
              <Text style={styles.cardValueSmall}>{reportData.expenses}</Text>
              <View style={styles.barContainer}>
                 <View style={[styles.barFill, { width: '65%', backgroundColor: colors.danger }]} />
              </View>
            </View>
          </View>
        </View>

        {/* 3. DETALHAMENTO DE CUSTOS */}
        <Text style={styles.sectionTitle}>Entradas vs Saídas</Text>
        <View style={styles.breakdownCard}>
          
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownLeft}>
              <View style={[styles.dot, { backgroundColor: "#3B82F6" }]} />
              <Text style={styles.breakdownLabel}>Vendas de Produtos</Text>
            </View>
            <Text style={styles.breakdownValue}>R$ 9.200,00</Text>
          </View>

          <View style={styles.breakdownItem}>
            <View style={styles.breakdownLeft}>
              <View style={[styles.dot, { backgroundColor: "#8B5CF6" }]} />
              <Text style={styles.breakdownLabel}>Serviços (Mão de Obra)</Text>
            </View>
            <Text style={styles.breakdownValue}>R$ 3.250,00</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownItem}>
            <View style={styles.breakdownLeft}>
              <View style={[styles.dot, { backgroundColor: colors.danger }]} />
              <Text style={styles.breakdownLabel}>Compra de Peças</Text>
            </View>
            <Text style={styles.breakdownValue}>- R$ 5.100,00</Text>
          </View>
          
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownLeft}>
              <View style={[styles.dot, { backgroundColor: "#F59E0B" }]} />
              <Text style={styles.breakdownLabel}>Custos Fixos (Aluguel/Luz)</Text>
            </View>
            <Text style={styles.breakdownValue}>- R$ 3.150,00</Text>
          </View>

        </View>

        {/* 4. KPI SECUNDÁRIOS */}
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
      </ScrollView>

      {/* FOOTER FIXO (Agora visível!) */}
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