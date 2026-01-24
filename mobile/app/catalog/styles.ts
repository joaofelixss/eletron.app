import { StyleSheet, Platform } from "react-native";
import { colors } from "../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Fundo claro
  },
  
  // HEADER
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
    backgroundColor: colors.surface,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: colors.text.main,
    textAlign: "center",
    flex: 1,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
  },

  content: {
    paddingBottom: 100, // Espaço para o footer
  },

  // LINK SECTION
  linkSection: {
    padding: 20,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: colors.text.main,
    marginBottom: 8,
  },
  sectionDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: colors.text.body,
    marginBottom: 20,
    lineHeight: 22,
  },
  label: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: colors.text.main,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  linkInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    height: 56,
    overflow: "hidden",
  },
  linkIcon: {
    paddingLeft: 16,
    paddingRight: 12,
  },
  linkText: {
    flex: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: colors.text.main,
  },
  copyButton: {
    width: 56,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    backgroundColor: colors.surface,
  },

  // LIST HEADER
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginTop: 8,
  },
  listTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: colors.text.main,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  filterText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: colors.text.body,
  },

  // PRODUCTS LIST
  listContainer: {
    padding: 20,
    gap: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: colors.text.main,
  },

  // PRODUCT CARD
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inactiveCard: {
    opacity: 0.6,
    backgroundColor: "#F9FAFB", // Um pouco mais cinza
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  productInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  productName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: colors.text.main,
    marginBottom: 2,
  },
  productSku: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: colors.text.muted,
    marginBottom: 2,
  },
  productPrice: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: colors.text.main,
  },
  strikethrough: {
    textDecorationLine: "line-through",
    color: colors.text.light,
  },

  // FOOTER
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary, // Amarelo
    height: 56,
    borderRadius: 16,
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  viewButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.onPrimary,
  },
});