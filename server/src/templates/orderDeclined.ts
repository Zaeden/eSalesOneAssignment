export const orderDeclinedTemplate = (name: string, reason: string) => `
  <h2>❌ Transaction Failed</h2>
  <p>Hi ${name},</p>
  <p>Your transaction could not be completed.</p>
  <p><strong>Reason:</strong> ${reason}</p>
  <p>Please check your card details or <a href="#">contact support</a>.</p>
`;
