/**
 * Divide um texto em chunks de tamanho máximo em palavras
 * @param text Texto completo
 * @param maxWords Número máximo de palavras por chunk (default 300)
 * @returns Array de strings (chunks)
 */
export function chunkText(text: string, maxWords: number = 400): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let current: string[] = [];

  for (const word of words) {
    current.push(word);

    if (current.length >= maxWords) {
      chunks.push(current.join(" "));
      current = [];
    }
  }

  if (current.length > 0) {
    chunks.push(current.join(" "));
  }

  return chunks;
}