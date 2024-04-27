export function formatFirstWord(input: string): string {
  const words = input.trim().split(/\s+/);
  if (words.length === 0) return '';

  const firstWord = words[0];
  const formattedWord =
    firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();

  return formattedWord;
}
