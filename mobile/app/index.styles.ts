import { StyleSheet } from "react-native";
import { colors } from "../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: "center", // Centraliza tudo verticalmente
  },
  
  // ÁREA CENTRAL (Logo e Form)
  content: {
    width: "100%",
    alignItems: "center",
  },
  
  logo: {
    width: 80,  // Diminuí de 120 para 80
    height: 80,
    resizeMode: "contain",
    marginBottom: 40, // Espaço da logo pro texto
  },

  textContainer: {
    width: "100%",
    marginBottom: 24, // Espaço entre texto e input
    alignItems: "flex-start", // Alinha texto a esquerda fica mais moderno
  },
  
  title: {
    fontFamily: "Poppins_700Bold", // Fonte Nova
    fontSize: 22,
    color: colors.text.main,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: colors.text.body,
  },

  // FORMULÁRIO
  form: {
    width: "100%",
  },
  
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    height: 56,
    marginBottom: 16,
    overflow: "hidden",
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    height: "100%",
    backgroundColor: "#F9FAFB",
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  ddi: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: colors.text.main,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold", // Número em negrito
    color: colors.text.main,
  },

  button: {
    width: "100%",
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    shadowColor: colors.warning,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontFamily: "Poppins_700Bold",
    color: colors.text.onPrimary,
    fontSize: 16,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  orText: {
    marginHorizontal: 10,
    color: colors.text.light,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 56,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  googleText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: colors.text.main,
  },

  footer: {
    position: "absolute",
    bottom: 30,
    left: 24,
    right: 24,
    alignItems: "center",
  },
  termsText: {
    textAlign: "center",
    color: colors.text.light,
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
  },
  linkText: {
    color: colors.primary,
    fontFamily: "Poppins_700Bold",
  },
});