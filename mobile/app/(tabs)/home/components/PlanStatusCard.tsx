import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../src/constants/colors";
import { useRouter } from "expo-router";

// Componente de Barra de Progresso Inteligente
const ProgressBar = ({ icon, label, current, total }: any) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  // Define a cor baseada na porcentagem de uso
  let barColor = colors.success; // Verde (Tranquilo)
  if (percentage > 70) barColor = "#F59E0B"; // Laranja (Atenção)
  if (percentage >= 100) barColor = colors.danger; // Vermelho (Limite)

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <View style={styles.labelContainer}>
            <Ionicons name={icon} size={14} color="#6B7280" />
            <Text style={styles.progressLabel}>{label}</Text>
        </View>
        <Text style={styles.progressValue}>
            <Text style={{color: barColor, fontWeight: "bold"}}>{current}</Text>
            <Text style={{color: "#9CA3AF"}}> / {total}</Text>
        </Text>
      </View>
      
      <View style={styles.progressTrack}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${percentage}%`, backgroundColor: barColor }
          ]} 
        />
      </View>
    </View>
  );
};

export const PlanStatusCard = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* 1. CARD DE LIMITES (STATUS) */}
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Plano Atual</Text>
            <Text style={styles.subtitle}>Renova em 15 dias</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>START (GRÁTIS)</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Barras de Progresso */}
        <ProgressBar icon="cube-outline" label="Produtos Cadastrados" current={42} total={50} />
        <ProgressBar icon="sparkles-outline" label="Descrições com IA" current={1} total={5} />
        <ProgressBar icon="images-outline" label="Fotos na Galeria" current={150} total={150} />
        
        {/* Item Extra (Vendas) */}
        <View style={styles.unlimitedRow}>
          <View style={styles.labelContainer}>
            <Ionicons name="cart-outline" size={14} color="#6B7280" />
            <Text style={styles.progressLabel}>Vendas Online</Text>
          </View>
          <View style={styles.unlimitedBadge}>
             <Ionicons name="infinite" size={12} color={colors.success} />
             <Text style={styles.unlimitedText}>ILIMITADO</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.outlineButton}
          onPress={() => router.push("/subscription/plans")}
        >
          <Text style={styles.outlineButtonText}>Gerenciar Assinatura</Text>
        </TouchableOpacity>
      </View>

      {/* 2. BANNER FOGUETE (UPSELL) */}
      <TouchableOpacity 
        style={styles.rocketCard}
        activeOpacity={0.9}
        onPress={() => router.push("/subscription/plans")}
      >
        <View style={styles.rocketContent}>
            <Text style={styles.rocketTitle}>Seja PRO! 🚀</Text>
            <Text style={styles.rocketSubtitle}>
              Remova todos os limites e tenha IA ilimitada para sua loja voar.
            </Text>
            <View style={styles.rocketButton}>
                <Text style={styles.rocketButtonText}>Ver Planos Premium</Text>
                <Ionicons name="arrow-forward" size={12} color="#000" />
            </View>
        </View>
        
        {/* Elemento Decorativo no Fundo */}
        <View style={styles.rocketDecoration}>
            <Ionicons name="rocket" size={80} color="rgba(255,255,255,0.2)" />
        </View>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 40 },
  
  // CARD BRANCO
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#9CA3AF",
  },
  badge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  badgeText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: "#4B5563",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 16,
  },

  // PROGRESS BAR
  progressContainer: {
    marginBottom: 14,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  progressLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.body,
  },
  progressValue: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },
  progressTrack: {
    height: 8, // Mais grossinho
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },

  // UNLIMITED ROW
  unlimitedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  unlimitedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#ECFDF5", // Verde claro
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  unlimitedText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: colors.success,
  },

  // BOTÃO CARD 1
  outlineButton: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  outlineButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: colors.text.main,
  },

  // ROCKET CARD (AMARELO)
  rocketCard: {
    backgroundColor: colors.primary, // Amarelo
    borderRadius: 20,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    overflow: "hidden", // Para cortar o ícone de fundo
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  rocketContent: {
    flex: 1,
    zIndex: 2, // Fica na frente da decoração
    paddingRight: 20,
  },
  rocketTitle: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 20,
    color: "#000",
    marginBottom: 4,
  },
  rocketSubtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#333",
    marginBottom: 16,
    lineHeight: 18,
  },
  rocketButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#000",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  rocketButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 11,
    color: colors.primary, // Texto amarelo no fundo preto
  },
  
  // DECORAÇÃO DE FUNDO
  rocketDecoration: {
    position: "absolute",
    right: -10,
    bottom: -10,
    zIndex: 1,
    transform: [{ rotate: '-15deg' }]
  },
});