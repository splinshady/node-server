import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
const app = express()
const port = process.env.PORT || 3000

const products = [{title: 'tom', id: 1}, {title: 'orange', id: 2}]
const address = [{value: 'address1', id: 5}, {value: 'address2', id: 6}]

app.use(bodyParser())

app.get('/', (req: Request, res: Response) => {
  let hello = 'Hi node!';
  res.send(hello)
})

app.get('/products', (req: Request, res: Response) => {
  if (req.query.title) {
    const searchString = req.query.title.toString()
    res.send(products.filter(p => p.title.includes(searchString)))
  } else {
    res.send(products)
  }

  res.send(404)
})

app.post('/products', (req: Request, res: Response) => {
  const newProduct = {
    id: +(new Date()),
    title: req.body.title
  }
  products.push(newProduct)
  res.status(201).send(newProduct)
})

app.put('/products/:id', (req: Request, res: Response) => {
  let selectedProducts = products.find(p => p.id === +req.params.id)
  if (selectedProducts) {
    selectedProducts.title = req.body.title
    res.status(201).send(res.send(selectedProducts))
  }
  res.send(404)
})

app.get('/products/:id', (req: Request, res: Response) => {
  let selectedProducts = products.find(p => p.id === +req.params.id)
  if (selectedProducts) {
    res.send(selectedProducts)
  }
  res.send(404)
})

app.delete('/products/:id', (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1)
      res.send(204)
    }
  }

  res.send(404)
})

app.get('/address/:id', (req: Request, res: Response) => {
  let selectedAddress = address.find(a => a.id === +req.params.id)
  if (selectedAddress) {
    res.send(selectedAddress)
  }
  res.send(404)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
