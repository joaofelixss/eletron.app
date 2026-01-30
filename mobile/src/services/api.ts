// mobile/src/services/api.ts
import axios from "axios";

// ⚠️ IMPORTANTE: Substitua pelo seu IP do computador
// Não use 'localhost', pois o celular não entende.
const SEU_IP = "192.168.1.9"; // <--- COLOQUE SEU IP AQUI (Ex: 192.168.0.15)

export const api = axios.create({
  baseURL: `http://${SEU_IP}:3000`, 
  timeout: 10000, // Espera até 10 segundos
});

// Interceptador para logar erros (ajuda muito a achar problemas)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Erro na API:", error.response.data);
    } else if (error.request) {
      console.error("Erro de Conexão:", "Não conseguiu conectar ao Backend");
    } else {
      console.error("Erro:", error.message);
    }
    return Promise.reject(error);
  }
);