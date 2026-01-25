import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  FlatList,
  Image,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { styles } from "./products.styles";

// MOCK DATA
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "iPhone 13 Pro 128GB Grafite",
    price: 4200.00,
    stock: 5,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1645552346276"
  },
  {
    id: "2",
    name: "Samsung Galaxy S21 5G Violeta",
    price: 2899.00,
    stock: 2, // Baixo
    image: "https://images.samsung.com/is/image/samsung/p6pim/br/galaxy-s21/gallery/br-galaxy-s21-5g-g991-sm-g991bzvgzk-thumb-368338803"
  },
  {
    id: "3",
    name: "MacBook Air M1 Cinza Espacial",
    price: 6450.00,
    stock: 8,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000"
  },
  {
    id: "4",
    name: "Xiaomi Redmi Note 11",
    price: 1150.00,
    stock: 15,
    image: "https://i01.appmifile.com/webfile/globalimg/products/pc/redmi-note-11/grey.png"
  },
  {
    id: "5",
    name: "AirPods Pro (2ª Geração)",
    price: 1800.00,
    stock: 0, // Sem Estoque
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361"
  },
  {
    id: "6",
    name: "Capa iPhone 13 MagSafe",
    price: 150.00,
    stock: 42,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MM293?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1629905625000"
  }
];

export default function ProductsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Componente do Cabeçalho da Lista (Search + Filters + AI)
  const ListHeader = () => (
    <View>
      {/* Search Bar Integrada com Scanner */}
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
           Glauber: Notei que o <Text style={{fontWeight:'bold'}}>iPhone 13</Text> é o mais buscado hoje. Que tal uma promo?
        </Text>
      </View>

      {/* Filtros Horizontais */}
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

  // Renderização do Card (Grid Item)
  const renderProduct = ({ item }: any) => {
    const isLowStock = item.stock <= 3 && item.stock > 0;
    const isOutOfStock = item.stock === 0;

    return (
      <TouchableOpacity 
        style={styles.productCard}
        activeOpacity={0.9}
        onPress={() => router.push(`/products/${item.id}` as any)} // Futura tela de detalhes
      >
        {/* Imagem + Badges */}
        <View style={styles.imageContainer}>
           <Image source={{ uri: item.image }} style={styles.productImage} />
           
           {/* Badge de Estoque */}
           <View style={[
              styles.stockBadge, 
              isLowStock && styles.lowStockBadge,
              isOutOfStock && { backgroundColor: '#1F2937' }
           ]}>
              <Text style={styles.stockText}>
                {isOutOfStock ? "ESGOTADO" : `${item.stock} un.`}
              </Text>
           </View>

           {/* Botão de Ação Rápida (Divulgar) */}
           <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => router.push("/marketing")}
           >
              <Ionicons name="share-social" size={14} color="#374151" />
           </TouchableOpacity>
        </View>

        {/* Informações */}
        <View style={styles.infoContainer}>
           <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
           
           <View style={styles.priceRow}>
              <Text style={styles.price}>
                {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Text>
              
              {/* Botãozinho de + (Adicionar ao Pedido) */}
              <TouchableOpacity onPress={() => router.push("/sales/create")}>
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

      {/* HEADER FIXO */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Produtos</Text>
        <View style={styles.headerActions}>
           <TouchableOpacity style={styles.iconButton}>
             <Ionicons name="filter-outline" size={20} color="#374151" />
           </TouchableOpacity>
        </View>
      </View>

      {/* LISTA EM GRID */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2} // <--- A MÁGICA DO GRID
        columnWrapperStyle={{ justifyContent: 'space-between' }} // Espaçamento entre colunas
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB (Adicionar Produto) */}
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