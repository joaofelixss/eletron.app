import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/constants/colors"; // Caminho corrigido
import { styles } from "./create.styles";

export default function SalesCreateScreen() {
  const router = useRouter();
  
  // Estado do Método de Pagamento (Padrão: Cartão, igual ao HTML)
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | "cash">("card");
  const [clientName, setClientName] = useState("");

  // Dados Mockados (Simulando o HTML)
  const product = {
    name: "iPhone 13 Pro 256GB",
    variant: "Grafite",
    price: 7599.00,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1645552346276" // Imagem ilustrativa
  };

  function handleFinishSale() {
    if (!clientName.trim()) {
      Alert.alert("Atenção", "Por favor, identifique o cliente.");
      return;
    }
    Alert.alert("Sucesso", "Venda realizada com sucesso!", [
      { text: "OK", onPress: () => router.back() }
    ]);
  }

  // Componente Auxiliar para Botão de Pagamento
  const PaymentOption = ({ type, icon, label }: { type: "pix" | "card" | "cash", icon: any, label: string }) => {
    const isSelected = paymentMethod === type;
    return (
      <TouchableOpacity 
        style={[styles.paymentOption, isSelected && styles.paymentOptionSelected]}
        onPress={() => setPaymentMethod(type)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconCircle, isSelected && styles.iconCircleSelected]}>
          <Ionicons 
            name={icon} 
            size={24} 
            color={isSelected ? "#000" : colors.text.main} 
          />
        </View>
        <Text style={styles.paymentText}>{label}</Text>
        {isSelected && <View style={styles.checkBadge} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.main} />
        </TouchableOpacity>
        <Text style={styles.title}>Realizar Venda</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* 1. Card do Produto */}
          <View style={styles.productCard}>
            <View style={styles.productInfo}>
              <View>
                <View style={styles.stockBadge}>
                  <Text style={styles.stockText}>Em estoque</Text>
                </View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productVariant}>{product.variant}</Text>
              </View>
              <Text style={styles.productPrice}>
                {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Text>
            </View>
            <View style={styles.productImageContainer}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
            </View>
          </View>

          {/* 2. Input de Cliente */}
          <Text style={styles.sectionLabel}>Cliente</Text>
          <View style={styles.clientInputContainer}>
            <TextInput
              style={styles.clientInput}
              placeholder="Buscar cliente ou CPF..."
              placeholderTextColor={colors.text.light}
              value={clientName}
              onChangeText={setClientName}
            />
            <Ionicons name="search" size={20} color={colors.primary} />
          </View>

          {/* 3. Forma de Pagamento */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={styles.sectionLabel}>Forma de Pagamento</Text>
          </View>
          <View style={styles.paymentGrid}>
            <PaymentOption type="pix" icon="qr-code-outline" label="Pix" />
            <PaymentOption type="card" icon="card-outline" label="Cartão" />
            <PaymentOption type="cash" icon="cash-outline" label="Dinheiro" />
          </View>

          {/* 4. Resumo do Pedido */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal (1 item)</Text>
              <Text style={styles.summaryValue}>R$ 7.599,00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Descontos</Text>
              <Text style={{ ...styles.summaryValue, color: colors.success }}>- R$ 0,00</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>R$ 7.599,00</Text>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer Fixo */}
      <View style={styles.footer}>
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.footerTotalLabel}>Total a pagar</Text>
          <Text style={styles.footerTotalValue}>R$ 7.599,00</Text>
        </View>
        
        <TouchableOpacity style={styles.checkoutButton} onPress={handleFinishSale}>
          <Text style={styles.checkoutButtonText}>FINALIZAR VENDA</Text>
          <Ionicons name="arrow-forward" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}