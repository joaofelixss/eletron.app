// src/utils/masks.ts

export const maskPhone = (value: string) => {
  // Remove tudo que não é dígito
  const cleanValue = value.replace(/\D/g, "");

  // Aplica a máscara (99) 99999-9999
  return cleanValue
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2");
};

export const unmask = (value: string) => {
  return value.replace(/\D/g, "");
};