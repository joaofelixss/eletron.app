import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Share, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../src/constants/colors";

export const ShareStoreCard = () => {
  const storeLink = "eletron.app/loja-do-joao";

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Confira minha loja online no Eletron: https://${storeLink}`,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar.");
    }
  };

  const handleCopy = () => {
    Alert.alert("Sucesso", "Link copiado para a área de transferência!");
  };

  return (
    <View style={styles.card}>
      
      {/* HEADER SUPERIOR (Flex Row para evitar sobreposição) */}
      <View style={styles.headerRow}>
        
        {/* LADO ESQUERDO: Ícone + Textos */}
        <View style={styles.headerLeft}>
          <View style={styles.iconContainer}>
            <Ionicons name="globe" size={24} color="#FFF" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Sua Loja Online</Text>
            <Text style={styles.subtitle}>Seu catálogo está ativo</Text>
          </View>
        </View>

        {/* LADO DIREITO: Banner de Visitas (Seguro) */}
        <View style={styles.statsBadge}>
          <View style={styles.liveDot} />
          <Ionicons name="eye" size={12} color={colors.primary} />
          <Text style={styles.statsText}>15.2k visitas</Text>
        </View>

      </View>

      {/* ÁREA DO LINK E AÇÕES */}
      <View style={styles.actionContainer}>
        
        {/* O Link (Visual) */}
        <View style={styles.urlBox}>
            <Text style={styles.urlLabel}>Link:</Text>
            <Text style={styles.urlText} numberOfLines={1}>{storeLink}</Text>
        </View>

        {/* Botões de Ação */}
        <View style={styles.buttonsRow}>
            {/* Botão Copiar */}
            <TouchableOpacity style={styles.iconButton} onPress={handleCopy}>
                <Ionicons name="copy-outline" size={20} color="#A1A1AA" />
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Botão Compartilhar */}
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Text style={styles.shareText}>Divulgar</Text>
                <Ionicons name="share-social" size={16} color="#000" />
            </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#18181B", // Dark
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#27272A",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  
  // --- LAYOUT FLEXÍVEL DO TOPO ---
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Separa Esquerda e Direita ao máximo
    alignItems: "flex-start", // Alinha ao topo
    marginBottom: 20,
  },
  
  // GRUPO ESQUERDA
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1, // Ocupa o espaço disponível (empurra o banner se precisar)
    marginRight: 8, // Espaço de segurança entre texto e banner
  },
  
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(234, 197, 79, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(234, 197, 79, 0.3)",
  },
  
  textContainer: {
    flex: 1, // Permite que o texto quebre linha se ficar muito apertado
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
    color: "#FFF",
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#A1A1AA",
  },

  // GRUPO DIREITA (BANNER)
  statsBadge: {
    backgroundColor: "rgba(255,255,255,0.1)", // Fundo sutil
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#3F3F46",
    // Removemos position absolute para evitar bugs
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  statsText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: "#FFF",
  },

  // --- ACTIONS ---
  actionContainer: {
    backgroundColor: "#27272A",
    borderRadius: 14,
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  urlBox: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
    paddingRight: 8,
  },
  urlLabel: {
    fontSize: 9,
    color: "#71717A",
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
  },
  urlText: {
    fontFamily: "Poppins_500Medium",
    color: "#E4E4E7",
    fontSize: 12,
  },

  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: "#3F3F46",
    marginHorizontal: 2,
  },
  shareButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginLeft: 4,
  },
  shareText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 11,
    color: "#000",
  },
});