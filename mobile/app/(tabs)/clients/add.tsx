import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../src/constants/colors";
import { styles } from "./add.styles";
import { masks } from "../../../src/utils/masks"; // Importando nosso utilitário

export default function AddClientScreen() {
  const router = useRouter();
  
  // Estados do Formulário
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);

  // Função de Salvar
  function handleSave() {
    // Validação Básica
    if (!name.trim()) {
      return Alert.alert("Ops!", "Por favor, digite o nome do cliente.");
    }
    if (phone.length < 14) { // (11) 9...
      return Alert.alert("Ops!", "O WhatsApp é obrigatório e precisa ser válido.");
    }

    setLoading(true);
    
    // Simulação de Salvamento no Banco
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Sucesso!", `Cliente ${name} cadastrado com sucesso.`, [
        { text: "OK", onPress: () => router.back() }
      ]);
    }, 1000);
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.main} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Cliente</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Campo NOME */}
        <Text style={styles.label}>Nome Completo</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color={colors.text.light} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ex: João da Silva"
            placeholderTextColor={colors.text.light}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        {/* Campo WHATSAPP (Obrigatório) */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.label}>WhatsApp <Text style={{ color: colors.danger }}>*</Text></Text>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="logo-whatsapp" size={20} color={colors.success} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="(DD) 90000-0000"
            placeholderTextColor={colors.text.light}
            keyboardType="number-pad"
            value={phone}
            onChangeText={(text) => setPhone(masks.phone(text))} // Aplicando Máscara
            maxLength={15}
          />
        </View>

        {/* Campo CPF (Opcional) */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.label}>CPF <Text style={styles.optionalText}>(Opcional)</Text></Text>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="card-outline" size={20} color={colors.text.light} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="000.000.000-00"
            placeholderTextColor={colors.text.light}
            keyboardType="number-pad"
            value={cpf}
            onChangeText={(text) => setCpf(masks.cpf(text))} // Aplicando Máscara
            maxLength={14}
          />
        </View>

      </ScrollView>

      {/* Footer com Botão */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.saveButton, { opacity: loading ? 0.7 : 1 }]} 
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
             <Text style={styles.saveButtonText}>Salvando...</Text>
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={24} color={colors.text.onPrimary} />
              <Text style={styles.saveButtonText}>Cadastrar Cliente</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}