export function simulatePayment(
  cardNumber: string
): "APPROVED" | "DECLINED" | "GATEWAY_ERROR" {
  if (cardNumber === "1111222233334444") return "APPROVED";
  if (cardNumber === "9999888877776666") return "DECLINED";
  if (cardNumber === "0000111122223333") return "GATEWAY_ERROR";
  return "APPROVED";
}
