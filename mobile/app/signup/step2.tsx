import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { Ionicons } from "@expo/vector-icons";

// Copie os estilos do step1 ou crie um arquivo separado signup.styles.ts
// Estou repetindo aqui para facilitar o copy-paste
import { styles } from "./signup.styles";// Assumindo que você exportou os estilos de lá

export default function SignupStep2() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* BARRA DE PROGRESSO (66%) */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: "66%" }]} />
      </View>

      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.main} />
        </TouchableOpacity>

        <Text style={styles.title}>Acesso Seguro</Text>
        <Text style={styles.subtitle}>Crie suas credenciais para acessar em outros dispositivos.</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color={colors.text.light} style={styles.inputIcon} />
          <TextInput 
            style={styles.input} placeholder="Seu melhor e-mail" keyboardType="email-address" autoCapitalize="none"
            value={email} onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="key-outline" size={20} color={colors.text.light} style={styles.inputIcon} />
          <TextInput 
            style={styles.input} placeholder="Crie uma senha forte" secureTextEntry
            value={password} onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push("/signup/step3")}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}