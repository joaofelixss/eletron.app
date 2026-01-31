import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { styles } from "./profile.styles";

// IMPORTANDO AUTH CONTEXT
import { useAuth } from "../../src/context/AuthContext";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth(); // <--- Hook de Autenticação

  // URL Dinâmica baseada no usuário logado
  const avatarSeed = user?.name || "User";
  const avatarUrl = `https://api.dicebear.com/9.x/avataaars/png?seed=${avatarSeed}&backgroundColor=b6e3f4`;

  const handleLogout = () => {
    Alert.alert(
      "Sair", 
      "Deseja realmente sair do Eletron?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
            text: "Sair", 
            style: "destructive", 
            onPress: async () => {
                await signOut(); // <--- LIMPA SESSÃO E REDIRECIONA
            } 
        }
      ]
    );
  };

  // Componente de Item de Menu (Mantive igual)
  const MenuItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    hasSeparator = true, 
    isPro = false,
    isDestructive = false
  }: any) => (
    <>
      <TouchableOpacity 
        style={styles.menuItem} 
        activeOpacity={0.7} 
        onPress={onPress}
      >
        <View style={[
          styles.iconBox, 
          isDestructive && { backgroundColor: "#FEF2F2" }, 
          !isDestructive && isPro && { backgroundColor: "rgba(234, 197, 79, 0.15)" } 
        ]}>
          <Ionicons 
            name={icon} 
            size={20} 
            color={isDestructive ? colors.danger : (isPro ? "#854D0E" : colors.text.muted)} 
          />
        </View>

        <View style={styles.itemContent}>
          <Text style={[styles.itemTitle, isDestructive && { color: colors.danger }]}>{title}</Text>
          {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
        </View>

        {isPro && (
          <View style={styles.proBadge}>
            <Text style={styles.proText}>PRO</Text>
          </View>
        )}

        {!isDestructive && (
          <Ionicons name="chevron-forward" size={20} color={colors.text.light} />
        )}
      </TouchableOpacity>
      {hasSeparator && <View style={styles.itemSeparator} />}
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.placeholderButton} />
        <Text style={styles.headerTitle}>Perfil</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => router.push("/(tabs)/settings")}
        >
          <Ionicons name="settings-outline" size={20} color={colors.text.main} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* 1. PROFILE HEADER (DADOS REAIS DO USUÁRIO) */}
        <View style={styles.profileSection}>
          <TouchableOpacity 
            style={styles.avatarContainer}
            activeOpacity={0.9}
            onPress={() => router.push("/profile/avatar-editor")}
          >
            <View style={styles.avatarBox}>
              <Image 
                source={{ uri: avatarUrl }} 
                style={styles.avatarImage} 
              />
            </View>
            <View style={styles.editButton}>
              <Ionicons name="pencil" size={14} color={colors.text.onPrimary} />
            </View>
          </TouchableOpacity>
          
          <Text style={styles.userName}>{user?.name || "Usuário"}</Text>
          <Text style={styles.userStore}>{user?.storeName || "Minha Loja"}</Text>
          
          <View style={styles.badge}>
            <Ionicons name="hardware-chip" size={16} color={colors.text.onPrimary} />
            <Text style={styles.badgeText}>Empreendedor Eletron</Text>
          </View>
        </View>

        {/* 2. STATS CARDS */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Vendas este mês</Text>
              <Ionicons name="bag-handle" size={20} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>0</Text> 
            {/* Futuro: Pegar do Backend também */}
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Avaliação da Loja</Text>
              <Ionicons name="star" size={20} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>5.0</Text>
          </View>
        </View>

        {/* 3. MENU GROUP 1 (Dados e Loja) */}
        <View style={styles.menuGroup}>
          <View style={styles.cardGroup}>
            <MenuItem 
              icon="person-outline" 
              title="Meus Dados" 
              subtitle="Informações pessoais e avatar"
              onPress={() => router.push("/profile/avatar-editor")} 
            />
            <MenuItem 
              icon="storefront-outline" 
              title="Catálogo & Loja" 
              subtitle="Gerenciar produtos e vitrine"
              onPress={() => router.push("/catalog")} 
            />
            <MenuItem 
              icon="trophy-outline" 
              title="Assinatura" 
              subtitle="Gerenciar plano Eletron"
              isPro
              hasSeparator={false}
              onPress={() => router.push("/subscription/plans")} 
            />
             {/* Adicionei o separador aqui pois não é o último do grupo visualmente */}
             <View style={styles.itemSeparator} /> 

            <MenuItem 
              icon="people-outline" 
              title="Gerenciar Equipe Digital" 
              subtitle="Configure seus assistentes IA"
              onPress={() => router.push("/settings/assistants")} 
              hasSeparator={false} // Agora sim é o último
            />
          </View>
        </View>

        {/* 4. MENU GROUP 2 (Suporte e Sair) */}
        <View style={styles.menuGroup}>
          <View style={styles.cardGroup}>
            <MenuItem 
              icon="help-circle-outline" 
              title="Ajuda & Suporte" 
              subtitle="Central de ajuda"
              onPress={() => {}}
            />
            <MenuItem 
              icon="log-out-outline" 
              title="Sair da conta" 
              isDestructive
              hasSeparator={false}
              onPress={handleLogout} // <--- CHAMA O LOGOUT REAL
            />
          </View>
          
          <Text style={styles.versionText}>Eletron App v1.2.0</Text>
        </View>

      </ScrollView>
    </View>
  );
}