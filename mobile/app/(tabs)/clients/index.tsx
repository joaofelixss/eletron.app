import React, { useState, useCallback } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  FlatList,
  Image,
  Alert,
  Linking,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { styles } from "./clients.styles";

// 1. IMPORTAR API E AUTH
import { api } from "../../../src/services/api";
import { useAuth } from "../../../src/context/AuthContext";

// Função para gerar cor de fundo baseada no nome
const getAvatarColor = (name: string) => {
  if (!name) return "#9CA3AF";
  const colors = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// Função para pegar as iniciais (Ex: João Silva -> JS)
const getInitials = (name: string) => {
    if (!name) return "?";
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

export default function ClientsScreen() {
  const router = useRouter();
  const { user } = useAuth(); // <--- 2. PEGAR O USUÁRIO
  
  // ESTADOS REAIS
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  // --- BUSCAR CLIENTES DO BACKEND ---
  async function fetchClients() {
    if (!user?.id) return; // Proteção

    try {
      if (!refreshing) setLoading(true);
      
      // 3. ENVIA O USERID NO FILTRO
      const response = await api.get('/clients', {
        params: { userId: user.id }
      });
      
      setClients(response.data);
    } catch (error) {
      console.log("Erro ao buscar clientes:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchClients();
    }, [user]) // <--- Atualiza se o usuário mudar
  );

  // Filtro Local
  const filteredClients = clients.filter((client: any) => 
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    (client.phone && client.phone.includes(search))
  );

  const handleWhatsApp = (phone: string) => {
    if (!phone) return Alert.alert("Erro", "Cliente sem telefone cadastrado.");
    
    // Remove tudo que não for número
    const cleanPhone = phone.replace(/\D/g, "");
    const url = `whatsapp://send?phone=55${cleanPhone}`;
    
    Linking.openURL(url).catch(() => {
      Alert.alert("Erro", "WhatsApp não está instalado.");
    });
  };

  const renderClient = ({ item }: any) => {
    const avatarBg = getAvatarColor(item.name);
    const initials = getInitials(item.name);

    return (
      <TouchableOpacity 
        style={styles.clientCard} 
        activeOpacity={0.7}
        // Futuramente faremos a tela de detalhes do cliente
        onPress={() => router.push(`/clients/${item.id}`)}
      >
        {/* Avatar Dinâmico */}
        <View style={[styles.avatarContainer, { backgroundColor: item.image ? 'transparent' : avatarBg }]}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>{initials}</Text>
          )}
        </View>

        {/* Informações */}
        <View style={styles.clientInfo}>
          <Text style={styles.clientName} numberOfLines={1}>{item.name}</Text>
          
          <View style={styles.clientMetaRow}>
            <Text style={styles.clientPhone}>
               {/* Formatação simples se tiver número */}
               {item.phone || "Sem telefone"}
            </Text>
          </View>

          {/* Tags (Baseado no CPF ou Notes por enquanto) */}
          <View style={styles.tagsRow}>
             {/* Exemplo: Se tiver CPF, mostra tag de Cadastro Completo */}
             {item.cpf ? (
                <View style={[styles.tag, { backgroundColor: '#DBEAFE' }]}>
                    <Text style={[styles.tagText, { color: '#1E40AF' }]}>Cadastrado</Text>
                </View>
             ) : (
                <View style={[styles.tag, { backgroundColor: '#F3F4F6' }]}>
                    <Text style={[styles.tagText, { color: '#6B7280' }]}>Simples</Text>
                </View>
             )}
          </View>
        </View>

        {/* Botão WhatsApp Direto */}
        <TouchableOpacity 
          style={styles.whatsappButton}
          onPress={() => handleWhatsApp(item.phone)}
        >
          <Ionicons name="logo-whatsapp" size={24} color="#15803d" />
        </TouchableOpacity>

      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Meus Clientes</Text>
        <TouchableOpacity style={styles.iconButton} onPress={fetchClients}>
              <Ionicons name="reload" size={20} color={colors.text.main} />
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar por nome ou telefone..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
               <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* LISTA */}
      {loading && !refreshing ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ marginTop: 10, color: '#9CA3AF' }}>Buscando clientes...</Text>
          </View>
      ) : (
          <FlatList
            data={filteredClients}
            keyExtractor={(item: any) => item.id}
            renderItem={renderClient}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={() => {
                    setRefreshing(true);
                    fetchClients();
                }} />
            }
            ListHeaderComponent={
                <Text style={styles.sectionTitle}>
                {filteredClients.length} {filteredClients.length === 1 ? 'cliente encontrado' : 'clientes encontrados'}
                </Text>
            }
            ListEmptyComponent={() => (
                <View style={{ alignItems: 'center', marginTop: 50, padding: 20 }}>
                    <Ionicons name="people-outline" size={64} color="#E5E7EB" />
                    <Text style={{ fontSize: 18, color: '#374151', fontWeight: 'bold', marginTop: 10 }}>Nenhum cliente</Text>
                    <Text style={{ textAlign: 'center', color: '#9CA3AF' }}>Toque no + para cadastrar seu primeiro cliente.</Text>
                </View>
            )}
          />
      )}

      {/* FAB (Adicionar) */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => router.push("/clients/add")}
      >
        <Ionicons name="add" size={32} color="#000" />
      </TouchableOpacity>
    </View>
  );
}