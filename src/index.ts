import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {productsRoute} from "./routes/products-route";
import {addressesRoute} from "./routes/address-route";
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser())

app.get('/', (req: Request, res: Response) => {
  let hello = 'Hi node!';
  res.send(hello)
})

app.use('/products', productsRoute)
app.use('/addresses', addressesRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
