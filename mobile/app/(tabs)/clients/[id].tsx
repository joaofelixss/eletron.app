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
import * as ImagePicker from 'expo-image-picker'; // <--- Importar ImagePicker

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

  // Estado para nova foto (se for editar)
  const [newImageUri, setNewImageUri] = useState<string | null>(null);

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
            image: data.image || null // <--- Agora puxa a imagem do banco
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

  // --- FUNÇÃO DE ESCOLHER FOTO ---
  const pickImage = async () => {
    if (!isEditing) return; // Só permite trocar foto no modo edição

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Precisamos de acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setNewImageUri(result.assets[0].uri); // Guarda temporariamente para upload
    }
  };

  // --- UPLOAD PARA CLOUDINARY ---
  const uploadImageToBackend = async (localUri: string) => {
    const filename = localUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename as string);
    const type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();
    // @ts-ignore
    formData.append('file', { uri: localUri, name: filename, type });

    const response = await api.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data.url;
  };

  // --- 2. SALVAR ALTERAÇÕES (PATCH) ---
  const handleSave = async () => {
    try {
      setSaving(true);
      
      let finalImageUrl = form.image;

      // Se o usuário selecionou uma nova foto, faz upload
      if (newImageUri) {
          try {
             finalImageUrl = await uploadImageToBackend(newImageUri);
          } catch (err) {
             console.log("Erro upload", err);
             Alert.alert("Aviso", "Erro ao subir nova foto. Mantendo a antiga.");
          }
      }

      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        cpf: form.cpf,
        notes: form.notes,
        image: finalImageUrl // Salva a URL nova (ou mantém a antiga)
      };

      await api.patch(`/clients/${id}`, payload);
      
      // Atualiza o estado local com a imagem final
      setForm(prev => ({ ...prev, image: finalImageUrl }));
      setNewImageUri(null);
      
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
      setLoading(true); 
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

  // URL para exibir (Prioridade: Nova URI local > Imagem do Banco > Avatar Gerado)
  const displayImage = newImageUri || form.image || (form.name.length > 2 
    ? `https://api.dicebear.com/9.x/avataaars/png?seed=${encodeURIComponent(form.name)}&backgroundColor=b6e3f4`
    : null);

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
        
        <TouchableOpacity onPress={() => {
            setIsEditing(!isEditing);
            setNewImageUri(null); // Reseta foto temporária se cancelar
        }}>
          <Text style={styles.saveButtonText}>{isEditing ? "Cancelar" : "Editar"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* FOTO E NOME */}
        <TouchableOpacity 
            style={styles.photoContainer} 
            onPress={pickImage} 
            activeOpacity={isEditing ? 0.7 : 1}
        >
          <View style={styles.photoCircle}>
             {displayImage ? (
                <Image source={{ uri: displayImage }} style={{ width: 100, height: 100, borderRadius: 50 }} />
             ) : (
                <Ionicons name="person" size={40} color="#9CA3AF" />
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
          
          {isEditing && <Text style={{ marginTop: 8, fontSize: 12, color: "#6B7280" }}>Toque para alterar foto</Text>}
        </TouchableOpacity>

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