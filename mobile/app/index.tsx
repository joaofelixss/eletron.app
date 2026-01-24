import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../src/constants/colors"; 
import { Ionicons } from "@expo/vector-icons"; 
import { styles } from "./index.styles"; 

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Formata o telefone: (11) 99999-9999
  const handlePhoneChange = (text: string) => {
    // Remove tudo que não é número
    const cleaned = text.replace(/\D/g, "");
    
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`;
    }
    if (cleaned.length > 7) {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7, 11)}`;
    }
    
    setPhone(formatted);
  };

  function handleLogin() {
    if (phone.length < 14) {
      alert("Por favor, digite um número válido.");
      return;
    }
    setLoading(true);
    
    // Simula verificação e vai para o Cadastro
    setTimeout(() => {
      setLoading(false);
      // 🔥 MUDANÇA: Redireciona para o primeiro passo do cadastro
      router.push("/signup/step1"); 
    }, 1000); 
  }

  function handleGoogleLogin() {
    alert("Conectando com Google...");
    // Futuro: Implementar Auth do Google
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

        {/* 1. Header com Logo e Textos */}
        <View style={styles.header}>
          {/* Logo da pasta assets */}
          <Image 
            source={require("../assets/images/logo.png")} 
            style={styles.logo}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Qual seu WhatsApp?</Text>
            <Text style={styles.subtitle}>Inicie seu cadastro ou acesse a sua conta</Text>
          </View>
        </View>

        {/* 2. Formulário */}
        <View style={styles.form}>
          
          {/* Input de Telefone Customizado */}
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.flag}>🇧🇷</Text>
              <Text style={styles.ddi}>+55</Text>
            </View>
            <TextInput 
              style={styles.input} 
              placeholder="(11) 99999-0000"
              placeholderTextColor={colors.text.light}
              keyboardType="number-pad"
              value={phone}
              onChangeText={handlePhoneChange}
              maxLength={15} // (DD) 9XXXX-XXXX
            />
          </View>

          {/* Botão Começar */}
          <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8}
            onPress={handleLogin}
          >
            {loading ? (
              <ActivityIndicator color={colors.text.onPrimary} /> 
            ) : (
              <Text style={styles.buttonText}>Começar</Text>
            )}
          </TouchableOpacity>

          {/* Divisor */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>ou</Text>
            <View style={styles.line} />
          </View>

          {/* Botão Google */}
          <TouchableOpacity 
            style={styles.googleButton} 
            activeOpacity={0.7}
            onPress={handleGoogleLogin}
          >
            <Ionicons name="logo-google" size={20} color={colors.text.main} />
            <Text style={styles.googleText}>Logar com Google</Text>
          </TouchableOpacity>

        </View>
        
        {/* 3. Rodapé Termos */}
        <View style={styles.footer}>
          <Text style={styles.termsText}>
            Ao continuar você concorda com os{"\n"}
            <Text style={styles.linkText} onPress={() => alert('Termos')}>Termos de Uso</Text> e <Text style={styles.linkText} onPress={() => alert('Privacidade')}>Política de Privacidade</Text> do Eletron.
          </Text>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}