// mobile/src/constants/colors.ts

// 1. Paleta de Cores Absoluta (Baseada no Novo Design Eletron HQ)
const palette = {
  gold: {
    primary: "#EAC54F", // Dourado Eletron (Novo)
    dark: "#D4AF37",    // Dourado mais escuro para bordas/sombras
    light: "#FDE68A",   // Dourado claro para gradientes
  },
  neutral: {
    white: "#FFFFFF",
    background: "#FFFFFF", // O novo design usa fundo branco puro
    cardDark: "#0A0A0A",   // Preto Premium dos cards
    gray50: "#F9FAFB",     // Cinza muito sutil (Surface)
    gray100: "#E5E7EB",    // Bordas
    gray400: "#9CA3AF",    // Placeholders
    gray600: "#666666",    // Texto Muted (Legendas)
    gray900: "#111111",    // Preto quase total (Títulos)
    black: "#000000",
  },
  status: {
    success: "#10B981", // Verde Esmeralda (Mais moderno)
    danger: "#EF4444",  // Vermelho
    warning: "#F59E0B", // Laranja
    info: "#3B82F6",    // Azul
  }
};

// 2. Exportação Semântica (O App usa ISSO aqui)
export const colors = {
  // Estrutura Principal
  background: palette.neutral.background,
  surface: palette.neutral.gray50,
  cardDark: palette.neutral.cardDark, // ✨ NOVO: Para os cards pretos da Home
  border: palette.neutral.gray100,

  // Cores da Marca
  primary: palette.gold.primary,
  primaryDark: palette.gold.dark, // ✨ NOVO: Para detalhes e hovers

  // Tipografia (Textos)
  text: {
    main: palette.neutral.gray900,     // #111111
    body: palette.neutral.gray600,     // #666666
    muted: palette.neutral.gray600,    // Alias para body
    light: palette.neutral.gray400,    // Cinza mais claro
    onPrimary: palette.neutral.black,  // Texto preto no botão Dourado (Contraste alto)
    white: palette.neutral.white,      // Texto branco
  },

  // Status
  success: palette.status.success,
  danger: palette.status.danger,
  warning: palette.status.warning,
  info: palette.status.info,

  // Gradientes (Para os efeitos de brilho)
  gradients: {
    gold: [palette.gold.primary, palette.gold.light],
    dark: ["#1F1F1F", palette.neutral.cardDark],
  },

  // Acesso direto à paleta se precisar
  palette: palette,
};