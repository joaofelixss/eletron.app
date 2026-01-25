import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TextInput,
  StatusBar,
  ActivityIndicator,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../src/constants/colors";
import { AVATAR_STYLES, AVATAR_OPTIONS, OPTION_LABELS } from "../../src/constants/avatar-options";

export default function AvatarEditorScreen() {
  const router = useRouter();
  
  // ESTADOS DO AVATAR
  const [seed, setSeed] = useState("Joao"); // Nome base (semente)
  const [selectedStyle, setSelectedStyle] = useState("avataaars");
  const [customOptions, setCustomOptions] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // URL DO AVATAR GERADO
  const [avatarUrl, setAvatarUrl] = useState("");

  // Atualiza a URL sempre que algo mudar
  useEffect(() => {
    let url = `https://api.dicebear.com/9.x/${selectedStyle}/png?seed=${seed}&size=256`;
    
    // Adiciona as opções customizadas na URL (apenas para avataaars por enquanto)
    if (selectedStyle === "avataaars") {
      Object.entries(customOptions).forEach(([key, value]) => {
        if (value && value !== "none") {
          url += `&${key}=${value}`;
        }
      });
    }

    // Adiciona uma cor de fundo aleatória/fixa se quiser
    // url += "&backgroundColor=b6e3f4"; 

    setAvatarUrl(url);
  }, [seed, selectedStyle, customOptions]);

  const handleSave = () => {
    // AQUI VOCÊ SALVARIA A URL NO CONTEXTO OU BACKEND
    console.log("Avatar Salvo:", avatarUrl);
    Alert.alert("Sucesso!", "Seu novo avatar foi atualizado.", [
      { text: "OK", onPress: () => router.back() }
    ]);
  };

  const OptionSelector = ({ category, options }: { category: string, options: string[] }) => (
    <View style={styles.optionGroup}>
      <Text style={styles.optionTitle}>{OPTION_LABELS[category] || category}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
        {options.map((opt) => {
          const isSelected = customOptions[category] === opt || (!customOptions[category] && opt === "none");
          return (
            <TouchableOpacity 
              key={opt}
              style={[styles.optionChip, isSelected && styles.optionChipActive]}
              onPress={() => setCustomOptions(prev => ({ ...prev, [category]: opt }))}
            >
              <Text style={[styles.optionChipText, isSelected && styles.optionChipTextActive]}>
                {opt.replace(/([A-Z])/g, ' $1').trim()} {/* Formata camelCase */}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="close" size={24} color={colors.text.main} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Avatar</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* PREVIEW AREA */}
        <View style={styles.previewContainer}>
          <View style={styles.avatarCircle}>
             <Image 
               source={{ uri: avatarUrl }} 
               style={styles.avatarImage}
               onLoadStart={() => setLoading(true)}
               onLoadEnd={() => setLoading(false)}
             />
             {loading && <ActivityIndicator style={StyleSheet.absoluteFill} color={colors.primary} />}
          </View>
          <TouchableOpacity 
            style={styles.randomButton}
            onPress={() => setSeed(Math.random().toString(36).substring(7))}
          >
            <Ionicons name="dice-outline" size={20} color="#000" />
            <Text style={styles.randomText}>Gerar Aleatório</Text>
          </TouchableOpacity>
        </View>

        {/* INPUT DE NOME (SEED) */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Nome (Semente)</Text>
          <TextInput 
            style={styles.input}
            value={seed}
            onChangeText={setSeed}
            placeholder="Digite seu nome..."
          />
          <Text style={styles.helperText}>O avatar muda conforme o nome digitado.</Text>
        </View>

        {/* SELETOR DE ESTILO */}
        <Text style={styles.sectionTitle}>Estilo do Avatar</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.styleRow}>
          {AVATAR_STYLES.map((style) => (
            <TouchableOpacity 
              key={style.id}
              style={[styles.styleCard, selectedStyle === style.id && styles.styleCardActive]}
              onPress={() => {
                setSelectedStyle(style.id);
                setCustomOptions({}); // Reseta opções ao mudar estilo
              }}
            >
              <Ionicons 
                name={style.icon as any} 
                size={24} 
                color={selectedStyle === style.id ? "#000" : "#666"} 
              />
              <Text style={[styles.styleText, selectedStyle === style.id && styles.styleTextActive]}>
                {style.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* OPÇÕES AVANÇADAS (Só aparece se for 'avataaars') */}
        {selectedStyle === "avataaars" && (
          <View style={styles.advancedOptions}>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Personalizar Aparência</Text>
            
            <OptionSelector category="skinColor" options={AVATAR_OPTIONS.skinColor} />
            <OptionSelector category="top" options={AVATAR_OPTIONS.top} />
            <OptionSelector category="hairColor" options={AVATAR_OPTIONS.hairColor} />
            <OptionSelector category="facialHair" options={AVATAR_OPTIONS.facialHair} />
            <OptionSelector category="accessories" options={AVATAR_OPTIONS.accessories} />
            <OptionSelector category="clothing" options={AVATAR_OPTIONS.clothing} />
            <OptionSelector category="eyes" options={AVATAR_OPTIONS.eyes} />
            <OptionSelector category="mouth" options={AVATAR_OPTIONS.mouth} />
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
  },
  iconButton: {
    padding: 8,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#000",
  },
  content: {
    paddingBottom: 40,
  },

  // PREVIEW
  previewContainer: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#F9FAFB",
    marginBottom: 24,
  },
  avatarCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFF",
    borderWidth: 4,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: "hidden",
    marginBottom: 16,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  randomButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  randomText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: colors.text.main,
  },

  // INPUT
  inputSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: colors.text.main,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: colors.text.main,
  },
  helperText: {
    marginTop: 6,
    fontSize: 11,
    color: "#9CA3AF",
  },

  // STYLES
  sectionTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: colors.text.main,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  styleRow: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  styleCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 12,
  },
  styleCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  styleText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#666",
  },
  styleTextActive: {
    color: "#000",
  },

  // ADVANCED OPTIONS
  advancedOptions: {
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 20,
    marginBottom: 24,
  },
  optionGroup: {
    marginBottom: 20,
  },
  optionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#6B7280",
    paddingHorizontal: 20,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  scrollRow: {
    paddingHorizontal: 20,
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  optionChipActive: {
    backgroundColor: "#FFF",
    borderColor: colors.primary,
  },
  optionChipText: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    color: "#6B7280",
  },
  optionChipTextActive: {
    color: colors.text.main,
    fontFamily: "Poppins_600SemiBold",
  },
});