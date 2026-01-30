import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StatusBar, 
  ScrollView, Image, Alert, ActivityIndicator 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { styles } from "./product-form.styles"; 
import { api } from "../../../src/services/api";

// 1. IMPORTAR O NOVO MODAL
import { SuccessModal } from "../../../src/components/SuccessModal";

export default function AddProductScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // 2. NOVO ESTADO PARA O MODAL
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    variant: "",
    price: "",
    cost: "",
    stock: "",
    description: "",
    image: null as string | null
  });

  const handleSave = async () => {
    if (!form.name || !form.price) {
      Alert.alert("Atenção", "Nome e Preço de Venda são obrigatórios.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        description: form.variant ? `${form.description} \nVariante: ${form.variant}` : form.description, 
        sku: form.sku || undefined,
        salePrice: parseFloat(form.price.replace(',', '.')) || 0,
        costPrice: parseFloat(form.cost.replace(',', '.')) || 0,
        stock: parseInt(form.stock) || 0,
        imageUrl: form.image 
      };

      await api.post("/products", payload);

      // 3. AQUI ESTÁ A MUDANÇA: Em vez de Alert, exibimos o Modal
      setShowSuccess(true);

    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", "Não foi possível salvar o produto.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Função que roda quando clica no botão do Modal
  const handleCloseSuccess = () => {
    setShowSuccess(false);
    router.back(); // Volta para a tela anterior
  };

  const handleScan = () => {
      Alert.alert("Scanner", "Código de barras lido: 789102030");
      setForm({...form, sku: "789102030"});
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* --- INSERIR O MODAL AQUI (Pode ser em qualquer lugar dentro da View) --- */}
      <SuccessModal 
        visible={showSuccess} 
        onClose={handleCloseSuccess}
        title="Produto Cadastrado!"
        message={`O produto "${form.name}" foi salvo no estoque e já está disponível para venda.`}
      />
      {/* ----------------------------------------------------------------------- */}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Produto</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* ... (Todo o resto do seu formulário continua IGUAL) ... */}
        
        {/* FOTO UPLOAD (Placeholder) */}
        <TouchableOpacity style={styles.imageContainer}>
          {form.image ? (
              <Image source={{ uri: form.image }} style={styles.productImage} />
          ) : (
              <View style={{ alignItems: 'center' }}>
                  <Ionicons name="image-outline" size={48} color="#D1D5DB" />
                  <Text style={{ color: "#9CA3AF", marginTop: 8 }}>Toque para adicionar foto</Text>
              </View>
          )}
          
          <View style={styles.uploadButton}>
            <Ionicons name="camera" size={16} color="#000" />
            <Text style={styles.uploadText}>Foto</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.formContainer}>
            {/* NOME */}
             <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome do Produto *</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Ex: Capa iPhone 14 Pro"
                    value={form.name}
                    onChangeText={(t) => setForm({...form, name: t})}
                />
             </View>

             {/* SKU + SCANNER */}
             <View style={styles.inputGroup}>
                <Text style={styles.label}>Código de Barras / SKU</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TextInput 
                        style={[styles.input, { flex: 1 }]} 
                        placeholder="00000000"
                        value={form.sku}
                        onChangeText={(t) => setForm({...form, sku: t})}
                    />
                    <TouchableOpacity 
                        style={{ width: 50, backgroundColor: "#E5E7EB", borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}
                        onPress={handleScan}
                    >
                        <Ionicons name="qr-code-outline" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
             </View>

             <View style={styles.rowInputs}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Preço Venda *</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={form.price}
                        onChangeText={(t) => setForm({...form, price: t})}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Custo</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={form.cost}
                        onChangeText={(t) => setForm({...form, cost: t})}
                    />
                </View>
             </View>

             <View style={[styles.rowInputs, { marginTop: 20 }]}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Estoque Inicial</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="0"
                        keyboardType="numeric"
                        value={form.stock}
                        onChangeText={(t) => setForm({...form, stock: t})}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Variante (Cor/Tam)</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ex: Azul"
                        value={form.variant}
                        onChangeText={(t) => setForm({...form, variant: t})}
                    />
                </View>
             </View>

             <View style={[styles.inputGroup, { marginTop: 20 }]}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput 
                    style={[styles.input, styles.textArea]} 
                    placeholder="Detalhes do produto..."
                    multiline
                    numberOfLines={4}
                    value={form.description}
                    onChangeText={(t) => setForm({...form, description: t})}
                />
             </View>
        </View>

      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.actionButton, { opacity: loading ? 0.7 : 1 }]} 
          onPress={handleSave}
          disabled={loading}
        >
            {loading ? (
               <ActivityIndicator color="#FFF" />
            ) : (
               <>
                 <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                 <Text style={styles.actionText}>Cadastrar Produto</Text>
               </>
            )}
        </TouchableOpacity>
      </View>

    </View>
  );
}