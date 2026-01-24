import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./signup.styles"; // Reutilizando estilo base

export default function SignupStep3() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birth, setBirth] = useState("");

  // Mascaras simples
  const handleCpf = (text: string) => {
    let v = text.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(v);
  };

  const handleDate = (text: string) => {
    let v = text.replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);
    v = v.replace(/(\d{2})(\d)/, "$1/$2");
    v = v.replace(/(\d{2})(\d)/, "$1/$2");
    setBirth(v);
  };

  return (
    <View style={styles.container}>
      {/* BARRA DE PROGRESSO (100%) */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: "100%", backgroundColor: colors.success }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.main} />
        </TouchableOpacity>

        <Text style={styles.title}>Seus Dados</Text>
        <Text style={styles.subtitle}>Para emitirmos a garantia com validade jurídica.</Text>

        {/* Avatar Placeholder (Você vai colocar a imagem real depois) */}
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: colors.border, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
             <Ionicons name="person" size={50} color={colors.text.light} />
             {/* <Image source={{ uri: "sua_imagem_aqui" }} style={{ width: 100, height: 100 }} /> */}
          </View>
          <Text style={{ marginTop: 8, color: colors.primary, fontFamily: "Poppins_600SemiBold", fontSize: 12 }}>Adicionar Foto</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Nome Completo" value={name} onChangeText={setName} />
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={[styles.inputContainer, { flex: 1 }]}>
             <TextInput style={styles.input} placeholder="CPF" keyboardType="number-pad" value={cpf} onChangeText={handleCpf} maxLength={14} />
          </View>
          <View style={[styles.inputContainer, { width: 120 }]}>
             <TextInput style={styles.input} placeholder="DD/MM/AAAA" keyboardType="number-pad" value={birth} onChangeText={handleDate} maxLength={10} />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.success }]}
          onPress={() => {
             // Fim do Cadastro!
             router.replace("/(tabs)/home");
          }}
        >
          <Text style={styles.buttonText}>Finalizar Cadastro</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}