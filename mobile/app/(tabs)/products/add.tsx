import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { styles } from "./product-form.styles"; // Reutilizando estilos

export default function AddProductScreen() {
  const router = useRouter();

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

  const handleSave = () => {
    if (!form.name || !form.price) {
      Alert.alert("Erro", "Nome e Preço são obrigatórios.");
      return;
    }
    Alert.alert("Sucesso", "Produto cadastrado!", [
        { text: "OK", onPress: () => router.back() }
    ]);
  };

  const handleScan = () => {
      // Simulação de Scan
      Alert.alert("Scanner", "Código de barras lido: 789102030");
      setForm({...form, sku: "789102030"});
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Produto</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
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
                        placeholder="R$ 0,00"
                        keyboardType="numeric"
                        value={form.price}
                        onChangeText={(t) => setForm({...form, price: t})}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Custo</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="R$ 0,00"
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
        <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
            <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Cadastrar Produto</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}