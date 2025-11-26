export function sanitizeInput(input: string): string {
  // Remove caracteres perigosos e limita comprimento
  return input
    .replace(/[<>"'&]/g, "") // Remove tags HTML e aspas
    .slice(0, 500)
    .trim();
}
