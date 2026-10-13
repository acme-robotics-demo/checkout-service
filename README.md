# checkout-service

Acme Robotics checkout: carts, discount codes and sales tax. All money is
integer cents.

```bash
npm test     # node's built-in test runner, no dependencies
npm start    # http://localhost:3000 — the cart page; /api/cart is the JSON
```

## Known issue

Customers using a discount code are charged slightly too much. Support
ticket #142: "ROBOT10 gave me less than 10% off."
