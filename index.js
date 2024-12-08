const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to stock portfolio analysis API!');
});

//Endpoint 1: Calculate the Returns of the Stocks added
function calculateReturn(boughtAt, marketPrice, quantity) {
  let totalReturn = (marketPrice - boughtAt) * quantity;
  return totalReturn.toString();
}

app.get('/calculate-returns', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let marketPrice = parseFloat(req.query.marketPrice);
  let quantity = req.query.quantity;

  res.send(calculateReturn(boughtAt, marketPrice, quantity));
});

// Endpoint 2: Calculate the Total Returns
function calculateTotalReturn(stock1, stock2, stock3, stock4) {
  let totalStockReturn = stock1 + stock2 + stock3 + stock4;
  return totalStockReturn.toString();
}

app.get('/total-returns', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);

  res.send(calculateTotalReturn(stock1, stock2, stock3, stock4));
});

// Endpoint 3: Calculate the Return Percentage
function calculateReturnPercentage(boughtAt, returns) {
  let returnPercentage = (returns / boughtAt) * 100;
  return returnPercentage.toString();
}

app.get('/calculate-return-percentage', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let returns = parseFloat(req.query.returns);

  res.send(calculateReturnPercentage(boughtAt, returns));
});

// Endpoint 4: Calculate the Total Return Percentage
function calculateTotalReturnPercentage(stock1, stock2, stock3, stock4) {
  let totalReturnPercentage = stock1 + stock2 + stock3 + stock4;
  return totalReturnPercentage.toString();
}

app.get('/total-return-percentage', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);

  res.send(calculateTotalReturnPercentage(stock1, stock2, stock3, stock4));
});

// Endpoint 5: Identify the Status of Stocks based on their Return Value
function stockStatus(returnPercentage) {
  if(returnPercentage > 0){
    return 'profit';
  }else{
    return 'loss';
  }
}

app.get('/status', (req, res) => {
  let returnPercentage = parseFloat(req.query.returnPercentage);

  res.send(stockStatus(returnPercentage));
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
