"use client";

import { useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import type { ItemCardapio } from "../../types/cardapio";
import BotaoAdicionar from "../BotaoAdicionar/BotaoAdd";
import styles from "./ModalDetalhesItem.module.css";

interface ModalDetalhesItemProps {
    item: ItemCardapio;
    quantidade: number;
    adicionarItem: (id: string) => void;
    removerItem: (id: string) => void;
    aoFechar: () => void;
}

export default function ModalDetalhesItem({
    item,
    quantidade,
    adicionarItem,
    removerItem,
    aoFechar,
}: ModalDetalhesItemProps) {
    useEffect(() => {
        function aoApertarTecla(evento: KeyboardEvent) {
            if (evento.key === "Escape") {
                aoFechar();
            }
        }
        document.addEventListener("keydown", aoApertarTecla);
        return () => {
            document.removeEventListener("keydown", aoApertarTecla);
        };
    }, [aoFechar]);

    return (
        <div className={styles.overlay} onClick={aoFechar}>
            <div className={styles.caixa} onClick={(e) => e.stopPropagation()}>
                <button
                    className={styles.botaoFechar}
                    onClick={aoFechar}
                    aria-label="Fechar detalhes"
                >
                    <X size={20} />
                </button>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imagem} alt={item.nome} className={styles.imagem} />

                <div className={styles.conteudo}>
                    <h2 className={styles.nome}>{item.nome}</h2>
                    <p className={styles.descricao}>{item.descricao}</p>

                    {item.ingredientes && item.ingredientes.length > 0 && (
                        <div className={styles.blocoIngredientes}>
                            <span className={styles.rotuloIngredientes}>
                                O que vem nesse item
                            </span>
                            <ul className={styles.listaIngredientes}>
                                {item.ingredientes.map((ingrediente) => (
                                    <li key={ingrediente}>{ingrediente}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className={styles.rodape}>
                        <span className={styles.preco}>
                            R$ {item.preco.toFixed(2).replace(".", ",")}
                        </span>

                        {/* Mesma lógica do card: sem quantidade ainda,
                            mostra "Adicionar"; já tem, mostra o stepper. */}
                        {quantidade === 0 ? (
                            <BotaoAdicionar
                                nomeItem={item.nome}
                                onClick={() => adicionarItem(item.id)}
                            />
                        ) : (
                            <div className={styles.stepper}>
                                <button
                                    className={styles.botaoStepper}
                                    onClick={() => removerItem(item.id)}
                                    aria-label={`Remover ${item.nome}`}
                                >
                                    <Minus size={20} />
                                </button>
                                <span className={styles.quantidadeStepper}>
                                    {quantidade}
                                </span>
                                <button
                                    className={styles.botaoStepper}
                                    onClick={() => adicionarItem(item.id)}
                                    aria-label={`Adicionar ${item.nome}`}
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}