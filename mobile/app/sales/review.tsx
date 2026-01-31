import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  Alert,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "../../src/constants/colors";
import { salesStyles as styles } from "./sales.styles";

// 1. IMPORTAR API E AUTH
import { api } from "../../src/services/api";
import { useAuth } from "../../src/context/AuthContext";

export default function ReviewOrderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuth(); // <--- PEGAR O USUÁRIO LOGADO

  // Estados
  const [cart, setCart] = useState<any[]>([]);
  const [discount, setDiscount] = useState("0");
  const [loadingClients, setLoadingClients] = useState(false);
  
  // Clientes
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchClient, setSearchClient] = useState("");

  // --- 1. CARREGAR CARRINHO ---
  useEffect(() => {
    if (params.cart) {
        try {
            setCart(JSON.parse(params.cart as string));
        } catch (e) {
            Alert.alert("Erro", "Falha ao carregar carrinho");
            router.back();
        }
    }
  }, []);

  // --- 2. BUSCAR CLIENTES (COM USERID) ---
  const fetchClients = async () => {
    if (!user?.id) return;

    try {
        setLoadingClients(true);
        // O PULO DO GATO: Enviar userId para filtrar só os seus clientes
        const response = await api.get('/clients', {
            params: { userId: user.id }
        });
        setClients(response.data);
    } catch (error) {
        console.log("Erro ao buscar clientes", error);
    } finally {
        setLoadingClients(false);
    }
  };

  // Abre o modal e já carrega os clientes
  const openClientModal = () => {
      setModalVisible(true);
      fetchClients();
  };

  // --- CÁLCULOS ---
  const subtotal = cart.reduce((acc, item) => acc + (Number(item.salePrice) * item.qty), 0);
  const discountValue = parseFloat(discount.replace(',', '.')) || 0;
  const total = subtotal - discountValue;

  // Filtro de clientes no modal
  const filteredClients = clients.filter(c => 
      c.name.toLowerCase().includes(searchClient.toLowerCase()) ||
      (c.phone && c.phone.includes(searchClient))
  );

  // --- AVANÇAR PARA PAGAMENTO ---
  const handleGoToPayment = () => {
      const orderData = {
          items: cart,
          clientId: selectedClient ? selectedClient.id : null, // Se null, é Consumidor Final
          clientName: selectedClient ? selectedClient.name : "Consumidor Final",
          subtotal,
          discount: discountValue,
          total: total > 0 ? total : 0
      };

      router.push({
          pathname: "/sales/payment",
          params: { orderData: JSON.stringify(orderData) }
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* --- MODAL DE SELEÇÃO DE CLIENTE --- */}
      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
          <View style={{ flex: 1, backgroundColor: '#F9FAFB', padding: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Selecionar Cliente</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Ionicons name="close" size={24} color="#000" />
                  </TouchableOpacity>
              </View>

              {/* Busca */}
              <View style={{ backgroundColor: '#FFF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, height: 50, marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB' }}>
                  <Ionicons name="search" size={20} color="#9CA3AF" />
                  <TextInput 
                      style={{ flex: 1, marginLeft: 8 }}
                      placeholder="Buscar por nome ou telefone..."
                      value={searchClient}
                      onChangeText={setSearchClient}
                  />
              </View>

              {/* Botão Consumidor Final */}
              <TouchableOpacity 
                  style={{ flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFF', borderRadius: 12, marginBottom: 12 }}
                  onPress={() => {
                      setSelectedClient(null);
                      setModalVisible(false);
                  }}
              >
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name="person-outline" size={20} color={colors.primary} />
                  </View>
                  <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: '600' }}>Consumidor Final (Sem cadastro)</Text>
              </TouchableOpacity>

              {/* Lista de Clientes */}
              {loadingClients ? (
                  <ActivityIndicator color={colors.primary} />
              ) : (
                  <FlatList 
                      data={filteredClients}
                      keyExtractor={item => item.id}
                      renderItem={({ item }) => (
                          <TouchableOpacity 
                              style={{ flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFF', borderRadius: 12, marginBottom: 8 }}
                              onPress={() => {
                                  setSelectedClient(item);
                                  setModalVisible(false);
                              }}
                          >
                              {item.image ? (
                                  <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                              ) : (
                                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}>
                                      <Text style={{ fontWeight: 'bold', color: '#6B7280' }}>
                                          {item.name.substring(0,2).toUpperCase()}
                                      </Text>
                                  </View>
                              )}
                              <View style={{ marginLeft: 12 }}>
                                  <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
                                  <Text style={{ fontSize: 14, color: '#6B7280' }}>{item.phone || "Sem telefone"}</Text>
                              </View>
                          </TouchableOpacity>
                      )}
                  />
              )}
          </View>
      </Modal>


      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Revisão</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* 1. SELEÇÃO DE CLIENTE */}
        <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Cliente</Text>
            <TouchableOpacity 
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}
                onPress={openClientModal}
            >
                {selectedClient ? (
                    <>
                         {selectedClient.image ? (
                             <Image source={{ uri: selectedClient.image }} style={{ width: 48, height: 48, borderRadius: 24 }} />
                         ) : (
                             <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#E0E7FF', alignItems: 'center', justifyContent: 'center' }}>
                                 <Text style={{ fontWeight: 'bold', color: colors.primary, fontSize: 18 }}>
                                     {selectedClient.name.substring(0,2).toUpperCase()}
                                 </Text>
                             </View>
                         )}
                         <View style={{ marginLeft: 12, flex: 1 }}>
                             <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{selectedClient.name}</Text>
                             <Text style={{ color: '#6B7280' }}>{selectedClient.phone || "Cliente Cadastrado"}</Text>
                         </View>
                         <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </>
                ) : (
                    <>
                        <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}>
                             <Ionicons name="person" size={24} color="#9CA3AF" />
                        </View>
                        <View style={{ marginLeft: 12, flex: 1 }}>
                             <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Consumidor Final</Text>
                             <Text style={{ color: '#6B7280' }}>Toque para selecionar cliente</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </>
                )}
            </TouchableOpacity>
        </View>

        {/* 2. ITENS DO PEDIDO */}
        <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Itens ({cart.length})</Text>
            {cart.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                    <View style={styles.qtyBadge}>
                        <Text style={styles.qtyText}>{item.qty}x</Text>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text style={{ fontFamily: "Poppins_500Medium" }}>{item.name}</Text>
                    </View>
                    <Text style={styles.itemPrice}>
                        R$ {(Number(item.salePrice) * item.qty).toFixed(2)}
                    </Text>
                </View>
            ))}
        </View>

        {/* 3. DESCONTO E TOTAIS */}
        <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Pagamento</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={{ color: '#6B7280' }}>Subtotal</Text>
                <Text style={{ fontWeight: '600' }}>R$ {subtotal.toFixed(2)}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Text style={{ color: '#6B7280' }}>Desconto (R$)</Text>
                <TextInput 
                    style={{ 
                        borderBottomWidth: 1, borderBottomColor: '#E5E7EB', 
                        width: 80, textAlign: 'right', fontSize: 16, fontWeight: '600', color: colors.danger 
                    }}
                    keyboardType="numeric"
                    placeholder="0,00"
                    placeholderTextColor="#9CA3AF"
                    value={discount}
                    onChangeText={setDiscount}
                />
            </View>

            <View style={{ borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 12, marginTop: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.success }}>
                    R$ {total > 0 ? total.toFixed(2) : "0.00"}
                </Text>
            </View>
        </View>

      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
         <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={handleGoToPayment}
         >
             <Text style={styles.checkoutText}>Ir para Pagamento</Text>
             <Ionicons name="card-outline" size={20} color="#000" />
         </TouchableOpacity>
      </View>

    </View>
  );
}