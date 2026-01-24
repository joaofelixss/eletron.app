import { StyleSheet } from "react-native";
import { colors } from "../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text.main,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.body,
    marginTop: 4,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text.light,
    textTransform: "uppercase",
    marginBottom: 10,
    marginLeft: 10,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    // Sombra leve
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.main,
  },
  optionSubtitle: {
    fontSize: 12,
    color: colors.text.light,
  },
  logoutButton: {
    marginTop: 40,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: "rgba(220, 38, 38, 0.05)",
  },
  logoutText: {
    color: colors.danger,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  versionText: {
    textAlign: "center",
    marginTop: 20,
    color: colors.text.light,
    fontSize: 12,
  },
});