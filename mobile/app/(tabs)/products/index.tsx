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
import { api } from "../../../src/services/api";
import { useAuth } from "../../../src/context/AuthContext";

// --- CONFIGURAÇÃO DE IP ---
// COLOQUE AQUI O IP DO SEU COMPUTADOR (O MESMO QUE VOCÊ USA NA API)
const SERVER_IP = "192.168.1.9"; // <--- ⚠️ ALTERE PARA O SEU IP (veja no ipconfig)
const SERVER_PORT = "3000";

export default function ProductsScreen() {
  const router = useRouter();
  const { user } = useAuth(); 
  
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  // --- CORREÇÃO DE URL DA IMAGEM ---
  const fixImageUrl = (url: string | null) => {
    if (!url) return null;

    // Se a URL tiver 'localhost', troca pelo IP real
    if (url.includes('localhost')) {
      return url.replace('localhost', SERVER_IP);
    }
    // Se a URL vier relativa (ex: /uploads/foto.jpg), adiciona o dominio
    if (!url.startsWith('http')) {
        return `http://${SERVER_IP}:${SERVER_PORT}${url}`;
    }
    
    return url;
  };

  async function fetchProducts() {
    if (!user?.id) return;
    try {
      if (!refreshing) setLoading(true);
      const response = await api.get('/products', {
        params: { userId: user.id }
      });
      setProducts(response.data);
    } catch (error) {
      console.log("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [user]) 
  );

  const filteredProducts = products.filter((p: any) => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    (p.sku && p.sku.includes(search))
  );

  const ListHeader = () => (
    <View>
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
          <TouchableOpacity style={styles.scanButtonSmall} onPress={() => router.push("/scanner")}>
             <Ionicons name="qr-code-outline" size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.aiContainer}>
        <Ionicons name="sparkles" size={16} color="#4F46E5" />
        <Text style={styles.aiText}>
           Glauber: Você tem <Text style={{fontWeight:'bold'}}>{products.length} itens</Text> cadastrados.
        </Text>
      </View>

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

  const renderProduct = ({ item }: any) => {
    const stock = Number(item.stock || 0);
    const price = Number(item.salePrice || 0);
    const isLowStock = stock <= 3 && stock > 0;
    const isOutOfStock = stock === 0;

    // APLICA A CORREÇÃO NA URL
    const finalImageUrl = fixImageUrl(item.imageUrl);

    return (
      <TouchableOpacity 
        style={styles.productCard}
        activeOpacity={0.9}
        onPress={() => router.push(`/products/${item.id}`)} 
      >
        <View style={styles.imageContainer}>
           {finalImageUrl ? (
              <Image 
                source={{ uri: finalImageUrl }} 
                style={styles.productImage} 
                resizeMode="cover" // Garante que preencha o quadrado
              />
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Produtos</Text>
        <View style={styles.headerActions}>
           <TouchableOpacity style={styles.iconButton} onPress={fetchProducts}>
             <Ionicons name="reload" size={20} color="#374151" />
           </TouchableOpacity>
        </View>
      </View>

      {loading && !refreshing ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <ActivityIndicator size="large" color={colors.primary} />
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
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={() => {
                    setRefreshing(true);
                    fetchProducts();
                }} />
            }
            ListEmptyComponent={() => (
                <View style={{ alignItems: 'center', marginTop: 50, padding: 20 }}>
                    <Ionicons name="cube-outline" size={64} color="#E5E7EB" />
                    <Text style={{ fontSize: 18, color: '#374151', fontWeight: 'bold', marginTop: 10 }}>Estoque vazio</Text>
                </View>
            )}
          />
      )}

      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => router.push("/products/add")} 
      >
        <Ionicons name="add" size={32} color="#000" />
      </TouchableOpacity>
    </View>
  );
}