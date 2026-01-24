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
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 

import { styles } from "./index.styles"; 
import { colors } from "../src/constants/colors";
import { maskPhone, unmask } from "../src/utils/masks"; 

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handlePhoneChange = (text: string) => {
    setPhone(maskPhone(text));
  };

  async function handleLogin() {
    const rawPhone = unmask(phone);
    if (rawPhone.length < 11) {
      alert("Por favor, digite um número de celular válido com DDD.");
      return;
    }

    setLoading(true);
    setLoadingMessage("Verificando seu número...");
    
    // Simula uma requisição à API
    setTimeout(() => {
      // LOGICA SIMULADA: Se o número terminar em '9', é usuário existente.
      // Se não, é usuário novo.
      if (rawPhone.endsWith("9")) {
        setLoadingMessage("Conta encontrada!");
        setTimeout(() => {
            setLoading(false);
            router.push({ pathname: "/auth/welcome-back", params: { phone } });
        }, 800);
      } else {
        setLoadingMessage("Quase lá...");
        setTimeout(() => {
            setLoading(false);
            router.push({ pathname: "/auth/verify", params: { phone } });
        }, 800);
      }
    }, 1500); 
  }

  function handleGoogleLogin() {
    alert("Funcionalidade em desenvolvimento.");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

        {/* MODAL DE LOADING "QUASE LÁ" */}
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
                    <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 18, color: colors.text.main, marginBottom: 4 }}>
                        {loadingMessage}
                    </Text>
                    <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 12, color: colors.text.light }}>
                        Aguarde um momento
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
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>Qual seu WhatsApp?</Text>
                <Text style={styles.subtitle}>
                  Inicie seu cadastro ou acesse a sua conta para gerenciar sua loja.
                </Text>
              </View>
            </View>

            <View style={styles.form}>
              <View>
                <Text style={styles.label}>Celular</Text>
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
                 <Text style={styles.buttonText}>Começar</Text>
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