import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { colors } from "../../../../src/constants/colors";

// IMPORTAR API
import { api } from "../../../../src/services/api";

const ModuleItem = ({ icon, label, onPress, color, stat, isAlert, loading }: any) => (
  <TouchableOpacity 
    style={styles.card} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    {/* CONTEÚDO SUPERIOR */}
    <View style={styles.topContent}>
      <View style={[styles.iconBox, { backgroundColor: color + "15" }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>

    {/* BARRA INFERIOR */}
    <View style={[
        styles.statBar,
        isAlert && styles.statBarAlert 
    ]}>
      {loading ? (
        <ActivityIndicator size="small" color={isAlert ? "#991B1B" : "#000"} />
      ) : (
        <Text style={[styles.statText, isAlert && { color: "#991B1B" }]} numberOfLines={1}>
            {stat || "---"}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

export const ModulesGrid = () => {
  const router = useRouter();

  // --- ESTADOS DO DASHBOARD ---
  const [stats, setStats] = useState({
    products: 0,
    lowStock: 0,
    openOrders: 0,
    clients: 0
  });
  const [loading, setLoading] = useState(true);

  // --- BUSCAR DADOS REAIS ---
  const fetchDashboardData = async () => {
    try {
      // Fazemos as 3 requisições ao mesmo tempo para ser rápido
      const [productsRes, ordersRes, clientsRes] = await Promise.all([
        api.get('/products'),
        api.get('/orders'),
        api.get('/clients')
      ]);

      const products = productsRes.data;
      const orders = ordersRes.data;
      const clients = clientsRes.data;

      // Calcular Estoque Baixo (Menor ou igual a 3)
      const lowStockCount = products.filter((p: any) => p.stock <= 3).length;

      // Calcular Pedidos em Aberto (Status OPEN)
      const openOrdersCount = orders.filter((o: any) => o.status === 'OPEN').length;

      setStats({
        products: products.length,
        lowStock: lowStockCount,
        openOrders: openOrdersCount,
        clients: clients.length
      });

    } catch (error) {
      console.log("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza sempre que a tela ganha foco (Volta pra Home)
  useFocusEffect(
    useCallback(() => {
      fetchDashboardData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Linha 1 */}
      <View style={styles.row}>
        <ModuleItem 
          icon="cube-outline" 
          label="Produtos" 
          stat={`${stats.products} un.`}
          loading={loading}
          onPress={() => router.push("/(tabs)/products")}
          color="#3B82F6" 
        />
        <ModuleItem 
          icon="layers-outline" 
          label="Estoque" 
          stat={stats.lowStock > 0 ? `${stats.lowStock} Baixos` : "Ok"} 
          isAlert={stats.lowStock > 0} // Fica vermelho se tiver estoque baixo
          loading={loading}
          onPress={() => router.push("/(tabs)/products/inventory")}
          color="#10B981" 
        />
        <ModuleItem 
          icon="receipt-outline" 
          label="Pedidos" 
          stat={`${stats.openOrders} Abertos`}
          isAlert={stats.openOrders > 0}
          loading={loading}
          onPress={() => router.push("/(tabs)/orders")}
          color="#F59E0B" 
        />
      </View>

      {/* Linha 2 */}
      <View style={styles.row}>
        <ModuleItem 
          icon="people-outline" 
          label="Clientes" 
          stat={stats.clients}
          loading={loading}
          onPress={() => router.push("/(tabs)/clients")}
          color="#8B5CF6" 
        />
        
        {/* Módulos Futuros (Ainda Mockados por enquanto) */}
        <ModuleItem 
          icon="storefront-outline" 
          label="Loja" 
          stat="Em Breve"
          onPress={() => router.push("/(tabs)/marketing")} // Ajustei rota
          color="#EC4899" 
        />
        <ModuleItem 
          icon="chatbubbles-outline" 
          label="Chat IA" 
          stat="Off"
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
    padding: 0, 
    overflow: "hidden", 
    justifyContent: "space-between", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  topContent: {
    flex: 1, 
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12, 
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
    marginBottom: 8, 
  },
  statBar: {
    width: "100%", 
    backgroundColor: colors.primary, 
    paddingVertical: 6, 
    alignItems: "center",
    justifyContent: "center",
  },
  statBarAlert: {
    backgroundColor: "#FEE2E2", // Vermelho claro
  },
  statText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: "#000000",
    textTransform: "uppercase", 
    letterSpacing: 0.5,
  },
});