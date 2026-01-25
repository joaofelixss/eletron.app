import { StyleSheet, Platform } from "react-native";
import { colors } from "../../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: colors.text.main,
  },
  headerActions: {
    flexDirection: "row",
    gap: 16,
  },
  markAllText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: colors.primary,
  },

  // FILTROS
  filterScroll: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  filterChipActive: {
    backgroundColor: "#FFF",
    borderColor: colors.primary,
  },
  filterText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#6B7280",
  },
  filterTextActive: {
    color: colors.text.main,
    fontFamily: "Poppins_600SemiBold",
  },

  // LISTA
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 16,
    marginBottom: 12,
  },

  // CARD DE NOTIFICAÇÃO
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    // Sombra leve
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardUnread: {
    backgroundColor: "#FFFCF0", // Fundo levemente amarelado para não lidos
    borderColor: "rgba(234, 197, 79, 0.3)",
  },
  
  // Icone Lateral (Avatar do Assistente ou Icone de Sistema)
  iconContainer: {
    position: "relative",
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
  },
  systemIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  typeBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },

  // Conteúdo
  cardContent: {
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.text.main,
    flex: 1,
  },
  timeText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "#9CA3AF",
    marginLeft: 8,
  },
  cardBody: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 18,
  },

  // Ações (Botões dentro do card)
  actionRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  primaryAction: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  primaryActionText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: "#000",
  },
  secondaryAction: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  secondaryActionText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#4B5563",
  },
  
  // Bolinha de Não Lido
  unreadDot: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
  }
});