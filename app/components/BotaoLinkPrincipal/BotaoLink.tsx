import Link from 'next/link';
import styles from './BotaoLink.module.css';

// Formato das props que esse componente aceita.
// "?" depois do nome = prop opcional (não é obrigatório passar).
interface BotaoLinkProps {
  href: string;
  titulo: string;
  icone?: string;      // emoji opcional antes do texto, ex: "🍢"
  ariaLabel?: string;  // se não passar, usamos o próprio título como label
}

// Componente reutilizável de botão em formato de link.
// Usado tanto no "Ver cardápio" (home) quanto no "Ir para o carrinho" (cardápio).
export default function BotaoLink({
  href,
  titulo,
  icone,
  ariaLabel,
}: BotaoLinkProps){
  return (
    <Link
      href={href}
      className={styles.botaoLink}
      aria-label={ariaLabel ?? titulo}
    >
      {icone && <span className={styles.icone}>{icone}</span>}
      <span>{titulo}</span>
      <span className={styles.seta}>➜</span>
    </Link>
  );
}