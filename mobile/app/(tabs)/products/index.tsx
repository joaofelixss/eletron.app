import React, { useState, useCallback } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { styles } from "./products.styles";

// 1. IMPORTAR A API
import { api } from "../../../src/services/api";

export default function ProductsScreen() {
  const router = useRouter();
  
  // --- ESTADOS REAIS ---
  const [products, setProducts] = useState([]); // Dados do Banco
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  // --- FUNÇÃO DE BUSCAR DO BACKEND ---
  async function fetchProducts() {
    try {
      // Se não for refresh (puxar pra baixo), mostra loading tela cheia
      if (!refreshing) setLoading(true);
      
      const response = await api.get('/products');
      setProducts(response.data);
      
    } catch (error) {
      console.log("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // Recarrega sempre que a tela ganha foco (ex: voltou do cadastro)
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  // Lógica de Filtro Local (Busca por nome ou SKU)
  const filteredProducts = products.filter((p: any) => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    (p.sku && p.sku.includes(search))
  );

  // --- COMPONENTES VISUAIS ---

  const ListHeader = () => (
    <View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar produto..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity 
             style={styles.scanButtonSmall}
             onPress={() => router.push("/scanner")}
          >
             <Ionicons name="qr-code-outline" size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* AI Insight */}
      <View style={styles.aiContainer}>
        <Ionicons name="sparkles" size={16} color="#4F46E5" />
        <Text style={styles.aiText}>
           Glauber: Você tem <Text style={{fontWeight:'bold'}}>{products.length} itens</Text> cadastrados. Mantenha o estoque em dia!
        </Text>
      </View>

      {/* Filtros */}
      <View style={styles.filterScroll}>
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          data={["Todos", "Apple", "Samsung", "Acessórios", "Promoção"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.filterChip, activeFilter === item && styles.filterChipActive]}
              onPress={() => setActiveFilter(item)}
            >
              <Text style={[styles.filterText, activeFilter === item && styles.filterTextActive]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );

  // Card do Produto (Adaptado para MongoDB)
  const renderProduct = ({ item }: any) => {
    // CORREÇÃO 1: Usar item.id em vez de item._id
    // CORREÇÃO 2: Garantir que stock e price sejam números
    const stock = Number(item.stock || 0);
    const price = Number(item.salePrice || 0);

    const isLowStock = stock <= 3 && stock > 0;
    const isOutOfStock = stock === 0;

    return (
      <TouchableOpacity 
        style={styles.productCard}
        activeOpacity={0.9}
        // AQUI ESTÁ A MÁGICA: Navegar para a tela de detalhes passando o ID
        onPress={() => router.push(`/products/${item.id}`)} 
      >
        <View style={styles.imageContainer}>
           {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
           ) : (
              <View style={[styles.productImage, { backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' }]}>
                 <Ionicons name="image-outline" size={32} color="#D1D5DB" />
              </View>
           )}
           
           <View style={[
              styles.stockBadge, 
              isLowStock && styles.lowStockBadge,
              isOutOfStock && { backgroundColor: '#1F2937' }
           ]}>
              <Text style={styles.stockText}>
                {isOutOfStock ? "ESGOTADO" : `${stock} un.`}
              </Text>
           </View>
        </View>

        <View style={styles.infoContainer}>
           <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
           <View style={styles.priceRow}>
              <Text style={styles.price}>
                {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Text>
              <TouchableOpacity>
                 <Ionicons name="add-circle" size={24} color={colors.primary} />
              </TouchableOpacity>
           </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Produtos</Text>
        <View style={styles.headerActions}>
           <TouchableOpacity style={styles.iconButton} onPress={fetchProducts}>
             <Ionicons name="reload" size={20} color="#374151" />
           </TouchableOpacity>
        </View>
      </View>

      {/* LISTAGEM REAL */}
      {loading && !refreshing ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <ActivityIndicator size="large" color={colors.primary} />
             <Text style={{ marginTop: 10, color: '#9CA3AF' }}>Carregando estoque...</Text>
          </View>
      ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item: any) => item.id}
            renderItem={renderProduct}
            numColumns={2} 
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={ListHeader}
            showsVerticalScrollIndicator={false}
            // Pull to Refresh
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={() => {
                    setRefreshing(true);
                    fetchProducts();
                }} />
            }
            // Estado Vazio
            ListEmptyComponent={() => (
                <View style={{ alignItems: 'center', marginTop: 50, padding: 20 }}>
                    <Ionicons name="cube-outline" size={64} color="#E5E7EB" />
                    <Text style={{ fontSize: 18, color: '#374151', fontWeight: 'bold', marginTop: 10 }}>Estoque vazio</Text>
                    <Text style={{ textAlign: 'center', color: '#9CA3AF' }}>Cadastre seu primeiro produto clicando no botão + abaixo.</Text>
                </View>
            )}
          />
      )}

      {/* FAB (Botão Flutuante) */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        // Ajustei a rota para o seu arquivo de adicionar
        onPress={() => router.push("/products/add")} 
      >
        <Ionicons name="add" size={32} color="#000" />
      </TouchableOpacity>

    </View>
  );
}