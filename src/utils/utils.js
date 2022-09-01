export default class Calculador {
  static CalculaMedida(a, b, c) {
    return (Number(b) * Number(c)) / Number(a);
  }
  
  static CalculaMedidaExpressao(r, c , n) {
    return `${String(n)} => ${Number(c)} => ${Number(r).toFixed(2)} => ${(Math.round(Number(r)).toFixed(2))}`
  }
}
