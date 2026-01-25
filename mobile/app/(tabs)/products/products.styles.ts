import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../../src/constants/colors";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2; // (Tela - Paddings) / 2 colunas

export const styles = StyleSheet.create({
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: colors.text.main,
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  // SEARCH & SCAN
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: "#FFF",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: colors.text.main,
  },
  scanButtonSmall: {
    padding: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    marginLeft: 8,
  },

  // AI INSIGHT
  aiContainer: {
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: "#EEF2FF", // Azul bem clarinho
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  aiText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#3730A3",
    flex: 1,
  },

  // FILTROS
  filterScroll: {
    paddingHorizontal: 20,
    marginBottom: 16,
    maxHeight: 40,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#6B7280",
  },
  filterTextActive: {
    color: "#000",
    fontWeight: "bold",
  },

  // --- GRID DE PRODUTOS ---
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120, // Espaço para FAB e TabBar
  },
  
  // O CARD (VITRINE)
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 16,
    
    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    overflow: "hidden",
  },
  
  imageContainer: {
    height: 140,
    width: "100%",
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  productImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  
  // Badge de Estoque (Sobre a imagem)
  stockBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  stockText: {
    color: "#FFF",
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
  },
  lowStockBadge: {
    backgroundColor: colors.danger,
  },

  // Botão de Ação Rápida (Sobre a imagem)
  quickAction: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // Info do Produto
  infoContainer: {
    padding: 12,
  },
  productName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#111827",
    marginBottom: 4,
    height: 40, // Altura fixa para alinhar
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: colors.text.main,
  },
  
  // FAB (Adicionar)
  fab: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 110 : 90, 
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 100,
  },
});