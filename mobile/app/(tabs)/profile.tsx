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

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Sair", 
      "Deseja realmente sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: () => router.replace("/") }
      ]
    );
  };

  // Componente de Item de Menu
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
          isDestructive && { backgroundColor: "#FEF2F2" }, // Fundo vermelho se for logout
          !isDestructive && isPro && { backgroundColor: "rgba(234, 197, 79, 0.15)" } // Amarelo padrão
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
        
        {/* 1. PROFILE HEADER */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBox}>
              <Image 
                source={{ uri: "https://ui-avatars.com/api/?name=Joao+Silva&background=0A0A0A&color=EAC54F&size=256" }} 
                style={styles.avatarImage} 
              />
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={14} color={colors.text.onPrimary} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>João Silva</Text>
          <Text style={styles.userStore}>TechFix Mobile</Text>
          
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
            <Text style={styles.statValue}>50</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Avaliação da Loja</Text>
              <Ionicons name="star" size={20} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>4.9</Text>
          </View>
        </View>

        {/* 3. MENU GROUP 1 */}
        <View style={styles.menuGroup}>
          <View style={styles.cardGroup}>
            <MenuItem 
              icon="person-outline" 
              title="Meus Dados" 
              subtitle="Informações pessoais e de login"
              onPress={() => {}}
            />
            <MenuItem 
              icon="storefront-outline" 
              title="Minha Loja" 
              subtitle="Configurações do estabelecimento"
              onPress={() => {}}
            />
            <MenuItem 
              icon="trophy-outline" 
              title="Assinatura" 
              subtitle="Gerenciar plano"
              isPro
              hasSeparator={false}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* 4. MENU GROUP 2 */}
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
              onPress={handleLogout}
            />
            <MenuItem 
  icon="storefront-outline" 
  title="Minha Loja / Catálogo" // Atualizei o nome
  subtitle="Configurações do estabelecimento"
  onPress={() => router.push("/catalog")} // <--- Link para a nova tela
/>
          </View>
          
          <Text style={styles.versionText}>Eletron App v1.2.0</Text>
        </View>

      </ScrollView>
    </View>
  );
}