import { StyleSheet, Platform } from "react-native";
import { colors } from "../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // HEADER DA TELA
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: colors.background, // Fundo sólido (sem blur no android por padrão)
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
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
  placeholderButton: {
    width: 40,
  },

  content: {
    paddingBottom: 40,
  },

  // PROFILE HEADER (FOTO + NOME)
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: colors.surface,
    marginBottom: 16,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatarBox: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 4,
    borderColor: "rgba(234, 197, 79, 0.2)", // Amarelo transparente
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.surface,
  },
  userName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: colors.text.main,
    marginBottom: 4,
  },
  userStore: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: colors.text.muted,
    marginBottom: 16,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: colors.text.onPrimary,
    textTransform: "uppercase",
  },

  // STATS SECTION
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 100,
    justifyContent: "space-between",
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  statLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.muted,
    flex: 1, // Para o texto quebrar se precisar
    marginRight: 8,
  },
  statValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: colors.text.main,
  },

  // MENU GROUPS
  menuGroup: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  cardGroup: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.surface,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 70, // Alinhado com o texto
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(234, 197, 79, 0.15)", // Amarelo claro
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
    color: colors.text.main,
  },
  itemSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: colors.text.muted,
  },
  proBadge: {
    backgroundColor: "#000",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  proText: {
    color: colors.primary,
    fontSize: 10,
    fontFamily: "Poppins_700Bold",
  },

  // LOGOUT
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  logoutIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FEF2F2", // Vermelho claro
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  logoutText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.danger,
    flex: 1,
  },
  versionText: {
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.light,
    marginTop: 24,
  },
});