import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  Switch,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { styles } from "./settings.styles";

// IMPORTANDO AUTH CONTEXT
import { useAuth } from "../../src/context/AuthContext";

export default function SettingsScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth(); // <--- Hook de Auth
  
  // Estados dos Toggles (Visuais por enquanto)
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [biometryEnabled, setBiometryEnabled] = useState(true);

  // URL Dinâmica do Avatar
  const avatarSeed = user?.name || "User";
  const avatarUrl = `https://api.dicebear.com/9.x/avataaars/png?seed=${avatarSeed}&backgroundColor=b6e3f4`;

  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair do Eletron?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive", 
          onPress: async () => {
            await signOut(); // <--- LOGOUT REAL (Limpa sessão e vai pro Login)
          } 
        }
      ]
    );
  };

  // Componente de Item de Menu (Reutilizável)
  const SettingsItem = ({ 
    icon, 
    label, 
    value, 
    isToggle = false, 
    toggleValue, 
    onToggle,
    onPress,
    hasSeparator = true,
    iconColor = colors.text.white // Default white se o fundo for escuro, ajuste conforme seu style
  }: any) => (
    <>
      <TouchableOpacity 
        style={styles.itemButton} 
        activeOpacity={isToggle ? 1 : 0.7}
        onPress={isToggle ? undefined : onPress}
      >
        <View style={styles.iconBox}>
          {/* Ajustei a cor para text.muted caso o fundo seja claro, ou mantenha white se for escuro */}
          <Ionicons name={icon} size={20} color={colors.text.onPrimary || "#FFF"} />
        </View>
        
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{label}</Text>
        </View>

        {isToggle ? (
          <Switch
            value={toggleValue}
            onValueChange={onToggle}
            trackColor={{ false: "#E5E7EB", true: colors.primary }}
            thumbColor={toggleValue ? "#FFF" : "#f4f3f4"}
          />
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {value && <Text style={styles.itemValue}>{value}</Text>}
            <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
          </View>
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
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.main} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* PERFIL (DADOS REAIS) */}
        <TouchableOpacity 
          style={styles.profileSection} 
          activeOpacity={0.8}
          onPress={() => router.push("/profile/avatar-editor")} 
        >
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: avatarUrl }} 
              style={styles.avatar} 
            />
            <View style={styles.editBadge}>
              <Ionicons name="pencil" size={12} color="#FFF" />
            </View>
          </View>
          <Text style={styles.userName}>{user?.name || "Usuário"}</Text>
          <Text style={styles.userRole}>
             {/* Exemplo de lógica simples de cargo */}
             Dono • {user?.storeName || "Minha Loja"}
          </Text>
        </TouchableOpacity>

        {/* GRUPO: GERAL */}
        <Text style={styles.sectionTitle}>Geral</Text>
        <View style={styles.groupContainer}>
          <SettingsItem 
            icon="storefront-outline" 
            label="Perfil da Loja" 
            onPress={() => {}} 
          />
          <SettingsItem 
            icon="language-outline" 
            label="Idioma" 
            value="Português (BR)" 
            onPress={() => {}} 
            hasSeparator={false}
          />
        </View>

        {/* GRUPO: NOTIFICAÇÕES */}
        <Text style={styles.sectionTitle}>Notificações</Text>
        <View style={styles.groupContainer}>
          <SettingsItem 
            icon="notifications-outline" 
            label="Notificações Push" 
            isToggle 
            toggleValue={pushEnabled}
            onToggle={setPushEnabled}
          />
          <SettingsItem 
            icon="mail-outline" 
            label="Resumo por Email" 
            isToggle 
            toggleValue={emailEnabled}
            onToggle={setEmailEnabled}
            hasSeparator={false}
          />
        </View>

        {/* GRUPO: SEGURANÇA */}
        <Text style={styles.sectionTitle}>Segurança</Text>
        <View style={styles.groupContainer}>
          <SettingsItem 
            icon="lock-closed-outline" 
            label="Alterar Senha" 
            onPress={() => {}} 
          />
          <SettingsItem 
            icon="finger-print-outline" 
            label="Biometria / Face ID" 
            isToggle 
            toggleValue={biometryEnabled}
            onToggle={setBiometryEnabled}
            hasSeparator={false}
          />
        </View>

        {/* GRUPO: SUPORTE */}
        <Text style={styles.sectionTitle}>Suporte</Text>
        <View style={styles.groupContainer}>
          <SettingsItem 
            icon="help-circle-outline" 
            label="Central de Ajuda" 
            onPress={() => {}} 
          />
          <SettingsItem 
            icon="chatbubble-ellipses-outline" 
            label="Fale Conosco" 
            onPress={() => {}} 
            hasSeparator={false}
          />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={colors.danger} />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Eletron App • Versão 1.0.2</Text>

      </ScrollView>
    </View>
  );
}