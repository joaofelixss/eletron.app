import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../../src/constants/colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  
  // HEADER
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: colors.text.main,
  },
  editButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.primary,
  },

  // CONTEÚDO
  content: {
    paddingBottom: 150, // Espaço para Footer + TabBar
  },

  // HERO IMAGE (IMAGEM GRANDE)
  imageContainer: {
    width: width,
    height: 300,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  productImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  uploadButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#000",
  },

  // SECTION: INFO PRINCIPAL
  mainInfo: {
    padding: 24,
    backgroundColor: "#FFF",
    marginBottom: 12,
  },
  productName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: "#111827",
    marginBottom: 4,
  },
  sku: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  currency: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: colors.primary,
    marginBottom: 6,
  },
  price: {
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    color: "#111827",
  },

  // SECTION: ESTATÍSTICAS (GRID)
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  statLabel: {
    fontSize: 11,
    color: "#6B7280",
    fontFamily: "Poppins_500Medium",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    color: "#111827",
    fontFamily: "Poppins_600SemiBold",
  },

  // SECTION: AI INSIGHT
  aiCard: {
    margin: 24,
    marginTop: 0,
    backgroundColor: "#EEF2FF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#C7D2FE",
    flexDirection: "row",
    gap: 12,
  },
  aiText: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#3730A3",
    lineHeight: 20,
  },

  // INPUTS (MODO EDIÇÃO)
  formContainer: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#111827",
  },
  rowInputs: {
    flexDirection: "row",
    gap: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  
  deleteButton: {
    marginTop: 20,
    backgroundColor: "#FEF2F2",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  deleteText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#DC2626",
  },

  // FOOTER
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    // Padding para a TabBar não cobrir o botão
    paddingBottom: Platform.OS === "ios" ? 110 : 90,
  },
  actionButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#18181B",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.primary,
  },
});