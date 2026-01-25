import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../../src/constants/colors";

const ModuleItem = ({ icon, label, onPress, color = colors.text.main }: any) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={[styles.iconBox, { backgroundColor: color + "15" }]}>
      <Ionicons name={icon} size={22} color={color} />
    </View>
    <Text style={styles.label}>{label}</Text>
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
          onPress={() => router.push("/(tabs)/products")}
          color="#3B82F6" 
        />
        <ModuleItem 
          icon="layers-outline" 
          label="Estoque" 
          onPress={() => router.push("/(tabs)/products")}
          color="#10B981" 
        />
        <ModuleItem 
          icon="receipt-outline" 
          label="Pedidos" 
          onPress={() => router.push("/(tabs)/orders")}
          color="#F59E0B" 
        />
      </View>

      {/* Linha 2 */}
      <View style={styles.row}>
        <ModuleItem 
          icon="people-outline" 
          label="Clientes" 
          onPress={() => router.push("/clients")}
          color="#8B5CF6" 
        />
        <ModuleItem 
          icon="storefront-outline" 
          label="Loja" 
          onPress={() => router.push("/catalog")}
          color="#EC4899" 
        />
        <ModuleItem 
          icon="chatbubbles-outline" 
          label="Chat IA" 
          onPress={() => router.push("/marketing")}
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
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 100,
    justifyContent: "center",
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
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.main,
  },
});