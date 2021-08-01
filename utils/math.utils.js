export function getVariation(initial, final) {
  return Math.round(((final - initial) / initial) * 10000) / 100;
}
