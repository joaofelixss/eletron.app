import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../../src/constants/colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  
  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    width: 40, 
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: colors.text.main,
  },
  
  // CONTEÚDO (SCROLL)
  content: {
    padding: 20,
    // AUMENTADO PARA O CONTEÚDO NÃO FICAR ESCONDIDO ATRÁS DO FOOTER FLUTUANTE
    paddingBottom: 200, 
  },

  // FILTROS
  filterRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
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

  // IA CARD (GLAUBER)
  aiCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#c0aede",
  },
  aiTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: colors.text.main,
  },
  aiDate: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#9CA3AF",
  },
  aiText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 20,
  },

  // BIG NUMBERS GRID
  summaryGrid: {
    marginBottom: 24,
  },
  profitCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  trendText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
  },
  cardLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#6B7280",
  },
  cardValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    color: colors.text.main,
    marginTop: 4,
  },

  smallGrid: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardLabelSmall: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  cardValueSmall: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: colors.text.main,
    marginBottom: 8,
  },
  barContainer: {
    height: 4,
    backgroundColor: "#F3F4F6",
    borderRadius: 2,
    width: "100%",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 2,
  },

  // BREAKDOWN (CUSTOS)
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: colors.text.main,
    marginBottom: 12,
  },
  breakdownCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 24,
  },
  breakdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  breakdownLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  breakdownLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#4B5563",
  },
  breakdownValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: colors.text.main,
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 12,
  },

  // KPI SECUNDÁRIOS
  kpiRow: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  kpiItem: {
    alignItems: "center",
    flex: 1,
  },
  kpiValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
    marginTop: 4,
  },
  kpiLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "#9CA3AF",
  },
  verticalDivider: {
    width: 1,
    height: "80%",
    backgroundColor: "#E5E7EB",
    alignSelf: "center",
  },

  // --- FOOTER FLUTUANTE (CORRIGIDO) ---
  footer: {
    position: "absolute",
    // ISSO RESOLVE O BUG: ELEVAMOS O FOOTER PARA FICAR ACIMA DA TAB BAR
    bottom: Platform.OS === "ios" ? 95 : 75, 
    left: 20, // Margem lateral para ficar estilo "Card Flutuante"
    right: 20,
    
    backgroundColor: "#FFF",
    borderRadius: 16, // Arredondado
    flexDirection: "row",
    padding: 16,
    gap: 12,
    
    // Sombra para destacar do fundo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  
  secondaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  secondaryButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.text.main,
  },
  primaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: "#000",
  },
});