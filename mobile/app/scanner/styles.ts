import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "../../src/constants/colors";

const { width, height } = Dimensions.get("window");
const FRAME_SIZE = 280;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  
  // CÂMERA (Background simulado)
  cameraPreview: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6, // Escurece um pouco a imagem para destacar a UI
  },
  
  // OVERLAY ESCURO (Backdrop)
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: (height - FRAME_SIZE) / 2,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: (height - FRAME_SIZE) / 2,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  leftOverlay: {
    position: "absolute",
    top: (height - FRAME_SIZE) / 2,
    left: 0,
    width: (width - FRAME_SIZE) / 2,
    height: FRAME_SIZE,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  rightOverlay: {
    position: "absolute",
    top: (height - FRAME_SIZE) / 2,
    right: 0,
    width: (width - FRAME_SIZE) / 2,
    height: FRAME_SIZE,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  // MOLDURA DO SCANNER
  scanFrame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    position: "relative",
    zIndex: 10,
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: colors.primary,
    borderWidth: 4,
  },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 20 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 20 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 20 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 20 },
  
  scanLine: {
    width: "100%",
    height: 2,
    backgroundColor: colors.primary,
    position: "absolute",
    top: "50%",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  instructionText: {
    position: "absolute",
    bottom: -40,
    width: "100%",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    opacity: 0.9,
  },

  // HEADER ACTIONS
  header: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    zIndex: 20,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)", // Funciona em algumas versões do RN ou requer View style
  },
  headerTitleBadge: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
  },
  headerTitleText: {
    color: colors.primary,
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    letterSpacing: 0.5,
  },

  // DETECTED PRODUCT SHEET (BOTTOM)
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.cardDark, // Preto do card
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  dragHandle: {
    width: 48,
    height: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  statusText: {
    color: colors.primary,
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.9,
  },
  
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },
  productIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  productName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#FFF",
    lineHeight: 28,
  },
  productDetail: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    marginTop: 4,
  },

  // Actions
  actionContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#000",
  },
  secondaryButton: {
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  secondaryButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.primary,
  },
});