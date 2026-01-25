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
  Keyboard
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./signup.styles";
import { colors } from "../../src/constants/colors";

export default function SignupStep1() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNext = () => {
    if (!name.trim() || !email.trim()) {
      alert("Preencha todos os campos");
      return;
    }
    // Aqui você salvaria no estado global ou passaria via params
    router.push("/signup/step2");
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
              <Text style={styles.stepIndicator}>Passo 1 de 3</Text>
            </View>

            {/* Títulos */}
            <Text style={styles.title}>Quem é você?</Text>
            <Text style={styles.subtitle}>
              Precisamos de alguns dados para identificar você no sistema.
            </Text>

            {/* Formulário */}
            <View style={styles.form}>
              <View>
                <Text style={styles.label}>Nome Completo</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={20} color={colors.text.light} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input}
                    placeholder="Ex: João Silva"
                    placeholderTextColor={colors.text.light}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.label}>E-mail Profissional</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={20} color={colors.text.light} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input}
                    placeholder="joao@minhaloja.com"
                    placeholderTextColor={colors.text.light}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>
            </View>

          </View>

          {/* Botão Próximo */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleNext}>
              <Text style={styles.buttonText}>Próximo</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.text.onPrimary} />
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}