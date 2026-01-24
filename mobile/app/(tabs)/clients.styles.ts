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
    backgroundColor: "rgba(255,255,255,0.9)", // Levemente transparente
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: colors.text.main,
    letterSpacing: -0.5,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
  },

  // SEARCH BAR
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: colors.text.main,
  },

  // LIST HEADER
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  listCount: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  filterText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: colors.text.main,
  },

  // CLIENT CARD
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Espaço para o FAB
  },
  clientCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 16,
  },
  
  // Avatar
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  avatarText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },

  // Info
  clientInfo: {
    flex: 1,
    justifyContent: "center",
  },
  clientName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },
  clientPhone: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: colors.text.muted,
  },

  // Badge (Reparos)
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  badgeHigh: {
    backgroundColor: "rgba(234, 197, 79, 0.15)", // Amarelo
  },
  badgeLow: {
    backgroundColor: colors.surface,
  },
  badgeText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
  },
  badgeTextHigh: {
    color: "#854D0E", // Marrom/Dourado escuro
  },
  badgeTextLow: {
    color: colors.text.muted,
  },

  // FAB
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
});