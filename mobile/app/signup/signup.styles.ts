import { StyleSheet, Platform } from "react-native";
import { colors } from "../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Branco
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepIndicator: {
    marginLeft: 16,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.primary, // Amarelo
  },

  // Titles
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: colors.text.main,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: colors.text.body,
    marginBottom: 40,
    lineHeight: 24,
  },

  // Inputs
  form: {
    gap: 20,
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: colors.text.main,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: "uppercase",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    height: 56,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: colors.text.main,
    height: "100%",
  },

  // Button (Fixed at bottom)
  footer: {
    padding: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },
  button: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: colors.warning,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.onPrimary,
  },
});