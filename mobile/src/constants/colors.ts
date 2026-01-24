// mobile/src/constants/colors.ts

// 1. Paleta de Cores Absoluta (Não muda com o tema)
const palette = {
  yellow: {
    primary: "#FFD700", // Amarelo "Ouro" vibrante (Identidade Eletron)
    light: "#FFF9C4",   // Fundo de destaque suave
    dark: "#F57F17",    // Amarelo queimado para cliques/hover
  },
  neutral: {
    white: "#FFFFFF",
    backgroundLight: "#F4F6F8", // Cinza gelo (Fundo clean moderno)
    gray100: "#E0E0E0", // Bordas sutis
    gray400: "#9CA3AF", // Texto desabilitado / placeholders
    gray600: "#4B5563", // Texto secundário (Legendas)
    gray900: "#111827", // Preto quase absoluto (Títulos)
    black: "#000000",
  },
  status: {
    success: "#059669", // Verde forte
    danger: "#DC2626",  // Vermelho alerta
    warning: "#D97706", // Laranja aviso
    info: "#2563EB",    // Azul informação
  }
};

// 2. Exportação Semântica (O App usa ISSO aqui)
// Atualmente configurado para o MODO CLEAN (Light)
export const colors = {
  // Estrutura Principal
  background: palette.neutral.backgroundLight, // Fundo Gelo
  surface: palette.neutral.white,              // Cards Brancos
  border: palette.neutral.gray100,             // Bordas cinza claro

  // Cores da Marca
  primary: palette.yellow.primary, // O Amarelo
  secondary: palette.neutral.gray900, // O Preto (Para contraste)

  // Tipografia (Textos)
  text: {
    main: palette.neutral.gray900,     // Preto (Títulos)
    body: palette.neutral.gray600,     // Cinza Escuro (Parágrafos)
    light: palette.neutral.gray400,    // Cinza Claro (Detalhes)
    onPrimary: palette.neutral.gray900,// Texto em cima do Amarelo (Preto fica melhor que branco)
    inverted: palette.neutral.white,   // Texto Branco (para fundos pretos)
  },

  // Status
  success: palette.status.success,
  danger: palette.status.danger,
  warning: palette.status.warning,
  info: palette.status.info,

  // Acesso direto à paleta se precisar de algo específico
  palette: palette,
};