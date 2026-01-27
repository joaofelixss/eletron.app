import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  TextInput,
  Clipboard,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// IMPORTANDO SUAS CORES
import { colors } from "../../src/constants/colors"; 
import { styles } from "./marketing.styles";

const JUH_TIPS = [
  "💡 Dica: Vídeos de 'bastidores' geram 3x mais confiança que fotos estáticas.",
  "💡 Dica: Use enquetes nos Stories perguntando 'Qual a cor favorita?'.",
];

const CONTENT_IDEAS = [
  { id: '1', title: "Antes e Depois", type: "Reels", difficulty: "Fácil" },
  { id: '2', title: "Dica de Bateria", type: "Post", difficulty: "Médio" },
  { id: '3', title: "Unboxing iPhone 15", type: "Stories", difficulty: "Fácil" },
];

export default function MarketingHubScreen() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<"dashboard" | "copywriter">("dashboard");
  
  const [productName, setProductName] = useState("");
  const [tone, setTone] = useState<"urgente" | "amigavel" | "luxo">("amigavel");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!productName) return Alert.alert("Ops", "Diga o nome do produto!");
    setLoading(true);
    setTimeout(() => {
      let text = "";
      if (tone === "urgente") text = `🚨 ÚLTIMAS UNIDADES! 🚨\n\nO ${productName} está acabando! Garanta o seu com preço antigo agora.\n\n👇 Link na bio!`;
      if (tone === "amigavel") text = `✨ Olha quem chegou! ✨\n\nO ${productName} é perfeito para quem busca qualidade. Estou apaixonada! 😍\n\nVem testar aqui na loja!`;
      if (tone === "luxo") text = `💎 Exclusividade.\n\nApresentamos o ${productName}. Design sofisticado para quem exige excelência.\n\nDisponível agora.`;
      setGeneratedText(text);
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    Clipboard.setString(generatedText);
    Alert.alert("Sucesso", "Texto copiado! 💅");
  };

  // --- DASHBOARD ---
  const renderDashboard = () => (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      
      {/* JUH CARD */}
      <View style={styles.juhCard}>
        <View style={styles.juhHeader}>
            <Image 
                source={{ uri: "https://api.dicebear.com/9.x/avataaars/png?seed=Juh&size=100&backgroundColor=b6e3f4" }} 
                style={styles.juhAvatar} 
            />
            <View style={{flex: 1}}>
                <Text style={styles.juhName}>Oi, Chefe! Sou a Juh.</Text>
                <Text style={styles.juhRole}>Sua Gerente de Marketing</Text>
            </View>
        </View>
        <View style={styles.tipBox}>
            <Text style={styles.tipText}>{JUH_TIPS[0]}</Text>
        </View>
      </View>

      {/* FERRAMENTAS */}
      <Text style={styles.sectionTitle}>Ferramentas Criativas</Text>
      <View style={styles.toolsGrid}>
        
        <TouchableOpacity style={styles.toolCard} onPress={() => setCurrentView("copywriter")}>
            <View style={[styles.toolIcon, { backgroundColor: '#F3E8FF' }]}>
                <Ionicons name="create" size={24} color="#8B5CF6" />
            </View>
            <Text style={styles.toolTitle}>Gerador de Legendas</Text>
            <Text style={styles.toolDesc}>Crie textos que vendem.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolCard} onPress={() => Alert.alert("Em breve")}>
            <View style={[styles.toolIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="pricetag" size={24} color="#D97706" />
            </View>
            <Text style={styles.toolTitle}>Criar Promoção</Text>
            <Text style={styles.toolDesc}>Flyers de oferta rápida.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolCard} onPress={() => Alert.alert("Link", "eletron.app/loja")}>
            <View style={[styles.toolIcon, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="globe" size={24} color="#059669" />
            </View>
            <Text style={styles.toolTitle}>Vitrine Online</Text>
            <Text style={styles.toolDesc}>Seu catálogo web.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolCard}>
            <View style={[styles.toolIcon, { backgroundColor: '#FCE7F3' }]}>
                <Ionicons name="calendar" size={24} color="#DB2777" />
            </View>
            <Text style={styles.toolTitle}>Calendário</Text>
            <Text style={styles.toolDesc}>Planeje a semana.</Text>
        </TouchableOpacity>

      </View>

      {/* IDEIAS */}
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Ideias para hoje 📅</Text>
      {CONTENT_IDEAS.map((idea) => (
        <View key={idea.id} style={styles.ideaRow}>
            <View style={styles.ideaIcon}>
                <Ionicons 
                    name={idea.type === "Reels" ? "videocam" : idea.type === "Stories" ? "images" : "camera"} 
                    size={18} 
                    color={colors.text.body} 
                />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.ideaTitle}>{idea.title}</Text>
                <Text style={styles.ideaMeta}>{idea.type} • {idea.difficulty}</Text>
            </View>
            <TouchableOpacity style={styles.ideaButton}>
                <Text style={styles.ideaButtonText}>Criar</Text>
            </TouchableOpacity>
        </View>
      ))}

    </ScrollView>
  );

  // --- COPYWRITER ---
  const renderCopywriter = () => (
    <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backLink} onPress={() => setCurrentView("dashboard")}>
            <Ionicons name="arrow-back" size={16} color={colors.text.body} />
            <Text style={styles.backLinkText}>Voltar ao Menu</Text>
        </TouchableOpacity>

        <Text style={styles.pageTitle}>Gerador de Legendas ✍️</Text>
        <Text style={styles.pageSubtitle}>Me diga o produto e o tom, que eu escrevo.</Text>

        <View style={styles.formCard}>
            <Text style={styles.label}>Produto / Serviço</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Ex: iPhone 14 Pro Max..." 
                placeholderTextColor={colors.text.light}
                value={productName}
                onChangeText={setProductName}
            />

            <Text style={styles.label}>Tom de Voz</Text>
            <View style={styles.toneRow}>
                <TouchableOpacity 
                    style={[styles.toneBadge, tone === "urgente" && styles.toneActive]}
                    onPress={() => setTone("urgente")}
                >
                    <Text style={[styles.toneText, tone === "urgente" && styles.toneTextActive]}>🚨 Urgente</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.toneBadge, tone === "amigavel" && styles.toneActive]}
                    onPress={() => setTone("amigavel")}
                >
                    <Text style={[styles.toneText, tone === "amigavel" && styles.toneTextActive]}>🥰 Amigável</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.toneBadge, tone === "luxo" && styles.toneActive]}
                    onPress={() => setTone("luxo")}
                >
                    <Text style={[styles.toneText, tone === "luxo" && styles.toneTextActive]}>💎 Luxo</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.magicButton} onPress={handleGenerate} disabled={loading}>
                {loading ? (
                    <Text style={styles.magicButtonText}>Escrevendo...</Text>
                ) : (
                    <>
                        <Ionicons name="sparkles" size={18} color="#000" />
                        <Text style={styles.magicButtonText}>Gerar Texto Mágico</Text>
                    </>
                )}
            </TouchableOpacity>
        </View>

        {generatedText !== "" && (
            <View style={styles.resultContainer}>
                <View style={styles.resultHeader}>
                    <Text style={styles.resultTitle}>Sugestão da Juh:</Text>
                    <View style={{flexDirection: 'row', gap: 10}}>
                        <TouchableOpacity onPress={() => setGeneratedText("")}>
                            <Ionicons name="refresh" size={20} color={colors.text.body} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={copyToClipboard}>
                            <Ionicons name="copy" size={20} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.resultBody}>{generatedText}</Text>
            </View>
        )}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="close" size={20} color={colors.text.main} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Central de Marketing</Text>
        <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={20} color={colors.text.main} />
        </TouchableOpacity>
      </View>

      {currentView === "dashboard" ? renderDashboard() : renderCopywriter()}

    </View>
  );
}