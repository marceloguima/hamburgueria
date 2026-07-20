import type { Metadata } from 'next';
import './globals.css';
import { CarrinhoProvider } from '../app/context/CarrinhoContext';

export const metadata: Metadata = {
  title: 'Hamburgueria top 10',
  description: 'Peça seu hamburguer sem sair de casa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Tudo dentro do Provider passa a ter acesso ao carrinho */}
        <CarrinhoProvider>{children}</CarrinhoProvider>
      </body>
    </html>
  );
}