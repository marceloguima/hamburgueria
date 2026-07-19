// Configurações fixas do app. Centralizamos aqui pra ficar fácil
// de achar e trocar depois — quando/se isso virar multi-vendedor,
// esse valor sai daqui e passa a vir de um banco de dados,
// mas o resto do código (quem usa essa constante) não muda nada.

// Formato exigido pelo WhatsApp: código do país (55) + DDD + número, sem espaços ou símbolos
export const NUMERO_WHATSAPP_VENDEDOR = '556993351151'; // troque pelo número real do rapaz

export const CHAVE_PIX = 'Uma-chave-pix-qualquer'; // pode ser CPF, celular, e-mail ou chave aleatória