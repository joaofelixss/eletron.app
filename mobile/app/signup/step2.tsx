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

export default function SignupStep2() {
  const router = useRouter();
  const [storeName, setStoreName] = useState("");
  const [category, setCategory] = useState("");

  const handleNext = () => {
    if (!storeName.trim()) {
      alert("Por favor, informe o nome da sua loja.");
      return;
    }
    // Avança para a senha
    router.push("/signup/step3");
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
              <Text style={styles.stepIndicator}>Passo 2 de 3</Text>
            </View>

            {/* Títulos */}
            <Text style={styles.title}>Sobre seu negócio</Text>
            <Text style={styles.subtitle}>
              Como seus clientes conhecem sua loja ou assistência?
            </Text>

            {/* Formulário */}
            <View style={styles.form}>
              <View>
                <Text style={styles.label}>Nome da Loja</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="storefront-outline" size={20} color={colors.text.light} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input}
                    placeholder="Ex: TechFix Centro"
                    placeholderTextColor={colors.text.light}
                    value={storeName}
                    onChangeText={setStoreName}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.label}>Segmento (Opcional)</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="pricetag-outline" size={20} color={colors.text.light} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input}
                    placeholder="Ex: Assistência Apple, Acessórios..."
                    placeholderTextColor={colors.text.light}
                    value={category}
                    onChangeText={setCategory}
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