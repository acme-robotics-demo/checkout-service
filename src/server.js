import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
import { subtotal, total, formatCents, TAX_RATE } from './pricing.js'

const cart = [
  { sku: 'ARM-200', name: 'Robotic arm kit', unitPriceCents: 24900, quantity: 1 },
  { sku: 'SRV-12', name: 'Servo motor', unitPriceCents: 1850, quantity: 4 },
]
const discount = { code: 'ROBOT10', percent: 10 }
const page = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8')

createServer((req, res) => {
  if (req.url === '/api/cart') {
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({
      items: cart, discount, taxRate: TAX_RATE,
      subtotal: formatCents(subtotal(cart)), total: formatCents(total(cart, discount)),
    }))
  }
  res.setHeader('Content-Type', 'text/html')
  res.end(page)
}).listen(process.env.PORT || 3000, () => console.log(`checkout-service on :${process.env.PORT || 3000}`))
