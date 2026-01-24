import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import { colors } from "../../src/constants/colors";

export default function TradeInScreen() {
  const router = useRouter();
  
  // Estados do Formulário
  const [model, setModel] = useState("iPhone 12 Pro - 128GB");
  const [imei, setImei] = useState("");
  const [valuation, setValuation] = useState("2.200,00");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={styles.container.backgroundColor} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestão de Trade-In</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* SEÇÃO 1: APARELHO DE ENTRADA */}
          <View style={styles.sectionHeader}>
            <View style={styles.iconBadge}>
              <Ionicons name="arrow-down" size={18} color={colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>Aparelho de Entrada</Text>
          </View>

          <View style={styles.formContainer}>
            {/* Modelo */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Modelo / Marca</Text>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={styles.input} 
                  value={model} 
                  onChangeText={setModel}
                  placeholderTextColor="#666"
                />
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              </View>
            </View>

            {/* Linha Dupla */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.flex1]}>
                <Text style={styles.label}>Condição</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.input}>Grade B (Bom)</Text>
                  <Ionicons name="chevron-down" size={20} color="#FFF" />
                </View>
              </View>
              <View style={[styles.inputGroup, styles.flex1]}>
                <Text style={styles.label}>IMEI</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={styles.input} 
                    value={imei} 
                    onChangeText={setImei}
                    placeholder="0000..." 
                    placeholderTextColor="#666"
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            </View>

            {/* Card de Avaliação */}
            <View style={styles.valuationCard}>
              <Text style={styles.valuationLabel}>Valor de Avaliação (R$)</Text>
              <View style={styles.valuationRow}>
                <View style={styles.moneyInputContainer}>
                  <Text style={styles.currencySymbol}>R$</Text>
                  <TextInput 
                    style={styles.moneyInput}
                    value={valuation}
                    onChangeText={setValuation}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.aiSuggestion}>
                  <View style={styles.aiBadge}>
                    <Ionicons name="sparkles" size={12} color={colors.primary} />
                    <Text style={styles.aiText}>Sugestão IA</Text>
                  </View>
                  <Text style={styles.aiRange}>R$ 2.150 - R$ 2.300</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* SEÇÃO 2: APARELHO DE SAÍDA */}
          <View style={styles.sectionHeaderSpace}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View style={[styles.iconBadge, { backgroundColor: "rgba(255,255,255,0.1)", width: 32, height: 32 }]}>
                <Ionicons name="arrow-up" size={18} color="#FFF" />
              </View>
              <Text style={styles.sectionTitle}>Aparelho de Saída</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeItemButton}>Trocar Item</Text>
            </TouchableOpacity>
          </View>

          {/* Card do Produto */}
          <View style={styles.productCard}>
            <View style={styles.productImage}>
              <Ionicons name="phone-portrait-outline" size={32} color="#FFF" />
            </View>
            <View style={styles.productDetails}>
              <View style={styles.productHeader}>
                <Text style={styles.productName}>iPhone 15 Pro</Text>
                <View style={styles.newBadge}>
                  <Text style={styles.newText}>NOVO</Text>
                </View>
              </View>
              <Text style={styles.productSpec}>256GB • Titânio Natural</Text>
              
              <Text style={styles.sellLabel}>Valor de Venda</Text>
              <Text style={styles.sellPrice}>R$ 6.500,00</Text>
            </View>
          </View>

          {/* Scroll de Acessórios */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.accessoriesScroll}>
            {["Adicionar Capa", "Película", "Carregador"].map((item, index) => (
              <TouchableOpacity key={index} style={styles.accessoryChip}>
                <Ionicons name="add" size={16} color={styles.container.backgroundColor === "#181811" ? "#baba9c" : "#666"} />
                <Text style={styles.accessoryText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* FOOTER FINANCEIRO */}
      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Valor do Novo</Text>
          <Text style={styles.summaryValue}>R$ 6.500,00</Text>
        </View>
        <View style={styles.summaryRow}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Ionicons name="remove-circle-outline" size={16} color={colors.primary} />
            <Text style={[styles.summaryLabel, styles.summaryValuePrimary]}>Trade-In (Entrada)</Text>
          </View>
          <Text style={[styles.summaryValue, styles.summaryValuePrimary]}>- R$ 2.200,00</Text>
        </View>

        <View style={styles.dashedLine} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Diferença a Pagar</Text>
          <Text style={styles.totalValue}>R$ 4.300,00</Text>
        </View>

        <TouchableOpacity 
          style={styles.finishButton}
          activeOpacity={0.8}
          onPress={() => alert("Venda finalizada!")}
        >
          <Text style={styles.finishButtonText}>Finalizar Troca</Text>
          <Ionicons name="arrow-forward" size={20} color="#000" />
        </TouchableOpacity>
      </View>

    </View>
  );
}