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

export default function PlansScreen() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const handleSubscribe = (plan: string) => {
    Alert.alert("Assinatura", `Você escolheu o plano ${plan}. Redirecionando para pagamento...`);
  };

  const PlanFeature = ({ text, isDark = false, available = true }: any) => (
    <View style={styles.featureItem}>
      <Ionicons 
        name={available ? "checkmark-circle" : "close-circle"} 
        size={20} 
        color={available ? (isDark ? colors.primary : colors.success) : colors.text.light} 
      />
      <Text style={[
        styles.featureText, 
        isDark && styles.featureTextDark,
        !available && { color: colors.text.light, textDecorationLine: "line-through" }
      ]}>
        {text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ width: 40 }} /> {/* Spacer */}
        <Text style={styles.headerTitle}>Planos Eletron</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={colors.text.main} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Escolha seu Poder ⚡</Text>
          <Text style={styles.heroSubtitle}>
            Desbloqueie IA ilimitada e ferramentas avançadas para sua loja.
          </Text>
        </View>

        {/* TOGGLE MENSAL/ANUAL */}
        <View style={styles.toggleContainer}>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-20% OFF</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.toggleButton, billingCycle === "monthly" && styles.toggleActive]}
            onPress={() => setBillingCycle("monthly")}
          >
            <Text style={[styles.toggleText, billingCycle === "monthly" && styles.toggleTextActive]}>
              Mensal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.toggleButton, billingCycle === "yearly" && styles.toggleActive]}
            onPress={() => setBillingCycle("yearly")}
          >
            <Text style={[styles.toggleText, billingCycle === "yearly" && styles.toggleTextActive]}>
              Anual
            </Text>
          </TouchableOpacity>
        </View>

        {/* CARDS CONTAINER */}
        <View style={styles.cardsContainer}>

          {/* 1. PLANO BÁSICO */}
          <View style={styles.planCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.planName}>Básico</Text>
                <Text style={styles.planDesc}>Para iniciantes</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceValue}>R$ 0</Text>
                <Text style={styles.pricePeriod}>/mês</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.featuresList}>
              <PlanFeature text="Gestão de até 50 produtos" />
              <PlanFeature text="Cadastro de Clientes" />
              <PlanFeature text="1 Usuário" />
              <PlanFeature text="IA Eletron" available={false} />
              <PlanFeature text="Emissão de Garantias" available={false} />
            </View>

            <TouchableOpacity 
              style={styles.cardButton} 
              onPress={() => handleSubscribe("Básico")}
            >
              <Text style={styles.buttonText}>Plano Atual</Text>
            </TouchableOpacity>
          </View>

          {/* 2. PLANO BLACK (DESTAQUE) */}
          <View style={styles.blackCard}>
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>RECOMENDADO</Text>
            </View>

            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.planName, styles.planNameDark]}>BLACK ⚫</Text>
                <Text style={[styles.planDesc, { color: "#CCC" }]}>Para profissionais</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={[styles.priceValue, styles.priceValueDark]}>
                  {billingCycle === "monthly" ? "R$ 29" : "R$ 290"}
                </Text>
                <Text style={[styles.pricePeriod, { color: "#CCC" }]}>
                   {billingCycle === "monthly" ? ",90 /mês" : ",00 /ano"}
                </Text>
              </View>
            </View>

            <View style={[styles.divider, styles.dividerDark]} />

            <View style={styles.featuresList}>
              <PlanFeature text="IA Ilimitada (Smart Price)" isDark />
              <PlanFeature text="Gestão Ilimitada" isDark />
              <PlanFeature text="Emissão de Garantias" isDark />
              <PlanFeature text="Até 3 Usuários" isDark />
              <PlanFeature text="Relatórios Avançados" isDark />
            </View>

            <TouchableOpacity 
              style={[styles.cardButton, styles.cardButtonDark]}
              onPress={() => handleSubscribe("BLACK")}
            >
              <Text style={[styles.buttonText, styles.buttonTextDark]}>ASSINAR AGORA</Text>
            </TouchableOpacity>
          </View>

          {/* 3. PLANO ENTERPRISE */}
          <View style={styles.planCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.planName}>Enterprise</Text>
                <Text style={styles.planDesc}>Para grandes lojas</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceValue}>
                   {billingCycle === "monthly" ? "R$ 99" : "R$ 999"}
                </Text>
                <Text style={styles.pricePeriod}>
                   {billingCycle === "monthly" ? ",90 /mês" : ",00 /ano"}
                </Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.featuresList}>
              <PlanFeature text="Tudo do BLACK" />
              <PlanFeature text="API Dedicada" />
              <PlanFeature text="Multi-lojas (Franquias)" />
              <PlanFeature text="Suporte VIP 24/7" />
              <PlanFeature text="Treinamento de Equipe" />
            </View>

            <TouchableOpacity 
              style={styles.cardButton}
              onPress={() => handleSubscribe("Enterprise")}
            >
              <Text style={styles.buttonText}>Falar com Vendas</Text>
            </TouchableOpacity>
          </View>

        </View>

        <Text style={styles.footerText}>
          A renovação é automática. Cancele a qualquer momento nas configurações.
          Termos de uso e Política de Privacidade aplicáveis.
        </Text>

      </ScrollView>
    </View>
  );
}