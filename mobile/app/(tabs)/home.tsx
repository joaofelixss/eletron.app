import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/constants/colors";
import { styles } from "./home.styles"; 

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* StatusBar Dark para fundo claro */}
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, João Felix 👋</Text>
          <Text style={styles.storeName}>Go Software House</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          {/* Ícone preto no fundo branco */}
          <Ionicons name="person" size={20} color={colors.text.main} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* CARDS */}
        <View style={styles.metricsContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="cash-outline" size={24} color={colors.success} />
              <Text style={styles.cardLabel}>Vendas Hoje</Text>
            </View>
            <Text style={styles.cardValue}>R$ 0,00</Text>
            <Text style={styles.cardSub}>0 vendas realizadas</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              {/* Ícone Amarelo (Primary) */}
              <Ionicons name="trending-up" size={24} color={colors.primary} />
              <Text style={styles.cardLabel}>Lucro Estimado</Text>
            </View>
            {/* Texto Preto para leitura fácil */}
            <Text style={styles.cardValue}>R$ 0,00</Text>
            <Text style={styles.cardSub}>Margem: 0%</Text>
          </View>
        </View>

        {/* ACTIONS */}
        <Text style={styles.sectionTitle}>Acesso Rápido</Text>
        
        <View style={styles.grid}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.iconBox, { backgroundColor: "rgba(16, 185, 129, 0.1)" }]}>
              <Ionicons name="cart" size={28} color={colors.success} />
            </View>
            <Text style={styles.actionText}>Nova Venda</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.iconBox, { backgroundColor: "rgba(255, 215, 0, 0.15)" }]}>
              <Ionicons name="cube" size={28} color={colors.palette.yellow.dark} />
            </View>
            <Text style={styles.actionText}>Estoque</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.iconBox, { backgroundColor: "rgba(255, 123, 0, 0.1)" }]}>
              <Ionicons name="sparkles" size={28} color="#FF7B00" />
            </View>
            <Text style={styles.actionText}>Smart Price</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.iconBox, { backgroundColor: "rgba(59, 130, 246, 0.1)" }]}>
              <Ionicons name="people" size={28} color={colors.info} />
            </View>
            <Text style={styles.actionText}>Clientes</Text>
          </TouchableOpacity>
        </View>

        {/* PROMO */}
        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Seja BLACK ⚫</Text>
            <Text style={styles.promoText}>Libere garantias e IA ilimitada.</Text>
          </View>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeText}>UPGRADE</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}