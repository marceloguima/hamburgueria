import styles from './Spinner.module.css';

// Overlay de carregamento simples e reutilizável.
// Sem props por enquanto — sempre cobre a tela inteira com um spinner central.
export default function Spinner() {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner} />
      <span>Aguarde...</span>
    </div>
  );
}