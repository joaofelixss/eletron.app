import { StyleSheet, Platform } from "react-native";
import { colors } from "../../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  
  // HEADER AMARELO (Dashboard Style)
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: "#18181B", // Fundo preto para contraste
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#FFF",
  },
  
  // DASHBOARD CARDS
  dashRow: {
    flexDirection: "row",
    gap: 12,
  },
  dashCard: {
    flex: 1,
    backgroundColor: "#27272A", // Cinza chumbo
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3F3F46",
  },
  dashLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  dashValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#FFF",
  },
  dashSub: {
    fontSize: 10,
    color: colors.primary, // Amarelo
    marginTop: 2,
  },

  // LISTA
  listContent: {
    padding: 20,
    paddingBottom: 120, // Espaço da TabBar
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#4B5563",
  },

  // CARD DE ITEM DE ESTOQUE (ROW)
  itemCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    
    // Sombra leve
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#1F2937",
  },
  itemSku: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#9CA3AF",
  },
  itemCost: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#4B5563",
    marginTop: 2,
  },

  // CONTROLES DE ESTOQUE
  stockControl: {
    alignItems: "flex-end",
  },
  stockValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#111827",
    marginBottom: 4,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 2,
  },
  stepBtn: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  
  // BADGES
  lowStockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
    position: "absolute",
    top: -2,
    right: -2,
    borderWidth: 1,
    borderColor: "#FFF",
  },
});