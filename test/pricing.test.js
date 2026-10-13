import { test } from 'node:test'
import assert from 'node:assert/strict'
import { subtotal, discountCents, total, formatCents } from '../src/pricing.js'

const cart = [
  { sku: 'ARM-200', name: 'Robotic arm kit', unitPriceCents: 24900, quantity: 1 },
  { sku: 'SRV-12', name: 'Servo motor', unitPriceCents: 1850, quantity: 4 },
]

test('subtotal adds up line items', () => {
  assert.equal(subtotal(cart), 32300)
})

test('discount is a percentage of the amount', () => {
  assert.equal(discountCents(32300, { code: 'ROBOT10', percent: 10 }), 3230)
  assert.equal(discountCents(32300, null), 0)
})

test('total with no discount includes tax', () => {
  assert.equal(total(cart), 34965) // 32300 + 8.25% tax (2665)
})

test('tax applies to the discounted amount', () => {
  // 32300 - 3230 = 29070; tax 8.25% = 2398; total 31468
  assert.equal(total(cart, { code: 'ROBOT10', percent: 10 }), 31468)
})

test('formats cents as dollars', () => {
  assert.equal(formatCents(31468), '$314.68')
})
