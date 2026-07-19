'use client';

import Link from 'next/link';
import { useCarrinho } from '../context/CarrinhoContext';
import type { ItemCardapio } from '../types/cardapio';
import dadosCardapio from '../data/cardapio.json';
import styles from './page.module.css';

const itens = dadosCardapio as ItemCardapio[];

export default function CarrinhoPage() {
  const { carrinho, adicionarItem, removerItem, totalPreco } = useCarrinho();

  // Transforma o objeto { id: quantidade } numa lista de itens completos
  // pra facilitar a renderização (nome, preço, imagem de cada um).
  const itensNoCarrinho = Object.entries(carrinho)
    .map(([id, quantidade]) => {
      const item = itens.find((i) => i.id === id);
      return item ? { ...item, quantidade } : null;
    })
    // Remove qualquer resultado nulo (caso um id não seja encontrado)
    .filter((item): item is ItemCardapio & { quantidade: number } => item !== null);

  const carrinhoVazio = itensNoCarrinho.length === 0;

  return (
    <main className={styles.tela}>
      <header className={styles.cabecalho}>
        <Link href="/home" className={styles.botaoVoltar} aria-label="Voltar ao cardápio">
          ←
        </Link>
        <h1 className={styles.titulo}>Voltar ao cardápio</h1>
      </header>

      {carrinhoVazio ? (
        <div className={styles.estadoVazio}>
          <p>Seu carrinho está vazio.</p>
          <Link href="/home" className={styles.botaoVoltarCardapio}>
            Ver cardápio
          </Link>
        </div>
      ) : (
        <>
          <section className={styles.listaItens}>
            {itensNoCarrinho.map((item) => (
              <article key={item.id} className={styles.cardItem}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imagem} alt={item.nome} className={styles.imagemItem} />

                <div className={styles.infoItem}>
                  <h2 className={styles.nomeItem}>{item.nome}</h2>
                  <span className={styles.precoItem}>
                    R$ {item.preco.toFixed(2).replace('.', ',')}
                  </span>

                  <div className={styles.stepper}>
                    <button
                      className={styles.botaoStepper}
                      onClick={() => removerItem(item.id)}
                      aria-label={`Remover ${item.nome}`}
                    >
                      −
                    </button>
                    <span className={styles.quantidadeStepper}>{item.quantidade}</span>
                    <button
                      className={styles.botaoStepper}
                      onClick={() => adicionarItem(item.id)}
                      aria-label={`Adicionar ${item.nome}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <span className={styles.subtotalItem}>
                  R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                </span>
              </article>
            ))}
          </section>

          <div className={styles.resumo}>
            <div className={styles.linhaResumo}>
              <span>Total</span>
              <strong>R$ {totalPreco.toFixed(2).replace('.', ',')}</strong>
            </div>

            {/* Rota /checkout ainda não existe — próxima etapa */}
            <Link href="/checkout" className={styles.botaoFinalizar}>
              Finalizar pedido →
            </Link>
          </div>
        </>
      )}
    </main>
  );
}