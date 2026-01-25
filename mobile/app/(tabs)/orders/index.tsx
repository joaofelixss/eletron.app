import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  FlatList 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { styles } from "./orders.styles";

// Dados Mockados
const MOCK_ORDERS = [
  {
    id: "9281",
    client: "Carlos Silva",
    device: "iPhone 13 - Troca de Tela",
    date: "24/10 • 14:30",
    price: 850.00,
    status: "analysis",
    icon: "phone-portrait-outline"
  },
  {
    id: "9282",
    client: "Mariana Souza",
    device: "Macbook Air M1 - Limpeza",
    date: "23/10 • 09:15",
    price: 350.00,
    status: "waiting_parts",
    icon: "laptop-outline"
  },
  {
    id: "9275",
    client: "Roberto Almeida",
    device: "Samsung Tab S7 - Bateria",
    date: "22/10 • 18:00",
    price: 420.00,
    status: "ready",
    icon: "tablet-portrait-outline"
  },
  {
    id: "9283",
    client: "Ana Clara",
    device: "PS5 - HDMI Quebrado",
    date: "Hoje • 08:00",
    price: 0, 
    status: "open",
    icon: "game-controller-outline"
  }
];

// Configuração Visual dos Status
const STATUS_CONFIG: any = {
  analysis: { 
    label: "Em Análise", 
    color: "#B45309", // Texto
    bg: "#FEF3C7",    // Fundo Amarelo Claro
    dot: "#F59E0B"    // Bolinha
  },
  waiting_parts: { 
    label: "Aguardando Peça", 
    color: "#B91C1C", 
    bg: "#FEE2E2", // Vermelho Claro
    dot: "#EF4444" 
  },
  ready: { 
    label: "Pronto para Retirar", 
    color: "#15803d", 
    bg: "#DCFCE7", // Verde Claro
    dot: "#22C55E" 
  },
  open: { 
    label: "Em Aberto", 
    color: "#374151", 
    bg: "#F3F4F6", // Cinza
    dot: "#9CA3AF" 
  }
};

export default function OrdersScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  const filteredOrders = MOCK_ORDERS.filter(o => {
      // Filtro de Texto
      const matchesSearch = o.client.toLowerCase().includes(search.toLowerCase()) || 
                            o.id.includes(search);
      
      // Filtro de Tab
      if (activeFilter === "Todos") return matchesSearch;
      if (activeFilter === "Em Aberto") return matchesSearch && o.status === "open";
      if (activeFilter === "Em Análise") return matchesSearch && o.status === "analysis";
      if (activeFilter === "Prontos") return matchesSearch && o.status === "ready";
      
      return matchesSearch;
  });

  const renderOrderItem = ({ item }: any) => {
    const status = STATUS_CONFIG[item.status] || STATUS_CONFIG.open;
    
    return (
      <TouchableOpacity 
         style={styles.orderCard} 
         activeOpacity={0.7}
         onPress={() => router.push(`/orders/${item.id}` as any)} // Futura tela de detalhes
      >
        {/* Header do Card */}
        <View style={styles.cardHeader}>
          <Text style={styles.osNumber}>OS #{item.id}</Text>
          <Text style={styles.osDate}>{item.date}</Text>
        </View>

        {/* Corpo do Card */}
        <View style={styles.cardBody}>
          <View style={styles.deviceIconBox}>
             <Ionicons name={item.icon as any} size={24} color="#374151" />
          </View>
          <View>
            <Text style={styles.clientName}>{item.client}</Text>
            <Text style={styles.deviceInfo}>{item.device}</Text>
          </View>
        </View>

        {/* Footer do Card */}
        <View style={styles.cardFooter}>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <View style={[styles.statusDot, { backgroundColor: status.dot }]} />
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
          
          <Text style={[styles.priceText, item.price === 0 && { color: "#9CA3AF", fontSize: 13, fontWeight: "500" }]}>
            {item.price > 0 
              ? item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) 
              : "Orçamento Pendente"}
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
        <Text style={styles.headerTitle}>Minhas Ordens</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="filter" size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar por cliente, OS ou aparelho..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* FILTERS */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {["Todos", "Em Aberto", "Em Análise", "Prontos"].map((filter) => (
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
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 50 }}>
                <Ionicons name="clipboard-outline" size={48} color="#D1D5DB" />
                <Text style={{ marginTop: 12, color: "#9CA3AF" }}>Nenhum pedido encontrado.</Text>
            </View>
        }
      />

      {/* FAB Expandido (Texto + Ícone) */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => router.push("/sales/create")} // Rota para criar
      >
        <Ionicons name="add" size={24} color="#000" />
        <Text style={styles.fabText}>Nova OS</Text>
      </TouchableOpacity>

    </View>
  );
}