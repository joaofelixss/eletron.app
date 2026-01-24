import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StatusBar, TextInput, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient"; // Importante!
import { colors } from "../../src/constants/colors";
import { styles } from "./home.styles"; 

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* 1. HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/settings")} style={styles.avatarContainer}>
            {/* Avatar Placeholder - UI Avatars */}
            <ImageBackground 
               source={{ uri: "https://ui-avatars.com/api/?name=Joao+Felix&background=0A0A0A&color=EAC54F" }}
               style={styles.avatar}
               imageStyle={{ borderRadius: 24 }}
            />
            <View style={styles.onlineBadge} />
          </TouchableOpacity>
          <View>
            <Text style={styles.welcomeText}>Bem-vindo de volta</Text>
            <Text style={styles.brandText}>Eletron HQ</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={20} color={colors.text.main} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* 2. STATS CARDS (GRID PRETO) */}
        <View style={styles.statsGrid}>
          {/* Card Lucro */}
          <LinearGradient
            colors={[colors.cardDark, "#1a1a1a"]}
            style={styles.statCard}
          >
            {/* Efeito de luz no fundo */}
            <View style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(255,255,255,0.05)", blurRadius: 20 }} />
            
            <View style={styles.statHeader}>
              <View style={styles.iconBox}>
                <Ionicons name="cash-outline" size={20} color={colors.primary} />
              </View>
              <View style={styles.badge}>
                <Ionicons name="arrow-up" size={10} color={colors.primary} />
                <Text style={styles.badgeText}>12%</Text>
              </View>
            </View>
            <View>
              <Text style={styles.statLabel}>Lucro de Hoje</Text>
              <Text style={styles.statValue}>R$ 1.240</Text>
            </View>
          </LinearGradient>

          {/* Card Reparos */}
          <LinearGradient
            colors={[colors.cardDark, "#1a1a1a"]}
            style={styles.statCard}
          >
            <View style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(234, 197, 79, 0.1)", blurRadius: 20 }} />

            <View style={styles.statHeader}>
              <View style={styles.iconBox}>
                <Ionicons name="construct-outline" size={20} color={colors.primary} />
              </View>
              <View style={styles.badge}>
                <Ionicons name="add" size={10} color={colors.primary} />
                <Text style={styles.badgeText}>3 novos</Text>
              </View>
            </View>
            <View>
              <Text style={styles.statLabel}>Reparos Ativos</Text>
              <Text style={styles.statValue}>18</Text>
            </View>
          </LinearGradient>
        </View>

        {/* 3. AI SEARCH (Barra Brilhante) */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="sparkles" size={24} color={colors.primary} />
            <TextInput 
              style={styles.searchInput}
              placeholder='Perguntar à IA: "Estoque de telas iPhone 15?"'
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="arrow-forward" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. MODULES (Navegação Real) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Módulos</Text>
          <TouchableOpacity><Text style={styles.seeAllButton}>Ver Todos</Text></TouchableOpacity>
        </View>

        <View style={styles.modulesGrid}>
          {/* Card Estoque */}
          <TouchableOpacity 
            style={styles.moduleCard} 
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)/products")}
          >
            <LinearGradient colors={["#222", "#000"]} style={{flex:1}}>
              <View style={styles.moduleContent}>
                <View style={styles.moduleIconContainer}>
                  <Ionicons name="cube-outline" size={18} color="#FFF" />
                </View>
                <Text style={styles.moduleTitle}>Estoque</Text>
                <Text style={styles.moduleSubtitle}>1.240 itens</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Card Vendas (PDV) */}
          <TouchableOpacity 
            style={styles.moduleCard} 
            activeOpacity={0.8}
            onPress={() => router.push("/sales/create")}
          >
            <LinearGradient colors={["#222", "#000"]} style={{flex:1}}>
              <View style={styles.moduleContent}>
                <View style={styles.moduleIconContainer}>
                  <Ionicons name="cart-outline" size={18} color="#FFF" />
                </View>
                <Text style={styles.moduleTitle}>Vendas</Text>
                <Text style={styles.moduleSubtitle}>8 hoje</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Card Clientes */}
          <TouchableOpacity 
            style={styles.moduleCard} 
            activeOpacity={0.8}
            onPress={() => router.push("/clients/add")}
          >
            <LinearGradient colors={["#222", "#000"]} style={{flex:1}}>
              <View style={styles.moduleContent}>
                <View style={styles.moduleIconContainer}>
                  <Ionicons name="people-outline" size={18} color="#FFF" />
                </View>
                <Text style={styles.moduleTitle}>Clientes</Text>
                <Text style={styles.moduleSubtitle}>42 novos</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

         {/* Card Pedidos */}
          <TouchableOpacity 
            style={styles.moduleCard} 
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)/orders")} // <--- LINK ADICIONADO AQUI
          >
            <LinearGradient colors={["#222", "#000"]} style={{flex:1}}>
              <View style={styles.moduleContent}>
                <View style={styles.moduleIconContainer}>
                  {/* Troquei o ícone para "list" ou "clipboard" para diferenciar do estoque */}
                  <Ionicons name="clipboard-outline" size={18} color="#FFF" />
                </View>
                <Text style={styles.moduleTitle}>Pedidos</Text>
                <Text style={styles.moduleSubtitle}>4 pendentes</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
  style={styles.actionButton}
  onPress={() => router.push("/trade-in")} // <--- LINK PARA A TELA NOVA
