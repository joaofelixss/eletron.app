import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Alert,
  Share,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { salesStyles as styles } from "../../sales/sales.styles";

// 1. IMPORTAR API
import { api } from "../../../src/services/api";

export default function OrderDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Pega o ID da rota

  // ESTADOS
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // --- BUSCAR DETALHES DO PEDIDO ---
  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        Alert.alert("Erro", "Pedido não encontrado.");
        router.back();
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchOrder();
  }, [id]);

  // --- COMPARTILHAR RECIBO ---
  const handleShare = async () => {
    if (!order) return;

    const itemsList = order.items.map((i: any) => `${i.quantity}x ${i.name}`).join('\n');
    const total = Number(order.total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const date = new Date(order.createdAt).toLocaleDateString();

    const message = `🧾 *RECIBO ELETRON HQ*\n\nPedido #${order.code}\nData: ${date}\nCliente: ${order.client?.name || "Consumidor Final"}\n\n*ITENS:*\n${itemsList}\n\n*TOTAL: ${total}*\n\nObrigado pela preferência!`;

    await Share.share({
        message: message
    });
  };

  // --- CANCELAR / EXCLUIR PEDIDO ---
  const handleDelete = () => {
      Alert.alert("Cancelar Pedido", "Tem certeza? Isso apagará o registro do sistema.", [
          { text: "Não" },
          { 
            text: "Sim, Cancelar", 
            style: 'destructive', 
            onPress: async () => {
                try {
                    await api.delete(`/orders/${id}`);
                    Alert.alert("Sucesso", "Pedido cancelado.");
                    router.back();
                } catch (error) {
                    Alert.alert("Erro", "Não foi possível cancelar.");
                }
            } 
          }
      ]);
  };

  if (loading) {
      return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={colors.primary} />
          </View>
      );
  }

  if (!order) return null;

  // Formatação de Dados
  const dateFormatted = new Date(order.createdAt).toLocaleString('pt-BR');
  const statusColor = order.status === 'PAID' ? '#DCFCE7' : '#FEF3C7';
  const statusIconColor = order.status === 'PAID' ? '#166534' : '#B45309';
  const statusIcon = order.status === 'PAID' ? "checkmark-done" : "time";
  const statusText = order.status === 'PAID' ? "Pedido Pago" : "Em Aberto";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pedido #{order.code}</Text>
        <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* STATUS CARD */}
        <View style={[styles.sectionCard, { alignItems: 'center', paddingVertical: 24 }]}>
            <View style={{ 
                width: 60, height: 60, borderRadius: 30, 
                backgroundColor: statusColor,
                justifyContent: 'center', alignItems: 'center', marginBottom: 12
            }}>
                <Ionicons name={statusIcon} size={32} color={statusIconColor} />
            </View>
            <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 18 }}>
                {statusText}
            </Text>
            <Text style={{ color: "#6B7280" }}>{dateFormatted}</Text>

            {/* Ações de Status */}
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
                <TouchableOpacity 
                    onPress={handleShare}
                    style={{ backgroundColor: "#F3F4F6", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, flexDirection: 'row', gap: 6 }}
                >
                    <Ionicons name="logo-whatsapp" size={16} color="#15803d" />
                    <Text>Enviar Recibo</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* CLIENTE */}
        <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Cliente</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#E5E7EB", justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {order.client?.name ? order.client.name.substring(0,2).toUpperCase() : "CF"}
                    </Text>
                </View>
                <View>
                    <Text style={styles.clientName}>{order.client?.name || "Consumidor Final"}</Text>
                    <Text style={{ color: "#6B7280", fontSize: 12 }}>
                        {order.client?.phone || "Sem telefone cadastrado"}
                    </Text>
                </View>
            </View>
        </View>

        {/* ITENS */}
        <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
            {order.items.map((item: any) => (
                <View key={item.id} style={styles.itemRow}>
                    <View style={styles.qtyBadge}>
                        <Text style={styles.qtyText}>{item.quantity}x</Text>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text style={{ fontFamily: "Poppins_500Medium" }}>{item.name}</Text>
                    </View>
                    <Text style={styles.itemPrice}>
                        {Number(item.price * item.quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </Text>
                </View>
            ))}
            
            {/* TOTAIS */}
            <View style={{ marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#F3F4F6" }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ color: "#6B7280" }}>Subtotal</Text>
                    <Text style={{ fontWeight: '600' }}>
                        {Number(order.total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16 }}>Total</Text>
                    <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 18, color: colors.success }}>
                        {Number(order.total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </Text>
                </View>
            </View>
        </View>

      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
         <TouchableOpacity 
            style={[styles.checkoutButton, { flex: 1, justifyContent: 'center' }]}
            onPress={() => router.push("/(tabs)/home/home")}
         >
             <Text style={styles.checkoutText}>Voltar ao Início</Text>
         </TouchableOpacity>
      </View>

    </View>
  );
}