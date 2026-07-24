
"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { Input, Textarea } from "../components/CampoFormulario/CampoFormulario";

import { useCarrinho } from "../context/CarrinhoContext";
import type { ItemCardapio } from "../types/cardapio";
import type { DadosCliente, FormaPagamento } from "../types/pedido";
import dadosCardapio from "../data/cardapio.json";
import { NUMERO_WHATSAPP_VENDEDOR, CHAVE_PIX } from "../lib/config";

import {ArrowLeft } from "lucide-react"

const itens = dadosCardapio as ItemCardapio[];

const opcoesPagamento: {
    valor: FormaPagamento;
    rotulo: string;
    icone: ReactNode;
}[] = [
    {
        valor: "pix",
        rotulo: "Pix",
        icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-diamond-fill" viewBox="0 0 16 16">
                <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L4.047 3.339 8 7.293l3.954-3.954L9.049.435zm3.61 3.611L8.708 8l3.954 3.954 2.904-2.905c.58-.58.58-1.519 0-2.098l-2.904-2.905zm-.706 8.614L8 8.708l-3.954 3.954 2.905 2.904c.58.58 1.519.58 2.098 0l2.905-2.904zm-8.614-.706L7.292 8 3.339 4.046.435 6.951c-.58.58-.58 1.519 0 2.098z" />
            </svg>
        ),
    },
    {
        valor: "cartao",
        rotulo: "Cartão na entrega",
        icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-credit-card-2-back-fill" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1z" />
            </svg>
        ),
    },
    {
        valor: "dinheiro",
        rotulo: "Dinheiro",
        icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0" />
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
            </svg>
        ),
    },
];

