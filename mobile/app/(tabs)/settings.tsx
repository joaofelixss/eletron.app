import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { styles } from "./settings.styles";

export default function SettingsScreen() {
  const router = useRouter();

  function handleLogout() {
    Alert.alert(
      "Sair do Eletron",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive",
          onPress: () => {
            // Aqui resetamos a navegação voltando para o Login
            router.replace("/"); 
          }
        }
      ]
    );
  }

  // Componente de Botão de Opção (Reutilizável)
  const SettingOption = ({ icon, color, title, subtitle, onPress }: any) => (
    <TouchableOpacity style={styles.optionButton} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.optionIcon, { backgroundColor: color + "20" }]}> 
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.text.light} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Configurações</Text>
        <Text style={styles.subtitle}>Gerencie sua conta e preferências</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Seção Conta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sua Conta</Text>
          <SettingOption 
            icon="person" 
            color={colors.primary} 
            title="Perfil da Loja" 
            subtitle="Editar logo e dados"
            onPress={() => {}}
          />
          <SettingOption 
            icon="card" 
            color={colors.success} 
            title="Assinatura" 
            subtitle="Plano Atual: BLACK ⚫"
            onPress={() => {}}
          />
        </View>

        {/* Seção App */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aplicativo</Text>
          <SettingOption 
            icon="moon" 
            color="#6B7280" 
            title="Aparência" 
            subtitle="Tema Clean (Ativo)"
            onPress={() => alert("Em breve: Troca para Dark Mode")}
          />
          <SettingOption 
            icon="notifications" 
            color="#F59E0B" 
            title="Notificações" 
            subtitle="Vendas e Estoque baixo"
            onPress={() => {}}
          />
           <SettingOption 
            icon="print" 
            color="#3B82F6" 
            title="Impressora" 
            subtitle="Configurar impressora térmica"
            onPress={() => {}}
          />
        </View>

        {/* Botão Sair */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={colors.danger} />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Versão 1.0.0 (Beta)</Text>
        <Text style={styles.versionText}>Made with ⚡ by Go Software House</Text>

      </ScrollView>
    </View>
  );
}