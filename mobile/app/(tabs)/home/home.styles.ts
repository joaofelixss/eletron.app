import { StyleSheet, Platform } from "react-native";
import { colors } from "../../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // HEADER
  header: {
    // AUMENTAMOS O PADDING TOP AQUI PARA DESCER A BARRA
    paddingTop: Platform.OS === "ios" ? 70 : 50, 
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  
  // Perfil
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.surface,
    backgroundColor: "#E5E7EB",
  },
  welcome: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: colors.text.body,
  },
  storeName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },

  // Banner do Plano (Badge) no Header
  planBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(234, 197, 79, 0.3)",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  planText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: "#B45309",
  },

  // Notificações
  notifButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  notifDot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
    borderWidth: 1,
    borderColor: colors.surface,
  },

  // CONTEÚDO (SCROLLVIEW)
  content: {
    paddingHorizontal: 24,
    // ADICIONAMOS PADDING TOP AQUI PARA DESGRUDAR DA LINHA DO HEADER
    paddingTop: 24, 
    paddingBottom: 120, // Espaço extra no final para o Glauber não tapar o último card
  },

  // MANTIVE OS ESTILOS DO GLAUBER AQUI CASO PRECISE USAR LOCALMENTE EM ALGUM MOMENTO,
  // MAS COMO MOVEMOS PARA A TABBAR, ELES NÃO SERÃO USADOS PELO ARQUIVO HOME.TSX ATUAL.
  floatingContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    alignItems: "flex-end",
    zIndex: 999,
  },
  closeButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -10,
    marginRight: -5,
    zIndex: 1000,
  },
  assistantBubble: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: colors.primary,
    backgroundColor: "#c0aede",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  assistantImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: colors.danger,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
    zIndex: 1001,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 8,
    fontWeight: "bold",
  }
});