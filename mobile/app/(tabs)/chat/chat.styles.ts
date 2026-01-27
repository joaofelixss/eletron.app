import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../../src/constants/colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7", // Fundo levemente cinza (estilo WhatsApp/Telegram)
  },

  // --- HEADER ---
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: colors.text.main,
  },
  
  // TOGGLE (Abas)
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 10,
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
    color: "#9CA3AF",
  },
  toggleTextActive: {
    color: "#111827",
    fontWeight: "bold",
  },

  // LISTA DE ASSISTENTES
  assistantsList: {
    paddingHorizontal: 20,
    paddingBottom: 4,
    gap: 16,
  },
  assistantItem: {
    alignItems: "center",
    opacity: 0.5, // Fica meio apagado se não selecionado
    transform: [{ scale: 0.9 }],
  },
  assistantItemActive: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  assistantAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "transparent",
    marginBottom: 4,
  },
  assistantAvatarActive: {
    borderColor: colors.primary, // Borda amarela quando ativo
  },
  assistantName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#111827",
  },
  assistantRole: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "#6B7280",
    marginTop: -2,
  },

  // --- ÁREA DO CHAT ---
  chatContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  
  // Separador de Data
  dateSeparator: {
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
    color: "#6B7280",
  },

  // BALÕES DE MENSAGEM
  bubbleContainer: {
    flexDirection: "row",
    marginBottom: 16,
    maxWidth: "85%",
  },
  bubbleUser: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  bubbleBot: {
    alignSelf: "flex-start",
  },
  
  chatAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    alignSelf: "flex-end", // Fica na base da mensagem
  },

  bubbleContent: {
    padding: 12,
    borderRadius: 16,
    minWidth: 100,
  },
  // Estilo Bolha Usuário
  bubbleContentUser: {
    backgroundColor: "#18181B", // Preto
    borderBottomRightRadius: 2, // Pontinha
  },
  // Estilo Bolha Bot
  bubbleContentBot: {
    backgroundColor: "#FFF", // Branco
    borderBottomLeftRadius: 2, // Pontinha
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  msgText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 20,
  },
  msgTextUser: {
    color: "#FFF",
  },
  msgTextBot: {
    color: "#1F2937",
  },

  msgTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: "flex-end",
  },

  // --- FOOTER (INPUT) ---
  footer: {
    backgroundColor: "#FFF",
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 100 : 80, // Espaço da TabBar
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  
  // Sugestões
  suggestionsScroll: {
    paddingHorizontal: 16,
    marginBottom: 12,
    maxHeight: 34,
  },
  suggestionChip: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  suggestionText: {
    fontSize: 12,
    color: "#4B5563",
    fontFamily: "Poppins_500Medium",
  },

  // Linha de Input
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
  },
  attachButton: {
    padding: 8,
  },
  inputFieldContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    maxHeight: 100,
  },
  inputField: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#111827",
    maxHeight: 80,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary, // Amarelo
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
});