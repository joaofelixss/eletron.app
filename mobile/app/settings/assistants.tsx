import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image, 
  Modal, 
  TextInput,
  Alert,
  Switch
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { styles } from "./assistants.styles";

// Tipagem do Assistente
type Assistant = {
  id: string;
  name: string;
  role: string; // Ex: Gerente, Marketing, Financeiro
  style: "bottts" | "avataaars";
  seed: string;
  personality: "friendly" | "serious" | "energetic";
  isActive: boolean;
};

// Dados Mockados Iniciais
const INITIAL_TEAM: Assistant[] = [
  { 
    id: "1", 
    name: "Eletron", 
    role: "Gerente Geral", 
    style: "bottts", 
    seed: "Eletron", 
    personality: "serious",
    isActive: true 
  }
];

export default function AssistantsScreen() {
  const router = useRouter();
  const [team, setTeam] = useState<Assistant[]>(INITIAL_TEAM);
  
  // Estado do Modal de Edição
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Estados do Formulário
  const [name, setName] = useState("");
  const [role, setRole] = useState("Vendas");
  const [style, setStyle] = useState<"bottts" | "avataaars">("bottts");
  const [seed, setSeed] = useState("");
  const [personality, setPersonality] = useState<"friendly" | "serious" | "energetic">("friendly");

  // Abrir Modal (Novo ou Editar)
  const openModal = (assistant?: Assistant) => {
    if (assistant) {
      setEditingId(assistant.id);
      setName(assistant.name);
      setRole(assistant.role);
      setStyle(assistant.style);
      setSeed(assistant.seed);
      setPersonality(assistant.personality);
    } else {
      setEditingId(null);
      setName("");
      setRole("Marketing");
      setStyle("bottts");
      setSeed(Math.random().toString(36));
      setPersonality("friendly");
    }
    setModalVisible(true);
  };

  // Salvar Assistente
  const handleSave = () => {
    if (!name) return Alert.alert("Ops", "Dê um nome ao seu assistente.");

    const newAssistant: Assistant = {
      id: editingId || Math.random().toString(),
      name,
      role,
      style,
      seed: seed || name,
      personality,
      isActive: true
    };

    if (editingId) {
      setTeam(prev => prev.map(a => a.id === editingId ? newAssistant : a));
    } else {
      setTeam(prev => [...prev, newAssistant]);
    }
    setModalVisible(false);
  };

  // Deletar Assistente
  const handleDelete = (id: string) => {
    Alert.alert("Demitir?", "Tem certeza que deseja remover este assistente?", [
      { text: "Cancelar" },
      { text: "Remover", style: 'destructive', onPress: () => setTeam(prev => prev.filter(a => a.id !== id)) }
    ]);
  };

  // URL do Avatar Dinâmico
  const getAvatarUrl = (s: string, st: string) => 
    `https://api.dicebear.com/9.x/${st}/png?seed=${s}&size=120&backgroundColor=${st === 'bottts' ? 'transparent' : 'b6e3f4'}`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.main} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Equipe Digital</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Seus Especialistas 🤖</Text>
          <Text style={styles.heroSubtitle}>
            Configure IAs especializadas para cuidar de cada setor da sua loja.
          </Text>
        </View>

        {/* LISTA DA EQUIPE */}
        <View style={styles.grid}>
          {team.map((assistant) => (
            <TouchableOpacity 
              key={assistant.id} 
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => openModal(assistant)}
            >
              <View style={[styles.cardHeader, { backgroundColor: assistant.style === 'bottts' ? '#F3F4F6' : '#b6e3f4' }]}>
                <Image 
                  source={{ uri: getAvatarUrl(assistant.seed, assistant.style) }} 
                  style={styles.cardAvatar}
                />
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDelete(assistant.id)}
                >
                  <Ionicons name="trash-outline" size={16} color={colors.danger} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.cardBody}>
                <Text style={styles.cardName}>{assistant.name}</Text>
                <View style={styles.roleBadge}>
                  <Text style={styles.roleText}>{assistant.role}</Text>
                </View>
                <View style={styles.statusRow}>
                  <View style={styles.activeDot} />
                  <Text style={styles.statusText}>Ativo • {assistant.personality === 'friendly' ? 'Amigável' : 'Sério'}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* BOTÃO ADICIONAR (SLOT) */}
          <TouchableOpacity style={styles.addCard} onPress={() => openModal()}>
            <View style={styles.addIconCircle}>
              <Ionicons name="add" size={32} color={colors.primary} />
            </View>
            <Text style={styles.addText}>Contratar Novo</Text>
            <Text style={styles.addSubtext}>1 vaga disponível</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* --- MODAL DE EDIÇÃO --- */}
      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{editingId ? "Editar Especialista" : "Nova Contratação"}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalClose}>Cancelar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.modalContent}>
            
            {/* PREVIEW */}
            <View style={styles.previewContainer}>
              <Image 
                source={{ uri: getAvatarUrl(seed || name, style) }} 
                style={styles.previewImage}
              />
              <TouchableOpacity 
                style={styles.randomButton}
                onPress={() => setSeed(Math.random().toString(36))}
              >
                <Ionicons name="dice" size={16} color={colors.text.main} />
                <Text style={styles.randomText}>Gerar Visual</Text>
              </TouchableOpacity>
            </View>

            {/* FORM */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nome do Assistente</Text>
              <TextInput 
                style={styles.input} 
                value={name} 
                onChangeText={setName} 
                placeholder="Ex: Juh, Glauber..." 
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Especialidade (Módulo)</Text>
              <View style={styles.chipRow}>
                {["Geral", "Vendas", "Marketing", "Financeiro"].map((r) => (
                  <TouchableOpacity 
                    key={r}
                    style={[styles.chip, role === r && styles.chipActive]}
                    onPress={() => setRole(r)}
                  >
                    <Text style={[styles.chipText, role === r && styles.chipTextActive]}>{r}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Aparência</Text>
              <View style={styles.typeRow}>
                <TouchableOpacity 
                  style={[styles.typeCard, style === 'bottts' && styles.typeCardActive]}
                  onPress={() => setStyle('bottts')}
                >
                  <Ionicons name="hardware-chip-outline" size={24} color={colors.text.main} />
                  <Text style={styles.typeText}>Robô</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.typeCard, style === 'avataaars' && styles.typeCardActive]}
                  onPress={() => setStyle('avataaars')}
                >
                  <Ionicons name="person-outline" size={24} color={colors.text.main} />
                  <Text style={styles.typeText}>Humano</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Personalidade / Tom de Voz</Text>
              <View style={styles.chipRow}>
                {[
                   {id: 'friendly', label: '😊 Amigável'}, 
                   {id: 'serious', label: '🧐 Sério'}, 
                   {id: 'energetic', label: '⚡ Energético'}
                ].map((p) => (
                  <TouchableOpacity 
                    key={p.id}
                    style={[styles.chip, personality === p.id && styles.chipActive]}
                    onPress={() => setPersonality(p.id as any)}
                  >
                    <Text style={[styles.chipText, personality === p.id && styles.chipTextActive]}>{p.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Confirmar Contratação</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}