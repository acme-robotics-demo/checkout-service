// Prices are integer cents everywhere. Never use floats for money.

export const TAX_RATE = 0.0825 // Austin, TX

// Sum of line items, in cents.
export function subtotal(items) {
  return items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0)
}

// A percentage discount code, e.g. { code: 'ROBOT10', percent: 10 }.
export function discountCents(amountCents, discount) {
  if (!discount) return 0
  return Math.round((amountCents * discount.percent) / 100)
}

// Order total in cents: the discount comes off the subtotal, then tax applies
// to the discounted amount.
export function total(items, discount) {
  const sub = subtotal(items)
  const discounted = sub - discountCents(sub, discount)
  const tax = Math.round(discounted * TAX_RATE)
  return discounted + tax
}

export function formatCents(cents) {
  return `$${(cents / 100).toFixed(2)}`
}
