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
    paddingBottom: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoBox: {
    width: 32,
    height: 32,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: colors.text.main,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    padding: 24,
    paddingBottom: 120, // Espaço extra pro final
  },

  // SUMMARY CARDS (GRID)
  summaryGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  
  // Cartão Preto (Destaque)
  darkCard: {
    flex: 1,
    backgroundColor: colors.cardDark,
    borderRadius: 16,
    padding: 20,
    justifyContent: "space-between",
    minHeight: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    position: "relative",
    overflow: "hidden",
  },
  chartIconOp: {
    position: "absolute",
    top: 10,
    right: 10,
    opacity: 0.1,
  },
  cardLabelLight: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  cardValueLight: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#FFF",
  },
  trendBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 4,
  },
  trendText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: colors.primary,
  },

  // Cartão Branco (Pedidos)
  lightCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "space-between",
  },
  lightCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconBox: {
    backgroundColor: "rgba(234, 197, 79, 0.15)", // Amarelo claro
    padding: 6,
    borderRadius: 8,
  },
  cardLabelDark: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.muted,
  },
  cardValueDark: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: colors.text.main,
  },
  cardSubDark: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: colors.text.light,
  },

  // CHART SECTION
  chartSection: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },
  sectionSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: colors.text.muted,
  },
  filterBadge: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.body,
  },
  
  // Custom Bar Chart
  chartArea: {
    height: 180,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  chartBarContainer: {
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  barTrack: {
    width: 8,
    backgroundColor: colors.background, // Cinza fundo da barra
    height: "100%",
    borderRadius: 4,
    position: "relative",
    justifyContent: "flex-end",
  },
  barFill: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  barLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
    color: colors.text.light,
  },

  // TOP PRODUCTS
  productsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  linkText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: colors.primary,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  productLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  productIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  productName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.text.main,
  },
  productSales: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: colors.text.muted,
  },
  productRight: {
    alignItems: "flex-end",
  },
  productRevenue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: colors.text.main,
  },
  growthBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  growthText: {
    fontSize: 10,
    fontFamily: "Poppins_700Bold",
  },

  // AI TIP (Floating)
  aiFloatingContainer: {
    position: "absolute",
    bottom: 24,
    right: 24,
    alignItems: "flex-end",
    zIndex: 20,
  },
  aiBubble: {
    backgroundColor: colors.cardDark,
    padding: 16,
    borderRadius: 16,
    borderBottomRightRadius: 4, // "Bico" do balão
    marginBottom: 12,
    maxWidth: 240,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  aiTitle: {
    color: colors.primary,
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    textTransform: "uppercase",
  },
  aiText: {
    color: "#FFF",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 18,
  },
  aiHighlight: {
    fontFamily: "Poppins_700Bold",
    color: colors.primary,
  },
  aiAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF",
    borderWidth: 4,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});