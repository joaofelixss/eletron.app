// mobile/src/utils/masks.ts

export const masks = {
  // (11) 99999-9999
  phone: (value: string) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não é dígito
      .replace(/^(\d{2})(\d)/, "($1) $2") // Coloca parênteses no DDD
      .replace(/(\d{5})(\d)/, "$1-$2") // Coloca hífen depois do 5º dígito
      .slice(0, 15); // Limita tamanho
  },

  // 111.222.333-44
  cpf: (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  },

  // Remove formatação para salvar no banco
  unmask: (value: string) => {
    return value.replace(/\D/g, "");
  }
};