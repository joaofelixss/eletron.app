import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../src/constants/colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181811", // Fundo Dark Premium
  },
  
  // HEADER
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(242, 242, 13, 0.1)", // Primary transparente
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#FFF",
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  closeText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: "#999",
    letterSpacing: 1,
  },

  content: {
    padding: 24,
    alignItems: "center",
  },

  // HERO TEXT
  heroContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  heroTitle: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 28,
    color: "#FFF",
    textAlign: "center",
    lineHeight: 34,
  },
  highlight: {
    color: colors.primary,
  },
  heroSubtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
    maxWidth: "80%",
  },

  // SEGMENTED CONTROL (Web vs PDF)
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#27271b", // Surface dark
    borderRadius: 12,
    padding: 4,
    width: "100%",
    marginBottom: 32,
  },
  segmentButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  segmentActive: {
    backgroundColor: "#FFF",
  },
  segmentText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: "#999",
  },
  segmentTextActive: {
    color: "#000",
  },

  // PREVIEW CARD
  previewCard: {
    width: "100%",
    backgroundColor: "#27271b",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    position: "relative",
  },
  // Efeito de brilho atrás
  glowEffect: {
    position: "absolute",
    top: -20,
    left: "10%",
    width: "80%",
    height: 100,
    backgroundColor: colors.primary,
    opacity: 0.15,
    borderRadius: 100,
    transform: [{ scaleX: 2 }],
  },
  
  imageContainer: {
    width: "100%",
    height: 280,
    backgroundColor: "#111",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  aiBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(10px)", // No RN precisa de View style
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  aiBadgeText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: colors.primary,
    textTransform: "uppercase",
  },
  
  // Overlay simulando navegador
  browserOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    padding: 16,
    paddingTop: 24,
  },
  // Gradiente simulado
  browserGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.8)", 
  },
  browserContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  browserIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  browserUrl: {
    flex: 1,
  },
  urlTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: "#FFF",
  },
  urlLink: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "#CCC",
  },

  // Card Body
  cardBody: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#FFF",
  },
  cardSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: "rgba(242, 242, 13, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: colors.primary,
    textTransform: "uppercase",
  },
  
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginBottom: 16,
  },
  
  statsRow: {
    flexDirection: "row",
    gap: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#999",
  },

  // FOOTER ACTIONS
  actionContainer: {
    width: "100%",
    marginTop: "auto", // Empurra para baixo se houver espaço
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#000",
  },
  secondaryButton: {
    backgroundColor: "rgba(255,255,255,0.05)",
    height: 56,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  secondaryButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#FFF",
  },
});