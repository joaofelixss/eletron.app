import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./signup.styles";
import { colors } from "../../src/constants/colors";

export default function SignupStep3() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleFinish = () => {
    if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    // Sucesso!
    Alert.alert("Bem-vindo!", "Sua conta foi criada com sucesso.", [
        { 
            text: "Ir para o App", 
            onPress: () => router.replace("/(tabs)/home") // Zera a pilha e vai pra Home
        }
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <View style={styles.content}>
            
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={colors.text.main} />
              </TouchableOpacity>
              <Text style={styles.stepIndicator}>Passo 3 de 3</Text>
            </View>

            {/* Títulos */}
            <Text style={styles.title}>Proteja sua conta</Text>
            <Text style={styles.subtitle}>
              Crie uma senha segura para acessar seus dados em qualquer dispositivo.
            </Text>

            {/* Formulário */}
            <View style={styles.form}>
              <View>
                <Text style={styles.label}>Senha</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color={colors.text.light} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input}
                    placeholder="Mínimo 6 caracteres"
                    placeholderTextColor={colors.text.light}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons 
                        name={showPassword ? "eye-off-outline" : "eye-outline"} 
                        size={20} 
                        color={colors.text.light} 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text style={styles.label}>Confirmar Senha</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color={colors.text.light} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input}
                    placeholder="Digite a senha novamente"
                    placeholderTextColor={colors.text.light}
                    secureTextEntry={!showPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                </View>
              </View>
            </View>

          </View>

          {/* Botão Finalizar */}
          <View style={styles.footer}>
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: colors.success }]} // Verde para finalizar
                activeOpacity={0.8} 
                onPress={handleFinish}
            >
              <Text style={[styles.buttonText, { color: "#FFF" }]}>Finalizar Cadastro</Text>
              <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}