import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Alert,
  Modal,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "../../src/constants/colors";
import { salesStyles as styles } from "./sales.styles"; 
import { api } from "../../src/services/api";

export default function ReviewOrderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // --- DADOS ---
  const [cart, setCart] = useState<any[]>([]);
  
  // --- ESTADOS ---
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [notes, setNotes] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  
  // Cliente
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showClientModal, setShowClientModal] = useState(false);

  // --- CORREÇÃO DO LOOP INFINITO ---
  useEffect(() => {
    // 1. Carregar Carrinho
    if (params.cart) {
      try {
        const parsedCart = JSON.parse(params.cart as string);
        setCart(parsedCart);
      } catch (e) {
        Alert.alert("Erro", "Falha ao carregar carrinho.");
        router.back();
      }
    }
    
    // 2. Carregar Clientes (Apenas uma vez)
    api.get('/clients')
      .then(res => setClients(res.data))
      .catch(() => {});
  }, []); // <--- IMPORTANTE: Array vazio garante que rode apenas no início

  // --- CÁLCULOS ---
  const subtotal = cart.reduce((acc, item) => acc + (item.salePrice * item.qty), 0);
  const total = subtotal - discount;

  // Lógica de Cupom
  const applyCoupon = () => {
    if (coupon.toUpperCase() === "DESCONTO10") {
        setDiscount(subtotal * 0.10); // 10%
        Alert.alert("Sucesso", "Cupom de 10% aplicado!");
    } else {
        setDiscount(0);
        Alert.alert("Erro", "Cupom inválido.");
    }
  };

  const handleContinue = () => {
    const orderData = {
        items: cart,
        clientId: selectedClient?.id || null,
        clientName: selectedClient?.name || "Consumidor Final",
        deliveryMethod,
        notes,
        subtotal,
        discount,
        total
    };

    router.push({
        pathname: "/sales/payment",
        params: { orderData: JSON.stringify(orderData) }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* MODAL CLIENTE */}
      <Modal visible={showClientModal} animationType="slide" transparent>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
              <View style={{ backgroundColor: '#FFF', height: '70%', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Selecionar Cliente</Text>
                  
                  <TouchableOpacity 
                    style={{ padding: 15, borderBottomWidth: 1, borderColor: '#eee' }}
                    onPress={() => { setSelectedClient(null); setShowClientModal(false); }}
                  >
                      <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Consumidor Final</Text>
                  </TouchableOpacity>

                  <FlatList 
                      data={clients}
                      keyExtractor={item => item.id}
                      renderItem={({ item }) => (
                          <TouchableOpacity 
                            style={{ padding: 15, borderBottomWidth: 1, borderColor: '#eee' }}
                            onPress={() => { setSelectedClient(item); setShowClientModal(false); }}
                          >
                              <Text>{item.name}</Text>
                          </TouchableOpacity>
                      )}
                  />
                  <TouchableOpacity style={{ marginTop: 10, padding: 15, alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 12 }} onPress={() => setShowClientModal(false)}>
                      <Text>Fechar</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Revisão do Pedido</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* 1. CLIENTE */}
        <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Cliente</Text>
            <TouchableOpacity style={styles.clientRow} onPress={() => setShowClientModal(true)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Ionicons name="person" size={20} color={colors.primary} />
                    <Text style={styles.clientName}>{selectedClient?.name || "Consumidor Final"}</Text>
                </View>
                <Text style={styles.changeClientText}>Alterar</Text>
            </TouchableOpacity>
        </View>

        {/* 2. ENTREGA */}
        <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Forma de Entrega</Text>
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 10 }}>
                {/* Botão Retirada */}
                <TouchableOpacity 
                    onPress={() => setDeliveryMethod('pickup')}
                    style={{ 
                        flex: 1, padding: 16, borderRadius: 12, borderWidth: 1, alignItems: 'center', gap: 8,
                        borderColor: deliveryMethod === 'pickup' ? colors.primary : '#E5E7EB',
                        backgroundColor: deliveryMethod === 'pickup' ? '#FEFCE8' : '#FFF'
                    }}
                >
                    <Ionicons name="storefront-outline" size={24} color={deliveryMethod === 'pickup' ? colors.primary : '#9CA3AF'} />
                    <Text style={{ fontWeight: '600', color: deliveryMethod === 'pickup' ? '#000' : '#6B7280' }}>Retirada</Text>
                </TouchableOpacity>

                {/* Botão Entrega */}
                <TouchableOpacity 
                    onPress={() => setDeliveryMethod('delivery')}
                    style={{ 
                        flex: 1, padding: 16, borderRadius: 12, borderWidth: 1, alignItems: 'center', gap: 8,
                        borderColor: deliveryMethod === 'delivery' ? colors.primary : '#E5E7EB',
                        backgroundColor: deliveryMethod === 'delivery' ? '#FEFCE8' : '#FFF'
                    }}
                >
                    <Ionicons name="bicycle-outline" size={24} color={deliveryMethod === 'delivery' ? colors.primary : '#9CA3AF'} />
                    <Text style={{ fontWeight: '600', color: deliveryMethod === 'delivery' ? '#000' : '#6B7280' }}>Entrega</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* 3. OBSERVAÇÕES */}
        <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Observações</Text>
            <TextInput 
                style={[styles.input, { height: 80, textAlignVertical: 'top', paddingTop: 10 }]}
                placeholder="Ex: Entregar na portaria; Cliente pediu nota fiscal..."
                multiline
                numberOfLines={3}
                value={notes}
                onChangeText={setNotes}
            />
        </View>

        {/* 4. CUPOM */}
        <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Cupom de Desconto</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <TextInput 
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    placeholder="Código do cupom"
                    value={coupon}
                    onChangeText={setCoupon}
                    autoCapitalize="characters"
                />
                <TouchableOpacity 
                    onPress={applyCoupon}
                    style={{ backgroundColor: "#000", paddingHorizontal: 16, justifyContent: 'center', borderRadius: 12 }}
                >
                    <Text style={{ color: "#FFF", fontWeight: 'bold' }}>Aplicar</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* 5. RESUMO FINANCEIRO */}
        <View style={[styles.sectionCard, { marginBottom: 100 }]}>
            <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
            
            {/* Lista Resumida */}
            {cart.map(item => (
                <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ color: "#6B7280" }}>{item.qty}x {item.name}</Text>
                    <Text style={{ fontWeight: '500' }}>R$ {(item.salePrice * item.qty).toFixed(2)}</Text>
                </View>
            ))}

            <View style={{ height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ color: "#6B7280" }}>Subtotal</Text>
                <Text style={{ fontWeight: '600' }}>R$ {subtotal.toFixed(2)}</Text>
            </View>

            {discount > 0 && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ color: colors.success }}>Desconto</Text>
                    <Text style={{ fontWeight: '600', color: colors.success }}>- R$ {discount.toFixed(2)}</Text>
                </View>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>R$ {total.toFixed(2)}</Text>
            </View>
        </View>

      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View>
            <Text style={styles.totalLabel}>Total Final</Text>
            <Text style={styles.totalValue}>
                {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleContinue}>
            <Text style={styles.checkoutText}>Ir para Pagamento</Text>
            <Ionicons name="wallet-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

    </View>
  );
}