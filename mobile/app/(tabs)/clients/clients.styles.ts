import { StyleSheet, Platform } from "react-native";
import { colors } from "../../../src/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Fundo levemente cinza
  },
  
  // HEADER
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: colors.text.main,
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  // SEARCH
  searchContainer: {
    padding: 20,
    backgroundColor: "#FFF",
    paddingBottom: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: colors.text.main,
  },

  // LISTA
  listContent: {
    padding: 20,
    paddingBottom: 100, // Espaço para o FAB
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
    marginTop: 8,
  },

  // CARD DE CLIENTE
  clientCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    
    // Sombra suave
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  
  // Avatar
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#FFF",
  },

  // Info Central
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: colors.text.main,
  },
  clientMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    gap: 8,
  },
  clientPhone: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#6B7280",
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#D1D5DB",
  },
  lastVisit: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#9CA3AF",
  },

  // Botão WhatsApp
  whatsappButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#DCFCE7", // Verde claro
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },

  // Tags/Badges
  tagsRow: {
    flexDirection: "row",
    marginTop: 6,
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
  },
  tagText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: "#6B7280",
  },
  vipTag: {
    backgroundColor: "#FEF3C7", // Amarelo
  },
  vipText: {
    color: "#B45309",
  },

 // FAB (Botão Flutuante) - CORRIGIDO
  fab: {
    position: "absolute",
    // Subimos para ficar acima da TabBar (95px + margem)
    bottom: Platform.OS === "ios" ? 110 : 90, 
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary, // Amarelo
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 100, // Garantir que fique por cima
  },
});