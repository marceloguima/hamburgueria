"use client";

import styles from "./BotaoAdd.module.css";

interface BotaoAdicionarProps {
    nomeItem: string; // usado só pro aria-label, não aparece na tela
    onClick: () => void;
}

// Botão reutilizável de "Adicionar" — usado no card do cardápio,
// e reaproveitável em qualquer outro lugar que precise do mesmo
// comportamento (adicionar item + não deixar o clique "vazar"
// pro elemento pai, tipo o card que abre o modal de detalhes).
export default function BotaoAdicionar({
    nomeItem,
    onClick,
}: BotaoAdicionarProps) {
    return (
        <button
            type="button"
            className={styles.botaoAdicionar}
            onClick={(e) => {
                // stopPropagation mora AQUI dentro do componente agora —
                // quem usa o BotaoAdicionar não precisa mais lembrar de
                // fazer isso toda vez, o componente já garante sozinho.
                e.stopPropagation();
                onClick();
            }}
            aria-label={`Adicionar ${nomeItem}`}
        >
            Adicionar
        </button>
    );
}