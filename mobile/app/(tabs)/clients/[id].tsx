import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  Alert,
  Linking
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { formStyles as styles } from "./client-form.styles";

export default function ClientDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Pega o ID da URL

  // Estado: Editando ou Visualizando?
  const [isEditing, setIsEditing] = useState(false);

  // Dados Mockados (Simulando o cliente que veio do ID)
  const [form, setForm] = useState({
    name: "João Silva",
    phone: "11998765432",
    email: "joao.silva@email.com",
    notes: "Cliente VIP. Sempre pede película de vidro.",
    image: null as string | null
  });

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert("Atualizado", "Dados do cliente salvos com sucesso!");
  };

  const handleWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=55${form.phone}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.title}>{isEditing ? "Editar Cliente" : "Detalhes"}</Text>
        
        {/* Botão de Toggle (Editar/Cancelar) */}
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.saveButtonText}>{isEditing ? "Cancelar" : "Editar"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* FOTO E NOME */}
        <View style={styles.photoContainer}>
          <View style={styles.photoCircle}>
             {form.image ? (
                <Image source={{uri: form.image}} style={styles.photoImage} />
             ) : (
                // Iniciais se não tiver foto
                <Text style={{fontSize: 32, fontWeight: 'bold', color: "#9CA3AF"}}>
                    {form.name.substring(0,2).toUpperCase()}
                </Text>
             )}
          </View>
          
          {isEditing && (
            <View style={styles.editPhotoBadge}>
                <Ionicons name="camera" size={14} color="#000" />
            </View>
          )}

          {!isEditing && (
             <View style={{ alignItems: 'center', marginTop: 12 }}>
                <Text style={{ fontSize: 20, fontFamily: "Poppins_700Bold", color: "#111827" }}>
                    {form.name}
                </Text>
                <Text style={{ fontSize: 14, color: "#6B7280" }}>
                    Cliente desde Jan/2026
                </Text>
             </View>
          )}
        </View>

        {/* --- MODO VISUALIZAÇÃO (READ ONLY) --- */}
        {!isEditing && (
            <View>
                {/* Ações Rápidas */}
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
                    <TouchableOpacity 
                        style={[styles.submitButton, { flex: 1, backgroundColor: "#DCFCE7" }]}
                        onPress={handleWhatsApp}
                    >
                        <Ionicons name="logo-whatsapp" size={20} color="#15803d" />
                        <Text style={{ fontFamily: "Poppins_600SemiBold", color: "#15803d" }}>WhatsApp</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.submitButton, { flex: 1, backgroundColor: "#EFF6FF" }]}
                    >
                        <Ionicons name="call" size={20} color="#1d4ed8" />
                        <Text style={{ fontFamily: "Poppins_600SemiBold", color: "#1d4ed8" }}>Ligar</Text>
                    </TouchableOpacity>
                </View>

                {/* Cards de Info */}
                <View style={{ backgroundColor: "#FFF", borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "#E5E7EB" }}>
                    <Text style={styles.label}>Telefone</Text>
                    <Text style={{ fontSize: 16, color: "#111827" }}>{form.phone}</Text>
                </View>

                <View style={{ backgroundColor: "#FFF", borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "#E5E7EB" }}>
                    <Text style={styles.label}>E-mail</Text>
                    <Text style={{ fontSize: 16, color: "#111827" }}>{form.email}</Text>
                </View>

                <View style={{ backgroundColor: "#FFF", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: "#E5E7EB" }}>
                    <Text style={styles.label}>Observações</Text>
                    <Text style={{ fontSize: 14, color: "#4B5563", lineHeight: 22 }}>{form.notes}</Text>
                </View>
            </View>
        )}

        {/* --- MODO EDIÇÃO (INPUTS) --- */}
        {isEditing && (
            <View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome Completo</Text>
                    <TextInput 
                        style={styles.input} 
                        value={form.name}
                        onChangeText={(t) => setForm({...form, name: t})}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput 
                        style={styles.input} 
                        value={form.phone}
                        keyboardType="phone-pad"
                        onChangeText={(t) => setForm({...form, phone: t})}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput 
                        style={styles.input} 
                        value={form.email}
                        keyboardType="email-address"
                        onChangeText={(t) => setForm({...form, email: t})}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Observações</Text>
                    <TextInput 
                        style={[styles.input, styles.textArea]} 
                        multiline
                        numberOfLines={4}
                        value={form.notes}
                        onChangeText={(t) => setForm({...form, notes: t})}
                    />
                </View>
            </View>
        )}

      </ScrollView>

      {/* FOOTER (Só aparece se estiver editando) */}
      {isEditing && (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
            <Ionicons name="save" size={20} color={colors.primary} />
            <Text style={styles.submitButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
        </View>
      )}

    </View>
  );
}