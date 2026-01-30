import React, { useEffect, useState } from "react"; // <--- ADICIONADO
import { View, ScrollView, StatusBar, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../src/constants/colors";

// IMPORTANDO SERVIÇO DE API
import { api } from "../../../src/services/api"; // <--- ADICIONADO

// IMPORTANDO ESTILOS SEPARADOS
import { styles } from "./home.styles";

// IMPORTANDO COMPONENTES
import { QuickActions } from "./components/QuickActions";
import { ModulesGrid } from "./components/ModulesGrid";
import { ShareStoreCard } from "./components/ShareStoreCard";
import { PerformanceStats } from "./components/PerformanceStats";
import { PlanStatusCard } from "./components/PlanStatusCard";

export default function HomeScreen() {
  const router = useRouter();

  // --- ESTADOS PARA TESTE DE CONEXÃO ---
  const [dbStatus, setDbStatus] = useState("Verificando conexão...");
  const [statusColor, setStatusColor] = useState("#F59E0B"); // Amarelo (Carregando)
  const [productCount, setProductCount] = useState(0);

  // --- FUNÇÃO PARA BUSCAR DO BACKEND ---
  async function checkConnection() {
    try {
      console.log("Tentando conectar ao backend...");
      const response = await api.get("/products"); // Chama a rota de produtos
      
      setProductCount(response.data.length);
      setDbStatus("Online e Conectado!");
      setStatusColor("#10B981"); // Verde (Sucesso)
      console.log("Sucesso! Produtos:", response.data);

    } catch (error) {
      console.log("Erro de conexão:", error);
      setDbStatus("Offline / Erro de API");
      setStatusColor("#EF4444"); // Vermelho (Erro)
    }
  }

  // Roda assim que a tela abre
  useEffect(() => {
    checkConnection();
  }, []);

  // URL do Avatar do Usuário
  const userAvatar = "https://api.dicebear.com/9.x/avataaars/png?seed=Joao&backgroundColor=b6e3f4";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* 1. HEADER (Perfil + Notificações) */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
            <Image 
              source={{ uri: userAvatar }} 
              style={styles.avatar} 
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.welcome}>Olá, João 👋</Text>
            <Text style={styles.storeName}>Eletron HQ</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity 
            style={styles.planBadge}
            onPress={() => router.push("/subscription/plans")}
          >
            <Ionicons name="star" size={10} color="#B45309" />
            <Text style={styles.planText}>START</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.notifButton}
            onPress={() => router.push("/notifications")}
          >
            <Ionicons name="notifications-outline" size={24} color={colors.text.main} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* --- ÁREA DE TESTE DE CONEXÃO (Temporário) --- */}
        <TouchableOpacity 
          onPress={checkConnection}
          style={{
            backgroundColor: statusColor + '20', // Cor transparente
            padding: 12,
            borderRadius: 12,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: statusColor,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: statusColor }} />
            <View>
              <Text style={{ fontWeight: 'bold', color: '#333' }}>Banco de Dados (MongoDB)</Text>
              <Text style={{ fontSize: 12, color: '#666' }}>{dbStatus}</Text>
            </View>
          </View>
          <Text style={{ fontWeight: 'bold', color: statusColor }}>{productCount} Prod.</Text>
        </TouchableOpacity>
        {/* --------------------------------------------- */}

        {/* 2. AÇÕES RÁPIDAS (+ Pedido / + Cliente) */}
        <QuickActions />

        {/* 3. GRID DE MÓDULOS (6 Cards) */}
        <ModulesGrid />

        {/* 4. DESTAQUE: COMPARTILHAR LOJA */}
        <ShareStoreCard />

        {/* 5. DASHBOARD FINANCEIRO */}
        <PerformanceStats />

        {/* 6. STATUS DO PLANO & UPSELL */}
        <PlanStatusCard />

      </ScrollView>
    </View>
  );
}