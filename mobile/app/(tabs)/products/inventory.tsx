import React, { useState, useCallback, useMemo } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  FlatList, 
  Image,
  ActivityIndicator,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { styles } from "./inventory.styles";

// 1. IMPORTAR API E AUTH
import { api } from "../../../src/services/api";
import { useAuth } from "../../../src/context/AuthContext";

export default function InventoryScreen() {
  const router = useRouter();
  const { user } = useAuth(); // <--- 2. PEGAR O USUÁRIO
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- BUSCAR DADOS DO MONGODB ---
  async function fetchInventory() {
    if (!user?.id) return; // Proteção: só busca se tiver usuário

    try {
      // 3. ENVIA O USERID NO FILTRO
      const response = await api.get('/products', {
        params: { userId: user.id }
      });
      setProducts(response.data);
    } catch (error) {
      console.log("Erro ao carregar estoque:", error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchInventory();
    }, [user]) // <--- Atualiza se o usuário mudar
  );

  // --- FUNÇÃO PARA ALTERAR ESTOQUE (+ / -) ---
  const handleStockChange = async (id: string, currentStock: number, change: number) => {
    const newStock = currentStock + change;
    if (newStock < 0) return; 

    // Atualização Otimista (Visual muda na hora)
    setProducts(prev => prev.map(item => 
        item.id === id ? { ...item, stock: newStock } : item
    ));

    try {
        await api.patch(`/products/${id}`, { stock: newStock });
    } catch (error) {
        Alert.alert("Erro", "Falha ao atualizar estoque.");
        fetchInventory(); // Reverte se der erro
    }
  };

  // --- CÁLCULOS DINÂMICOS ---
  const dashboardData = useMemo(() => {
    return products.reduce((acc, item) => {
        const stock = Number(item.stock || 0);
        const cost = Number(item.costPrice || 0);
        
        acc.totalValue += stock * cost;
        acc.totalItems += stock;
        if (stock <= 3) acc.lowStockCount += 1;
        
        return acc;
    }, { totalValue: 0, totalItems: 0, lowStockCount: 0 });
  }, [products]);

  const renderItem = ({ item }: any) => {
    const stock = Number(item.stock || 0);
    const cost = Number(item.costPrice || 0);
    const isLow = stock <= 3;

    return (
      <TouchableOpacity 
        style={styles.itemCard}
        activeOpacity={0.9}
        onPress={() => router.push(`/products/${item.id}`)}
      >
        {/* Imagem + Indicador */}
        <View>
             {item.imageUrl ? (
                <Image 
                    source={{ uri: item.imageUrl }} 
                    style={styles.itemImage} 
                    resizeMode="cover"
                />
             ) : (
                <View style={[styles.itemImage, { backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' }]}>
                    <Ionicons name="image-outline" size={24} color="#D1D5DB" />
                </View>
             )}
             {isLow && <View style={styles.lowStockIndicator} />}
        </View>

        {/* Info Técnica */}
        <View style={styles.itemInfo}>
            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.itemSku}>{item.sku || "Sem SKU"}</Text>
            <Text style={styles.itemCost}>
                Custo: {cost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </Text>
        </View>

        {/* Controle Rápido */}
        <View style={styles.stockControl}>
            <Text style={[styles.stockValue, { color: isLow ? colors.danger : "#000" }]}>
                {stock}
            </Text>
            
            <View style={styles.stepper}>
                <TouchableOpacity 
                    style={styles.stepBtn}
                    onPress={() => handleStockChange(item.id, stock, -1)}
                >
                    <Ionicons name="remove" size={14} color="#000" />
                </TouchableOpacity>
                <View style={{ width: 8 }} />
                <TouchableOpacity 
                    style={styles.stepBtn}
                    onPress={() => handleStockChange(item.id, stock, 1)}
                >
                    <Ionicons name="add" size={14} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#18181B" />

      {/* DASHBOARD HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Gestão de Estoque</Text>
            <TouchableOpacity onPress={fetchInventory}>
                <Ionicons name="reload" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>

        <View style={styles.dashRow}>
            {/* Card Valor */}
            <View style={styles.dashCard}>
                <Text style={styles.dashLabel}>Valor em Estoque (Custo)</Text>
                <Text style={styles.dashValue}>
                    {loading ? "..." : dashboardData.totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </Text>
                <Text style={styles.dashSub}>Capital parado</Text>
            </View>

            {/* Card Quantidade */}
            <View style={styles.dashCard}>
                <Text style={styles.dashLabel}>Total de Itens</Text>
                <Text style={styles.dashValue}>
                    {loading ? "..." : `${dashboardData.totalItems} un.`}
                </Text>
                <Text style={[styles.dashSub, { color: dashboardData.lowStockCount > 0 ? colors.danger : '#10B981' }]}>
                    {dashboardData.lowStockCount} itens baixos
                </Text>
            </View>
        </View>
      </View>

      {/* LISTA DE ITENS */}
      {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ marginTop: 10, color: '#666' }}>Calculando inventário...</Text>
          </View>
      ) : (
          <FlatList 
            data={products}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Listagem de Produtos</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Ionicons name="filter" size={14} color="#6B7280" />
                        <Text style={{ fontSize: 12, color: "#6B7280" }}>Filtrar</Text>
                    </TouchableOpacity>
                </View>
            }
            ListEmptyComponent={() => (
                <View style={{ padding: 40, alignItems: 'center' }}>
                    <Text style={{ color: '#999' }}>Nenhum produto cadastrado.</Text>
                </View>
            )}
          />
      )}

    </View>
  );
}