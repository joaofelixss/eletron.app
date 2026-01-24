import { StyleSheet } from "react-native";
import { colors } from "../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Fundo Gelo
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.main, // Preto
  },
  storeName: {
    fontSize: 14,
    color: colors.text.body, // Cinza
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface, // Branco
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    // Sombra suave
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  card: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.surface, // Branco
    borderWidth: 1,
    borderColor: colors.border,
    // Sombra para destacar do fundo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  cardLabel: {
    fontSize: 12,
    color: colors.text.body, // Cinza
    fontWeight: "600",
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text.main, // Preto
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 10,
    color: colors.text.light,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.main, // Preto
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  actionButton: {
    width: "47%",
    backgroundColor: colors.surface, // Branco
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionText: {
    color: colors.text.main, // Preto
    fontWeight: "600",
    fontSize: 14,
  },
  promoBanner: {
    marginTop: 24,
    backgroundColor: "#111827", // Fundo PRETO para o banner Black (destaque)
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    color: "#FFF", // Texto Branco no fundo Preto
    fontWeight: "bold",
    fontSize: 16,
  },
  promoText: {
    color: "#9CA3AF", // Cinza claro
    fontSize: 12,
  },
  upgradeButton: {
    backgroundColor: colors.primary, // Amarelo
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  upgradeText: {
    color: "#000", // Preto no fundo Amarelo
    fontWeight: "bold",
    fontSize: 12,
  },
});