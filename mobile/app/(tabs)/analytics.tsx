import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/constants/colors";
import { styles } from "./analytics.styles";

// Dados Mockados para o Gráfico (Dias da Semana)
const CHART_DATA = [
  { day: "Seg", value: 30 },
  { day: "Ter", value: 50 },
  { day: "Qua", value: 75 }, // Pico
  { day: "Qui", value: 40 },
  { day: "Sex", value: 60 },
  { day: "Sáb", value: 80 },
  { day: "Dom", value: 25 },
];

export default function AnalyticsScreen() {
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoBox}>
             <Ionicons name="flash" size={20} color={colors.text.main} />
          </View>
          <Text style={styles.title}>Dados e Insights</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.text.muted} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* 1. SUMMARY CARDS (GRID) */}
        <View style={styles.summaryGrid}>
          {/* Card Preto (Faturamento) */}
          <View style={styles.darkCard}>
            <Ionicons name="stats-chart" size={60} color="#FFF" style={styles.chartIconOp} />
            <View>
              <Text style={styles.cardLabelLight}>Vendas Totais</Text>
              <Text style={styles.cardValueLight}>R$ 142.3k</Text>
              <View style={styles.trendBadge}>
                <Ionicons name="arrow-up" size={12} color={colors.primary} />
                <Text style={styles.trendText}>12% vs mês anterior</Text>
              </View>
            </View>
          </View>

          {/* Card Branco (Pedidos) */}
          <View style={styles.lightCard}>
            <View style={styles.lightCardHeader}>
              <Text style={styles.cardLabelDark}>Pedidos</Text>
              <View style={styles.iconBox}>
                <Ionicons name="bag-handle" size={16} color={colors.text.main} />
              </View>
            </View>
            <View>
              <Text style={styles.cardValueDark}>356</Text>
              <Text style={styles.cardSubDark}>Últimos 30 dias</Text>
            </View>
          </View>
        </View>

        {/* 2. SALES CHART */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.sectionTitle}>Desempenho de Vendas</Text>
              <Text style={styles.sectionSubtitle}>Receita por semana</Text>
            </View>
            <TouchableOpacity style={styles.filterBadge}>
              <Text style={styles.filterText}>Este Mês</Text>
            </TouchableOpacity>
          </View>

          {/* O Gráfico Customizado */}
          <View style={styles.chartArea}>
            {CHART_DATA.map((item, index) => (
              <View key={index} style={styles.chartBarContainer}>
                {/* A Barra */}
                <View style={[styles.barTrack, { height: 120 }]}> 
                  <View style={[styles.barFill, { height: `${item.value}%` }]} />
                </View>
                {/* O Dia */}
                <Text style={styles.barLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 3. TOP PRODUCTS */}
        <View style={styles.productsHeader}>
          <Text style={styles.sectionTitle}>Produtos em Alta</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Ver tudo</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Produtos */}
        <View>
          {/* Item 1 */}
          <View style={styles.productRow}>
            <View style={styles.productLeft}>
              <View style={styles.productIcon}>
                <Ionicons name="phone-portrait-outline" size={20} color={colors.text.light} />
              </View>
              <View>
                <Text style={styles.productName}>iPhone 15 Pro</Text>
                <Text style={styles.productSales}>124 vendas</Text>
              </View>
            </View>
            <View style={styles.productRight}>
              <Text style={styles.productRevenue}>R$ 98.5k</Text>
              <View style={[styles.growthBadge, { backgroundColor: "#DCFCE7" }]}>
                <Text style={[styles.growthText, { color: "#166534" }]}>+15%</Text>
              </View>
            </View>
          </View>

          {/* Item 2 */}
          <View style={styles.productRow}>
            <View style={styles.productLeft}>
              <View style={styles.productIcon}>
                <Ionicons name="laptop-outline" size={20} color={colors.text.light} />
              </View>
              <View>
                <Text style={styles.productName}>MacBook Air M2</Text>
                <Text style={styles.productSales}>89 vendas</Text>
              </View>
            </View>
            <View style={styles.productRight}>
              <Text style={styles.productRevenue}>R$ 75.2k</Text>
              <View style={[styles.growthBadge, { backgroundColor: "#DCFCE7" }]}>
                <Text style={[styles.growthText, { color: "#166534" }]}>+8%</Text>
              </View>
            </View>
          </View>

          {/* Item 3 */}
          <View style={styles.productRow}>
            <View style={styles.productLeft}>
              <View style={styles.productIcon}>
                <Ionicons name="headset-outline" size={20} color={colors.text.light} />
              </View>
              <View>
                <Text style={styles.productName}>AirPods Max</Text>
                <Text style={styles.productSales}>54 vendas</Text>
              </View>
            </View>
            <View style={styles.productRight}>
              <Text style={styles.productRevenue}>R$ 29.7k</Text>
              <View style={[styles.growthBadge, { backgroundColor: "#FEE2E2" }]}>
                <Text style={[styles.growthText, { color: "#991B1B" }]}>-2%</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* 4. IA INSIGHT (Floating) */}
      <View style={styles.aiFloatingContainer}>
        {/* Balão */}
        <View style={styles.aiBubble}>
          <View style={styles.aiHeader}>
            <Ionicons name="flash" size={12} color={colors.primary} />
            <Text style={styles.aiTitle}>Dica do Eletron</Text>
          </View>
          <Text style={styles.aiText}>
            Você vendeu <Text style={styles.aiHighlight}>20% mais iPhones</Text> este mês!
          </Text>
        </View>

        {/* Avatar Robô */}
        <View style={styles.aiAvatar}>
           <Ionicons name="happy-outline" size={28} color={colors.text.main} />
        </View>
      </View>

    </View>
  );
}