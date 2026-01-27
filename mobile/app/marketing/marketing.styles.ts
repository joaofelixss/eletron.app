import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../src/constants/colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Branco puro
  },
  
  // HEADER
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: colors.text.main,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    padding: 20,
    paddingBottom: 100,
  },

  // --- JUH CARD ---
  juhCard: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#8B5CF6", // Sombra roxa sutil (marca da Juh)
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3E8FF",
  },
  juhHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  juhAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  juhName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#4C1D95", // Roxo escuro para o nome
  },
  juhRole: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#8B5CF6", // Roxo médio
  },
  tipBox: {
    backgroundColor: "#F5F3FF", 
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#8B5CF6",
  },
  tipText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#5B21B6",
    lineHeight: 18,
  },

  // --- TOOLS GRID ---
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: colors.text.main,
    marginBottom: 16,
  },
  toolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  toolCard: {
    width: (width - 52) / 2, // 2 colunas
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  toolIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  toolTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.text.main,
    marginBottom: 4,
  },
  toolDesc: {
    fontSize: 11,
    color: colors.text.body,
    lineHeight: 16,
  },

  // --- IDEA ROW ---
  ideaRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ideaIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  ideaTitle: {
    fontFamily: "Poppins_500Medium",
    color: colors.text.main,
    fontSize: 13,
  },
  ideaMeta: {
    fontSize: 11,
    color: colors.text.light,
  },
  ideaButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ideaButtonText: {
    fontSize: 11,
    color: colors.text.main,
    fontWeight: "bold",
  },

  // --- SUBPAGE: COPYWRITER ---
  backLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  backLinkText: {
    color: colors.text.body,
    fontSize: 14,
  },
  pageTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: colors.text.main,
  },
  pageSubtitle: {
    fontSize: 14,
    color: colors.text.body,
    marginBottom: 24,
  },
  
  formCard: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.text.main,
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    color: colors.text.main,
    fontSize: 14,
    marginBottom: 24,
  },
  toneRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  toneBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toneActive: {
    backgroundColor: colors.primary, // DOURADO
    borderColor: colors.primary,
  },
  toneText: {
    fontSize: 12,
    color: colors.text.body,
    fontWeight: "600",
  },
  toneTextActive: {
    color: colors.text.onPrimary, // Texto preto no Dourado
  },
  
  magicButton: {
    backgroundColor: colors.primary, // DOURADO (Identidade Eletron)
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  magicButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.onPrimary, // Preto
  },

  // RESULT
  resultContainer: {
    marginTop: 24,
    backgroundColor: "#F5F3FF", // Roxo Juh (Background)
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  resultTitle: {
    color: "#7C3AED",
    fontWeight: "bold",
  },
  resultBody: {
    color: "#4C1D95",
    fontSize: 14,
    lineHeight: 24,
    fontFamily: "Poppins_400Regular",
  },
});