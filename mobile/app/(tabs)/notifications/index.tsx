import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  FlatList, 
  Image,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { styles } from "./notifications.styles";

// Tipos
type NotificationType = "sale" | "alert" | "marketing" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  isRead: boolean;
  assistant?: {
    name: string;
    avatar: string;
  };
  actions?: { label: string; action: string; primary?: boolean }[];
}

// MOCK DATA (Cenários Reais)
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "sale",
    title: "Venda no WhatsApp! 💰",
    body: "O Glauber fechou a venda de um iPhone 11 (128GB) com a cliente Mariana. O Pix de R$ 1.850,00 já foi confirmado!",
    time: "2 min atrás",
    isRead: false,
    assistant: {
      name: "Glauber",
      avatar: "https://api.dicebear.com/9.x/avataaars/png?seed=Glauber&size=100&backgroundColor=c0aede"
    },
    actions: [
      { label: "Ver Pedido", action: "/orders/123", primary: true },
      { label: "Enviar Recibo", action: "send_receipt" }
    ]
  },
  {
    id: "2",
    type: "marketing",
    title: "Campanha Sugerida 🚀",
    body: "Notei que você tem 15 capas do S22 paradas há 30 dias. Que tal lançarmos uma promoção 'Compre 1 Leve 2' nos Stories agora?",
    time: "1h atrás",
    isRead: false,
    assistant: {
      name: "Juh",
      avatar: "https://api.dicebear.com/9.x/avataaars/png?seed=Juh&size=100&backgroundColor=b6e3f4"
    },
    actions: [
      { label: "Postar Agora", action: "create_story", primary: true },
      { label: "Ignorar", action: "dismiss" }
    ]
  },
  {
    id: "3",
    type: "alert",
    title: "Estoque Baixo ⚠️",
    body: "A Película 3D Privativa acabou de atingir o estoque mínimo (2 unidades). Hora de repor!",
    time: "3h atrás",
    isRead: true,
    assistant: {
      name: "Eletron",
      avatar: "https://api.dicebear.com/9.x/bottts/png?seed=Eletron&size=100"
    },
    actions: [
      { label: "Comprar Fornecedor", action: "/suppliers" }
    ]
  },
  {
    id: "4",
    type: "system",
    title: "Backup Concluído",
    body: "Seus dados de clientes e vendas foram salvos na nuvem com segurança.",
    time: "Ontem",
    isRead: true,
  }
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all"); // all, sale, alert
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    Alert.alert("Sucesso", "Todas as notificações foram marcadas como lidas.");
  };

  const handleAction = (action: string) => {
    if (action.startsWith("/")) {
      router.push(action as any);
    } else {
      Alert.alert("Ação Rápida", `Executando: ${action}`);
    }
  };

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case "sale": return { icon: "cart", color: colors.success };
      case "alert": return { icon: "warning", color: colors.warning };
      case "marketing": return { icon: "megaphone", color: "#8B5CF6" }; // Roxo
      default: return { icon: "notifications", color: colors.text.light };
    }
  };

  const filteredNotifications = activeFilter === "all" 
    ? notifications 
    : notifications.filter(n => n.type === activeFilter);

  const renderItem = ({ item }: { item: Notification }) => {
    const typeIcon = getIconForType(item.type);

    return (
      <View style={[styles.card, !item.isRead && styles.cardUnread]}>
        {/* Ícone ou Avatar */}
        <View style={styles.iconContainer}>
          {item.assistant ? (
            <Image source={{ uri: item.assistant.avatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.systemIconBox}>
              <Ionicons name="cube-outline" size={20} color="#666" />
            </View>
          )}
          
          {/* Badge do Tipo (Pequena bolinha no canto do avatar) */}
          <View style={[styles.typeBadge, { backgroundColor: typeIcon.color }]}>
            <Ionicons name={typeIcon.icon as any} size={10} color="#FFF" />
          </View>
        </View>

        {/* Conteúdo */}
        <View style={styles.cardContent}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          
          <Text style={styles.cardBody} numberOfLines={3}>{item.body}</Text>

          {/* Botões de Ação */}
          {item.actions && (
            <View style={styles.actionRow}>
              {item.actions.map((action, index) => (
                <TouchableOpacity 
                  key={index}
                  style={action.primary ? styles.primaryAction : styles.secondaryAction}
                  onPress={() => handleAction(action.action)}
                >
                  <Text style={action.primary ? styles.primaryActionText : styles.secondaryActionText}>
                    {action.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Bolinha de Não Lido (se necessário) */}
        {!item.isRead && (
             // Opcional: já mudamos a cor de fundo, mas pode ter a bolinha tbm
             <View style={styles.unreadDot} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.main} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markAllText}>Ler todas</Text>
        </TouchableOpacity>
      </View>

      {/* FILTROS */}
      <View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {[
            { id: "all", label: "Todas" },
            { id: "sale", label: "Vendas 💰" },
            { id: "marketing", label: "Dicas IA 🤖" },
            { id: "alert", label: "Alertas ⚠️" },
          ].map((filter) => (
            <TouchableOpacity 
              key={filter.id}
              style={[styles.filterChip, activeFilter === filter.id && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text style={[styles.filterText, activeFilter === filter.id && styles.filterTextActive]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* LISTA */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Hoje</Text>}
      />
    </View>
  );
}