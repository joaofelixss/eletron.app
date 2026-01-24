// mobile/app/signup/signup.styles.ts
import { StyleSheet } from "react-native";
import { colors } from "../../src/constants/colors";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background, 
    paddingTop: 0 // StatusBar já cuida disso
  },
  
  // Barra de Progresso no topo
  progressContainer: { 
    height: 6, 
    backgroundColor: colors.border, 
    width: "100%", 
    position: "absolute", 
    top: 0,
    zIndex: 10
  },
  progressBar: { 
    height: "100%", 
    backgroundColor: colors.primary, 
    borderBottomRightRadius: 4 
  },

  // Conteúdo
  content: { 
    padding: 24, 
    flex: 1,
    marginTop: 20 // Espaço pra não colar na barra
  },
  
  backButton: { 
    marginBottom: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  
  title: { 
    fontFamily: "Poppins_700Bold", 
    fontSize: 24, 
    color: colors.text.main, 
    marginBottom: 8 
  },
  subtitle: { 
    fontFamily: "Poppins_400Regular", 
    fontSize: 14, 
    color: colors.text.body, 
    marginBottom: 32 
  },

  // Inputs
  inputContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: colors.surface, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: colors.border, 
    height: 56, 
    marginBottom: 16, 
    paddingHorizontal: 16
  },
  inputIcon: { 
    marginRight: 12 
  },
  input: { 
    flex: 1, 
    fontFamily: "Poppins_600SemiBold", 
    fontSize: 16, 
    color: colors.text.main, 
    height: "100%" 
  },

  // Botão
  button: { 
    backgroundColor: colors.primary, 
    height: 56, 
    borderRadius: 12, 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 16,
    shadowColor: colors.warning,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonDisabled: { 
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0
  },
  buttonText: { 
    fontFamily: "Poppins_700Bold", 
    color: colors.text.onPrimary, 
    fontSize: 16 
  },
});