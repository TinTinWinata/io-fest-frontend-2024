const alpha = "ABCDEFGHIKLMNOPQRSTUVWXYZ"

export function generateRoomCode() {
    let code = ""
    
    for (let i = 0; i < 6; i++) {
        code += alpha[Math.floor(Math.random() * alpha.length)];
    }
    return code
}

export function getRandomNumbers(max: number) {
  const numbersArray = Array.from({ length: max }, (_, index) => index + 1);

  for (let i = numbersArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbersArray[i], numbersArray[j]] = [numbersArray[j], numbersArray[i]];
  }

  const selectedNumbers = numbersArray.slice(0, 10);

  return selectedNumbers;
}