import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { styles } from "./plans.styles";

// DADOS DOS PLANOS
const PLANS_DATA = {
  BLACK: {
    name: "BLACK",
    themeColor: "#18181B",
    badge: "PROFISSIONAL",
    // Preços TOTAIS (O que será cobrado no cartão)
    prices: { monthly: 39.90, quarterly: 79.90, yearly: 199.90 },
    features: [
      { text: "Tudo do Start", check: true },
      { text: "Garantia Profissional (Seu Logo)", check: true },
      { text: "Lembrete Pós-Venda (WhatsApp)", check: true },
      { text: "IA Copywriter Ilimitada", check: true },
      { text: "Impressão de Etiquetas", check: true },
      { text: "Precificação Inteligente", check: false },
    ]
  },
  ELETRON: {
    name: "ELETRON",
    themeColor: colors.primary, // Amarelo
    textColor: "#000",
    badge: "IA MAX ⚡",
    // Preços TOTAIS
    prices: { monthly: 69.90, quarterly: 139.90, yearly: 399.90 },
    features: [
      { text: "Tudo do Black", check: true },
      { text: "Precificação Inteligente (Smart Price)", check: true, isNew: true },
      { text: "Chat com ELETRON IA", check: true, isNew: true },
      { text: "Detector de Estoque Encalhado", check: true, isNew: true },
      { text: "Consultor de Compras", check: true },
    ]
  }
};

type CycleType = "monthly" | "quarterly" | "yearly";
type PlanType = "BLACK" | "ELETRON"; // Apenas estes são selecionáveis

