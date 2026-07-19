// Tipo específico pros dados que o cliente preenche no checkout.

export type FormaPagamento = 'pix' | 'cartao' | 'dinheiro';

export interface DadosCliente {
  nome: string;
  telefone: string;
  endereco: string;
  formaPagamento: FormaPagamento | null; // null = ainda não escolheu
  observacao: string;
  troco: string
}