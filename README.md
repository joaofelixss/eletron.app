# ⚡ Eletron App

> O Sistema Operacional das Lojas de Tecnologia.

O **Eletron** é uma plataforma mobile focada em tirar o empreendedor do CLT e profissionalizar pequenas assistências técnicas e lojas de informática/celulares. Diferente de ERPs genéricos, o Eletron foca em **Gestão de IMEI**, **Trade-In** e usa **Inteligência Artificial** para precificação e controle de estoque.

## 🏗️ Arquitetura (Tech Stack)

O projeto opera no modelo Monorepo, dividido em três microsserviços:

| Módulo | Tecnologia | Função |
| :--- | :--- | :--- |
| **📱 Mobile** | React Native (Expo) | Interface do usuário (Android/iOS). |
| **🧠 Brain** | Python (FastAPI + OpenAI) | IA de precificação e análise de dados. |
| **⚙️ Core** | NestJS (Node.js) | Regras de negócio, Auth e Gestão de Banco. |
| **🗄️ Database** | PostgreSQL | Armazenamento seguro de dados. |

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* Node.js & NPM
* Python 3.x
* Expo Go (no celular)

### 1. Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev