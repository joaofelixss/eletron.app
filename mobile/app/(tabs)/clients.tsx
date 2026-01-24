import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  FlatList,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { styles } from "./clients.styles";

// Dados Mockados (Baseados no HTML)
const MOCK_CLIENTS = [
  {
    id: "1",
    name: "João Silva",
    phone: "(11) 99876-5432",
    repairs: 3,
    initials: "JS",
    image: null
  },
  {
    id: "2",
    name: "Maria Oliveira",
    phone: "(21) 98765-4321",
    repairs: 1,
    initials: "MO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" // Foto Exemplo
  },
  {
    id: "3",
    name: "Carlos Santos",
    phone: "(31) 91234-5678",
    repairs: 12, // Cliente VIP
    initials: "CS",
    image: null
  },
  {
    id: "4",
    name: "Pedro Costa",
    phone: "(41) 99111-2222",
    repairs: 0,
    initials: "PC",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" // Foto Exemplo
  },
  {
    id: "5",
    name: "Ana Lima",
    phone: "(51) 98888-7777",
    repairs: 5,
    initials: "AL",
    image: null
  }
];

export default function ClientsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // Filtra clientes pelo nome ou telefone
  const filteredClients = MOCK_CLIENTS.filter(client => 
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.phone.includes(search)
  );

  const renderClient = ({ item }: any) => {
    // Se tiver muitos reparos (>2), destaca com amarelo (VIP)
    const isVip = item.repairs > 2;

    return (
      <TouchableOpacity 
        style={styles.clientCard} 
        activeOpacity={0.7}
        onPress={() => alert(`Detalhes de ${item.name}`)}
      >
        {/* Avatar: Imagem ou Iniciais */}
        <View style={styles.avatarContainer}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>{item.initials}</Text>
          )}
        </View>

        {/* Informações */}
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{item.name}</Text>
          <Text style={styles.clientPhone}>{item.phone}</Text>
        </View>

        {/* Badge de Reparos */}
        <View style={[styles.badge, isVip ? styles.badgeHigh : styles.badgeLow]}>
          <Ionicons 
            name="construct" 
            size={12} 
            color={isVip ? "#854D0E" : colors.text.muted} 
          />
          <Text style={[styles.badgeText, isVip ? styles.badgeTextHigh : styles.badgeTextLow]}>
            {item.repairs} {item.repairs === 1 ? "Reparo" : "Reparos"}
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
        <Text style={styles.title}>Clientes</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color={colors.text.main} />
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="search" size={20} color={colors.text.light} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar nome ou telefone..."
            placeholderTextColor={colors.text.light}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* LIST HEADER */}
      <View style={styles.listHeader}>
        <Text style={styles.listCount}>Todos ({filteredClients.length})</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filtrar</Text>
          <Ionicons name="filter" size={16} color={colors.text.main} />
        </TouchableOpacity>
      </View>

      {/* LISTA */}
      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id}
        renderItem={renderClient}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB (Adicionar Cliente) */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => router.push("/clients/add")}
      >
        <Ionicons name="add" size={32} color={colors.text.onPrimary} />
      </TouchableOpacity>
    </View>
  );
}