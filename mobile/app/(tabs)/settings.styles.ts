import { StyleSheet, Platform } from "react-native";
import { colors } from "../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: colors.text.main,
    textAlign: "center",
    flex: 1,
    marginRight: 40, // Compensa o botão de voltar para centralizar
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // PROFILE SECTION
  profileSection: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 8,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.cardDark,
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  userName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: colors.text.main,
    marginBottom: 4,
  },
  userRole: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: colors.text.muted,
  },

  // SETTINGS GROUPS
  sectionTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginLeft: 12,
    marginBottom: 8,
    marginTop: 16,
  },
  groupContainer: {
    backgroundColor: colors.cardDark, // Fundo preto do card
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  
  // ITEM DA LISTA
  itemButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.cardDark,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginLeft: 60, // Alinhado com o texto
  },
  
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#FFF", // Texto branco no fundo escuro
  },
  itemValue: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: colors.text.muted,
    marginRight: 8,
  },

  // LOGOUT BUTTON
  logoutButton: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(239, 68, 68, 0.1)", // Vermelho transparente
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    gap: 8,
  },
  logoutText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.danger,
  },
  versionText: {
    textAlign: "center",
    marginTop: 16,
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.muted,
  },
});