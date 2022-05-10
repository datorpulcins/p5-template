export const eq = (levels: Float32Array[], start: number, end: number) => {
  let value = 0;
  const bars = levels.length;

  for (let i = Math.floor(bars * start); i < Math.floor(bars * end); i += 1) {
    const normalized = Math.max(0, 100 - levels[i] * -1);
    value += (normalized / (bars * (end - start))) * -1;
  }

  return value;
};
