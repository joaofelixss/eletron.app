import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./signup.styles"; // <--- IMPORTANTE: Importando o arquivo novo

export default function SignupStep1() {
  const router = useRouter();
  const [code, setCode] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* BARRA DE PROGRESSO (33%) */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: "33%" }]} />
      </View>

      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.main} />
        </TouchableOpacity>

        <Text style={styles.title}>Código de Verificação</Text>
        <Text style={styles.subtitle}>Enviamos um código para seu WhatsApp.</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.text.light} style={styles.inputIcon} />
          <TextInput 
            style={styles.input}
            placeholder="000000"
            keyboardType="number-pad"
            maxLength={6}
            value={code}
            onChangeText={setCode}
            autoFocus
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, code.length < 6 && styles.buttonDisabled]} 
          disabled={code.length < 6}
          onPress={() => router.push("/signup/step2")}
        >
          <Text style={styles.buttonText}>Verificar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}