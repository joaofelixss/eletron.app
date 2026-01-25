import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  Image, 
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./chat.styles";
import { colors } from "../../../src/constants/colors";

// --- DADOS MOCKADOS ---

// 1. A Equipe Digital (Viria do banco de dados/contexto)
const ASSISTANTS = [
  { 
    id: "eletron", 
    name: "Eletron", 
    role: "Geral", 
    avatar: "https://api.dicebear.com/9.x/bottts/png?seed=Eletron&size=100",
    suggestions: ["📊 Resumo do Dia", "❓ Como cadastrar produto?", "📈 Meta de Vendas"]
  },
  { 
    id: "juh", 
    name: "Juh", 
    role: "Marketing", 
    avatar: "https://api.dicebear.com/9.x/avataaars/png?seed=Juh&size=100&backgroundColor=b6e3f4",
    suggestions: ["📸 Ideia de Story", "✍️ Legenda para Promoção", "📅 Calendário de Posts"]
  },
  { 
    id: "glauber", 
    name: "Glauber", 
    role: "Vendas", 
    avatar: "https://api.dicebear.com/9.x/avataaars/png?seed=Glauber&size=100&backgroundColor=c0aede",
    suggestions: ["💰 Analisar Margem", "🔍 Estoque Parado", "🤝 Recuperar Clientes"]
  },
];

// 2. Mensagens Iniciais
const INITIAL_MESSAGES = [
  { id: "1", text: "Olá! Eu sou o Eletron, seu assistente geral. Como posso ajudar sua loja hoje?", sender: "bot", assistantId: "eletron", time: "09:00" },
];

export default function ChatScreen() {
  const [activeTab, setActiveTab] = useState<"team" | "clients">("team");
  const [selectedAssistant, setSelectedAssistant] = useState(ASSISTANTS[0]);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  // Scrolla para o fim quando chega mensagem nova
  useEffect(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages]);

  // Função de Enviar Mensagem
  const handleSend = (text = inputText) => {
    if (!text.trim()) return;

    // 1. Adiciona msg do usuário
    const userMsg = {
      id: Math.random().toString(),
      text: text,
      sender: "user",
      assistantId: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText("");

    // 2. Simula "Digitando..." e Resposta da IA
    setTimeout(() => {
      const botResponse = {
        id: Math.random().toString(),
        text: `Entendi! Como sou uma versão de demonstração, ainda estou aprendendo sobre "${text}". \n\nMas logo a ${selectedAssistant.name} vai poder te responder de verdade! 🚀`,
        sender: "bot",
        assistantId: selectedAssistant.id,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const renderMessage = ({ item }: any) => {
    const isUser = item.sender === "user";
    const currentBot = ASSISTANTS.find(a => a.id === item.assistantId);

    return (
      <View style={[styles.bubbleContainer, isUser ? styles.bubbleUser : styles.bubbleBot]}>
        {/* Avatar (Só aparece se for Bot) */}
        {!isUser && (
          <Image 
            source={{ uri: currentBot?.avatar }} 
            style={styles.chatAvatar} 
          />
        )}

        <View style={[styles.bubbleContent, isUser ? styles.bubbleContentUser : styles.bubbleContentBot]}>
          <Text style={[styles.msgText, isUser ? styles.msgTextUser : styles.msgTextBot]}>
            {item.text}
          </Text>
          <Text style={[styles.msgTime, { color: isUser ? "rgba(0,0,0,0.4)" : "#999" }]}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* 1. HEADER & TOGGLE */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Central de Inteligência</Text>
          <TouchableOpacity onPress={() => Alert.alert("Configurações", "Configurar API do WhatsApp")}>
             <Ionicons name="ellipsis-horizontal" size={24} color={colors.text.main} />
          </TouchableOpacity>
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, activeTab === "team" && styles.toggleActive]}
            onPress={() => setActiveTab("team")}
          >
            <Text style={[styles.toggleText, activeTab === "team" && styles.toggleTextActive]}>
              Minha Equipe (IA)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleButton, activeTab === "clients" && styles.toggleActive]}
            onPress={() => setActiveTab("clients")}
          >
            <Text style={[styles.toggleText, activeTab === "clients" && styles.toggleTextActive]}>
              Clientes (WhatsApp)
            </Text>
          </TouchableOpacity>
        </View>

        {/* LISTA DE ASSISTENTES (SÓ APARECE NA ABA TEAM) */}
        {activeTab === "team" && (
          <View style={{ marginTop: 12 }}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.assistantsList}
            >
              {ASSISTANTS.map((assistant) => (
                <TouchableOpacity 
                  key={assistant.id}
                  style={[styles.assistantItem, selectedAssistant.id === assistant.id && styles.assistantItemActive]}
                  onPress={() => setSelectedAssistant(assistant)}
                >
                  <Image 
                    source={{ uri: assistant.avatar }} 
                    style={[styles.assistantAvatar, selectedAssistant.id === assistant.id && styles.assistantAvatarActive]} 
                  />
                  <Text style={styles.assistantName}>{assistant.name}</Text>
                  <Text style={styles.assistantRole}>{assistant.role}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* 2. AREA DE CONTEÚDO */}
      {activeTab === "team" ? (
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : undefined} 
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
          style={{ flex: 1 }}
        >
          {/* FEED DE MENSAGENS */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.chatContainer}
            ListHeaderComponent={() => (
               <View style={styles.dateSeparator}>
                 <Text style={styles.dateText}>Hoje</Text>
               </View>
            )}
          />

          {/* INPUT AREA */}
          <View style={styles.footer}>
            {/* Sugestões Rápidas */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsScroll}>
              {selectedAssistant.suggestions.map((suggestion, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.suggestionChip}
                  onPress={() => handleSend(suggestion)}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.inputRow}>
              <TouchableOpacity style={styles.attachButton}>
                <Ionicons name="add-circle-outline" size={28} color={colors.text.light} />
              </TouchableOpacity>
              
              <View style={styles.inputFieldContainer}>
                <TextInput 
                  style={styles.inputField}
                  placeholder={`Perguntar para ${selectedAssistant.name}...`}
                  placeholderTextColor="#999"
                  value={inputText}
                  onChangeText={setInputText}
                  multiline
                />
              </View>

              <TouchableOpacity 
                style={styles.sendButton}
                onPress={() => handleSend()}
              >
                <Ionicons name="send" size={20} color="#000" style={{ marginLeft: 2 }} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      ) : (
        // --- PLACEHOLDER DA ABA CLIENTES ---
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 40 }}>
          <View style={{ width: 80, height: 80, backgroundColor: "#E6FFFA", borderRadius: 40, justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
             <Ionicons name="logo-whatsapp" size={40} color="#059669" />
          </View>
          <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 18, color: colors.text.main, textAlign: "center" }}>
            WhatsApp Integrado
          </Text>
          <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 14, color: colors.text.body, textAlign: "center", marginTop: 8 }}>
            Em breve você poderá responder seus clientes, enviar orçamentos em PDF e usar a IA para vender, tudo por aqui.
          </Text>
          <View style={{ marginTop: 24, backgroundColor: "#FEF3C7", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#B45309" }}>RECURSO PREMIUM (BLACK)</Text>
          </View>
        </View>
      )}

    </View>
  );
}