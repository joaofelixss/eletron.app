import { StyleSheet, Platform } from "react-native";
import { colors } from "../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // HEADER
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: colors.text.main,
    lineHeight: 28,
  },
  headerSubtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.muted,
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardDark, // Botão preto
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  content: {
    paddingBottom: 100,
  },

  // SCANNER BUTTON
  scanSection: {
    padding: 24,
    paddingBottom: 12,
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary, // Dourado
    height: 56,
    borderRadius: 16,
    gap: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  scanButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.onPrimary,
  },

  // SEARCH & FILTER
  searchSection: {
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: colors.text.main,
    marginLeft: 12,
  },

  // AI INSIGHT
  aiInsight: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 8,
  },
  aiText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.muted,
  },
  aiHighlight: {
    fontFamily: "Poppins_700Bold",
    color: colors.text.main,
    textDecorationLine: "underline",
  },

  // FILTERS SCROLL
  filtersScroll: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  filterChip: {
    height: 36,
    paddingHorizontal: 20,
    borderRadius: 18,
    justifyContent: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  filterChipActive: {
    backgroundColor: colors.cardDark,
    borderColor: colors.cardDark,
  },
  filterText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: colors.text.muted,
  },
  filterTextActive: {
    color: colors.primary, // Dourado no preto
  },
  warningChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderColor: colors.warning,
    backgroundColor: "rgba(245, 158, 11, 0.05)",
  },

  // PRODUCTS LIST
  productsList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  productCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  // Variação para baixo estoque (Borda Laranja)
  lowStockCard: {
    borderColor: "rgba(245, 158, 11, 0.3)",
    backgroundColor: "rgba(245, 158, 11, 0.02)",
  },
  lowStockStrip: {
    position: "absolute",
    left: 0,
    top: 16,
    bottom: 16,
    width: 4,
    backgroundColor: colors.warning,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },

  productHeader: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  productInfo: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
    flex: 1,
    marginRight: 8,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.background,
  },
  stockText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: colors.text.muted,
  },
  lowStockBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
  },
  lowStockText: {
    color: colors.warning,
  },
  productVariant: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 4,
  },
  productPrice: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: colors.text.main,
    marginTop: 8,
  },
  
  // ACTIONS
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sellButton: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  editButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sellText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: colors.text.onPrimary,
  },
  editText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.text.main,
  },
});