const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

let taxRates = 5; //5%
let discountPercentage = 10; //10%
let loyaltyRate = 2; //2 Points per 1 $

function sumNewItemWithCartTotal(newItemPrice, cartTotal) {
  let total = newItemPrice + cartTotal;
  return total.toString();
}

function updateMembershipDiscount(cartTotal, isMember) {
  if (isMember) {
    let discountedCartTotal =
      cartTotal - cartTotal * (discountPercentage / 100);
    return discountedCartTotal.toString();
  }
  return cartTotal.toString();
}

function calculateTaxOnCart(cartTotal) {
  let cartTotalTax = cartTotal * (taxRates / 100);
  return cartTotalTax.toString();
}

function deliveryEstimatedTime(shippingMethod, distance) {
  let oneDayCoverage = 50;
  let estimatedTime = 0;
  if (shippingMethod === 'express') {
    oneDayCoverage = 100;
  }
  estimatedTime = distance / oneDayCoverage;
  return estimatedTime.toString();
}

function calculateShippingCost(weight, distance) {
  let shippingCost = weight * distance * 0.1;
  return shippingCost.toString();
}

function calculateLoyaltyPoints(purchaseAmount) {
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  return loyaltyPoints.toString();
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(sumNewItemWithCartTotal(newItemPrice, cartTotal));
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(updateMembershipDiscount(cartTotal, isMember));
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTaxOnCart(cartTotal));
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(deliveryEstimatedTime(shippingMethod, distance));
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance));
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoints(purchaseAmount));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
