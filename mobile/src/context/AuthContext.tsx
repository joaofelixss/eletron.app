import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  storeName?: string;
};

type AuthContextData = {
  user: User | null;
  isLoading: boolean;
  signIn: (userData: User) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // 1. CARREGAR DADOS AO ABRIR O APP
  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedUser = await AsyncStorage.getItem("@eletron:user");
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Erro ao carregar usuário", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStorageData();
  }, []);

  // 2. PROTEÇÃO DE ROTAS (LAYOUT EFFECT)
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "auth" || segments[0] === "signup";
    const isPublic = segments.length === 0 || segments[0] === "index"; // Tela de login inicial

    if (!user && !inAuthGroup && !isPublic) {
      // Se não tem usuário e tentou acessar rota interna -> Manda pro Login
      router.replace("/");
    } else if (user && (isPublic || inAuthGroup)) {
      // Se tem usuário e tentou acessar login -> Manda pra Home
      router.replace("/(tabs)/home/home");
    }
  }, [user, segments, isLoading]);

  // 3. FUNÇÃO DE LOGIN
  async function signIn(userData: User) {
    try {
      await AsyncStorage.setItem("@eletron:user", JSON.stringify(userData));
      setUser(userData);
      // O useEffect de proteção vai redirecionar automaticamente para a Home
    } catch (error) {
      console.log(error);
    }
  }

  // 4. FUNÇÃO DE LOGOUT
  async function signOut() {
    try {
      await AsyncStorage.removeItem("@eletron:user");
      setUser(null);
      // O useEffect de proteção vai redirecionar automaticamente para "/"
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}