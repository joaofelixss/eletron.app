import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  Switch,
  Alert,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { styles } from "./styles";

// Dados Mockados
const INITIAL_PRODUCTS = [
  {
    id: "1",
    name: "Smartphone X Pro",
    sku: "SKU: SM-001 • 128GB",
    price: "R$ 4.200,00",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1645552346276",
    visible: true,
  },
  {
    id: "2",
    name: "Headphone Noise Cancel",
    sku: "SKU: AU-552 • Preto",
    price: "R$ 899,90",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200",
    visible: true,
  },
  {
    id: "3",
    name: "Smart Watch V2",
    sku: "SKU: SW-202 • Branco",
    price: "R$ 299,00",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200",
    visible: false, // Começa desativado
  },
  {
    id: "4",
    name: "Laptop Ultra Slim",
    sku: "SKU: LP-900 • Prata",
    price: "R$ 5.400,00",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=200",
    visible: true,
  },
  {
    id: "5",
    name: "Speaker Bass",
    sku: "SKU: SP-101 • Azul",
    price: "R$ 350,00",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=200",
    visible: true,
  }
];

export default function CatalogScreen() {
  const router = useRouter();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");

  const toggleProduct = (id: string) => {
    setProducts(current =>
      current.map(item =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const handleCopyLink = () => {
    // Aqui usaria Clipboard.setStringAsync
    Alert.alert("Sucesso", "Link copiado para a área de transferência!");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.main} />
        </TouchableOpacity>
        <Text style={styles.title}>Configurar Catálogo</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={20} color={colors.text.main} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* LINK SECTION */}
        <View style={styles.linkSection}>
          <Text style={styles.sectionTitle}>Divulgue sua loja</Text>
          <Text style={styles.sectionDescription}>
            Compartilhe este link com seus clientes para que eles vejam seu estoque online.
          </Text>
          
          <Text style={styles.label}>Link do seu Catálogo</Text>
          <View style={styles.linkInputContainer}>
            <View style={styles.linkIcon}>
              <Ionicons name="link" size={20} color={colors.primary} />
            </View>
            <TextInput 
              style={styles.linkText}
              value="https://catalogo.eletron/loja-do-joao"
              editable={false}
              selectTextOnFocus
            />
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyLink}>
              <Ionicons name="copy-outline" size={20} color={colors.text.main} />
            </TouchableOpacity>
          </View>
        </View>

        {/* LIST HEADER */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Itens Visíveis</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={16} color={colors.text.body} />
            <Text style={styles.filterText}>Filtrar</Text>
          </TouchableOpacity>
        </View>

        {/* PRODUCT LIST */}
        <View style={styles.listContainer}>
          {/* Busca interna */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={colors.text.light} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Buscar produto..."
              placeholderTextColor={colors.text.light}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {products.map((item) => (
            <View 
              key={item.id} 
              style={[styles.productCard, !item.visible && styles.inactiveCard]}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              
              <View style={styles.productInfo}>
                <Text style={[styles.productName, !item.visible && styles.strikethrough]}>
                  {item.name}
                </Text>
                <Text style={styles.productSku}>{item.sku}</Text>
                <Text style={[styles.productPrice, !item.visible && { color: colors.text.light }]}>
                  {item.price}
                </Text>
              </View>

              <Switch
                value={item.visible}
                onValueChange={() => toggleProduct(item.id)}
                trackColor={{ false: "#E5E7EB", true: colors.primary }}
                thumbColor={Platform.OS === 'ios' ? '#FFF' : (item.visible ? "#FFF" : "#F4F3F4")}
                // iOS scale adjustment
                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
              />
            </View>
          ))}
        </View>

      </ScrollView>

      {/* FOOTER ACTION */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.viewButton} activeOpacity={0.8}>
          <Text style={styles.viewButtonText}>Visualizar Catálogo</Text>
          <Ionicons name="eye" size={20} color={colors.text.onPrimary} />
        </TouchableOpacity>
      </View>

    </View>
  );
}