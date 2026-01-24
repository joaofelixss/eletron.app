import { StyleSheet, Platform } from "react-native";
import { colors } from "../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Branco ou Gelo
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
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
  },
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // TITLE SECTION
  heroSection: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 10,
  },
  heroTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: colors.text.main,
    textAlign: "center",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: colors.text.muted,
    textAlign: "center",
    maxWidth: "80%",
  },

  // TOGGLE (Mensal/Anual)
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    padding: 4,
    borderRadius: 12,
    marginBottom: 32,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: colors.border,
    position: "relative",
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  toggleActive: {
    backgroundColor: colors.cardDark, // Preto no ativo
  },
  toggleText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: colors.text.muted,
  },
  toggleTextActive: {
    color: "#FFF",
  },
  discountBadge: {
    position: "absolute",
    top: -12,
    right: -10,
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    transform: [{ rotate: "12deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  discountText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: "#FFF",
  },

  // CARDS
  cardsContainer: {
    gap: 20,
  },
  
  // Base Card
  planCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  // BLACK Card (Destaque)
  blackCard: {
    backgroundColor: colors.cardDark, // Preto
    borderColor: colors.primary,     // Borda Dourada
    borderWidth: 1.5,
    transform: [{ scale: 1.02 }], // Levemente maior
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    position: "relative",
    overflow: "hidden",
  },
  recommendedBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    alignItems: "center",
    paddingVertical: 4,
  },
  recommendedText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: "#000",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  // Card Content
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    marginTop: 8,
  },
  planName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: colors.text.main,
  },
  planNameDark: {
    color: "#FFF", // Nome branco no card preto
  },
  planDesc: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.muted,
  },
  
  priceContainer: {
    alignItems: "flex-end",
  },
  priceValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: colors.text.main,
  },
  priceValueDark: {
    color: colors.primary, // Preço dourado no card preto
  },
  pricePeriod: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: colors.text.muted,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 16,
  },
  dividerDark: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  // Features List
  featuresList: {
    gap: 12,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: colors.text.body,
  },
  featureTextDark: {
    color: "#E5E7EB", // Texto claro no card preto
  },

  // Button
  cardButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  cardButtonDark: {
    backgroundColor: colors.primary, // Botão Dourado
    borderColor: colors.primary,
  },
  buttonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: colors.text.main,
  },
  buttonTextDark: {
    color: "#000", // Texto preto no botão dourado
  },

  footerText: {
    textAlign: "center",
    marginTop: 32,
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: colors.text.light,
    paddingHorizontal: 20,
  },
});