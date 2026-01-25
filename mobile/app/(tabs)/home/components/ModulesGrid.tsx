import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../../src/constants/colors";

const ModuleItem = ({ icon, label, onPress, color, stat, isAlert }: any) => (
  <TouchableOpacity 
    style={styles.card} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    {/* CONTEÚDO SUPERIOR (Ícone e Label) - Com Padding */}
    <View style={styles.topContent}>
      <View style={[styles.iconBox, { backgroundColor: color + "15" }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>

    {/* BARRA INFERIOR (Full Width) - Sem Padding lateral */}
    {stat && (
      <View style={[
        styles.statBar,
        isAlert && styles.statBarAlert // Muda cor se for alerta
      ]}>
        <Text style={styles.statText} numberOfLines={1}>
          {stat}
        </Text>
      </View>
    )}
  </TouchableOpacity>
);

export const ModulesGrid = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Linha 1 */}
      <View style={styles.row}>
        <ModuleItem 
          icon="cube-outline" 
          label="Produtos" 
          stat="54 un."
          onPress={() => router.push("/(tabs)/products")}
          color="#3B82F6" 
        />
        <ModuleItem 
          icon="layers-outline" 
          label="Estoque" 
          stat="3 Baixos" 
          isAlert // Fundo vermelho claro
          onPress={() => router.push("/(tabs)/products/inventory")}
          color="#10B981" 
        />
        <ModuleItem 
          icon="receipt-outline" 
          label="Pedidos" 
          stat="2 Novos"
          onPress={() => router.push("/(tabs)/orders")}
          color="#F59E0B" 
        />
      </View>

      {/* Linha 2 */}
      <View style={styles.row}>
        <ModuleItem 
          icon="people-outline" 
          label="Clientes" 
          stat="128"
          onPress={() => router.push("/clients")}
          color="#8B5CF6" 
        />
        <ModuleItem 
          icon="storefront-outline" 
          label="Loja" 
          stat="15 Visitas"
          onPress={() => router.push("/catalog")}
          color="#EC4899" 
        />
        <ModuleItem 
          icon="chatbubbles-outline" 
          label="Chat IA" 
          stat="1 Msg"
          isAlert
          onPress={() => router.push("/(tabs)/chat")}
          color="#6366F1" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    
    // IMPORTANTE PARA O FULL WIDTH
    padding: 0, // Removemos o padding global do card
    overflow: "hidden", // Garante que a barra siga a curva da borda
    justifyContent: "space-between", // Empurra a barra para o final
    
    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  
  // Container para o Ícone e Texto (Que precisa de padding interno)
  topContent: {
    flex: 1, // Ocupa o espaço que sobra acima da barra
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12, // Padding só em cima
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
    marginBottom: 8, // Espaço antes da barra amarela
  },
  
  // A BARRA INFERIOR (FULL WIDTH)
  statBar: {
    width: "100%", // Pega de ponta a ponta
    backgroundColor: colors.primary, // Amarelo
    paddingVertical: 6, // Altura da barra
    alignItems: "center",
    justifyContent: "center",
  },
  
  statBarAlert: {
    backgroundColor: "#FECACA", // Vermelho claro se for alerta
  },

  statText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: "#000000",
    textTransform: "uppercase", // Fica mais elegante em barras
    letterSpacing: 0.5,
  },
});