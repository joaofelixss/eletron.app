import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  Alert,
  Modal,
  TextInput,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "../../src/constants/colors";
import { salesStyles as styles } from "./sales.styles"; 
import { api } from "../../src/services/api";
import { SuccessModal } from "../../src/components/SuccessModal";

// Opções de Pagamento
const PAYMENT_METHODS = [
    { id: 'PIX', label: 'Pix', icon: 'qr-code-outline', color: '#10B981' },
    { id: 'CASH', label: 'Dinheiro', icon: 'cash-outline', color: '#166534' },
    { id: 'CREDIT_CARD', label: 'Crédito', icon: 'card-outline', color: '#3B82F6' },
    { id: 'DEBIT_CARD', label: 'Débito', icon: 'card', color: '#6366F1' },
];

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // --- DADOS DO PEDIDO ---
  const [orderData, setOrderData] = useState<any>(null);
  
  // --- ESTADOS DO PAGAMENTO ---
  const [payments, setPayments] = useState<any[]>([]); 
  const [modalVisible, setModalVisible] = useState(false);
  
  // Dados do Modal (Input de valor)
  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const [amountInput, setAmountInput] = useState("");

  // Estados Finais
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- CORREÇÃO DO LOOP INFINITO ---
  useEffect(() => {
    if (params.orderData) {
        try {
            setOrderData(JSON.parse(params.orderData as string));
        } catch (e) {
            Alert.alert("Erro", "Dados do pedido inválidos");
            router.back();
        }
    }
  }, []); // <--- IMPORTANTE: Array vazio aqui!

  if (!orderData) return null;

  // --- CÁLCULOS ---
  const totalOrder = orderData.total;
  const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);
  const remaining = totalOrder - totalPaid;
  const change = remaining < 0 ? Math.abs(remaining) : 0; // Troco

  // Abrir Modal de Pagamento
  const handleSelectMethod = (method: any) => {
      if (remaining <= 0 && change === 0) {
          Alert.alert("Pronto", "O valor total já foi coberto.");
          return;
      }
      
      setSelectedMethod(method);
      // Sugere o valor restante
      setAmountInput(remaining > 0 ? remaining.toFixed(2) : ""); 
      setModalVisible(true);
  };

  // Confirmar Valor no Modal
  const confirmPayment = () => {
      const value = parseFloat(amountInput.replace(',', '.'));
      
      if (!value || value <= 0) {
          Alert.alert("Valor Inválido", "Digite um valor maior que zero.");
          return;
      }

      const newPayment = {
          id: Math.random().toString(),
          method: selectedMethod.id,
          label: selectedMethod.label,
          amount: value
      };

      setPayments([...payments, newPayment]);
      setModalVisible(false);
      setAmountInput("");
  };

  const removePayment = (id: string) => {
      setPayments(prev => prev.filter(p => p.id !== id));
  };

  // --- FINALIZAR VENDA ---
  const handleFinishSale = async () => {
      if (remaining > 0.01) { 
          Alert.alert("Atenção", `Ainda faltam R$ ${remaining.toFixed(2)} para fechar a conta.`);
          return;
      }

      try {
          setProcessing(true);

          const mainPaymentType = payments.length > 1 ? 'SPLIT' : payments[0].method;

          const payload = {
              clientId: orderData.clientId,
              total: orderData.total,
              discount: orderData.discount,
              paymentType: mainPaymentType,
              items: orderData.items.map((i: any) => ({
                  productId: i.id,
                  name: i.name,
                  quantity: i.qty,
                  unitPrice: i.salePrice
              })),
              paymentsDetails: payments 
          };

          await api.post('/orders', payload);
          setShowSuccess(true);

      } catch (error) {
          console.log(error);
          Alert.alert("Erro", "Falha ao registrar venda.");
      } finally {
          setProcessing(false);
      }
  };

  const closeSuccess = () => {
      setShowSuccess(false);
      // Volta para a Home e limpa o histórico de navegação de vendas
      router.push("/(tabs)/home"); 
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* --- MODAL SUCESSO --- */}
      <SuccessModal 
        visible={showSuccess}
        onClose={closeSuccess}
        title="Venda Concluída!"
        message={`Pedido registrado.\nTroco: R$ ${change.toFixed(2)}`}
      />

      {/* --- MODAL INPUT DE VALOR --- */}
      <Modal visible={modalVisible} transparent animationType="fade">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 24 }}>
              <View style={{ backgroundColor: '#FFF', borderRadius: 24, padding: 24 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }}>
                      Quanto em {selectedMethod?.label}?
                  </Text>
                  <Text style={{ textAlign: 'center', color: '#6B7280', marginBottom: 20 }}>
                      Faltam: R$ {remaining > 0 ? remaining.toFixed(2) : "0.00"}
                  </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, marginBottom: 24 }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#374151' }}>R$ </Text>
                      <TextInput 
                          style={{ flex: 1, fontSize: 32, fontWeight: 'bold', paddingVertical: 16, color: '#000' }}
                          keyboardType="numeric"
                          value={amountInput}
                          onChangeText={setAmountInput}
                          autoFocus
                      />
                  </View>

                  <TouchableOpacity 
                      style={{ backgroundColor: "#000", paddingVertical: 16, borderRadius: 12, alignItems: 'center' }}
                      onPress={confirmPayment}
                  >
                      <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>Confirmar Valor</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                      style={{ marginTop: 16, alignItems: 'center' }}
                      onPress={() => setModalVisible(false)}
                  >
                      <Text style={{ color: '#EF4444' }}>Cancelar</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagamento</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* 1. GRANDE TOTAL (HERO) */}
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>
                {remaining > 0 ? "Falta Pagar" : (change > 0 ? "Troco a Devolver" : "Total Pago")}
            </Text>
            
            <Text style={{ 
                fontSize: 48, 
                fontWeight: 'bold', 
                color: remaining > 0.01 ? '#000' : (change > 0 ? colors.warning : colors.success) 
            }}>
                R$ {remaining > 0 ? remaining.toFixed(2) : change.toFixed(2)}
            </Text>
        </View>

        {/* 2. LISTA DE PAGAMENTOS REALIZADOS */}
        {payments.length > 0 && (
            <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Pagamentos Recebidos</Text>
                {payments.map((p) => (
                    <View key={p.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>{p.label}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>R$ {p.amount.toFixed(2)}</Text>
                            <TouchableOpacity onPress={() => removePayment(p.id)}>
                                <Ionicons name="trash-outline" size={20} color="#EF4444" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        )}

        {/* 3. GRID DE FORMAS DE PAGAMENTO */}
        <View style={{ marginBottom: 40 }}>
            <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>Escolha a forma de pagamento</Text>
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {PAYMENT_METHODS.map((method) => (
                    <TouchableOpacity 
                        key={method.id}
                        onPress={() => handleSelectMethod(method)}
                        style={{ 
                            width: '48%', 
                            aspectRatio: 1.5, 
                            backgroundColor: '#FFF', 
                            borderRadius: 16, 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#E5E7EB',
                            elevation: 1,
                        }}
                    >
                        <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: `${method.color}20`, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                            <Ionicons name={method.icon as any} size={24} color={method.color} />
                        </View>
                        <Text style={{ fontWeight: '600', fontSize: 16 }}>{method.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View>
            <Text style={styles.totalLabel}>Total do Pedido</Text>
            <Text style={styles.totalValue}>
                {totalOrder.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </Text>
        </View>
        
        <TouchableOpacity 
            style={[styles.checkoutButton, { opacity: remaining > 0.01 || processing ? 0.5 : 1 }]} 
            onPress={handleFinishSale}
            disabled={remaining > 0.01 || processing}
        >
            {processing ? (
                <ActivityIndicator color="#000" />
            ) : (
                <>
                    <Text style={styles.checkoutText}>Concluir Venda</Text>
                    <Ionicons name="checkmark-done-circle" size={24} color="#000" />
                </>
            )}
        </TouchableOpacity>
      </View>

    </View>
  );
}