export interface ItemCardapio {
  id: string;
  nome: string;
  descricao: string;
  ingredientes?: string[];
  preco: number;
  imagem: string;
  categoria: 'hamburgueres' | 'combos' | 'bebidas' | 'acompanhamentos';
}

// Formato do carrinho: cada chave é o id do item, o valor é a quantidade.
// Ex: { "burg-cheeseburger": 2, "beb-refri-cola": 1 }
export type Carrinho = Record<string, number>;