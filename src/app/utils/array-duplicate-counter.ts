export function duplicateCounter(original: Array<any>) {
  let compressed = [];
  let copy = original.slice(0);

  for (let i = 0; i < original.length; i++) {
    let myCount = 0;
    for (let w = 0; w < copy.length; w++) {
      if (original[i] == copy[w]) {
        myCount++;
        delete copy[w];
      }
    }

    if (myCount > 0) {
      const a = {
        value: original[i],
        count: myCount,
      };
      compressed.push(a);
    }
  }

  return compressed;
}
