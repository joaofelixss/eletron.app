import { StyleSheet } from "react-native";
import { colors } from "../../../../src/constants/colors";

export const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 2,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#6B7280",
  },
  activeTabText: {
    color: "#000",
    fontFamily: "Poppins_600SemiBold",
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  
  // HERO SECTION
  heroSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  heroLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#6B7280",
  },
  heroValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: colors.text.main,
    marginTop: -4,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  heroBadgeText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: "#15803d",
  },

  // META BAR
  goalContainer: {
    marginBottom: 16,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  goalLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: "#9CA3AF",
  },
  goalValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 11,
    color: colors.primary,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 16,
  },

  // LISTA
  statsList: {
    gap: 16,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  statLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: colors.text.body,
  },
  statValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.text.main,
  },
  trendBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  trend: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
  },

  // FOOTER LINK
  linkButton: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  linkText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: colors.text.main,
  },
});