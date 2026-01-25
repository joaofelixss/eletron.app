import React, { useState, useEffect } from "react";
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
  Alert,
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./signup.styles"; // Reutilizando estilos
import { colors } from "../../src/constants/colors";

export default function SignupStep4() {
  const router = useRouter();
  
  // Estado do Assistente
  const [assistantName, setAssistantName] = useState("Eletron");
  const [style, setStyle] = useState<"bottts" | "avataaars">("bottts"); // Robô ou Humano
  const [seed, setSeed] = useState("Eletron"); // Semente para gerar imagem
  const [personality, setPersonality] = useState("friendly"); // friendly | serious
  const [loadingImg, setLoadingImg] = useState(false);

  // URL Dinâmica
  const avatarUrl = `https://api.dicebear.com/9.x/${style}/png?seed=${seed}&size=200&backgroundColor=${style === 'bottts' ? 'transparent' : 'b6e3f4'}`;

  const handleFinish = () => {
    // Aqui salvaríamos as configs do assistente no backend
    Alert.alert(
      "Equipe Pronta! 🚀", 
      `${assistantName} foi contratado(a) como seu gerente digital.`,
      [
        { 
          text: "Entrar na Loja", 
          onPress: () => router.replace("/(tabs)/home") 
        }
      ]
    );
  };

  const handleSkip = () => {
    router.replace("/(tabs)/home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <View style={styles.content}>
            
            {/* Header com Skip */}
            <View style={[styles.header, { justifyContent: "space-between" }]}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={colors.text.main} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSkip}>
                <Text style={{ fontFamily: "Poppins_600SemiBold", color: colors.text.light }}>Pular</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Seu Parceiro Digital 🤖</Text>
            <Text style={styles.subtitle}>
              Personalize a IA que vai gerenciar sua loja e te dar insights diários.
            </Text>

            {/* ÁREA DE PREVIEW */}
            <View style={{ alignItems: "center", marginBottom: 32 }}>
              <View style={{
                width: 140, height: 140, borderRadius: 70, 
                backgroundColor: style === 'bottts' ? colors.surface : "#b6e3f4",
                borderWidth: 4, borderColor: colors.primary,
                justifyContent: "center", alignItems: "center",
                marginBottom: 16, overflow: "hidden"
              }}>
                <Image 
                  source={{ uri: avatarUrl }} 
                  style={{ width: 120, height: 120 }} 
                  onLoadStart={() => setLoadingImg(true)}
                  onLoadEnd={() => setLoadingImg(false)}
                />
                {loadingImg && <ActivityIndicator style={{position: 'absolute'}} color={colors.primary} />}
              </View>

              <TouchableOpacity 
                style={{
                  flexDirection: "row", alignItems: "center", gap: 6,
                  backgroundColor: colors.surface, paddingHorizontal: 12, paddingVertical: 6,
                  borderRadius: 20, borderWidth: 1, borderColor: colors.border
                }}
                onPress={() => setSeed(Math.random().toString(36))}
              >
                <Ionicons name="dice-outline" size={16} color={colors.text.main} />
                <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 12 }}>Gerar Outro</Text>
              </TouchableOpacity>
            </View>

            {/* FORMULÁRIO */}
            <View style={styles.form}>
              
              {/* Nome */}
              <View>
                <Text style={styles.label}>Como devo me chamar?</Text>
                <View style={styles.inputContainer}>
                  <TextInput 
                    style={styles.input}
                    value={assistantName}
                    onChangeText={(t) => {
                      setAssistantName(t);
                      setSeed(t); // Muda o avatar conforme digita
                    }}
                    placeholder="Ex: Eletron, Jarvis, Juh..."
                  />
                </View>
              </View>

              {/* Tipo de Avatar */}
              <View>
                <Text style={styles.label}>Aparência</Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <TouchableOpacity 
                    style={[
                      styles.inputContainer, 
                      { flex: 1, justifyContent: "center", borderColor: style === 'bottts' ? colors.primary : colors.border, backgroundColor: style === 'bottts' ? colors.primary + '15' : colors.surface }
                    ]}
                    onPress={() => setStyle('bottts')}
                  >
                    <Ionicons name="hardware-chip-outline" size={20} color={colors.text.main} />
                    <Text style={{ fontFamily: "Poppins_600SemiBold", marginLeft: 8 }}>Robô</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[
                      styles.inputContainer, 
                      { flex: 1, justifyContent: "center", borderColor: style === 'avataaars' ? colors.primary : colors.border, backgroundColor: style === 'avataaars' ? colors.primary + '15' : colors.surface }
                    ]}
                    onPress={() => setStyle('avataaars')}
                  >
                    <Ionicons name="person-outline" size={20} color={colors.text.main} />
                    <Text style={{ fontFamily: "Poppins_600SemiBold", marginLeft: 8 }}>Humano</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Personalidade (Futuro Prompt da IA) */}
              <View>
                <Text style={styles.label}>Personalidade</Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <TouchableOpacity 
                    style={[
                      styles.inputContainer, 
                      { flex: 1, justifyContent: "center", borderColor: personality === 'friendly' ? colors.primary : colors.border }
                    ]}
                    onPress={() => setPersonality('friendly')}
                  >
                    <Text style={{ fontSize: 18, marginRight: 6 }}>😁</Text>
                    <Text style={{ fontFamily: "Poppins_500Medium" }}>Amigável</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[
                      styles.inputContainer, 
                      { flex: 1, justifyContent: "center", borderColor: personality === 'serious' ? colors.primary : colors.border }
                    ]}
                    onPress={() => setPersonality('serious')}
                  >
                    <Text style={{ fontSize: 18, marginRight: 6 }}>🧐</Text>
                    <Text style={{ fontFamily: "Poppins_500Medium" }}>Analítico</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleFinish}>
              <Text style={styles.buttonText}>Concluir e Entrar</Text>
              <Ionicons name="rocket-outline" size={20} color={colors.text.onPrimary} />
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}