import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/constants/colors";

const { width } = Dimensions.get("window");

// Dados dos slides
const slides = [
  {
    id: "1",
    title: "Adeus, Caderninho!",
    description: "Gerencie suas vendas, estoque e clientes em um único lugar. Simples, rápido e profissional.",
    icon: "book",
    color: colors.primary
  },
  {
    id: "2",
    title: "Controle por IMEI",
    description: "Segurança total. Saiba exatamente qual aparelho foi vendido, com rastreio de Serial e IMEI.",
    icon: "barcode",
    color: colors.info
  },
  {
    id: "3",
    title: "Inteligência Artificial",
    description: "Nosso robô ajuda você a precificar, criar legendas pro Instagram e vender mais.",
    icon: "bulb",
    color: colors.warning
  }
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  function handleNext() {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      // Acabou o onboarding -> Vai pro Login
      router.replace("/"); 
    }
  }

  function handleSkip() {
    router.replace("/");
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Botão Pular */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Pular</Text>
      </TouchableOpacity>

      {/* Conteúdo Central */}
      <View style={styles.content}>
        {/* Ícone Gigante Animado (Simulação) */}
        <View style={[styles.iconContainer, { backgroundColor: slides[currentSlideIndex].color + "20" }]}>
            <Ionicons 
                name={slides[currentSlideIndex].icon as any} 
                size={80} 
                color={slides[currentSlideIndex].color} 
            />
        </View>

        <Text style={styles.title}>{slides[currentSlideIndex].title}</Text>
        <Text style={styles.description}>{slides[currentSlideIndex].description}</Text>
      </View>

      {/* Rodapé (Bolinhas e Botão) */}
      <View style={styles.footer}>
        {/* Indicadores (Bolinhas) */}
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && { backgroundColor: colors.primary, width: 20 }
              ]}
            />
          ))}
        </View>

        {/* Botão Próximo */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>
            {currentSlideIndex === slides.length - 1 ? "COMEÇAR" : "Próximo"}
          </Text>
          <Ionicons name="arrow-forward" size={20} color={colors.text.onPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  skipButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  skipText: {
    color: colors.text.light,
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.main,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.text.body,
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 30,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    gap: 8,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  nextButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: colors.warning,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  nextButtonText: {
    color: colors.text.onPrimary,
    fontWeight: "bold",
    fontSize: 16,
  },
});