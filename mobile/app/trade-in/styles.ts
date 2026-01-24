import { StyleSheet, Platform } from "react-native";
import { colors } from "../../src/constants/colors";

// Paleta Específica desta Tela (Dark Olive/Military)
const theme = {
  bg: "#181811",
  surface: "#27271b",
  border: "#54543b",
  textSecondary: "#baba9c",
  primary: "#f2f20d",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  
  // HEADER
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.bg,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
    flex: 1,
    marginRight: 40,
  },

  content: {
    paddingBottom: 140, // Espaço para o footer grande
  },

  // SEÇÃO: APARELHO DE ENTRADA
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(242, 242, 13, 0.2)", // Primary com opacidade
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#FFF",
  },
  
  // FORMULÁRIO
  formContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: theme.textSecondary,
  },
  inputWrapper: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  input: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#FFF",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
  
  // CARD DE VALIAÇÃO
  valuationCard: {
    backgroundColor: "rgba(39, 39, 27, 0.5)",
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  valuationLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#FFF",
    marginBottom: 8,
  },
  valuationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  moneyInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.bg,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    color: theme.textSecondary,
    fontFamily: "Poppins_500Medium",
    marginRight: 4,
  },
  moneyInput: {
    color: "#FFF",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    flex: 1,
  },
  aiSuggestion: {
    alignItems: "flex-end",
  },
  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
  },
  aiText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: theme.primary,
    textTransform: "uppercase",
  },
  aiRange: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: theme.textSecondary,
  },

  divider: {
    height: 1,
    backgroundColor: theme.border,
    marginVertical: 24,
    opacity: 0.5,
  },

  // SEÇÃO: APARELHO DE SAÍDA
  sectionHeaderSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  changeItemButton: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: theme.primary,
    textTransform: "uppercase",
  },
  
  // CARD DE PRODUTO
  productCard: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 16,
    flexDirection: "row",
    gap: 16,
  },
  productImage: {
    width: 80,
    height: 96,
    borderRadius: 8,
    backgroundColor: theme.bg,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.border,
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#FFF",
    lineHeight: 20,
    flex: 1,
  },
  newBadge: {
    backgroundColor: "rgba(242, 242, 13, 0.1)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  newText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: theme.primary,
  },
  productSpec: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 4,
  },
  sellLabel: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: theme.textSecondary,
    textTransform: "uppercase",
    marginTop: 12,
  },
  sellPrice: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#FFF",
  },

  // ACESSÓRIOS SCROLL
  accessoriesScroll: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  accessoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(39, 39, 27, 0.3)",
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
    gap: 6,
  },
  accessoryText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: theme.textSecondary,
  },

  // FOOTER (RESUMO FINANCEIRO)
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1e1e16", // Cor específica do footer no design
    borderTopWidth: 1,
    borderTopColor: theme.border,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: theme.textSecondary,
  },
  summaryValue: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#FFF",
  },
  summaryValuePrimary: {
    color: theme.primary,
  },
  dashedLine: {
    height: 1,
    borderWidth: 1,
    borderColor: "rgba(84, 84, 59, 0.5)",
    borderStyle: "dashed",
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  totalLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#FFF",
    marginBottom: 4,
  },
  totalValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: theme.primary,
    lineHeight: 32,
  },
  finishButton: {
    backgroundColor: theme.primary,
    height: 56,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  finishButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#000",
  },
});