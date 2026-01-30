import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { styles } from "./product-form.styles";

// 1. IMPORTAR API E MODAL
import { api } from "../../../src/services/api";
import { SuccessModal } from "../../../src/components/SuccessModal";
import { DeleteModal } from "../../../src/components/DeleteModal";

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Pega o ID da rota

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Modal State
  const [showSuccess, setShowSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  // Estado do Formulário
  const [form, setForm] = useState({
    name: "",
    variant: "",
    price: 0,
    cost: 0,
    stock: 0,
    description: "",
    sku: "",
    image: null as string | null
  });

  // --- 1. BUSCAR DADOS REAIS DO MONGODB ---
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await api.get(`/products/${id}`);
        const data = response.data;

        // Preencher o formulário com dados do banco
        setForm({
            name: data.name,
            variant: "", // O banco ainda não salva variante separada, mas podemos ajustar depois
            price: Number(data.salePrice), // Mapeando salePrice -> price
            cost: Number(data.costPrice),  // Mapeando costPrice -> cost
            stock: Number(data.stock),
            description: data.description || "",
            sku: data.sku || "",
            image: data.imageUrl || null
        });
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar o produto.");
        router.back();
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  // --- CÁLCULOS VISUAIS ---
  const profit = form.price - form.cost;
  const margin = form.price > 0 ? ((profit / form.price) * 100).toFixed(0) : "0";

  // --- 2. ATUALIZAR PRODUTO (PATCH) ---
  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        name: form.name,
        description: form.description,
        sku: form.sku,
        salePrice: Number(form.price),
        costPrice: Number(form.cost),
        stock: Number(form.stock),
        imageUrl: form.image
      };

      await api.patch(`/products/${id}`, payload);

      setModalMessage("As informações do produto foram atualizadas com sucesso.");
      setShowSuccess(true);
      setIsEditing(false);

    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao atualizar produto.");
    } finally {
      setSaving(false);
    }
  };

  // --- 2. FUNÇÃO QUE DELETA DE VERDADE (Chamada pelo Modal) ---
  const confirmDelete = async () => {
    try {
        // Fecha o modal primeiro
        setShowDelete(false); 
        setLoading(true); // Mostra loading rápido
        
        await api.delete(`/products/${id}`);
        
        // Volta para a tela anterior
        router.back(); 
    } catch (error) {
        setLoading(false);
        Alert.alert("Erro", "Não foi possível excluir o produto.");
    }
  };

  // --- 3. BOTÃO APENAS ABRE O MODAL ---
  const handleDeletePress = () => {
    setShowDelete(true);
  };

  if (loading) {
    return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

    {/* --- INSERIR OS MODAIS --- */}
      <SuccessModal 
        visible={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Produto Atualizado!"
        message={modalMessage}
      />

      <DeleteModal 
        visible={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={confirmDelete}
        title="Tem certeza?"
        message={`Você está prestes a excluir "${form.name}". Essa ação não pode ser desfeita.`}
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>
            {isEditing ? "Editar Produto" : "Detalhes"}
        </Text>
        
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editButtonText}>
            {isEditing ? "Cancelar" : "Editar"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* HERO IMAGE */}
        <View style={styles.imageContainer}>
          {form.image ? (
             <Image source={{ uri: form.image }} style={styles.productImage} />
          ) : (
             <View style={[styles.productImage, { backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' }]}>
                <Ionicons name="image-outline" size={64} color="#D1D5DB" />
             </View>
          )}
          
          {isEditing && (
            <TouchableOpacity style={styles.uploadButton}>
              <Ionicons name="camera" size={16} color="#000" />
              <Text style={styles.uploadText}>Alterar Foto</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* --- MODO VISUALIZAÇÃO --- */}
        {!isEditing && (
          <>
            <View style={styles.mainInfo}>
              <Text style={styles.productName}>{form.name}</Text>
              <Text style={styles.sku}>SKU: {form.sku || "---"}</Text>
              
              <View style={styles.priceRow}>
                <Text style={styles.currency}>R$</Text>
                <Text style={styles.price}>
                    {form.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </Text>
              </View>

              {/* GRID DE STATS */}
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Estoque</Text>
                    <Text style={[styles.statValue, { color: form.stock < 3 ? colors.danger : "#000" }]}>
                        {form.stock} un
                    </Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Custo Unit.</Text>
                    <Text style={styles.statValue}>R$ {form.cost}</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: "#DCFCE7", borderColor: "#86EFAC" }]}>
                    <Text style={styles.statLabel}>Margem</Text>
                    <Text style={[styles.statValue, { color: "#15803d" }]}>{margin}%</Text>
                </View>
              </View>
            </View>

            {/* AI INSIGHT */}
            <View style={styles.aiCard}>
                <Ionicons name="sparkles" size={20} color="#4F46E5" />
                <Text style={styles.aiText}>
                    <Text style={{fontWeight: 'bold'}}>Análise do Glauber:</Text> 
                    {Number(margin) > 30 
                        ? " Ótima margem de lucro! Produto saudável para o caixa."
                        : " A margem está apertada. Considere renegociar com o fornecedor."}
                </Text>
            </View>

            <View style={{ padding: 24, paddingTop: 0 }}>
                <Text style={[styles.label, { fontSize: 16, marginBottom: 8 }]}>Descrição</Text>
                <Text style={{ color: "#4B5563", lineHeight: 24 }}>
                    {form.description || "Sem descrição cadastrada."}
                </Text>
            </View>
          </>
        )}

        {/* --- MODO EDIÇÃO --- */}
        {isEditing && (
          <View style={styles.formContainer}>
             <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome do Produto</Text>
                <TextInput 
                    style={styles.input} 
                    value={form.name}
                    onChangeText={(t) => setForm({...form, name: t})}
                />
             </View>

             <View style={styles.inputGroup}>
                <Text style={styles.label}>SKU (Código)</Text>
                <TextInput 
                    style={styles.input} 
                    value={form.sku}
                    onChangeText={(t) => setForm({...form, sku: t})}
                />
             </View>

             <View style={styles.rowInputs}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Preço Venda (R$)</Text>
                    <TextInput 
                        style={styles.input} 
                        value={String(form.price)}
                        keyboardType="numeric"
                        onChangeText={(t) => setForm({...form, price: Number(t.replace(',', '.'))})}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Custo (R$)</Text>
                    <TextInput 
                        style={styles.input} 
                        value={String(form.cost)}
                        keyboardType="numeric"
                        onChangeText={(t) => setForm({...form, cost: Number(t.replace(',', '.'))})}
                    />
                </View>
             </View>

             <View style={[styles.rowInputs, { marginTop: 20 }]}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Estoque Atual</Text>
                    <TextInput 
                        style={styles.input} 
                        value={String(form.stock)}
                        keyboardType="numeric"
                        onChangeText={(t) => setForm({...form, stock: Number(t)})}
                    />
                </View>
             </View>

             <View style={[styles.inputGroup, { marginTop: 20 }]}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput 
                    style={[styles.input, styles.textArea]} 
                    value={form.description}
                    multiline
                    numberOfLines={4}
                    onChangeText={(t) => setForm({...form, description: t})}
                />
             </View>

           {/* BOTÃO DE EXCLUIR CHAMA O MODAL */}
             <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
                 <Text style={styles.deleteText}>Excluir Produto</Text>
             </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      {/* FOOTER ACTION */}
      <View style={styles.footer}>
        {isEditing ? (
            <TouchableOpacity 
                style={[styles.actionButton, { opacity: saving ? 0.7 : 1 }]} 
                onPress={handleSave}
                disabled={saving}
            >
                {saving ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <>
                        <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                        <Text style={styles.actionText}>Salvar Alterações</Text>
                    </>
                )}
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/marketing")}>
                <Ionicons name="share-social" size={24} color={colors.primary} />
                <Text style={styles.actionText}>Divulgar Oferta</Text>
            </TouchableOpacity>
        )}
      </View>

    </View>
  );
}