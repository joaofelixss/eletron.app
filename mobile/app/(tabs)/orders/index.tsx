import React, { useState, useCallback } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  FlatList,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { styles } from "./orders.styles";

// 1. IMPORTAR API
import { api } from "../../../src/services/api";

// Configuração Visual dos Status (Mantive sua lógica bonita)
const STATUS_CONFIG: any = {
  PAID: { 
    label: "Pago", 
    color: "#15803d", 
    bg: "#DCFCE7", 
    dot: "#22C55E" 
  },
  OPEN: { 
    label: "Aberto", 
    color: "#B45309",
    bg: "#FEF3C7", 
    dot: "#F59E0B" 
  },
  CANCELED: { 
    label: "Cancelado", 
    color: "#B91C1C", 
    bg: "#FEE2E2", 
    dot: "#EF4444" 
  }
};

export default function OrdersScreen() {
  const router = useRouter();
  
  // ESTADOS REAIS
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");

  // --- BUSCAR PEDIDOS ---
  async function fetchOrders() {
    try {
      if (!refreshing) setLoading(true);
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.log("Erro ao buscar pedidos:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  // --- FILTROS ---
  const filteredOrders = orders.filter((o: any) => {
      // Filtro de Texto (Busca por Nome Cliente ou Código do Pedido)
      const clientName = o.client?.name || "Consumidor Final";
      const matchesSearch = clientName.toLowerCase().includes(search.toLowerCase()) || 
                            String(o.code).includes(search);
      
      // Filtro de Tab
      if (activeFilter === "Todos") return matchesSearch;
      if (activeFilter === "Pagos") return matchesSearch && o.status === "PAID";
      if (activeFilter === "Abertos") return matchesSearch && o.status === "OPEN";
      
      return matchesSearch;
  });

  const renderOrderItem = ({ item }: any) => {
    // Definir Status
    const status = STATUS_CONFIG[item.status] || STATUS_CONFIG.OPEN;
    
    // Nome do Cliente
    const clientName = item.client?.name || "Consumidor Final";

    // Resumo dos Itens (Ex: "iPhone 13 + 2 outros")
    const firstItem = item.items?.[0]?.name || "Produto Diversos";
    const moreItems = item.items?.length > 1 ? `+ ${item.items.length - 1} outros` : "";
    const description = `${firstItem} ${moreItems}`;

    // Data Formatada
    const date = new Date(item.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
    });

    return (
      <TouchableOpacity 
         style={styles.orderCard} 
         activeOpacity={0.7}
         onPress={() => router.push(`/orders/${item.id}`)}
      >
        {/* Header do Card */}
        <View style={styles.cardHeader}>
          <Text style={styles.osNumber}>Pedido #{item.code}</Text>
          <Text style={styles.osDate}>{date}</Text>
        </View>

        {/* Corpo do Card */}
        <View style={styles.cardBody}>
          <View style={styles.deviceIconBox}>
             <Ionicons name="receipt-outline" size={24} color="#374151" />
          </View>
          <View>
            <Text style={styles.clientName}>{clientName}</Text>
            <Text style={styles.deviceInfo}>{description}</Text>
          </View>
        </View>

        {/* Footer do Card */}
        <View style={styles.cardFooter}>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <View style={[styles.statusDot, { backgroundColor: status.dot }]} />
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
          
          <Text style={styles.priceText}>
            {Number(item.total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ width: 40 }} /> 
        <Text style={styles.headerTitle}>Minhas Vendas</Text>
        <TouchableOpacity style={styles.notificationButton} onPress={fetchOrders}>
          <Ionicons name="reload" size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar por cliente ou nº pedido..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
            keyboardType="default"
          />
        </View>
      </View>

      {/* FILTERS */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {["Todos", "Pagos", "Abertos"].map((filter) => (
            <TouchableOpacity 
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* LISTA */}
      {loading && !refreshing ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ marginTop: 10, color: '#9CA3AF' }}>Carregando vendas...</Text>
          </View>
      ) : (
          <FlatList
            data={filteredOrders}
            keyExtractor={(item: any) => item.id}
            renderItem={renderOrderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={() => {
                    setRefreshing(true);
                    fetchOrders();
                }} />
            }
            ListEmptyComponent={
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <Ionicons name="cart-outline" size={48} color="#D1D5DB" />
                    <Text style={{ marginTop: 12, color: "#9CA3AF" }}>Nenhuma venda encontrada.</Text>
                </View>
            }
          />
      )}

      {/* FAB Expandido */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => router.push("/sales/create")} 
      >
        <Ionicons name="add" size={24} color="#000" />
        <Text style={styles.fabText}>Nova Venda</Text>
      </TouchableOpacity>

    </View>
  );
}