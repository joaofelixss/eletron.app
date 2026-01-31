import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ActivityIndicator,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 

import { styles } from "./index.styles"; 
import { colors } from "../src/constants/colors";
import { maskPhone, unmask } from "../src/utils/masks"; 

// IMPORTAR API
import { api } from "../src/services/api";
import { useAuth } from "../src/context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { signIn } = useAuth(); // Hook de Auth

  const handlePhoneChange = (text: string) => {
    setPhone(maskPhone(text));
  };

  async function handleLogin() {
    const rawPhone = unmask(phone);
    if (rawPhone.length < 11) {
      Alert.alert("Erro", "Digite o número completo com DDD.");
      return;
    }

    setLoading(true);
    setLoadingMessage("Verificando...");
    
    try {
      // 1. Verifica se existe
      const checkRes = await api.post('/auth/check-phone', { phone: rawPhone });
      const data = checkRes.data; // <--- Vamos chamar de 'data' pra facilitar

      if (data.exists) {
        setLoadingMessage(`Olá, ${data.name.split(' ')[0]}!`);
        
        // CORREÇÃO AQUI: Usar 'data' em vez de 'response.data'
        const userData = {
            id: data.id, 
            name: data.name,
            phone: rawPhone,
            email: data.email,
            storeName: data.storeName
        };

        setTimeout(async () => {
            setLoading(false);
            await signIn(userData); // <--- LOGIN REAL E PERSISTENTE
        }, 800);

      } else {
        // 2. NOVO USUÁRIO: Envia Código OTP
        setLoadingMessage("Enviando código SMS...");
        await api.post('/auth/send-otp', { phone: rawPhone });

        setTimeout(() => {
            setLoading(false);
            // Vai para a tela de Verificar Código
            router.push({ 
                pathname: "/auth/verify", 
                params: { phone: rawPhone } 
            });
        }, 800);
      }

    } catch (error) {
      console.log(error); // Bom para debug
      setLoading(false);
      Alert.alert("Erro", "Falha na conexão. Tente novamente.");
    }
  }

  function handleGoogleLogin() {
    Alert.alert("Em Breve", "Login com Google estará disponível na próxima versão.");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

        {/* MODAL DE LOADING */}
        <Modal transparent visible={loading} animationType="fade">
            <View style={{ 
                flex: 1, 
                backgroundColor: "rgba(0,0,0,0.5)", 
                justifyContent: "center", 
                alignItems: "center" 
            }}>
                <View style={{ 
                    backgroundColor: "#FFF", 
                    padding: 32, 
                    borderRadius: 24, 
                    alignItems: "center",
                    width: "80%",
                    shadowColor: "#000",
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    elevation: 10
                }}>
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginBottom: 16 }} />
                    <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 18, color: colors.text.main, marginBottom: 4, textAlign: 'center' }}>
                        {loadingMessage}
                    </Text>
                </View>
            </View>
        </Modal>

        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.contentContainer}>

            <View style={styles.header}>
              <Image 
                source={require("../assets/images/logo.png")} 
                style={styles.logo}
                resizeMode="contain"
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>Acesse sua Loja</Text>
                <Text style={styles.subtitle}>
                  Digite seu WhatsApp para entrar ou criar uma nova conta.
                </Text>
              </View>
            </View>

            <View style={styles.form}>
              <View>
                <Text style={styles.label}>WhatsApp</Text>
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
                    maxLength={15} 
                  />
                </View>
              </View>

              <TouchableOpacity 
                style={styles.button} 
                activeOpacity={0.8}
                onPress={handleLogin}
              >
                 <Text style={styles.buttonText}>Continuar</Text>
                 <Ionicons name="arrow-forward" size={20} color={colors.text.onPrimary} />
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>ou entrar com</Text>
                <View style={styles.line} />
              </View>

              <TouchableOpacity 
                style={styles.googleButton} 
                activeOpacity={0.7}
                onPress={handleGoogleLogin}
              >
                <Ionicons name="logo-google" size={20} color={colors.text.main} />
                <Text style={styles.googleText}>Google</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.footer}>
              <Text style={styles.termsText}>
                Ao continuar, você concorda com nossos{"\n"}
                <Text style={styles.linkText}>Termos de Uso</Text> e <Text style={styles.linkText}>Política de Privacidade</Text>.
              </Text>
            </View>

          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}