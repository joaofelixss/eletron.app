import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";

// IMPORTAR API E AUTH
import { api } from "../../../../src/services/api";
import { useAuth } from "../../../../src/context/AuthContext";

// IMPORTAR ESTILOS
import { styles } from "./ModulesGrid.styles";

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
  const { user } = useAuth(); // <--- PEGAR USUÁRIO

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
    if (!user?.id) return; // Proteção

    try {
      // Fazemos as 3 requisições ao mesmo tempo, filtrando pelo userId
      const [productsRes, ordersRes, clientsRes] = await Promise.all([
        api.get('/products', { params: { userId: user.id } }),
        api.get('/orders', { params: { userId: user.id } }),
        api.get('/clients', { params: { userId: user.id } })
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

  // Atualiza sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      fetchDashboardData();
    }, [user])
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
          isAlert={stats.lowStock > 0} 
          loading={loading}
          onPress={() => router.push("/products/inventory")}
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
        
        {/* Módulos Futuros (Em breve) */}
        <ModuleItem 
          icon="storefront-outline" 
          label="Loja" 
          stat="Em Breve"
          onPress={() => {}} // Sem rota ainda
          color="#EC4899" 
        />
        <ModuleItem 
          icon="chatbubbles-outline" 
          label="Chat IA" 
          stat="Off"
          onPress={() => {}} // Sem rota ainda
          color="#6366F1" 
        />
      </View>
    </View>
  );
};