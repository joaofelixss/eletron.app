import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/constants/colors";
import { styles } from "./products.styles";

// Dados falsos para simular o Banco de Dados
const MOCK_PRODUCTS = [
  { id: "1", name: "iPhone 13 128GB", category: "Celulares", price: 3200.00, stock: 4, minStock: 2 },
  { id: "2", name: "Película 3D iPhone 13", category: "Acessórios", price: 29.90, stock: 15, minStock: 10 },
  { id: "3", name: "Carregador Turbo 20W", category: "Acessórios", price: 89.90, stock: 2, minStock: 5 }, // Estoque Baixo!
  { id: "4", name: "Samsung S23 Ultra", category: "Celulares", price: 5500.00, stock: 1, minStock: 1 },
  { id: "5", name: "Fone Bluetooth JBL", category: "Áudio", price: 250.00, stock: 8, minStock: 3 },
];

export default function ProductsScreen() {
  const [search, setSearch] = useState("");

  // Filtra os produtos pelo que foi digitado
  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Estoque</Text>
        <Text style={styles.subtitle}>Gerencie seus produtos e preços</Text>
      </View>

      {/* Barra de Busca */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.text.gray} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar produto..."
          placeholderTextColor={colors.text.gray}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={20} color={colors.text.gray} />
          </TouchableOpacity>
        )}
      </View>

      {/* Lista de Produtos */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isLowStock = item.stock <= item.minStock;

          return (
            <TouchableOpacity style={styles.productCard} activeOpacity={0.7}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productCategory}>{item.category}</Text>
                
                <View style={styles.priceTag}>
                  <Text style={styles.price}>
                    {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </Text>
                  
                  {/* Badge de Estoque (Muda de cor se tiver pouco) */}
                  <View style={[styles.stockBadge, isLowStock && styles.lowStockBadge]}>
                    <Text style={[styles.stockText, isLowStock && styles.lowStockText]}>
                      {item.stock} un
                    </Text>
                  </View>
                </View>
              </View>

              <Ionicons name="chevron-forward" size={20} color={colors.text.gray} />
            </TouchableOpacity>
          );
        }}
      />

      {/* Botão Flutuante (FAB) para Adicionar */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => alert("Abrir tela de cadastro")}
      >
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>

    </View>
  );
}