export default function Checkout() {
    const { carrinho, totalPreco } = useCarrinho();

    const [mensagemFormaPag, setMensagemFormaPag] = useState("");
    const [mensagemCampo, setMensagemCampo] = useState("");
    const [mensagemTroco, setMensagemTroco] = useState("");
    const [pixCopiado, setPixCopiado] = useState(false);

    const [dados, setDados] = useState<DadosCliente>({
        nome: "",
        telefone: "",
        endereco: "",
        formaPagamento: null,
        observacao: "",
        troco: "",
    });

    function atualizarCampo(campo: keyof DadosCliente, valor: string): void {
        setDados((atual) => ({ ...atual, [campo]: valor }));
    }

    const formdadosUserValido =
        dados.nome.trim() !== "" &&
        dados.telefone.trim() !== "" &&
        dados.endereco.trim() !== "";

    const campoFormaPagamentoValdo = dados.formaPagamento !== null;

    const trocoValido =
        dados.formaPagamento !== "dinheiro" || dados.troco.trim() !== "";

    const podeEnviar =
        formdadosUserValido && campoFormaPagamentoValdo && trocoValido;

    const mostraMensagem = () => {
        if (!formdadosUserValido) {
            setMensagemCampo("Preencha os campos acima");
            setTimeout(() => setMensagemCampo(""), 2800);
        } else if (!campoFormaPagamentoValdo) {
            setMensagemFormaPag("Escolha uma forma de pagamento");
            setTimeout(() => setMensagemFormaPag(""), 2800);
        } else if (!trocoValido) {
            setMensagemTroco("Informe o valor pra troco");
            setTimeout(() => setMensagemTroco(""), 2500);
        }
    };

    const itensNoCarrinho = Object.entries(carrinho)
        .map(([id, quantidade]) => {
            const item = itens.find((i) => i.id === id);
            return item ? { ...item, quantidade } : null;
        })
        .filter(
            (item): item is ItemCardapio & { quantidade: number } =>
                item !== null,
        );

    function rotuloPagamento(forma: FormaPagamento | null): string {
        const opcao = opcoesPagamento.find((o) => o.valor === forma);
        return opcao ? opcao.rotulo : "";
    }

    function montarMensagem(): string {
        const linhasItens = itensNoCarrinho
            .map(
                (item) =>
                    `• ${item.quantidade}x ${item.nome} — R$ ${(item.preco * item.quantidade).toFixed(2).replace(".", ",")}`,
            )
            .join("\n");

        const mensagem = `
🍢 *Novo pedido*

${linhasItens}

*Total: R$ ${totalPreco.toFixed(2).replace(".", ",")}*

 *Cliente:* ${dados.nome}
 *Telefone:* ${dados.telefone}
 *Endereço:* ${dados.endereco}
 *Pagamento:* ${rotuloPagamento(dados.formaPagamento)}
${dados.formaPagamento === "dinheiro" ? " *Troco:* Troco para " + dados.troco + " reais" : ""}
${dados.formaPagamento === "pix" ? " *Pix:* pagamento via chave " + CHAVE_PIX : ""}
${dados.observacao.trim() !== "" ? ` *Observação:* ${dados.observacao}` : ""}
`.trim();

        return mensagem;
    }

    const linkWhatsApp = `https://wa.me/${NUMERO_WHATSAPP_VENDEDOR}?text=${encodeURIComponent(montarMensagem())}`;

    return (
        <main className={styles.tela}>
            <header className={styles.cabecalho}>
                <Link href="/carrinho" className={styles.botaoVoltar} aria-label="Voltar ao carrinho">
                    <ArrowLeft />
                </Link>
                <h1 className={styles.titulo}>Voltar ao carrinho</h1>
            </header>

            <form className={styles.formulario}>
                {/* --- Dados do cliente --- */}
                <fieldset className={styles.grupo}>
                    <Input
                        id="nome"
                        type="text"
                        label="Nome"
                        placeholder="Seu primeiro nome"
                        value={dados.nome}
                        onChange={(e) => atualizarCampo("nome", e.target.value)}
                    />

                    <Input
                        id="telefone"
                        type="tel"
                        label="Telefone / WhatsApp"
                        placeholder="(69) 90000-0000"
                        value={dados.telefone}
                        onChange={(e) => atualizarCampo("telefone", e.target.value)}
                    />

                    <Textarea
                        id="endereco"
                        label="Endereço de entrega"
                        placeholder="Rua, número, bairro, ponto de referência"
                        value={dados.endereco}
                        onChange={(e) => atualizarCampo("endereco", e.target.value)}
                    />
                </fieldset>

                <span className={styles.avisoCampoValido}>{mensagemCampo}</span>

                {/* --- Forma de pagamento --- */}
                <fieldset className={styles.grupo}>
                    <legend className={styles.rotulo}>Forma de pagamento</legend>

                    <div className={styles.opcoesPagamento}>
                        {/* Cada opção agora renderiza o botão E, na mesma iteração,
                            o detalhe (troco ou Pix) correspondente a ELA — nunca
                            o de outra opção. É por isso que usamos React.Fragment:
                            o .map() passa a devolver DOIS elementos por item
                            (o botão + o detalhe condicional), e o Fragment agrupa
                            os dois sem precisar de uma <div> extra no HTML final. */}
                        {opcoesPagamento.map((opcao) => (
                            <React.Fragment key={opcao.valor}>
                                <button
                                    type="button"
                                    className={`${styles.botaoPagamento} ${
                                        dados.formaPagamento === opcao.valor
                                            ? styles.botaoPagamentoAtivo
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setDados((atual) => ({
                                            ...atual,
                                            formaPagamento: opcao.valor,
                                        }))
                                    }
                                >
                                    <span>{opcao.icone}</span>
                                    {opcao.rotulo}
                                </button>

                                {/* Detalhe do Pix — nasce logo abaixo do botão "Pix" */}
                                {opcao.valor === "pix" &&
                                    dados.formaPagamento === "pix" && (
                                        <div className={styles.blocoPix}>
                                            <span className={styles.rotuloChavePix}>
                                                Chave Pix do vendedor
                                            </span>
                                            <div className={styles.linhaPix}>
                                                <code className={styles.chavePix}>
                                                    {CHAVE_PIX}
                                                </code>
                                                <button
                                                    type="button"
                                                    className={styles.botaoCopiarPix}
                                                    onClick={async () => {
                                                        await navigator.clipboard.writeText(CHAVE_PIX);
                                                        setPixCopiado(true);
                                                        setTimeout(() => setPixCopiado(false), 2000);
                                                    }}
                                                >
                                                    {pixCopiado ? "Copiado!" : "Copiar"}
                                                </button>
                                            </div>
                                            <div className={styles.passosPix}>
                                                <p className={styles.passoPix}>
                                                    <strong>1.</strong> Copie a chave Pix
                                                </p>
                                                <p className={styles.passoPix}>
                                                    <strong>2.</strong> Envie o pedido no WhatsApp
                                                </p>
                                                <p className={styles.passoPix}>
                                                    <strong>3.</strong> Vá no app do seu banco, faça o pagamento e mande o comprovante no whatsapp.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                {/* Detalhe do troco — nasce logo abaixo do botão "Dinheiro" */}
                                {opcao.valor === "dinheiro" &&
                                    dados.formaPagamento === "dinheiro" && (
                                        <div className={styles.opcoesPagamento}>
                                            <Input
                                                id="troco"
                                                type="text"
                                                label="Troco para quanto?"
                                                placeholder="Ex: R$ 50,00"
                                                value={dados.troco}
                                                onChange={(e) =>
                                                    setDados({ ...dados, troco: e.target.value })
                                                }
                                            />
                                        </div>
                                    )}
                            </React.Fragment>
                        ))}
                    </div>
                </fieldset>

                <span className={styles.avisoFormaPagValido}>{mensagemFormaPag}</span>
                <span className={styles.avisoTroco}>{mensagemTroco}</span>

                {/* --- Observação opcional --- */}
                <fieldset className={styles.grupo}>
                    <Textarea
                        id="observacao"
                        label={
                            <>
                                Observação{" "}
                                <span className={styles.opcionalTexto}>(opcional)</span>
                            </>
                        }
                        placeholder="Ex: sem cebola, ponto da carne, etc."
                        value={dados.observacao}
                        onChange={(e) => atualizarCampo("observacao", e.target.value)}
                    />
                </fieldset>
            </form>

            {/* --- Resumo e botão final --- */}
            <div className={styles.resumo}>
                <div className={styles.linhaResumo}>
                    <span>Total do pedido</span>
                    <strong>R$ {totalPreco.toFixed(2).replace(".", ",")}</strong>
                </div>

                {podeEnviar ? (
                    <Link
                        href={linkWhatsApp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.botaoFinalizar}
                    >
                        Enviar pedido no WhatsApp{" "}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                        </svg>
                    </Link>
                ) : (
                    <button
                        type="button"
                        className={styles.botaoFinalizarDesabilitado}
                        onClick={mostraMensagem}
                    >
                        Enviar pedido no WhatsApp{" "}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                        </svg>
                    </button>
                )}
            </div>
        </main>
    );
}

