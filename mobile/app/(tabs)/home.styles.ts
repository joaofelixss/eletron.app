import { StyleSheet, Platform } from "react-native";
import { colors } from "../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // HEADER
  headerContainer: {
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  onlineBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: colors.primary,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  welcomeText: {
    fontFamily: "Poppins_600SemiBold", // Usando nossa fonte Poppins
    fontSize: 10,
    color: colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  brandText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: colors.text.main,
    lineHeight: 22,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },

  content: {
    paddingBottom: 100,
  },

  // STATS CARDS (Lucro e Reparos)
  statsGrid: {
    flexDirection: "row",
    gap: 16,
    padding: 24,
  },
  statCard: {
    flex: 1,
    height: 160,
    borderRadius: 24,
    padding: 20,
    justifyContent: "space-between",
    overflow: "hidden",
    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 2,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)", // Vidro
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(234, 197, 79, 0.15)", // Amarelo transparente
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 2,
  },
  badgeText: {
    fontSize: 10,
    color: colors.primary,
    fontFamily: "Poppins_700Bold",
  },
  statLabel: {
    fontSize: 10,
    color: "#888",
    textTransform: "uppercase",
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 28,
    color: "#FFF",
    fontFamily: "Poppins_700Bold",
  },

  // AI SEARCH BAR
  searchSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
    zIndex: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 64,
    borderRadius: 16,
    paddingLeft: 20,
    paddingRight: 8,
    // Glow Effect (Sombra amarela)
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(234, 197, 79, 0.3)",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: colors.text.main,
    marginLeft: 12,
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.cardDark,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  // MODULES GRID
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: colors.text.main,
  },
  seeAllButton: {
    fontSize: 12,
    fontFamily: "Poppins_700Bold",
    color: colors.text.main,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  modulesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  moduleCard: {
    width: "47%", // Quase metade
    aspectRatio: 1.1, // Quadrado levemente retangular
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  moduleContent: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)", // Overlay escuro
  },
  moduleIconContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  moduleTitle: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  moduleSubtitle: {
    color: colors.primary,
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
  },

  // ACTIVITY TIMELINE
  timelineSection: {
    paddingHorizontal: 24,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 24, // Espaço entre itens
  },
  timelineLineContainer: {
    width: 20,
    alignItems: "center",
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.cardDark,
    borderWidth: 2,
    borderColor: "#FFF",
    zIndex: 2,
  },
  timelineLine: {
    width: 2,
    backgroundColor: colors.border,
    flex: 1,
    marginTop: -2,
    marginBottom: -24, // Conecta com o de baixo
  },
  timelineContent: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    // Layout interno
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    color: colors.text.main,
  },
  activitySubtitle: {
    fontSize: 12,
    color: colors.text.muted,
    fontFamily: "Poppins_400Regular",
  },
  activityTime: {
    fontSize: 10,
    fontFamily: "Poppins_700Bold",
    color: "#999",
  },
});