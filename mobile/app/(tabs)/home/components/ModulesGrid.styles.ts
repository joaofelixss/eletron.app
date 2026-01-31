import { StyleSheet } from "react-native";
import { colors } from "../../../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 125,
    padding: 0, 
    overflow: "hidden", 
    justifyContent: "space-between", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  topContent: {
    flex: 1, 
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12, 
    paddingHorizontal: 4,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: colors.text.main,
    textAlign: "center",
    marginBottom: 8, 
  },
  statBar: {
    width: "100%", 
    backgroundColor: "#F3F4F6", // Cor cinza suave padrão
    paddingVertical: 6, 
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  statBarAlert: {
    backgroundColor: "#FEE2E2", // Vermelho claro se for alerta
    borderTopColor: "#FECACA"
  },
  statText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: colors.text.body,
    textTransform: "uppercase", 
    letterSpacing: 0.5,
  },
});