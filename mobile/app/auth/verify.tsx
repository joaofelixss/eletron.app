import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
  Alert
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/constants/colors";
import { api } from "../../src/services/api"; // Importar API

export default function VerifyCodeScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30);
  const [verifying, setVerifying] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- REENVIAR CÓDIGO ---
  const handleResend = async () => {
      try {
          await api.post('/auth/send-otp', { phone });
          setTimer(30);
          Alert.alert("Enviado", "Novo código enviado para seu WhatsApp.");
      } catch (error) {
          Alert.alert("Erro", "Não foi possível reenviar.");
      }
  };

  // --- VALIDAR CÓDIGO ---
  const handleVerify = async () => {
    if (code.length !== 4) return;

    setVerifying(true);

    try {
        // Chama o Backend
        await api.post('/auth/validate-otp', { 
            phone, 
            code 
        });

        // Se não deu erro, sucesso!
        router.push({
            pathname: "/signup/step1", // Rota de Cadastro de Dados
            params: { phone }
        });

    } catch (error: any) {
        // Se o backend retornou erro (ex: código errado)
        const msg = error.response?.data?.message || "Código inválido.";
        Alert.alert("Atenção", msg);
        setCode(""); // Limpa para tentar de novo
    } finally {
        setVerifying(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="dark-content" />
      
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={{ padding: 24, paddingTop: 60, flex: 1 }}>
          
          <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 32 }}>
            <Ionicons name="arrow-back" size={24} color={colors.text.main} />
          </TouchableOpacity>

          <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 24, color: colors.text.main, marginBottom: 8 }}>
            Código enviado 📩
          </Text>
          <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 14, color: colors.text.body, lineHeight: 22 }}>
            Enviamos um código de 4 dígitos para{"\n"}
            <Text style={{ fontFamily: "Poppins_600SemiBold", color: colors.text.main }}>{phone}</Text>
          </Text>

          {/* Input Oculto */}
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={(text) => {
              if (text.length <= 4) setCode(text.replace(/[^0-9]/g, ''));
              if (text.length === 4) Keyboard.dismiss();
            }}
            keyboardType="number-pad"
            style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
            autoFocus
          />

          {/* Caixinhas do Código */}
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={() => inputRef.current?.focus()}
            style={{ flexDirection: "row", gap: 16, marginTop: 40, marginBottom: 40, justifyContent: "center" }}
          >
            {[0, 1, 2, 3].map((i) => (
              <View 
                key={i}
                style={{
                  width: 64, height: 64, borderRadius: 16, borderWidth: 1,
                  borderColor: code[i] ? colors.primary : colors.border,
                  backgroundColor: code[i] ? "rgba(242, 201, 76, 0.1)" : colors.surface,
                  justifyContent: "center", alignItems: "center",
                }}
              >
                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 28, color: colors.text.main }}>
                  {code[i] || ""}
                </Text>
              </View>
            ))}
          </TouchableOpacity>

          {/* Botão Verificar */}
          <TouchableOpacity 
            style={{
              backgroundColor: code.length === 4 ? colors.primary : "#E5E7EB",
              height: 56, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 24
            }}
            disabled={code.length !== 4 || verifying}
            onPress={handleVerify}
          >
            {verifying ? (
                <ActivityIndicator color="#000" />
            ) : (
                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, color: code.length === 4 ? "#000" : "#999" }}>
                Verificar Código
                </Text>
            )}
          </TouchableOpacity>

          <View style={{ alignItems: "center" }}>
            {timer > 0 ? (
              <Text style={{ fontFamily: "Poppins_500Medium", color: colors.text.light }}>
                Reenviar código em 00:{timer < 10 ? `0${timer}` : timer}
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={{ fontFamily: "Poppins_700Bold", color: colors.primary }}>
                  Reenviar código agora
                </Text>
              </TouchableOpacity>
            )}
          </View>

        </View>
      </KeyboardAvoidingView>
    </View>
  );
}