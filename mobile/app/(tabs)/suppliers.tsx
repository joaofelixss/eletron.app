import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { styles } from "./suppliers.styles";

export default function SuppliersScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      {/* StatusBar Branca para contrastar com fundo escuro */}
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Gestão de Fornecedores</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* 1. SEARCH BAR */}
        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput 
              style={styles.searchInput}
              placeholder="Buscar fornecedor ou peça..."
              placeholderTextColor="#666"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* 2. AI INSIGHT CARD */}
        <View style={styles.insightContainer}>
          <View style={styles.insightCard}>
            <View style={styles.insightIconBox}>
              <Ionicons name="sparkles" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.insightTitle}>Dica da IA Eletron</Text>
              <Text style={styles.insightText}>
                O preço das <Text style={styles.insightHighlight}>Telas OLED iPhone 12</Text> caiu <Text style={styles.insightGreen}>5%</Text> esta semana na Distribuidora Tech.
              </Text>
            </View>
          </View>
        </View>

        {/* 3. FILTERS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {["Todos", "Telas", "Baterias", "Carcaças", "Cabos"].map((filter) => (
            <TouchableOpacity 
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 4. COMPARISON SECTION HEADER */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Comparativo: iPhone 12 OLED</Text>
          <TouchableOpacity style={styles.filterLink}>
            <Text style={styles.filterLinkText}>Filtrar</Text>
            <Ionicons name="filter" size={12} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* 5. SUPPLIERS LIST */}
        <View style={styles.listContent}>
          
          {/* Card 1: Melhor Preço */}
          <View style={[styles.supplierCard, styles.bestPriceCard]}>
            <View style={styles.bestPriceBadge}>
              <Text style={styles.bestPriceText}>Melhor Preço</Text>
            </View>
            
            <View style={styles.cardTop}>
              <View style={styles.supplierInfo}>
                <View style={styles.avatarBox}><Text style={styles.avatarText}>DT</Text></View>
                <View>
                  <Text style={styles.supplierName}>Distribuidora Tech</Text>
                  <Text style={styles.deliveryTime}>Entrega: 2 dias úteis</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardBottom}>
              <View>
                <Text style={styles.lastBuyText}>Última compra: 10/10</Text>
                <View style={styles.stockBadge}>
                  <Text style={styles.stockText}>Estoque Alto</Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceValue}>R$ 280,00</Text>
                <View style={styles.trendContainer}>
                  <Ionicons name="trending-down" size={12} color="#4ADE80" />
                  <Text style={styles.trendText}>-5% vs média</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Card 2: Padrão */}
          <View style={styles.supplierCard}>
            <View style={styles.cardTop}>
              <View style={styles.supplierInfo}>
                <View style={[styles.avatarBox, { backgroundColor: "#555" }]}>
                   <Text style={[styles.avatarText, { color: "#FFF" }]}>II</Text>
                </View>
                <View>
                  <Text style={styles.supplierName}>Importadora iPhone</Text>
                  <Text style={styles.deliveryTime}>Entrega: 1 dia útil</Text>
                </View>
              </View>
              <Text style={[styles.priceValue, { fontSize: 20, color: "#CCC" }]}>R$ 295,50</Text>
            </View>
            <View style={[styles.cardBottom, { marginTop: 4 }]}>
              <Text style={styles.lastBuyText}>Última compra: 2 dias atrás</Text>
              <TouchableOpacity><Text style={styles.linkText}>Ver Histórico</Text></TouchableOpacity>
            </View>
          </View>

          {/* Card 3: Padrão */}
          <View style={styles.supplierCard}>
            <View style={styles.cardTop}>
              <View style={styles.supplierInfo}>
                <View style={[styles.avatarBox, { backgroundColor: "#555" }]}>
                   <Text style={[styles.avatarText, { color: "#FFF" }]}>MP</Text>
                </View>
                <View>
                  <Text style={styles.supplierName}>Mega Peças SP</Text>
                  <Text style={styles.deliveryTime}>Entrega: 3-5 dias</Text>
                </View>
              </View>
              <Text style={[styles.priceValue, { fontSize: 20, color: "#CCC" }]}>R$ 310,00</Text>
            </View>
            <View style={[styles.cardBottom, { marginTop: 4 }]}>
              <Text style={styles.lastBuyText}>Nunca comprou aqui</Text>
              <TouchableOpacity><Text style={styles.linkText}>Ver Detalhes</Text></TouchableOpacity>
            </View>
          </View>

        </View>

        <Text style={styles.disclaimer}>
          Os preços são atualizados automaticamente pela IA a cada 24 horas.
        </Text>

      </ScrollView>
    </View>
  );
}