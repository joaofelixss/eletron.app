import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  Alert,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { salesStyles as styles } from "./sales.styles";

// Mock de Produtos
const PRODUCTS = [
  { id: "1", name: "iPhone 13 Pro", price: 4200, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-graphite-select?wid=470&hei=556&fmt=png-alpha" },
  { id: "2", name: "Capa MagSafe", price: 150, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MM293?wid=572&hei=572&fmt=jpeg&qlt=95" },
  { id: "3", name: "Película 3D", price: 50, image: null },
  { id: "4", name: "Carregador 20W", price: 120, image: null },
];

export default function CreateOrderScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState("Consumidor Final");

  // Adicionar ao Carrinho
  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Calcular Total
  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleFinish = () => {
    if (cart.length === 0) {
      Alert.alert("Carrinho Vazio", "Adicione produtos para continuar.");
      return;
    }
    // Lógica de salvar...
    Alert.alert("Pedido Criado!", `Total: R$ ${total.toFixed(2)}`, [
        { text: "OK", onPress: () => router.push("/(tabs)/orders") }
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Pedido</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="qr-code-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* 1. SELEÇÃO DE CLIENTE */}
        <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Cliente</Text>
            <TouchableOpacity style={styles.clientRow} onPress={() => Alert.alert("Selecionar Cliente")}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                    <Ionicons name="person-circle" size={24} color="#9CA3AF" />
                    <Text style={styles.clientName}>{selectedClient}</Text>
                </View>
                <Text style={styles.changeClientText}>Alterar</Text>
            </TouchableOpacity>
        </View>

        {/* 2. BUSCA PRODUTOS */}
        <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
            <View style={{ 
                flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', 
                borderRadius: 12, paddingHorizontal: 12, height: 48, borderWidth: 1, borderColor: '#E5E7EB' 
            }}>
                <Ionicons name="search" size={20} color="#9CA3AF" />
                <TextInput 
                    style={{ flex: 1, marginLeft: 8 }} 
                    placeholder="Buscar produto..."
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
        </View>

        {/* 3. GRID DE PRODUTOS */}
        <View style={styles.gridContainer}>
            {PRODUCTS.map((product) => (
                <TouchableOpacity 
                    key={product.id} 
                    style={styles.productCardSmall}
                    onPress={() => addToCart(product)}
                >
                    {product.image ? (
                        <Image source={{ uri: product.image }} style={styles.prodImageSmall} />
                    ) : (
                        <View style={[styles.prodImageSmall, { backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' }]}>
                            <Ionicons name="cube-outline" size={32} color="#D1D5DB" />
                        </View>
                    )}
                    <Text style={styles.prodName} numberOfLines={2}>{product.name}</Text>
                    <Text style={styles.prodPrice}>
                        R$ {product.price.toFixed(2)}
                    </Text>
                    <View style={styles.addButtonSmall}>
                        <Ionicons name="add" size={18} color="#000" />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
        
        {/* 4. LISTA DE ITENS NO CARRINHO (RESUMO) */}
        {cart.length > 0 && (
            <View style={[styles.sectionCard, { marginTop: 12 }]}>
                <Text style={styles.sectionTitle}>Itens no Pedido ({cart.length})</Text>
                {cart.map((item) => (
                    <View key={item.id} style={styles.itemRow}>
                        <View style={styles.qtyBadge}>
                            <Text style={styles.qtyText}>{item.qty}x</Text>
                        </View>
                        <View style={styles.itemInfo}>
                            <Text style={{ fontFamily: "Poppins_500Medium" }}>{item.name}</Text>
                            <Text style={{ fontSize: 12, color: "#6B7280" }}>Unit: R$ {item.price}</Text>
                        </View>
                        <Text style={styles.itemPrice}>
                            R$ {(item.price * item.qty).toFixed(2)}
                        </Text>
                    </View>
                ))}
            </View>
        )}

      </ScrollView>

      {/* FOOTER FLUTUANTE */}
      <View style={styles.footer}>
        <View>
            <Text style={styles.totalLabel}>Total a Pagar</Text>
            <Text style={styles.totalValue}>
                {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleFinish}>
            <Text style={styles.checkoutText}>Finalizar</Text>
            <Ionicons name="arrow-forward" size={18} color="#000" />
        </TouchableOpacity>
      </View>

    </View>
  );
}