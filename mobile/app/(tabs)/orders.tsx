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
import { colors } from "../../src/constants/colors";
import { styles } from "./orders.styles";

// Dados Mockados (Baseados no HTML)
const MOCK_ORDERS = [
  {
    id: "9281",
    client: "Carlos Silva",
    device: "iPhone 13 - Troca de Tela",
    date: "24/10/2023 • 14:30",
    price: 850.00,
    status: "analysis", // Em Análise
    icon: "phone-portrait-outline"
  },
  {
    id: "9282",
    client: "Mariana Souza",
    device: "Macbook Air M1 - Limpeza",
    date: "23/10/2023 • 09:15",
    price: 350.00,
    status: "waiting_parts", // Aguardando Peça
    icon: "laptop-outline"
  },
  {
    id: "9275",
    client: "Roberto Almeida",
    device: "Samsung Tab S7 - Bateria",
    date: "22/10/2023 • 18:00",
    price: 420.00,
    status: "ready", // Pronto
    icon: "tablet-portrait-outline"
  },
  {
    id: "9283",
    client: "Ana Clara",
    device: "PS5 - HDMI Quebrado",
    date: "Hoje • 08:00",
    price: 0, // A definir
    status: "open", // Aberto
    icon: "game-controller-outline"
  }
];

// Configuração dos Status (Cores e Textos)
const STATUS_CONFIG: any = {
  analysis: { 
    label: "Em Análise", 
    color: "#854D0E", 
    bg: "rgba(234, 197, 79, 0.2)", 
    dot: colors.primary 
  },
  waiting_parts: { 
    label: "Aguardando Peça", 
    color: "#9A3412", 
    bg: "#FFEDD5", 
    dot: "#F97316" 
  },
  ready: { 
    label: "Pronto", 
    color: "#166534", 
    bg: "#DCFCE7", 
    dot: "#22C55E" 
  },
  open: { 
    label: "Aberto", 
    color: "#4B5563", 
    bg: "#F3F4F6", 
    dot: "#9CA3AF" 
  }
};

export default function OrdersScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  const renderOrderItem = ({ item }: any) => {
    const status = STATUS_CONFIG[item.status];
    
    return (
      <TouchableOpacity style={styles.orderCard} activeOpacity={0.7}>
        {/* Header do Card */}
        <View style={styles.cardHeader}>
          <Text style={styles.osNumber}>OS #{item.id}</Text>
          <Text style={styles.osDate}>{item.date}</Text>
        </View>

        {/* Corpo do Card */}
        <View style={styles.cardBody}>
          <View style={styles.deviceIconBox}>
             <Ionicons name={item.icon} size={24} color={colors.text.main} />
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
          
          <Text style={[styles.priceText, item.price === 0 && { color: colors.text.light, fontSize: 14 }]}>
            {item.price > 0 
              ? item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) 
              : "A definir"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.main} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pedidos e Ordens</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.text.main} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="search" size={20} color={colors.text.light} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar cliente, OS ou aparelho..."
            placeholderTextColor={colors.text.light}
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons name="options-outline" size={20} color={colors.text.light} />
        </View>
      </View>

      {/* FILTERS */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {["Todos", "Em Análise", "Aguardando Peça", "Prontos"].map((filter) => (
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
        data={MOCK_ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB (Botão Novo Pedido) */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => alert("Nova OS (Em breve)")}
      >
        <Ionicons name="add" size={32} color={colors.text.onPrimary} />
      </TouchableOpacity>

    </View>
  );
}