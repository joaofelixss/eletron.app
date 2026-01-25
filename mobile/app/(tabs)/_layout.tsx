import React from "react";
import { Tabs } from "expo-router";
import { CustomTabBar } from "../../src/components/CustomTabBar"; 

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false, // Esconde o header padrão
      }}
    >
      {/* IMPORTANTE: O 'name' aqui define a chave da rota.
         O componente CustomTabBar VAI procurar por esses nomes exatos ('home', 'chat', etc).
      */}

      {/* 1. HOME */}
      {/* O sistema vai procurar por: home.tsx ou home/index.tsx */}
      <Tabs.Screen name="home" options={{ title: "Início" }} />

      {/* 2. PEDIDOS */}
      <Tabs.Screen name="orders" options={{ title: "Pedidos" }} />

      {/* 3. CHAT */}
      {/* O sistema vai procurar por: chat.tsx ou chat/index.tsx */}
      <Tabs.Screen name="chat" options={{ title: "Chat IA" }} /> 

      {/* 4. PRODUTOS */}
      <Tabs.Screen name="products" options={{ title: "Estoque" }} />

      {/* 5. SETTINGS */}
      <Tabs.Screen name="settings" options={{ title: "Menu" }} />

      {/* --- TELAS OCULTAS (href: null) --- */}
      {/* Elas não aparecem na navegação, mas existem */}
      <Tabs.Screen name="clients" options={{ href: null }} />
      <Tabs.Screen name="clients/add" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
      <Tabs.Screen name="analytics" options={{ href: null }} />
      <Tabs.Screen name="suppliers" options={{ href: null }} />
      <Tabs.Screen name="scanner" options={{ href: null }} />
      <Tabs.Screen name="trade-in/index" options={{ href: null }} />
      <Tabs.Screen name="marketing" options={{ href: null }} />
      <Tabs.Screen name="catalog" options={{ href: null }} />
      <Tabs.Screen name="notifications/index" options={{ href: null }} />
      <Tabs.Screen name="subscription/plans" options={{ href: null }} />
      <Tabs.Screen name="settings/assistants" options={{ href: null }} />
      <Tabs.Screen name="profile/avatar-editor" options={{ href: null }} />

    </Tabs>
  );
}