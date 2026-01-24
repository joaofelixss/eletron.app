import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient"; // Para o efeito no preview

export default function MarketingScreen() {
  const router = useRouter();
  const [format, setFormat] = useState<"web" | "pdf">("web");

  const handleShare = () => {
    const message = format === "web" 
      ? "Link copiado! Abra o WhatsApp para colar."
      : "Gerando PDF... Aguarde um instante.";
    Alert.alert("Compartilhar", message);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#181811" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconBox}>
            <Ionicons name="flash" size={20} color={colors.primary} />
          </View>
          <Text style={styles.headerTitle}>Divulgação Automática</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeText}>CONCLUIR</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* HERO TEXT */}
        <View style={styles.heroContainer}>
          <Text style={styles.heroTitle}>
            Pronto para{"\n"}
            <Text style={styles.highlight}>Divulgar</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            A IA gerou estes materiais de marketing para o seu novo produto.
          </Text>
        </View>

        {/* SEGMENTED CONTROL */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity 
            style={[styles.segmentButton, format === "web" && styles.segmentActive]}
            onPress={() => setFormat("web")}
          >
            <Ionicons name="globe-outline" size={18} color={format === "web" ? "#000" : "#999"} />
            <Text style={[styles.segmentText, format === "web" && styles.segmentTextActive]}>Link Web</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.segmentButton, format === "pdf" && styles.segmentActive]}
            onPress={() => setFormat("pdf")}
          >
            <Ionicons name="document-text-outline" size={18} color={format === "pdf" ? "#000" : "#999"} />
            <Text style={[styles.segmentText, format === "pdf" && styles.segmentTextActive]}>Flyer PDF</Text>
          </TouchableOpacity>
        </View>

        {/* PREVIEW CARD */}
        <View style={{ width: '100%', alignItems: 'center' }}>
          {/* Efeito Glow atrás */}
          <View style={styles.glowEffect} />
          
          <View style={styles.previewCard}>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: "https://images.unsplash.com/photo-1603351154351-5cf99bc32f2d?auto=format&fit=crop&q=80&w=400" }} 
                style={styles.productImage} 
              />
              
              <View style={styles.aiBadge}>
                <Ionicons name="sparkles" size={12} color={colors.primary} />
                <Text style={styles.aiBadgeText}>Gerado por IA</Text>
              </View>

              {/* Browser Overlay (Simulação) */}
              <View style={styles.browserOverlay}>
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.9)']}
                  style={styles.browserGradient}
                />
                <View style={styles.browserContent}>
                  <View style={styles.browserIcon}>
                    <Ionicons name="flash" size={16} color="#000" />
                  </View>
                  <View style={styles.browserUrl}>
                    <Text style={styles.urlTitle}>iPhone 13 Pro - Oferta</Text>
                    <Text style={styles.urlLink}>eletron.app/vitrine/iphone-13</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardTitle}>Vitrine Digital</Text>
                  <Text style={styles.cardSubtitle}>Otimizado para mobile e conversão.</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>ATIVO</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Ionicons name="eye-outline" size={14} color="#999" />
                  <Text style={styles.statText}>Pronto para visualização</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="checkmark-circle-outline" size={14} color="#999" />
                  <Text style={styles.statText}>Estoque verificado</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* FOOTER ACTIONS */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleShare}>
          <Ionicons name="logo-whatsapp" size={20} color="#000" />
          <Text style={styles.primaryButtonText}>Compartilhar Link</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Ionicons name="download-outline" size={20} color="#FFF" />
          <Text style={styles.secondaryButtonText}>Baixar PDF da Vitrine</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}