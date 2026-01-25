import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  FlatList,
  Image,
  Alert,
  Linking
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { styles } from "./clients.styles";

// Função para gerar cor de fundo baseada no nome (fica consistente)
const getAvatarColor = (name: string) => {
  const colors = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const MOCK_CLIENTS = [
  {
    id: "1",
    name: "João Silva",
    phone: "11998765432",
    repairs: 3,
    initials: "JS",
    lastVisit: "2 dias atrás",
    vip: true,
    image: null
  },
  {
    id: "2",
    name: "Maria Oliveira",
    phone: "21987654321",
    repairs: 1,
    initials: "MO",
    lastVisit: "1 mês atrás",
    vip: false,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
  },
  {
    id: "3",
    name: "Carlos Santos",
    phone: "31912345678",
    repairs: 12,
    initials: "CS",
    lastVisit: "Hoje",
    vip: true,
    image: null
  },
  {
    id: "4",
    name: "Pedro Costa",
    phone: "41991112222",
    repairs: 0,
    initials: "PC",
    lastVisit: "Nunca",
    vip: false,
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100"
  },
  {
    id: "5",
    name: "Ana Lima",
    phone: "51988887777",
    repairs: 5,
    initials: "AL",
    lastVisit: "Ontem",
    vip: false,
    image: null
  }
];

export default function ClientsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredClients = MOCK_CLIENTS.filter(client => 
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.phone.includes(search)
  );

  const handleWhatsApp = (phone: string) => {
    // Abre o WhatsApp
    const url = `whatsapp://send?phone=55${phone}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Erro", "WhatsApp não está instalado.");
    });
  };

  const renderClient = ({ item }: any) => {
    const avatarBg = getAvatarColor(item.name);

    return (
      <TouchableOpacity 
        style={styles.clientCard} 
        activeOpacity={0.7}
        onPress={() => router.push(`/clients/${item.id}` as any)} // Navegar para detalhes (futuro)
      >
        {/* Avatar */}
        <View style={[styles.avatarContainer, { backgroundColor: item.image ? 'transparent' : avatarBg }]}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>{item.initials}</Text>
          )}
        </View>

        {/* Informações */}
        <View style={styles.clientInfo}>
          <Text style={styles.clientName} numberOfLines={1}>{item.name}</Text>
          
          <View style={styles.clientMetaRow}>
            <Text style={styles.clientPhone}>
               {item.phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}
            </Text>
            <View style={styles.dotSeparator} />
            <Text style={styles.lastVisit}>{item.lastVisit}</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
             {/* Tag VIP */}
             {item.vip && (
                <View style={[styles.tag, styles.vipTag]}>
                   <Text style={[styles.tagText, styles.vipText]}>VIP ⭐</Text>
                </View>
             )}
             {/* Tag Reparos */}
             <View style={styles.tag}>
                <Text style={styles.tagText}>{item.repairs} serviços</Text>
             </View>
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
        <View style={styles.headerActions}>
           <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="cloud-upload-outline" size={20} color={colors.text.main} />
           </TouchableOpacity>
        </View>
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
      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id}
        renderItem={renderClient}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
           <Text style={styles.sectionTitle}>
              {filteredClients.length} {filteredClients.length === 1 ? 'cliente encontrado' : 'clientes encontrados'}
           </Text>
        }
      />

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