// Contexto global do carrinho.
// 'use client' porque usa hooks (useState, useContext) — só funcionam no navegador.
'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Carrinho, ItemCardapio } from '../types/cardapio';
import dadosCardapio from '../data/cardapio.json';

const itens = dadosCardapio as ItemCardapio[];

// Descreve tudo que o contexto vai disponibilizar pra quem usar useCarrinho()
interface CarrinhoContextType {
  carrinho: Carrinho;
  adicionarItem: (id: string) => void;
  removerItem: (id: string) => void;
  totalItens: number;
  totalPreco: number;
}

// createContext precisa de um valor inicial. Usamos "undefined" e
// checamos isso no hook lá embaixo — assim, se alguém usar o contexto
// fora do Provider por engano, o erro aparece na hora, não depois.
const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

// O Provider é quem "guarda" o estado de verdade. Tudo que estiver
// dentro dele (children) tem acesso ao carrinho.
export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<Carrinho>({});

  function adicionarItem(id: string): void {
    setCarrinho((atual) => ({
      ...atual,
      [id]: (atual[id] ?? 0) + 1,
    }));
  }

  function removerItem(id: string): void {
    setCarrinho((atual) => {
      const quantidadeAtual = atual[id] ?? 0;
      if (quantidadeAtual <= 1) {
        const { [id]: _remover, ...resto } = atual;
        return resto;
      }
      return { ...atual, [id]: quantidadeAtual - 1 };
    });
  }

  const totalItens = Object.values(carrinho).reduce((soma, qtd) => soma + qtd, 0);

  const totalPreco = Object.entries(carrinho).reduce((soma, [id, qtd]) => {
    const item = itens.find((i) => i.id === id);
    return item ? soma + item.preco * qtd : soma;
  }, 0);

  return (
    <CarrinhoContext.Provider
      value={{ carrinho, adicionarItem, removerItem, totalItens, totalPreco }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

// Hook customizado: em vez de toda página importar useContext +
// CarrinhoContext, ela só chama useCarrinho(). Isso também é onde
// garantimos que ninguém esqueceu de envolver a página com o Provider.
export function useCarrinho(): CarrinhoContextType {
  const contexto = useContext(CarrinhoContext);
  if (!contexto) {
    throw new Error('useCarrinho precisa ser usado dentro de um CarrinhoProvider');
  }
  return contexto;
}