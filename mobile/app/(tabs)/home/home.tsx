import React, { useEffect, useState } from "react"; 
import { View, ScrollView, StatusBar, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../src/constants/colors";

// IMPORTANDO SERVIÇO E CONTEXTO
import { api } from "../../../src/services/api"; 
import { useAuth } from "../../../src/context/AuthContext"; // <--- NOVO

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
  const { user } = useAuth(); // <--- PEGA DADOS DO USUÁRIO LOGADO

  // --- ESTADOS PARA TESTE DE CONEXÃO ---
  const [dbStatus, setDbStatus] = useState("Sincronizando...");
  const [statusColor, setStatusColor] = useState("#F59E0B"); 
  const [productCount, setProductCount] = useState(0);

  // --- BUSCAR DADOS DO BACKEND (FILTRADO PELO USUÁRIO) ---
  async function checkConnection() {
    if (!user?.id) return;

    try {
      // AGORA ENVIAMOS O USERID PARA VER SÓ OS PRODUTOS DELE
      const response = await api.get("/products", { 
        params: { userId: user.id } 
      });
      
      setProductCount(response.data.length);
      setDbStatus("Online");
      setStatusColor("#10B981"); 

    } catch (error) {
      console.log("Erro de conexão:", error);
      setDbStatus("Offline");
      setStatusColor("#EF4444"); 
    }
  }

  // Roda assim que o usuário carrega
  useEffect(() => {
    checkConnection();
  }, [user]); // Roda quando 'user' estiver disponível

  // URL do Avatar Dinâmico baseado no Nome do Usuário
  const avatarSeed = user?.name || "User";
  const userAvatar = `https://api.dicebear.com/9.x/avataaars/png?seed=${avatarSeed}&backgroundColor=b6e3f4`;

  // Primeiro nome para saudação
  const firstName = user?.name?.split(" ")[0] || "Visitante";
  const storeName = user?.storeName || "Minha Loja";

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
            <Text style={styles.welcome}>Olá, {firstName} 👋</Text>
            <Text style={styles.storeName}>{storeName}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity 
            style={styles.planBadge}
            onPress={() => router.push("/subscription/plans")}
          >
            <Ionicons name="star" size={10} color="#B45309" />
            <Text style={styles.planText}>FREE</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.notifButton}
            onPress={() => router.push("/notifications")}
          >
            <Ionicons name="notifications-outline" size={24} color={colors.text.main} />
            {/* Bolinha de notificação (pode ser condicional no futuro) */}
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* --- STATUS DA LOJA (Resumo Rápido) --- */}
        <TouchableOpacity 
          onPress={checkConnection}
          style={{
            backgroundColor: statusColor + '10', 
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: statusColor + '30'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: statusColor }} />
            <Text style={{ fontSize: 12, color: colors.text.body, fontFamily: 'Poppins_500Medium' }}>
               Status do Sistema: <Text style={{ color: statusColor }}>{dbStatus}</Text>
            </Text>
          </View>
          <Text style={{ fontSize: 12, fontFamily: 'Poppins_700Bold', color: colors.text.main }}>
            {productCount} Prod.
          </Text>
        </TouchableOpacity>
        {/* --------------------------------------------- */}

        {/* 2. AÇÕES RÁPIDAS (+ Pedido / + Cliente) */}
        <QuickActions />

        {/* 3. GRID DE MÓDULOS (6 Cards) */}
        {/* Nota: O ModulesGrid vai navegar para telas que precisarão ler o useAuth() também */}
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