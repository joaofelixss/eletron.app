import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../src/constants/colors";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48 - 12) / 2; // 2 colunas

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
  },
  
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },
  backButton: {
    padding: 8,
  },

  hero: {
    marginBottom: 24,
  },
  heroTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: colors.text.main,
  },
  heroSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: colors.text.body,
    marginTop: 4,
  },

  // GRID
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  
  // CARD
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cardAvatar: {
    width: 80,
    height: 80,
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FFF",
    padding: 6,
    borderRadius: 12,
  },
  cardBody: {
    padding: 12,
    alignItems: "center",
  },
  cardName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
    marginBottom: 4,
  },
  roleBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 8,
  },
  roleText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: "#6B7280",
    textTransform: "uppercase",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  statusText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: colors.text.light,
  },

  // ADD CARD
  addCard: {
    width: CARD_WIDTH,
    height: 190, // Altura similar ao card cheio
    backgroundColor: "transparent",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  addIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(234, 197, 79, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  addText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.primary,
  },
  addSubtext: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: colors.text.light,
  },

  // MODAL
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  modalClose: {
    fontFamily: "Poppins_500Medium",
    color: colors.danger,
  },
  modalContent: {
    padding: 24,
  },
  
  previewContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F3F4F6",
    marginBottom: 12,
  },
  randomButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  randomText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#4B5563",
  },

  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    fontFamily: "Poppins_500Medium",
  },
  
  // Chips
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#4B5563",
  },
  chipTextActive: {
    color: "#000",
    fontWeight: "bold",
  },

  // Type Selector
  typeRow: {
    flexDirection: "row",
    gap: 12,
  },
  typeCard: {
    flex: 1,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFF",
  },
  typeCardActive: {
    backgroundColor: "rgba(234, 197, 79, 0.1)",
    borderColor: colors.primary,
  },
  typeText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.text.main,
  },

  saveButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#000",
  },
});