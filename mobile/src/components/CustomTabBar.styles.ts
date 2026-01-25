import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../constants/colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: "box-none",
  },
  
  // A BARRA EM SI
  bar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: Platform.OS === 'ios' ? 95 : 75,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    paddingTop: 10,
    paddingHorizontal: 10,
    
    // Design Arredondado
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    
    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.02)",
    
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // BOTÃO DA TAB
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  
  // A PÍLULA PRETA (BACKGROUND ANIMADO)
  activeBackground: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#18181B", // Preto
    zIndex: -1,
  },

  // ÍCONE
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    position: "relative", // Importante para o badge
  },

  // --- NOVO: BADGE DE NOTIFICAÇÃO (Bolinha Vermelha) ---
  badgeContainer: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: colors.danger,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    paddingHorizontal: 3,
    zIndex: 10,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
  },

  // ASSISTENTE FLUTUANTE
  assistantContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 80,
    right: 20,
    alignItems: 'flex-end',
    zIndex: 999,
  },
  bubble: {
    backgroundColor: "#FFF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    marginBottom: 8,
    marginRight: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    maxWidth: 200,
  },
  bubbleText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: colors.text.main,
  },
  bubbleArrow: {
    position: 'absolute',
    bottom: -6,
    right: 20,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: "#FFF",
  },
  avatarButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: colors.primary,
    backgroundColor: "#c0aede",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  avatarImage: {
    width: 54,
    height: 54,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: "#18181B",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1001,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  notifBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.danger,
    borderWidth: 2,
    borderColor: "#FFF",
  }
});