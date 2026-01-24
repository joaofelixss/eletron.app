import { StyleSheet, Platform } from "react-native";
import { colors } from "../../src/constants/colors"; // Ajuste o caminho se necessário

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background, // hover:bg-gray-100 do HTML
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: colors.text.main,
    marginRight: 40, // Para compensar o botão de voltar e centralizar
  },

  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 120, // Espaço para o footer não cobrir o conteúdo
  },

  // Card do Produto
  productCard: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
    // Sombra suave (shadow-card do HTML)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  productInfo: {
    flex: 1,
    justifyContent: "space-between",
    paddingRight: 16,
  },
  stockBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(244, 209, 37, 0.15)", // Primary bem clarinho
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
    marginBottom: 8,
  },
  stockText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: colors.text.main,
  },
  productName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
    lineHeight: 20,
  },
  productVariant: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.body,
    marginTop: 4,
  },
  productPrice: {
    fontFamily: "Poppins_700Bold", // font-extrabold do HTML
    fontSize: 18,
    color: colors.text.main,
    marginTop: 12,
  },
  productImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: colors.background,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  // Input de Cliente
  sectionLabel: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: colors.text.main,
    marginBottom: 8,
    marginLeft: 4,
  },
  clientInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  clientInput: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: colors.text.main,
    height: "100%",
  },

  // Métodos de Pagamento
  paymentGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  paymentOption: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent", // Borda transparente por padrão
    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentOptionSelected: {
    borderColor: colors.primary, // Borda amarela quando selecionado
    backgroundColor: "rgba(244, 209, 37, 0.05)", // Fundo amarelinho
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  iconCircleSelected: {
    backgroundColor: colors.primary,
  },
  paymentText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: colors.text.main,
  },
  checkBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },

  // Resumo (Order Summary)
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: colors.text.body,
  },
  summaryValue: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: colors.text.main,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    borderStyle: "dashed", // React Native precisa de um hack pra dashed, mas solid funciona bem
    marginVertical: 4,
  },
  totalLabel: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },
  totalValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },

  // Footer Fixo
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  footerTotalLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.body,
  },
  footerTotalValue: {
    fontFamily: "Poppins_700Bold", // font-extrabold no HTML
    fontSize: 24,
    color: colors.text.main,
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  checkoutButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#000000", // Preto no amarelo para contraste
  },
});