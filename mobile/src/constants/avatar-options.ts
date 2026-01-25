// mobile/src/constants/avatar-options.ts

export const AVATAR_STYLES = [
  { id: "avataaars", name: "Humano (Padrão)", icon: "person" },
  { id: "bottts", name: "Robô IA", icon: "hardware-chip" },
  { id: "initials", name: "Siglas (Letras)", icon: "text" },
  { id: "shapes", name: "Abstrato", icon: "shapes" },
];

// Opções específicas para o estilo "Avataaars" (o mais completo)
export const AVATAR_OPTIONS = {
  top: [
    "shortHair", "longHair", "eyepatch", "hat", "hijab", "turban", 
    "winterHat1", "winterHat2", "bob", "bun", "curly", "curvy", 
    "dreads", "frida", "fro", "shavedSides", "straight01", "straight02"
  ],
  accessories: [
    "none", "kurt", "prescription01", "prescription02", "round", 
    "sunglasses", "wayfarers"
  ],
  hairColor: [
    "auburn", "black", "blonde", "blondeGolden", "brown", "brownDark", 
    "pastelPink", "platinum", "red", "silverGray"
  ],
  facialHair: [
    "none", "beardLight", "beardMagestic", "beardMedium", "moustacheFancy", 
    "moustacheMagnum"
  ],
  clothing: [
    "blazerAndShirt", "blazerAndSweater", "collarAndSweater", "graphicShirt", 
    "hoodie", "overall", "shirtCrewNeck", "shirtScoopNeck", "shirtVNeck"
  ],
  eyes: [
    "close", "cry", "default", "dizzy", "eyeRoll", "happy", "hearts", 
    "side", "squint", "surprised", "wink", "winkWacky"
  ],
  mouth: [
    "concerned", "default", "disbelief", "eating", "grimace", "sad", 
    "screamOpen", "serious", "smile", "tongue", "twinkle", "vomit"
  ],
  skinColor: [
    "tanned", "yellow", "pale", "light", "brown", "darkBrown", "black"
  ]
};

// Mapeamento de nomes amigáveis para exibir na tela
export const OPTION_LABELS: Record<string, string> = {
  top: "Cabelo / Cabeça",
  accessories: "Acessórios",
  hairColor: "Cor do Cabelo",
  facialHair: "Barba / Bigode",
  clothing: "Roupas",
  eyes: "Olhos",
  mouth: "Boca",
  skinColor: "Pele"
};