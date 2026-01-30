import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { salesStyles as styles } from "./sales.styles";

// IMPORTAR API
import { api } from "../../src/services/api";

export default function CreateOrderScreen() {
  const router = useRouter();
  
  // --- ESTADOS ---
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  
  // Estados de Carregamento
  const [loading, setLoading] = useState(true);

  // 1. CARREGAR PRODUTOS
  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.log("Erro ao carregar produtos", error);
        Alert.alert("Erro", "Falha de conexão com o servidor.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtro de Produtos (Busca)
  const filteredProducts = products.filter(p => 
     p.name.toLowerCase().includes(search.toLowerCase()) || 
     (p.sku && p.sku.includes(search))
  );

  // --- LÓGICA DO CARRINHO ---

  const addToCart = (product: any) => {
    // Validação de Estoque
    if (product.stock <= 0) {
        Alert.alert("Esgotado", "Este produto não tem estoque disponível.");
        return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      
      if (existing) {
        // Verifica se tem estoque para adicionar mais um
        if (existing.qty + 1 > product.stock) {
            Alert.alert("Limite Atingido", `Só restam ${product.stock} unidades.`);
            return prev;
        }
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      
      // Adiciona novo item
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
      setCart(prev => prev.reduce((acc, item) => {
          if (item.id === productId) {
              if (item.qty > 1) {
                  acc.push({ ...item, qty: item.qty - 1 });
              }
              // Se for 1, não dá push (remove)
          } else {
              acc.push(item);
          }
          return acc;
      }, [] as any[]));
  };

  // Calcular Total
  const total = cart.reduce((acc, item) => acc + (Number(item.salePrice) * item.qty), 0);

  // 2. AVANÇAR PARA REVISÃO
  const handleNextStep = () => {
    if (cart.length === 0) {
      Alert.alert("Carrinho Vazio", "Adicione produtos para continuar.");
      return;
    }

    // NAVEGA PARA A TELA DE REVISÃO
    router.push({
        pathname: "/sales/review",
        params: { cart: JSON.stringify(cart) }
    });
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
        
        {/* 1. BUSCA PRODUTOS */}
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

        {/* 2. GRID DE PRODUTOS */}
        {loading ? (
            <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />
        ) : (
            <View style={styles.gridContainer}>
                {filteredProducts.slice(0, 8).map((product) => (
                    <TouchableOpacity 
                        key={product.id} 
                        style={[styles.productCardSmall, product.stock <= 0 && { opacity: 0.6 }]}
                        onPress={() => addToCart(product)}
                    >
                        {product.imageUrl ? (
                            <Image source={{ uri: product.imageUrl }} style={styles.prodImageSmall} />
                        ) : (
                            <View style={[styles.prodImageSmall, { backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' }]}>
                                <Ionicons name="cube-outline" size={32} color="#D1D5DB" />
                            </View>
                        )}
                        <Text style={styles.prodName} numberOfLines={2}>{product.name}</Text>
                        <Text style={styles.prodPrice}>
                            R$ {Number(product.salePrice).toFixed(2)}
                        </Text>
                        
                        {/* Indicador de Estoque */}
                        {product.stock <= 0 ? (
                             <Text style={{ fontSize: 10, color: '#EF4444', marginTop: 2, fontWeight: 'bold' }}>ESGOTADO</Text>
                        ) : (
                             <Text style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>Restam: {product.stock}</Text>
                        )}

                        <View style={styles.addButtonSmall}>
                             <Ionicons name="add" size={18} color="#000" />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        )}
        
        {/* 3. LISTA DE ITENS NO CARRINHO (RESUMO) */}
        {cart.length > 0 && (
            <View style={[styles.sectionCard, { marginTop: 12, marginBottom: 100 }]}>
                <Text style={styles.sectionTitle}>Carrinho ({cart.reduce((acc, i) => acc + i.qty, 0)} itens)</Text>
                {cart.map((item) => (
                    <View key={item.id} style={styles.itemRow}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                            {/* Botão Remover */}
                            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                <Ionicons name="remove-circle-outline" size={24} color="#EF4444" />
                            </TouchableOpacity>
                            
                            <View style={styles.qtyBadge}>
                                <Text style={styles.qtyText}>{item.qty}x</Text>
                            </View>
                            
                            <View style={styles.itemInfo}>
                                <Text style={{ fontFamily: "Poppins_500Medium" }}>{item.name}</Text>
                                <Text style={{ fontSize: 12, color: "#6B7280" }}>
                                    Unit: R$ {Number(item.salePrice).toFixed(2)}
                                </Text>
                            </View>
                        </View>
                        
                        <Text style={styles.itemPrice}>
                            R$ {(Number(item.salePrice) * item.qty).toFixed(2)}
                        </Text>
                    </View>
                ))}
            </View>
        )}

      </ScrollView>

      {/* FOOTER FLUTUANTE */}
      <View style={styles.footer}>
        <View>
            <Text style={styles.totalLabel}>Total Parcial</Text>
            <Text style={styles.totalValue}>
                {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </Text>
        </View>
        <TouchableOpacity 
            style={[styles.checkoutButton, { opacity: cart.length === 0 ? 0.5 : 1 }]} 
            onPress={handleNextStep}
            disabled={cart.length === 0}
        >
            <Text style={styles.checkoutText}>Avançar</Text>
            <Ionicons name="arrow-forward" size={18} color="#000" />
        </TouchableOpacity>
      </View>

    </View>
  );
}