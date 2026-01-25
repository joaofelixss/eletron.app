import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  FlatList, 
  Image 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../../src/constants/colors";
import { styles } from "./inventory.styles";

// MOCK DATA
const INVENTORY_DATA = [
  { id: "1", name: "iPhone 13 Pro", sku: "SKU-9921", stock: 5, cost: 3200.00, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-graphite-select?wid=470&hei=556&fmt=png-alpha" },
  { id: "2", name: "Samsung S21", sku: "SKU-8812", stock: 2, cost: 2100.00, image: "https://images.samsung.com/is/image/samsung/p6pim/br/galaxy-s21/gallery/br-galaxy-s21-5g-g991-sm-g991bzvgzk-thumb-368338803" },
  { id: "3", name: "Capa MagSafe", sku: "ACC-0012", stock: 42, cost: 45.00, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MM293?wid=572&hei=572&fmt=jpeg&qlt=95" },
  { id: "4", name: "Carregador 20W", sku: "ACC-0033", stock: 0, cost: 80.00, image: null }, // Sem foto
];

export default function InventoryScreen() {
  const router = useRouter();
  
  // Total Valuation Calculation
  const totalValue = INVENTORY_DATA.reduce((acc, item) => acc + (item.stock * item.cost), 0);
  const totalItems = INVENTORY_DATA.reduce((acc, item) => acc + item.stock, 0);

  const renderItem = ({ item }: any) => {
    const isLow = item.stock <= 3;

    return (
      <View style={styles.itemCard}>
        {/* Imagem + Indicador */}
        <View>
             <Image 
                source={{ uri: item.image || "https://via.placeholder.com/150" }} 
                style={styles.itemImage} 
                resizeMode="contain"
             />
             {isLow && <View style={styles.lowStockIndicator} />}
        </View>

        {/* Info Técnica */}
        <View style={styles.itemInfo}>
            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.itemSku}>{item.sku}</Text>
            <Text style={styles.itemCost}>
                Custo: R$ {item.cost.toLocaleString("pt-BR")}
            </Text>
        </View>

        {/* Controle Rápido */}
        <View style={styles.stockControl}>
            <Text style={[styles.stockValue, { color: isLow ? colors.danger : "#000" }]}>
                {item.stock}
            </Text>
            
            <View style={styles.stepper}>
                <TouchableOpacity style={styles.stepBtn}>
                    <Ionicons name="remove" size={14} color="#000" />
                </TouchableOpacity>
                <View style={{ width: 8 }} />
                <TouchableOpacity style={styles.stepBtn}>
                    <Ionicons name="add" size={14} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#18181B" />

      {/* DASHBOARD HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Gestão de Estoque</Text>
            <TouchableOpacity>
                <Ionicons name="cloud-download-outline" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>

        <View style={styles.dashRow}>
            {/* Card Valor */}
            <View style={styles.dashCard}>
                <Text style={styles.dashLabel}>Valor em Estoque (Custo)</Text>
                <Text style={styles.dashValue}>
                    {totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </Text>
                <Text style={styles.dashSub}>Capital parado</Text>
            </View>

            {/* Card Quantidade */}
            <View style={styles.dashCard}>
                <Text style={styles.dashLabel}>Total de Itens</Text>
                <Text style={styles.dashValue}>{totalItems} un.</Text>
                <Text style={[styles.dashSub, { color: colors.danger }]}>
                    2 itens baixos
                </Text>
            </View>
        </View>
      </View>

      {/* LISTA DE ITENS */}
      <FlatList 
        data={INVENTORY_DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Listagem de Produtos</Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Ionicons name="filter" size={14} color="#6B7280" />
                    <Text style={{ fontSize: 12, color: "#6B7280" }}>Filtrar</Text>
                </TouchableOpacity>
            </View>
        }
      />

    </View>
  );
}