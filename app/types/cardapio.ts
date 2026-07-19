// Define o "formato" que todo item do cardápio precisa ter.
// Isso é o coração do TypeScript: em vez de confiar que um objeto
// "provavelmente" tem nome, preço etc, a gente declara e o compilador
// garante. Se um item no JSON esquecer o preço, o TS avisa antes
// de você nem rodar o projeto.

export interface ItemCardapio {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  // União de strings literais: categoria SÓ pode ser um desses 4 valores.
  // Se alguém digitar "espetinho" (sem o s) no JSON, o TS reclama.
  categoria: 'hamburgueres' | 'combos' | 'bebidas' | 'acompanhamentos';
}

// Formato do carrinho: cada chave é o id do item, o valor é a quantidade.
// Ex: { "esp-carne": 2, "esp-frango": 1 }
export type Carrinho = Record<string, number>;