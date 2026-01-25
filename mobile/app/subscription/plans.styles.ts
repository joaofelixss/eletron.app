import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // HEADER
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  
  // HERO
  heroSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  heroTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: colors.text.main,
  },

  // STATUS ATUAL
  currentPlanBanner: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  currentPlanText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#4B5563",
  },
  currentPlanBold: {
    fontFamily: "Poppins_700Bold",
    color: colors.text.main,
  },

  // 1. SELETOR DE CICLO
  cycleContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 4,
    marginBottom: 32, // Mais espaço por causa dos balões
    marginTop: 10,
  },
  cycleBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    position: "relative",
    zIndex: 1,
  },
  cycleBtnActive: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 2,
  },
  cycleText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#6B7280",
  },
  cycleTextActive: {
    color: "#000",
    fontWeight: "bold",
  },
  
  // Balões de desconto (Badges)
  badgeTop: {
    position: "absolute",
    top: -14,
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  badgeTopText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "uppercase",
  },

  // 2. ABAS DE PLANOS
  tabsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
    height: 60, // Altura fixa para acomodar o troféu
    alignItems: "flex-end", // Alinha botões por baixo
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  tabText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#6B7280",
  },
  // Troféu flutuante
  trophyIcon: {
    position: "absolute",
    top: -24,
    zIndex: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  // 3. CARD CENTRAL
  mainCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    borderWidth: 2, 
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    position: "relative",
    overflow: "visible",
  },
  cardBadge: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: -70 }], 
    width: 140,
    paddingVertical: 6,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: "center",
  },
  cardBadgeText: {
    color: "#FFF",
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
  },
  pricingHeader: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 20,
  },
  totalLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  priceValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 36,
    color: colors.text.main,
  },
  priceSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: colors.text.light,
    marginTop: 4,
  },
  savingText: {
    marginTop: 12,
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: colors.success,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 20,
  },
  featureList: {
    gap: 12,
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureText: {
    flex: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: colors.text.main,
  },
  newBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  newBadgeText: {
    fontSize: 8,
    fontWeight: "bold",
  },
  actionButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  actionButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#FFF",
  },
  footerNote: {
    textAlign: "center",
    marginTop: 16,
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "#9CA3AF",
  },
});