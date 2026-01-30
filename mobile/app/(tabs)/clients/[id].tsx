import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  Alert,
  Linking,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { formStyles as styles } from "./client-form.styles";

// 1. IMPORTAR API E MODAIS
import { api } from "../../../src/services/api";
import { SuccessModal } from "../../../src/components/SuccessModal";
import { DeleteModal } from "../../../src/components/DeleteModal";

export default function ClientDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); 

  // ESTADOS DE TELA
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // MODAIS
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
    cpf: "",
    image: null as string | null
  });

  // --- 1. BUSCAR DADOS DO CLIENTE ---
  useEffect(() => {
    async function fetchClient() {
      try {
        const response = await api.get(`/clients/${id}`);
        const data = response.data;
        setForm({
            name: data.name,
            phone: data.phone || "",
            email: data.email || "",
            notes: data.notes || "",
            cpf: data.cpf || "",
            image: null // Ainda não temos foto no banco
        });
      } catch (error) {
        Alert.alert("Erro", "Cliente não encontrado.");
        router.back();
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchClient();
  }, [id]);

  // --- 2. SALVAR ALTERAÇÕES (PATCH) ---
  const handleSave = async () => {
    try {
      setSaving(true);
      
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        cpf: form.cpf,
        notes: form.notes
      };

      await api.patch(`/clients/${id}`, payload);
      
      setShowSuccess(true);
      setIsEditing(false);

    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o cliente.");
    } finally {
      setSaving(false);
    }
  };

  // --- 3. EXCLUIR CLIENTE (DELETE) ---
  const confirmDelete = async () => {
    try {
      setShowDelete(false);
      setLoading(true); // Bloqueia a tela
      await api.delete(`/clients/${id}`);
      router.back();
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Não foi possível excluir o cliente.");
    }
  };

  const handleWhatsApp = () => {
    if (!form.phone) return Alert.alert("Erro", "Sem telefone cadastrado.");
    const cleanPhone = form.phone.replace(/\D/g, "");
    Linking.openURL(`whatsapp://send?phone=55${cleanPhone}`);
  };

  const handleCall = () => {
    if (!form.phone) return;
    Linking.openURL(`tel:${form.phone}`);
  };

  if (loading) {
      return (
          <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
              <ActivityIndicator size="large" color={colors.primary} />
          </View>
      );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* --- MODAIS --- */}
      <SuccessModal 
        visible={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Cliente Atualizado!"
        message="As informações foram salvas com sucesso."
      />

      <DeleteModal 
        visible={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={confirmDelete}
        title="Excluir Cliente?"
        message={`Tem certeza que deseja remover ${form.name}? O histórico dele será perdido.`}
      />
      {/* --------------- */}

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.title}>{isEditing ? "Editar Cliente" : "Detalhes"}</Text>
        
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
                <Text style={{fontSize: 32, fontWeight: 'bold', color: "#9CA3AF"}}>
                    {form.name ? form.name.substring(0,2).toUpperCase() : "??"}
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
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#111827" }}>
                    {form.name}
                </Text>
                <Text style={{ fontSize: 14, color: "#6B7280" }}>
                    Cliente Ativo
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
                        style={[styles.submitButton, { flex: 1, backgroundColor: "#DCFCE7", borderWidth: 0 }]}
                        onPress={handleWhatsApp}
                    >
                        <Ionicons name="logo-whatsapp" size={20} color="#15803d" />
                        <Text style={{ fontWeight: "600", color: "#15803d" }}>WhatsApp</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.submitButton, { flex: 1, backgroundColor: "#EFF6FF", borderWidth: 0 }]}
                        onPress={handleCall}
                    >
                        <Ionicons name="call" size={20} color="#1d4ed8" />
                        <Text style={{ fontWeight: "600", color: "#1d4ed8" }}>Ligar</Text>
                    </TouchableOpacity>
                </View>

                {/* Cards de Info */}
                <View style={styles.infoCard}>
                    <Text style={styles.label}>Telefone</Text>
                    <Text style={styles.infoValue}>{form.phone || "---"}</Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.label}>CPF</Text>
                    <Text style={styles.infoValue}>{form.cpf || "Não informado"}</Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.label}>E-mail</Text>
                    <Text style={styles.infoValue}>{form.email || "Não informado"}</Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.label}>Observações</Text>
                    <Text style={[styles.infoValue, { lineHeight: 22 }]}>{form.notes || "Sem observações."}</Text>
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
                    <Text style={styles.label}>CPF</Text>
                    <TextInput 
                        style={styles.input} 
                        value={form.cpf}
                        keyboardType="numeric"
                        onChangeText={(t) => setForm({...form, cpf: t})}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput 
                        style={styles.input} 
                        value={form.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
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

                {/* BOTÃO EXCLUIR */}
                <TouchableOpacity 
                    style={styles.deleteButton} 
                    onPress={() => setShowDelete(true)}
                >
                    <Text style={styles.deleteText}>Excluir Cliente</Text>
                </TouchableOpacity>
            </View>
        )}

      </ScrollView>

      {/* FOOTER (Só aparece se estiver editando) */}
      {isEditing && (
        <View style={styles.footer}>
            <TouchableOpacity 
                style={[styles.submitButton, { opacity: saving ? 0.7 : 1 }]} 
                onPress={handleSave}
                disabled={saving}
            >
            {saving ? (
                <ActivityIndicator color={colors.primary} />
            ) : (
                <>
                    <Ionicons name="save" size={20} color={colors.primary} />
                    <Text style={styles.submitButtonText}>Salvar Alterações</Text>
                </>
            )}
            </TouchableOpacity>
        </View>
      )}

    </View>
  );
}

