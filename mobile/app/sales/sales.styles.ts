import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../src/constants/colors";

const { width } = Dimensions.get("window");

export const salesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  
  // HEADER
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: colors.text.main,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  // CONTEÚDO SCROLLÁVEL
  content: {
    paddingBottom: 160, // Espaço GRANDE para o Footer do PDV e TabBar
  },

  // SEÇÃO: CLIENTE
  sectionCard: {
    backgroundColor: "#FFF",
    padding: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  clientRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  clientName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#111827",
  },
  changeClientText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: colors.primary,
  },

  // SEÇÃO: PRODUTOS (PDV GRID)
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    gap: 10,
  },
  productCardSmall: {
    width: (width - 40) / 2, // 2 colunas
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  prodImageSmall: {
    width: "100%",
    height: 80,
    resizeMode: "contain",
    marginBottom: 8,
  },
  prodName: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#374151",
    height: 36, // Limita altura
  },
  prodPrice: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: "#111827",
  },
  addButtonSmall: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: colors.primary,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  // LISTA DE ITENS (RECIBO)
  itemRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    alignItems: "center",
  },
  qtyBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 12,
  },
  qtyText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemPrice: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#111827",
  },

  // FOOTER FLUTUANTE (CARRINHO)
  footer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 100 : 80, // Acima da TabBar
    left: 20,
    right: 20,
    backgroundColor: "#18181B",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  totalLabel: {
    color: "#9CA3AF",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
  totalValue: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  checkoutText: {
    fontFamily: "Poppins_700Bold",
    color: "#000",
  },
});