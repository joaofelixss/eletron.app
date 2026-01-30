import { StyleSheet, Platform } from "react-native";
import { colors } from "../../../src/constants/colors";

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
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
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: colors.text.main,
  },
  saveButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: colors.primary,
  },
  
  // CONTEÚDO
  content: {
    padding: 24,
  },
  
  // UPLOAD DE FOTO
  photoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  photoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    overflow: "hidden",
  },
  photoImage: {
    width: 100,
    height: 100,
  },
  editPhotoBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },

  // CAMPOS
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
    paddingVertical: 12, // Altura confortável
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#111827",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

 // --- CORREÇÃO DO FOOTER ---
  footer: {
    padding: 24,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    
    // A MÁGICA AQUI:
    // Adicionamos padding bottom extra para compensar a altura da TabBar (~95px)
    // Assim o botão "Salvar" sobe e fica visível acima da barra
    paddingBottom: Platform.OS === "ios" ? 110 : 90, 
  },
  submitButton: {
    backgroundColor: "#18181B", // Preto
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  submitButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.primary, // Texto Amarelo
  },

  infoCard : {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },
   infoValue : {
    fontSize: 16, 
    color: "#111827",
    marginTop: 4
},
// --- ESTILOS DE DELETE (Faltavam no seu arquivo) ---
  deleteButton: {
    marginTop: 24,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#FEE2E2', // Fundo vermelho claro
    borderRadius: 12,
  },
  deleteText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#DC2626", // Texto vermelho
  }
});



