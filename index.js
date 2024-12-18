const express = require('express')
const { resolve } = require('path')
const cors = require('cors')

const app = express()
const port = 3000

app.use(express.static('static'))
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'))
})

app.get('/calculate-returns', (req, res) => {
  const { boughtAt, marketPrice, quantity } = req.query
  const bought = parseFloat(boughtAt)
  const market = parseFloat(marketPrice)
  const qty = parseFloat(quantity)

  if (isNaN(bought) || isNaN(market) || isNaN(qty)) {
    return res.status(400).send('Invalid input')
  }

  const returns = (market - bought) * qty
  res.send(returns.toString())
})

app.get('/total-returns', (req, res) => {
  const { stock1, stock2, stock3, stock4 } = req.query
  const s1 = parseFloat(stock1)
  const s2 = parseFloat(stock2)
  const s3 = parseFloat(stock3)
  const s4 = parseFloat(stock4)

  if (isNaN(s1) || isNaN(s2) || isNaN(s3) || isNaN(s4)) {
    return res.status(400).send('Invalid input')
  }

  const totalReturns = s1 + s2 + s3 + s4
  res.send(totalReturns.toString())
})

app.get('/calculate-return-percentage', (req, res) => {
  const { boughtAt, returns } = req.query
  const bought = parseFloat(boughtAt)
  const ret = parseFloat(returns)

  if (isNaN(bought) || isNaN(ret) || bought === 0) {
    return res.status(400).send('Invalid input')
  }

  const returnPercentage = (ret / bought) * 100
  res.send(returnPercentage.toString())
})

app.get('/total-return-percentage', (req, res) => {
  const { stock1, stock2, stock3, stock4 } = req.query
  const s1 = parseFloat(stock1)
  const s2 = parseFloat(stock2)
  const s3 = parseFloat(stock3)
  const s4 = parseFloat(stock4)

  if (isNaN(s1) || isNaN(s2) || isNaN(s3) || isNaN(s4)) {
    return res.status(400).send('Invalid input')
  }

  const totalPercentage = s1 + s2 + s3 + s4
  res.send(totalPercentage.toString())
})

app.get('/status', (req, res) => {
  const { returnPercentage } = req.query
  const percentage = parseFloat(returnPercentage)

  if (isNaN(percentage)) {
    return res.status(400).send('Invalid input')
  }

  const status = percentage > 0 ? 'profit' : 'loss'
  res.send(status)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
