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
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { styles } from "./product-form.styles";

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isEditing, setIsEditing] = useState(false);

  // Mock Data (Simulando produto vindo do ID)
  const [form, setForm] = useState({
    name: "iPhone 13 Pro",
    variant: "128GB • Grafite",
    price: 4200.00,
    cost: 3200.00, // Custo (para calcular lucro)
    stock: 5,
    description: "Aparelho seminovo, bateria 98%, sem marcas de uso. Acompanha caixa e cabo original.",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1645552346276"
  });

  // Cálculo de Margem (Visualização)
  const profit = form.price - form.cost;
  const margin = ((profit / form.price) * 100).toFixed(0);

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert("Sucesso", "Produto atualizado!");
  };

  const handleDelete = () => {
    Alert.alert(
      "Excluir Produto",
      "Tem certeza? Essa ação não pode ser desfeita e afetará o histórico de vendas.",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: () => {
            Alert.alert("Excluído", "Produto removido do estoque.");
            router.back();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>
            {isEditing ? "Editar Produto" : "Produto"}
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
          <Image source={{ uri: form.image }} style={styles.productImage} />
          
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
              <Text style={styles.sku}>{form.variant} • SKU: #88291</Text>
              
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
                    <Text style={{fontWeight: 'bold'}}>Análise do Glauber:</Text> Este produto tem uma margem excelente! O estoque está acabando, sugiro repor mais 5 unidades para o fim de semana.
                </Text>
            </View>

            <View style={{ padding: 24, paddingTop: 0 }}>
                <Text style={[styles.label, { fontSize: 16, marginBottom: 8 }]}>Descrição</Text>
                <Text style={{ color: "#4B5563", lineHeight: 24 }}>{form.description}</Text>
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
                <Text style={styles.label}>Variante / Modelo</Text>
                <TextInput 
                    style={styles.input} 
                    value={form.variant}
                    onChangeText={(t) => setForm({...form, variant: t})}
                />
             </View>

             <View style={styles.rowInputs}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Preço Venda (R$)</Text>
                    <TextInput 
                        style={styles.input} 
                        value={String(form.price)}
                        keyboardType="numeric"
                        onChangeText={(t) => setForm({...form, price: Number(t)})}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Custo (R$)</Text>
                    <TextInput 
                        style={styles.input} 
                        value={String(form.cost)}
                        keyboardType="numeric"
                        onChangeText={(t) => setForm({...form, cost: Number(t)})}
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

             {/* BOTÃO DE EXCLUIR (Só no modo edição) */}
             <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                 <Text style={styles.deleteText}>Excluir Produto</Text>
             </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      {/* FOOTER ACTION */}
      <View style={styles.footer}>
        {isEditing ? (
            <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                <Text style={styles.actionText}>Salvar Alterações</Text>
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