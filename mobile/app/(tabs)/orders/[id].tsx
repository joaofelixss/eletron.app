import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Alert,
  Share
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { salesStyles as styles } from "../../sales/sales.styles"; // Reutilizando estilos

export default function OrderDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [status, setStatus] = useState("paid"); // pending, paid, cancelled

  // Mock do Pedido
  const ORDER = {
    id: id || "9281",
    client: "Carlos Silva",
    date: "24/10/2023 • 14:30",
    items: [
        { id: 1, name: "iPhone 13 Pro 128GB", qty: 1, price: 4200 },
        { id: 2, name: "Película 3D", qty: 1, price: 50 },
    ],
    total: 4250.00,
    payment: "Pix"
  };

  const handleShare = async () => {
    await Share.share({
        message: `Olá ${ORDER.client}, aqui está o recibo do seu pedido #${ORDER.id} no valor de R$ ${ORDER.total}.`
    });
  };

  const handleDelete = () => {
      Alert.alert("Cancelar Pedido", "Tem certeza?", [
          { text: "Não" },
          { text: "Sim, Cancelar", style: 'destructive', onPress: () => router.back() }
      ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pedido #{ORDER.id}</Text>
        <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* STATUS CARD */}
        <View style={[styles.sectionCard, { alignItems: 'center', paddingVertical: 24 }]}>
            <View style={{ 
                width: 60, height: 60, borderRadius: 30, 
                backgroundColor: status === 'paid' ? '#DCFCE7' : '#FEF3C7',
                justifyContent: 'center', alignItems: 'center', marginBottom: 12
            }}>
                <Ionicons 
                    name={status === 'paid' ? "checkmark-done" : "time"} 
                    size={32} 
                    color={status === 'paid' ? "#166534" : "#B45309"} 
                />
            </View>
            <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 18 }}>
                {status === 'paid' ? "Pedido Pago" : "Aguardando Pagamento"}
            </Text>
            <Text style={{ color: "#6B7280" }}>{ORDER.date}</Text>

            {/* Ações de Status */}
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
                {status !== 'paid' && (
                    <TouchableOpacity 
                        onPress={() => setStatus('paid')}
                        style={{ backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 }}
                    >
                        <Text style={{ fontWeight: 'bold' }}>Marcar como Pago</Text>
                    </TouchableOpacity>
                )}
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
                    <Text style={{ fontWeight: 'bold' }}>CS</Text>
                </View>
                <View>
                    <Text style={styles.clientName}>{ORDER.client}</Text>
                    <Text style={{ color: "#6B7280", fontSize: 12 }}>(11) 99999-9999</Text>
                </View>
            </View>
        </View>

        {/* ITENS */}
        <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
            {ORDER.items.map((item) => (
                <View key={item.id} style={styles.itemRow}>
                    <View style={styles.qtyBadge}>
                        <Text style={styles.qtyText}>{item.qty}x</Text>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text style={{ fontFamily: "Poppins_500Medium" }}>{item.name}</Text>
                    </View>
                    <Text style={styles.itemPrice}>
                        R$ {(item.price * item.qty).toFixed(2)}
                    </Text>
                </View>
            ))}
            
            {/* TOTAIS */}
            <View style={{ marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#F3F4F6" }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ color: "#6B7280" }}>Subtotal</Text>
                    <Text style={{ fontWeight: '600' }}>R$ {ORDER.total.toFixed(2)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ color: "#6B7280" }}>Desconto</Text>
                    <Text style={{ fontWeight: '600', color: colors.danger }}>- R$ 0,00</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16 }}>Total</Text>
                    <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 18, color: colors.success }}>
                        R$ {ORDER.total.toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>

      </ScrollView>

      {/* FOOTER FIXO */}
      <View style={styles.footer}>
         <TouchableOpacity 
            style={[styles.checkoutButton, { backgroundColor: "#FFF", borderWidth: 1, borderColor: "#E5E7EB", flex: 1, justifyContent: 'center' }]}
            onPress={() => router.push(`/sales/create`)} // Reusar para editar (simulado)
         >
             <Text style={{ fontFamily: "Poppins_600SemiBold" }}>Editar Pedido</Text>
         </TouchableOpacity>
         
         <View style={{ width: 12 }} />

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