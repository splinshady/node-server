import express, {NextFunction, Request, Response} from 'express'
import bodyParser from 'body-parser'
import {productsRoute} from "./routes/products-route";
import {addressesRoute} from "./routes/address-route";
const app = express()
const port = process.env.PORT || 3000

let visitCount = 0

const visitCountMiddleware = (req: Request, res: Response, next: NextFunction) => {
  visitCount++
  next()
}

app.use(bodyParser(), visitCountMiddleware)

app.get('/', (req: Request, res: Response) => {
  let hello = 'Hi node!' + visitCount;
  res.send(hello)
})

app.use('/products', productsRoute)
app.use('/addresses', addressesRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
