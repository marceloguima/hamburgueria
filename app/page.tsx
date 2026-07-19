// Tela inicial do app Espetinho do João
// Em TypeScript: a diferença principal do .js é que aqui
// declaramos os "tipos" das coisas (o formato dos dados),
// e o próprio editor/compilador avisa se você errar.
// No topo do arquivo, junto com o outro import:
import Link from "next/link";


import styles from "./page.module.css";
import BotaoLink from "./components/BotaoLinkPrincipal/BotaoLink";

// Tipando o componente como React.FC (Function Component).
// Como essa tela não recebe nenhuma prop (nenhum dado de fora),
// não precisamos de um "type Props" aqui — mas já deixo o padrão
// pronto pra quando precisar.
export default function BoasVindas() {
    return (
        <main className={styles.tela}>
            {/* Cabeçalho: logo + tempo de entrega */}
            <header className={styles.cabecalho}>
                <div className={styles.logo}>
                    Hamburgueria
                    <br />
                    <span className={styles.logoDestaque}>Top 10</span>
                </div>

             
            </header>

            {/* Área principal com foto de fundo */}
            <section className={styles.heroImagem}>
                <h1 className={styles.titulo}>
                    O melhor <br />
                    <span className={styles.tituloDestaque}>
                        hamburguer
                    </span>{" "}
                    <br />
                    da cidade!
                </h1>

                <hr className={styles.linhaDestaque} />

                <p className={styles.descricao}>
                    Feito na hora, com ingredientes selecionados e aquele{" "}
                    <strong>sabor especial!</strong>
                </p>
            </section>

            {/* Bloco de confiança — só mostre números reais quando existirem */}
            <div className={styles.blocoConfianca}>
                <div className={styles.itemConfianca}>
                    <strong>🚀</strong>
                    <span>Entrega rápida</span>
                </div>
                <div className={styles.itemConfianca}> 
                    <strong>🔥</strong>
                    <span>Feito na hora</span>
                </div>
                <div className={styles.itemConfianca}>
                    <strong>❤️</strong>
                    <span>Feito com carinho</span>
                </div>
            </div>

            {/* Card de destaque dos combos */}
            <div className={styles.cardCombo}>
                <div className={styles.cardComboTexto}>
                    <strong>Combos com desconto especial!</strong>
                    <p>Economize pedindo nossos combos</p>
                </div>
            </div>

            {/* Botão principal — leva pro cardápio (home) */}
            {/* <Link href="/home" className={styles.botaoPrincipal}>
                🍢 Ver cardápio ➜
            </Link> */}
            <BotaoLink href="/home" titulo="Ver cardápio" />

            {/* Rodapé com diferenciais */}
            {/* <div className={styles.rodapeDestaques}>
                <div className={styles.rodapeItem}>
                    🍢 <br />
                    Hamburguer suculentos
                </div>
                <div className={styles.rodapeItem}>
                    🔥 <br />
                    Sempre fresquinho
                </div>
                <div className={styles.rodapeItem}>
                    ❤️ <br />
                    Feito com carinho
                </div>
            </div> */}

            <p className={styles.rodapeSelo}>🔒 Site seguro</p>
        </main>
    );
}
