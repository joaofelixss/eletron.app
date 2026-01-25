import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../../src/constants/colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2", // Fundo levemente cinza para destacar os balões
  },
  
  // HEADER (Barra Superior)
  header: {
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    zIndex: 10,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: colors.text.main,
  },

  // TOGGLE (Equipe vs Clientes)
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  toggleActive: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#6B7280",
  },
  toggleTextActive: {
    color: colors.text.main,
    fontFamily: "Poppins_600SemiBold",
  },

  // ASSISTANT SELECTOR (Carrossel)
  assistantsList: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#FFF",
  },
  assistantItem: {
    alignItems: "center",
    marginRight: 16,
    opacity: 0.5, // Inativo fica meio apagado
    transform: [{ scale: 0.9 }],
  },
  assistantItemActive: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  assistantAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    borderWidth: 2,
    borderColor: "transparent",
    marginBottom: 4,
  },
  assistantAvatarActive: {
    borderColor: colors.primary,
  },
  assistantName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: colors.text.main,
  },
  assistantRole: {
    fontFamily: "Poppins_400Regular",
    fontSize: 9,
    color: colors.text.light,
  },

  // CHAT AREA
  chatContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 16,
  },
  
  // Mensagem Data/Hora
  dateSeparator: {
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 10,
    color: "#666",
    fontFamily: "Poppins_500Medium",
  },

  // Balão MENSAGEM (Comum)
  bubbleContainer: {
    flexDirection: "row",
    marginBottom: 16,
    maxWidth: "85%",
  },
  bubbleUser: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  bubbleBot: {
    alignSelf: "flex-start",
  },
  
  // Avatar no Chat
  chatAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#DDD",
    marginTop: 0, // Alinha no topo
  },

  // O Balão em si
  bubbleContent: {
    padding: 12,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  bubbleContentUser: {
    backgroundColor: colors.primary,
    borderTopRightRadius: 2, // Pontinha
  },
  bubbleContentBot: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 2, // Pontinha
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  msgText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 20,
  },
  msgTextUser: {
    color: "#000",
  },
  msgTextBot: {
    color: "#333",
  },
  msgTime: {
    fontSize: 9,
    fontFamily: "Poppins_400Regular",
    marginTop: 4,
    alignSelf: "flex-end",
    opacity: 0.6,
  },

  // FOOTER (Input)
  footer: {
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  
  // Sugestões (Chips)
  suggestionsScroll: {
    marginBottom: 12,
  },
  suggestionChip: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },
  suggestionText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#4B5563",
  },

  // Input Bar
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  attachButton: {
    padding: 8,
  },
  inputFieldContainer: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    maxHeight: 100,
    color: "#000",
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});