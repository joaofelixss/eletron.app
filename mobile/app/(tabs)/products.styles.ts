import { StyleSheet, Platform } from "react-native";
import { colors } from "../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50, // Espaço StatusBar
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.white,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.gray,
  },
  
  // Barra de Pesquisa
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    color: colors.text.white,
    marginLeft: 10,
    fontSize: 16,
  },

  // Lista
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Espaço pro botão flutuante não tapar o último item
  },
  productCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.white,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: colors.text.gray,
    marginBottom: 8,
  },
  priceTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary, // Verde dinheiro
  },
  stockBadge: {
    backgroundColor: "#333",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  stockText: {
    fontSize: 10,
    color: colors.text.white,
    fontWeight: "bold",
  },
  lowStockBadge: {
    backgroundColor: "rgba(239, 68, 68, 0.2)", // Vermelho clarinho
  },
  lowStockText: {
    color: colors.danger,
  },

  // Botão Flutuante (FAB)
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});