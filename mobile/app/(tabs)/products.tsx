import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { styles } from "./products.styles";

// Dados Mockados (Simulando o HTML)
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "iPhone 13 Pro",
    variant: "128GB • Grafite",
    price: 4200.00,
    stock: 5,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1645552346276"
  },
  {
    id: "2",
    name: "Samsung Galaxy S21",
    variant: "256GB • Violeta",
    price: 2899.00,
    stock: 2, // Baixo Estoque
    image: "https://images.samsung.com/is/image/samsung/p6pim/br/galaxy-s21/gallery/br-galaxy-s21-5g-g991-sm-g991bzvgzk-thumb-368338803"
  },
  {
    id: "3",
    name: "iPhone 12 Mini",
    variant: "64GB • Azul",
    price: 2450.00,
    stock: 8,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-blue-select-2020?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1604343706000"
  },
  {
    id: "4",
    name: "Xiaomi Redmi Note 11",
    variant: "128GB • Cinza",
    price: 1150.00,
    stock: 15,
    image: "https://i01.appmifile.com/webfile/globalimg/products/pc/redmi-note-11/grey.png"
  }
];

export default function ProductsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Estoque</Text>
          <Text style={styles.headerSubtitle}>Gestão de Inventário</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="notifications-outline" size={20} color={colors.text.main} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => alert("Criar Novo Produto (Em breve)")}
          >
            <Ionicons name="add" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* 1. SCANNER BUTTON */}
        <View style={styles.scanSection}>
          <TouchableOpacity style={styles.scanButton} activeOpacity={0.8}>
            <Ionicons name="qr-code-outline" size={24} color={colors.text.onPrimary} />
            <Text style={styles.scanButtonText}>Escanear QR Code</Text>
          </TouchableOpacity>
        </View>

        {/* 2. SEARCH BAR */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar smartphone, modelo ou IMEI..."
              placeholderTextColor="#9CA3AF"
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity>
              <Ionicons name="filter" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. AI INSIGHT */}
        <View style={styles.aiInsight}>
          <Ionicons name="sparkles" size={16} color={colors.primary} />
          <Text style={styles.aiText}>
            Insight IA: <Text style={styles.aiHighlight}>Alta procura por iPhone 13 Pro</Text>
          </Text>
        </View>

        {/* 4. FILTERS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === "Todos" && styles.filterChipActive]}
            onPress={() => setActiveFilter("Todos")}
          >
            <Text style={[styles.filterText, activeFilter === "Todos" && styles.filterTextActive]}>Todos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterChip, styles.warningChip]}
            onPress={() => setActiveFilter("Baixo")}
          >
            <Ionicons name="alert-circle" size={16} color={colors.warning} />
            <Text style={[styles.filterText, { color: colors.warning }]}>Baixo Estoque</Text>
          </TouchableOpacity>

          {["Apple", "Samsung", "Xiaomi"].map(brand => (
            <TouchableOpacity 
              key={brand}
              style={[styles.filterChip, activeFilter === brand && styles.filterChipActive]}
              onPress={() => setActiveFilter(brand)}
            >
              <Text style={[styles.filterText, activeFilter === brand && styles.filterTextActive]}>{brand}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 5. PRODUCTS LIST */}
        <View style={styles.productsList}>
          {MOCK_PRODUCTS.map((item) => {
            const isLowStock = item.stock <= 3;
            return (
              <View key={item.id} style={[styles.productCard, isLowStock && styles.lowStockCard]}>
                {isLowStock && <View style={styles.lowStockStrip} />}
                
                <View style={styles.productHeader}>
                  <Image source={{ uri: item.image }} style={styles.productImage} />
                  
                  <View style={styles.productInfo}>
                    <View style={styles.titleRow}>
                      <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                      <View style={[styles.stockBadge, isLowStock && styles.lowStockBadge]}>
                        <Text style={[styles.stockText, isLowStock && styles.lowStockText]}>
                          {item.stock} un
                        </Text>
                      </View>
                    </View>
                    
                    <Text style={styles.productVariant}>{item.variant}</Text>
                    <Text style={styles.productPrice}>
                      {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </Text>
                  </View>
                </View>

                <View style={styles.actionsRow}>
                  <TouchableOpacity style={[styles.actionButton, styles.sellButton]}>
                    <Text style={styles.sellText}>Vender</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
                    <Text style={styles.editText}>Editar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}