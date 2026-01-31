import React, { useState, useCallback } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Alert,
  ActivityIndicator,
  Image 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router"; // <--- 1. Importar useFocusEffect
import * as ImagePicker from 'expo-image-picker';

import { colors } from "../../../src/constants/colors";
import { formStyles as styles } from "./client-form.styles"; 

import { api } from "../../../src/services/api";
import { SuccessModal } from "../../../src/components/SuccessModal";
import { useAuth } from "../../../src/context/AuthContext";

export default function AddClientScreen() {
  const router = useRouter();
  const { user } = useAuth(); 
  
  // Estados do Formulário
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [cpf, setCpf] = useState(""); 
  
  const [customImage, setCustomImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- CORREÇÃO: LIMPAR FORMULÁRIO AO SAIR DA TELA ---
  useFocusEffect(
    useCallback(() => {
      // O que estiver aqui roda ao ENTRAR na tela (se quiser forçar limpeza na entrada)
      
      return () => {
        // O que estiver aqui roda ao SAIR da tela
        // Limpa tudo para a próxima vez
        setName("");
        setPhone("");
        setEmail("");
        setNotes("");
        setCpf("");
        setCustomImage(null);
        setLoading(false);
        setShowSuccess(false);
      };
    }, [])
  );

  // --- LÓGICA DO AVATAR ---
  const avatarUrl = customImage 
    ? customImage 
    : (name.length > 2 
        ? `https://api.dicebear.com/9.x/avataaars/png?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4`
        : null);

  const pickImage = async () => {
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
      setCustomImage(result.assets[0].uri);
    }
  };

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

  const handleSave = async () => {
    if (!name || !phone) {
      Alert.alert("Atenção", "Nome e Telefone são obrigatórios.");
      return;
    }

    if (!user?.id) {
        Alert.alert("Erro", "Sessão inválida. Faça login novamente.");
        return;
    }
    
    try {
      setLoading(true);
      let finalImageUrl = null;

      if (customImage) {
         try {
            finalImageUrl = await uploadImageToBackend(customImage);
         } catch (err) {
            console.log("Erro upload imagem", err);
            Alert.alert("Aviso", "Erro ao subir foto. Cliente será salvo sem foto.");
         }
      } 
      else if (name.length > 2) {
         finalImageUrl = `https://api.dicebear.com/9.x/avataaars/png?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4`;
      }

      const payload = {
        name,
        phone,
        email,
        notes,
        cpf,
        image: finalImageUrl, 
        userId: user.id
      };

      await api.post('/clients', payload);

      setShowSuccess(true);

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível cadastrar o cliente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      <SuccessModal 
        visible={showSuccess}
        onClose={handleCloseSuccess}
        title="Cliente Cadastrado!"
        message={`${name} agora faz parte da sua base de contatos.`}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Novo Cliente</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
          {avatarUrl ? (
             <Image 
                source={{ uri: avatarUrl }} 
                style={{ width: 100, height: 100, borderRadius: 50 }} 
             />
          ) : (
             <View style={styles.photoCircle}>
                 <Ionicons name="person" size={40} color="#9CA3AF" />
             </View>
          )}

          <View style={styles.editPhotoBadge}>
            <Ionicons name="camera" size={16} color="#000" />
          </View>
          <Text style={{ marginTop: 8, fontSize: 12, color: "#6B7280" }}>
             {customImage ? "Trocar Foto" : "Adicionar Foto"}
          </Text>
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: Maria Silva" 
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>WhatsApp / Telefone *</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: (11) 99999-9999" 
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CPF (Opcional)</Text>
          <TextInput 
            style={styles.input} 
            placeholder="000.000.000-00" 
            keyboardType="numeric"
            value={cpf}
            onChangeText={setCpf}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail (Opcional)</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: maria@email.com" 
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Observações</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Ex: Cliente prefere contato após as 18h..." 
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
          />
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
            style={[styles.submitButton, { opacity: loading ? 0.7 : 1 }]} 
            onPress={handleSave}
            disabled={loading}
        >
          {loading ? (
             <ActivityIndicator color={colors.primary} />
          ) : (
             <>
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                <Text style={styles.submitButtonText}>Salvar Cliente</Text>
             </>
          )}
        </TouchableOpacity>
      </View>

    </View>
  );
}