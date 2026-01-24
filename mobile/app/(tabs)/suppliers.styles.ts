import { StyleSheet, Platform } from "react-native";
import { colors } from "../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A", // Fundo Dark Mode forçado para essa tela
  },
  
  // HEADER
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
    flex: 1,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(242, 242, 13, 0.1)", // Amarelo transparente
  },

  content: {
    paddingBottom: 100,
  },

  // SEARCH BAR
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#FFF",
  },

  // IA INSIGHT CARD
  insightContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  insightCard: {
    backgroundColor: "#2C2C1E", // Tom esverdeado escuro do design
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(242, 242, 13, 0.2)",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  insightIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(242, 242, 13, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  insightTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: colors.primary, // Amarelo
    marginBottom: 4,
  },
  insightText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#DDD",
    lineHeight: 20,
  },
  insightHighlight: {
    fontFamily: "Poppins_700Bold",
    color: "#FFF",
  },
  insightGreen: {
    fontFamily: "Poppins_700Bold",
    color: "#4ADE80", // Verde neon
  },

  // FILTERS
  filtersScroll: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  filterChip: {
    height: 36,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "#2C2C2C",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#AAA",
  },
  filterTextActive: {
    color: "#000",
  },

  // COMPARISON SECTION
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#FFF",
  },
  filterLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  filterLinkText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: colors.primary,
  },

  // SUPPLIER CARDS
  listContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  supplierCard: {
    backgroundColor: "#252525",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  bestPriceCard: {
    borderColor: "rgba(242, 242, 13, 0.4)",
    backgroundColor: "#2C2C20",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  bestPriceBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 12,
  },
  bestPriceText: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 10,
    color: "#000",
    textTransform: "uppercase",
  },
  
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  supplierInfo: {
    flexDirection: "row",
    gap: 12,
  },
  avatarBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: "#000",
  },
  supplierName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#FFF",
  },
  deliveryTime: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#888",
  },
  
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginVertical: 12,
  },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  lastBuyText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  stockBadge: {
    backgroundColor: "rgba(74, 222, 128, 0.1)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  stockText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: "#4ADE80",
  },
  
  priceContainer: {
    alignItems: "flex-end",
  },
  priceValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#FFF",
  },
  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trendText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: "#4ADE80",
  },
  linkText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: colors.primary,
    textDecorationLine: "underline",
  },

  disclaimer: {
    textAlign: "center",
    marginTop: 24,
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "#666",
  },
});