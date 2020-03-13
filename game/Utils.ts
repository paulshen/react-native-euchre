export function compareArrays(a1: Array<number>, a2: Array<number>): boolean {
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] > a2[i]) {
      return true;
    }
    if (a1[i] < a2[i]) {
      return false;
    }
  }
  return false;
}
