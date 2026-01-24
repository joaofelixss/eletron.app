import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  ImageBackground,
  Animated,
  Easing
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import { colors } from "../../src/constants/colors";

export default function ScannerScreen() {
  const router = useRouter();
  const [hasDetected, setHasDetected] = useState(true); // Simulando detecção para mostrar o painel
  const [flashOn, setFlashOn] = useState(false);
  
  // Animação da linha de scan
  const scanAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 120], // Move de cima para baixo dentro do frame
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* 1. CAMERA PREVIEW (Simulada) */}
      <ImageBackground 
        source={{ uri: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=600" }} 
        style={styles.cameraPreview}
      >
        {/* Camadas Escuras (Backdrop) */}
        <View style={styles.topOverlay} />
        <View style={styles.bottomOverlay} />
        <View style={styles.leftOverlay} />
        <View style={styles.rightOverlay} />

        {/* MOLDURA CENTRAL */}
        <View style={styles.overlayContainer}>
          <View style={styles.scanFrame}>
            {/* Cantos Amarelos */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            
            {/* Linha Laser Animada */}
            <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} />
            
            <Text style={styles.instructionText}>Alinhe o código QR na moldura</Text>
          </View>
        </View>
      </ImageBackground>

      {/* 2. HEADER ACTIONS (Sobreposto) */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleBadge}>
          <Text style={styles.headerTitleText}>Escanear Código</Text>
        </View>

        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => setFlashOn(!flashOn)}
        >
          <Ionicons name={flashOn ? "flash" : "flash-off"} size={24} color={flashOn ? colors.primary : "#FFF"} />
        </TouchableOpacity>
      </View>

      {/* 3. DETECTED SHEET (Sobe quando detecta) */}
      {hasDetected && (
        <View style={styles.bottomSheet}>
          <View style={styles.dragHandle} />
          
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Produto Detectado</Text>
          </View>

          <View style={styles.productRow}>
            <View style={styles.productIconBox}>
              <Ionicons name="phone-portrait-outline" size={32} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.productName}>iPhone 14</Text>
              <Text style={styles.productDetail}>Modelo: A2882 • 128GB Midnight</Text>
            </View>
          </View>

          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              activeOpacity={0.8}
              onPress={() => alert("Adicionado!")}
            >
              <Ionicons name="cube-outline" size={20} color="#000" />
              <Text style={styles.primaryButtonText}>Adicionar ao Estoque</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
              <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Ver Detalhes</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

    </View>
  );
}