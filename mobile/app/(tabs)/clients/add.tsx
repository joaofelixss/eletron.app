import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Alert,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { formStyles as styles } from "./client-form.styles"; 

// 1. IMPORTAR API E MODAL
import { api } from "../../../src/services/api";
import { SuccessModal } from "../../../src/components/SuccessModal";

export default function AddClientScreen() {
  const router = useRouter();
  
  // Estados do Formulário
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [cpf, setCpf] = useState(""); // Adicionei CPF também

  // Estados de Controle
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    if (!name || !phone) {
      Alert.alert("Atenção", "Nome e Telefone são obrigatórios.");
      return;
    }
    
    try {
      setLoading(true);

      const payload = {
        name,
        phone,
        email,
        notes,
        cpf
      };

      // 2. ENVIA PARA O BACKEND
      await api.post('/clients', payload);

      // 3. MOSTRA O MODAL BONITO
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

      {/* MODAL DE SUCESSO */}
      <SuccessModal 
        visible={showSuccess}
        onClose={handleCloseSuccess}
        title="Cliente Cadastrado!"
        message={`${name} agora faz parte da sua base de contatos.`}
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Novo Cliente</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* FOTO UPLOAD (Placeholder) */}
        <TouchableOpacity style={styles.photoContainer}>
          <View style={styles.photoCircle}>
              <Ionicons name="person" size={40} color="#9CA3AF" />
          </View>
          <View style={styles.editPhotoBadge}>
            <Ionicons name="camera" size={16} color="#000" />
          </View>
          <Text style={{ marginTop: 8, fontSize: 12, color: "#6B7280" }}>Adicionar Foto</Text>
        </TouchableOpacity>

        {/* CAMPOS */}
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

      {/* FOOTER */}
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