export default function PlansScreen() {
  const router = useRouter();
  
  const [cycle, setCycle] = useState<CycleType>("quarterly"); // Sugestão Trimestral
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("ELETRON");
  
  const currentPlan = PLANS_DATA[selectedPlan];
  const totalPrice = currentPlan.prices[cycle];

  // Gera os textos de preço
  const getPriceInfo = () => {
    const formattedPrice = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
    
    if (cycle === "monthly") {
      return { total: formattedPrice, sub: "cobrado mensalmente", label: "Valor Mensal" };
    }
    if (cycle === "quarterly") {
      const monthlyEquiv = (totalPrice / 3).toFixed(2).replace('.', ',');
      return { total: formattedPrice, sub: `Equivale a R$ ${monthlyEquiv}/mês`, label: "Valor Trimestral" };
    }
    if (cycle === "yearly") {
      const monthlyEquiv = (totalPrice / 12).toFixed(2).replace('.', ',');
      return { total: formattedPrice, sub: `Equivale a R$ ${monthlyEquiv}/mês`, label: "Valor Anual" };
    }
    return { total: "", sub: "", label: "" };
  };

  const info = getPriceInfo();

  const handleSubscribe = () => {
    Alert.alert("Confirmar", `Assinar ${selectedPlan} por ${info.total}?`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Text style={styles.headerTitle}>Planos & Preços</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={colors.text.main} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Evolua sua Loja 🚀</Text>
        </View>

        {/* Status do Usuário */}
        <View style={styles.currentPlanBanner}>
          <Ionicons name="information-circle" size={16} color="#4B5563" />
          <Text style={styles.currentPlanText}>Seu plano atual: <Text style={styles.currentPlanBold}>Start (Grátis)</Text></Text>
        </View>

        {/* 1. SELETOR DE CICLO */}
        <View style={styles.cycleContainer}>
          {/* Mensal */}
          <TouchableOpacity 
            style={[styles.cycleBtn, cycle === "monthly" && styles.cycleBtnActive]}
            onPress={() => setCycle("monthly")}
          >
            <Text style={[styles.cycleText, cycle === "monthly" && styles.cycleTextActive]}>Mensal</Text>
          </TouchableOpacity>

          {/* Trimestral */}
          <TouchableOpacity 
            style={[styles.cycleBtn, cycle === "quarterly" && styles.cycleBtnActive]}
            onPress={() => setCycle("quarterly")}
          >
            <View style={styles.badgeTop}><Text style={styles.badgeTopText}>Pague 2 Leve 3</Text></View>
            <Text style={[styles.cycleText, cycle === "quarterly" && styles.cycleTextActive]}>Trimestral</Text>
          </TouchableOpacity>

          {/* Anual */}
          <TouchableOpacity 
            style={[styles.cycleBtn, cycle === "yearly" && styles.cycleBtnActive]}
            onPress={() => setCycle("yearly")}
          >
            <View style={[styles.badgeTop, {backgroundColor: colors.danger}]}>
              <Text style={styles.badgeTopText}>50% OFF</Text>
            </View>
            <Text style={[styles.cycleText, cycle === "yearly" && styles.cycleTextActive]}>Anual</Text>
          </TouchableOpacity>
        </View>

        {/* 2. ABAS DE PLANOS (BLACK | ELETRON) */}
        <View style={styles.tabsContainer}>
          
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              selectedPlan === "BLACK" && { backgroundColor: "#18181B", borderColor: "#18181B" }
            ]}
            onPress={() => setSelectedPlan("BLACK")}
          >
            <Text style={[styles.tabText, selectedPlan === "BLACK" && { color: "#FFF" }]}>BLACK</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.tabButton, 
              selectedPlan === "ELETRON" && { backgroundColor: colors.primary, borderColor: colors.primary }
            ]}
            onPress={() => setSelectedPlan("ELETRON")}
          >
            {/* TROFÉU DESTAQUE */}
            <View style={styles.trophyIcon}>
              <Text style={{fontSize: 20}}>🏆</Text>
            </View>
            <Text style={[styles.tabText, selectedPlan === "ELETRON" && { color: "#000", fontWeight: "bold" }]}>ELETRON</Text>
          </TouchableOpacity>

        </View>

        {/* 3. CARD DINÂMICO */}
        <View style={[styles.mainCard, { borderColor: currentPlan.themeColor }]}>
          
          <View style={[styles.cardBadge, { backgroundColor: currentPlan.themeColor }]}>
            <Text style={[styles.cardBadgeText, selectedPlan === "ELETRON" && {color: "#000"}]}>
              {currentPlan.badge}
            </Text>
          </View>

          <View style={styles.pricingHeader}>
             <Text style={styles.totalLabel}>{info.label}</Text>
             <Text style={styles.priceValue}>{info.total}</Text>
             <Text style={styles.priceSubtitle}>{info.sub}</Text>
             
             {/* Texto de Economia */}
             {cycle === "quarterly" && (
               <Text style={styles.savingText}>🔥 Você ganha 1 mês grátis!</Text>
             )}
             {cycle === "yearly" && (
               <Text style={styles.savingText}>🔥 Economia de R$ {((PLANS_DATA[selectedPlan].prices.monthly * 12) - totalPrice).toFixed(2).replace('.', ',')}</Text>
             )}
          </View>

          <View style={styles.divider} />

          <View style={styles.featureList}>
            {currentPlan.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Ionicons 
                  name={feature.check ? "checkmark-circle" : "close-circle-outline"} 
                  size={20} 
                  color={feature.check ? colors.success : "#CCC"} 
                />
                <Text style={[
                  styles.featureText, 
                  !feature.check && { color: "#CCC", textDecorationLine: "line-through" }
                ]}>
                  {feature.text}
                </Text>
                {feature.isNew && (
                  <View style={styles.newBadge}><Text style={styles.newBadgeText}>NOVO</Text></View>
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: currentPlan.themeColor }]}
            onPress={handleSubscribe}
          >
            <Text style={[styles.actionButtonText, selectedPlan === "ELETRON" && {color: "#000"}]}>
              ASSINAR {selectedPlan}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.footerNote}>
            Renovação automática. Cancele quando quiser nas configurações.
          </Text>

        </View>

      </ScrollView>
    </View>
  );
}