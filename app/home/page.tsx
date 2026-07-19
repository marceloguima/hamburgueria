"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { Input } from "../components/CampoFormulario/CampoFormulario";
import BotaoLink from "../components/BotaoLinkPrincipal/BotaoLink";

// Ícones lucide
import { Plus, Minus, Search, Menu } from "lucide-react";

// Importando os tipos e os dados.
import type { ItemCardapio } from "../types/cardapio";
import dadosCardapio from "../data/cardapio.json";

import { useCarrinho } from "../context/CarrinhoContext";

const itens = dadosCardapio as ItemCardapio[];

// Lista de categorias mostradas nos filtros (pills) do topo.
// A ORDEM dessa lista também define a prioridade da busca automática:
// se o termo digitado aparecer em mais de uma categoria, a busca vai
// pular pra primeira categoria dessa lista que tiver resultado.
const categorias: { chave: ItemCardapio["categoria"]; rotulo: string }[] = [
    { chave: "hamburgueres", rotulo: "Hamburgueres" },
    { chave: "combos", rotulo: "Combos" },
    { chave: "bebidas", rotulo: "Bebidas" },
    { chave: "acompanhamentos", rotulo: "Acompanhamentos" },
];

// Remove acentos e deixa tudo minúsculo, pra comparação de busca não
// se importar com "chá" vs "cha", "Coca-Cola" vs "coca cola", etc.
// normalize('NFD') separa a letra do acento (ex: "á" vira "a" + "´"),
// e o replace() remove essa marcação de acento que sobrou.
function normalizar(texto: string): string {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

export default function Cardapio() {
    const [categoriaAtiva, setCategoriaAtiva] = useState<
        ItemCardapio["categoria"]
    >(categorias[0].chave);

    // Termo digitado no campo de busca.
    const [termoBusca, setTermoBusca] = useState("");

    const { carrinho, adicionarItem, removerItem, totalItens } = useCarrinho();

    const buscaAtiva = termoBusca.trim() !== "";
    const termoNormalizado = normalizar(termoBusca);

    // Verifica se um item específico bate com o termo buscado
    // (procura tanto no nome quanto na descrição).
    function itemCorresponde(item: ItemCardapio): boolean {
        if (!buscaAtiva) return true; // sem busca, todo item "passa"
        return (
            normalizar(item.nome).includes(termoNormalizado) ||
            normalizar(item.descricao).includes(termoNormalizado)
        );
    }

    // Toda vez que o termo de busca mudar, atualiza a categoria ativa
    // pra primeira categoria (na ordem da lista acima) que tiver pelo
    // menos um item correspondente. Isso roda no corpo do componente
    // mesmo (sem useEffect) — é seguro porque só chama setState quando
    // o valor realmente precisa mudar, o que evita loop infinito.
    if (buscaAtiva) {
        const categoriaComResultado = categorias.find((cat) =>
            itens.some(
                (item) => item.categoria === cat.chave && itemCorresponde(item),
            ),
        );

        if (
            categoriaComResultado &&
            categoriaComResultado.chave !== categoriaAtiva
        ) {
            setCategoriaAtiva(categoriaComResultado.chave);
        }
    }

    // Itens filtrados: precisa bater com a categoria ativa E,
    // se houver busca, também bater com o termo digitado.
    const itensFiltrados = itens.filter(
        (item) => item.categoria === categoriaAtiva && itemCorresponde(item),
    );

    return (
        <main className={styles.tela}>
            <header className={styles.cabecalho}>
                <div className={styles.cabecalhoTopo}>
                    <button
                        className={styles.botaoIcone}
                        aria-label="Abrir menu"
                    >
                        <Menu size={28} />
                    </button>

                    <Link
                        href="/carrinho"
                        className={styles.iconeCarrinho}
                        aria-label="Ver carrinho"
                    >
                        <img src="/motoEntrega.png" alt="Icone moto delivery" />
                        {totalItens > 0 && (
                            <span className={styles.badgeCarrinho}>
                                {totalItens}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Hero: imagem de fundo com o título de marketing sobreposto.
    Substituiu o antigo h1 solto — agora o "nome do app" fica só
    no menu/logo, e aqui entra uma frase de venda de verdade. */}
                <div className={styles.hero}>
                    <h1 className={styles.tituloHero}>
                        Hambúrgueres artesanais, feitos na hora
                    </h1>
                </div>

                <Input
                    icone={<Search />}
                    id="busca"
                    type="search"
                    placeholder="Busque por um item"
                    aria-label="Buscar item no cardápio"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                />
            </header>

            {/* Filtros de categoria */}
            <nav className={styles.filtros}>
                {categorias.map((cat) => (
                    <button
                        key={cat.chave}
                        className={`${styles.pillFiltro} ${
                            categoriaAtiva === cat.chave
                                ? styles.pillFiltroAtivo
                                : ""
                        }`}
                        onClick={() => setCategoriaAtiva(cat.chave)}
                    >
                        {cat.rotulo}
                    </button>
                ))}
            </nav>

            {/* Lista de itens da categoria selecionada */}
            <section className={styles.listaItens}>
                {itensFiltrados.length === 0 && (
                    <p className={styles.listaVazia}>
                        {buscaAtiva
                            ? `Nenhum item encontrado para "${termoBusca}".`
                            : "Ainda não temos itens nessa categoria."}
                    </p>
                )}

                {itensFiltrados.map((item) => {
                    const quantidade = carrinho[item.id] ?? 0;

                    return (
                        <article key={item.id} className={styles.cardItem}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={item.imagem}
                                alt={item.nome}
                                className={styles.imagemItem}
                            />

                            <div className={styles.infoItem}>
                                <h2 className={styles.nomeItem}>{item.nome}</h2>
                                <p className={styles.descricaoItem}>
                                    {item.descricao}
                                </p>

                                <div className={styles.rodapeItem}>
                                    <span className={styles.precoItem}>
                                        R${" "}
                                        {item.preco
                                            .toFixed(2)
                                            .replace(".", ",")}
                                    </span>

                                    {quantidade === 0 ? (
                                        <button
                                            className={styles.botaoAdicionar}
                                            onClick={() =>
                                                adicionarItem(item.id)
                                            }
                                            aria-label={`Adicionar ${item.nome}`}
                                        >
                                            Adicionar
                                        </button>
                                    ) : (
                                        <div className={styles.stepper}>
                                            <button
                                                className={styles.botaoStepper}
                                                onClick={() =>
                                                    removerItem(item.id)
                                                }
                                                aria-label={`Remover ${item.nome}`}
                                            >
                                                <Minus size={20} />
                                            </button>
                                            <span
                                                className={
                                                    styles.quantidadeStepper
                                                }
                                            >
                                                {quantidade}
                                            </span>
                                            <button
                                                className={styles.botaoStepper}
                                                onClick={() =>
                                                    adicionarItem(item.id)
                                                }
                                                aria-label={`Adicionar ${item.nome}`}
                                            >
                                                <Plus size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    );
                })}

                <BotaoLink
                    href="/carrinho"
                    titulo="Ir para carrinho"
                    icone=""
                />
            </section>
        </main>
    );
}
