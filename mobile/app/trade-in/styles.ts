import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../src/constants/colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181B", // Fundo Dark (Zinc 900)
  },

  // HEADER
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#FFF",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  // CONTENT
  content: {
    paddingBottom: 280, // Espaço GRANDE para o Footer Fixo
  },
  
  // SEÇÃO DE ENTRADA (CARD PRETO MAIS CLARO)
  formContainer: {
    backgroundColor: "#27272A", // Zinc 800
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#3F3F46",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(234, 197, 79, 0.1)", // Amarelo bem suave
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(234, 197, 79, 0.3)",
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#E4E4E7", // Zinc 200
  },

  // INPUTS
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#A1A1AA", // Zinc 400
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B", // Fundo Input (Escuro)
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: "#3F3F46",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontFamily: "Poppins_500Medium",
    color: "#FFF",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  flex1: {
    flex: 1,
  },

  // CARD DE AVALIAÇÃO (DESTAQUE)
  valuationCard: {
    marginTop: 8,
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.primary, // Borda Amarela
    borderStyle: "dashed", // Estilo pontilhado
  },
  valuationLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.primary,
    marginBottom: 8,
  },
  valuationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  moneyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbol: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#FFF",
    marginRight: 4,
  },
  moneyInput: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#FFF",
    minWidth: 100,
  },
  
  // SUGESTÃO IA
  aiSuggestion: {
    alignItems: "flex-end",
  },
  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(234, 197, 79, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  aiText: {
    fontSize: 10,
    color: colors.primary,
    fontFamily: "Poppins_600SemiBold",
  },
  aiRange: {
    fontSize: 11,
    color: "#71717A",
    fontFamily: "Poppins_500Medium",
  },

  // DIVIDER
  divider: {
    height: 1,
    backgroundColor: "#3F3F46",
    marginVertical: 24,
    marginHorizontal: 20,
  },

  // SEÇÃO DE SAÍDA
  sectionHeaderSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  changeItemButton: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: "Poppins_600SemiBold",
  },
  
  // CARD PRODUTO SAÍDA
  productCard: {
    backgroundColor: "#27272A",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    gap: 16,
    borderWidth: 1,
    borderColor: "#3F3F46",
  },
  productImage: {
    width: 80,
    height: 100,
    borderRadius: 12,
    backgroundColor: "#18181B",
    justifyContent: "center",
    alignItems: "center",
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFF",
    flex: 1,
    marginRight: 8,
  },
  newBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newText: {
    fontSize: 10,
    color: "#FFF",
    fontWeight: "bold",
  },
  productSpec: {
    fontSize: 12,
    color: "#A1A1AA",
    marginTop: -4,
  },
  sellLabel: {
    fontSize: 10,
    color: "#71717A",
    textTransform: "uppercase",
    marginTop: 8,
  },
  sellPrice: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#FFF",
  },

  // ACESSÓRIOS
  accessoriesScroll: {
    paddingLeft: 20,
    marginTop: 16,
  },
  accessoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#27272A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3F3F46",
    marginRight: 8,
    gap: 6,
  },
  accessoryText: {
    fontSize: 12,
    color: "#D4D4D8",
    fontFamily: "Poppins_500Medium",
  },

  // FOOTER FINANCEIRO FIXO
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1F1F22", // Ligeiramente mais claro que o fundo
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    // Sombra para destacar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
    borderTopWidth: 1,
    borderTopColor: "#3F3F46",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#A1A1AA",
    fontFamily: "Poppins_500Medium",
  },
  summaryValue: {
    fontSize: 14,
    color: "#FFF",
    fontFamily: "Poppins_600SemiBold",
  },
  summaryValuePrimary: {
    color: colors.primary, // Amarelo
  },
  dashedLine: {
    height: 1,
    borderWidth: 1,
    borderColor: "#3F3F46",
    borderStyle: "dashed",
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    color: "#FFF",
    fontFamily: "Poppins_600SemiBold",
  },
  totalValue: {
    fontSize: 28, // BEM GRANDE
    color: "#FFF",
    fontFamily: "Poppins_700Bold",
  },
  
  finishButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  finishButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#000",
  },
});