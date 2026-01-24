import { StyleSheet, Platform } from "react-native";
import { colors } from "../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Fundo Branco/Gelo
  },
  keyboardView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between", // Espalha: Topo - Meio - Fim
    paddingTop: Platform.OS === "ios" ? 60 : 60,
    paddingBottom: 20,
  },

  // 1. HEADER
  header: {
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 100, // Logo num tamanho bom
    height: 100,
    resizeMode: "contain",
    marginBottom: 32,
  },
  textContainer: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: colors.text.main, // Preto
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: colors.text.body, // Cinza
    textAlign: "center",
    maxWidth: "80%",
    lineHeight: 22,
  },

  // 2. FORMULÁRIO
  form: {
    width: "100%",
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
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface, // Branco/Cinza claro
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    height: 56,
    paddingHorizontal: 16,
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    marginRight: 12,
    gap: 6,
  },
  flag: {
    fontSize: 20,
  },
  ddi: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.text.main,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: colors.text.main,
    height: "100%",
  },

  // BOTÕES
  button: {
    backgroundColor: colors.primary, // Amarelo
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
    color: colors.text.onPrimary, // Preto
  },

  // Divisor
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  orText: {
    marginHorizontal: 12,
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.light,
    textTransform: "uppercase",
  },

  googleButton: {
    height: 56,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  googleText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.text.main,
  },

  // 3. RODAPÉ
  footer: {
    alignItems: "center",
  },
  termsText: {
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: colors.text.light,
    lineHeight: 18,
  },
  linkText: {
    fontFamily: "Poppins_600SemiBold",
    color: colors.primary,
  },
});