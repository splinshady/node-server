import {Request, Response, Router} from "express";

const products = [{title: 'tom', id: 1}, {title: 'orange', id: 2}]

export const productsRoute = Router()

productsRoute.get('/', (req: Request, res: Response) => {
  if (req.query.title) {
    const searchString = req.query.title.toString()
    res.send(products.filter(p => p.title.includes(searchString)))
  } else {
    res.send(products)
  }

  res.send(404)
})

productsRoute.post('/', (req: Request, res: Response) => {
  const newProduct = {
    id: +(new Date()),
    title: req.body.title
  }
  products.push(newProduct)
  res.status(201).send(newProduct)
})

productsRoute.put('/:id', (req: Request, res: Response) => {
  let selectedProducts = products.find(p => p.id === +req.params.id)
  if (selectedProducts) {
    selectedProducts.title = req.body.title
    res.status(201).send(res.send(selectedProducts))
  }
  res.send(404)
})

productsRoute.get('/:id', (req: Request, res: Response) => {
  let selectedProducts = products.find(p => p.id === +req.params.id)
  if (selectedProducts) {
    res.send(selectedProducts)
  }
  res.send(404)
})

productsRoute.delete('/:id', (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1)
      res.send(204)
    }
  }
  res.send(404)
})