>
  <View style={[styles.iconBox, { backgroundColor: "rgba(242, 242, 13, 0.1)" }]}>
    <Ionicons name="swap-horizontal" size={28} color={colors.primary} />
  </View>
  <Text style={styles.actionText}>Trade-In</Text>
</TouchableOpacity>
        </View>

        {/* 5. ACTIVITY TIMELINE (Timeline Vertical) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Atividade Recente</Text>
        </View>

        <View style={styles.timelineSection}>
          {/* Item 1 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineLineContainer}>
              <View style={[styles.timelineDot, { backgroundColor: colors.cardDark }]} />
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.timelineContent}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={[styles.activityIcon, { backgroundColor: "#DCFCE7" }]}>
                   <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                </View>
                <View>
                  <Text style={styles.activityTitle}>Reparo #1024 Finalizado</Text>
                  <Text style={styles.activitySubtitle}>Troca de Tela iPhone 13</Text>
                </View>
              </View>
              <Text style={styles.activityTime}>2m</Text>
            </View>
          </View>

          {/* Item 2 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineLineContainer}>
              <View style={[styles.timelineDot, { backgroundColor: "#DDD", borderColor: "#FFF" }]} />
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.timelineContent}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={[styles.activityIcon, { backgroundColor: "rgba(234, 197, 79, 0.2)" }]}>
                   <Ionicons name="cart" size={18} color="#854D0E" />
                </View>
                <View>
                  <Text style={styles.activityTitle}>Pedido de Peças</Text>
                  <Text style={styles.activitySubtitle}>Bateria Samsung S22 (x5)</Text>
                </View>
              </View>
              <Text style={styles.activityTime}>1h</Text>
            </View>
          </View>

          {/* Item 3 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineLineContainer}>
               <View style={[styles.timelineDot, { backgroundColor: "#DDD", borderColor: "#FFF" }]} />
            </View>
            <View style={styles.timelineContent}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={[styles.activityIcon, { backgroundColor: "#FEF3C7" }]}>
                   <Ionicons name="document-text" size={18} color={colors.warning} />
                </View>
                <View>
                  <Text style={styles.activityTitle}>Orçamento Enviado</Text>
                  <Text style={styles.activitySubtitle}>MacBook Pro - Líquido</Text>
                </View>
              </View>
              <Text style={styles.activityTime}>3h</Text>
            </View>
          </View>
        </View>

<TouchableOpacity 
  style={styles.upgradeButton}
  onPress={() => router.push("/subscription/plans")} // <--- ADICIONE ESTE LINK
>
  <Text style={styles.upgradeText}>UPGRADE</Text>
</TouchableOpacity>
      </ScrollView>
    </View>
  );
}