import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";

export const productsRoute = Router()

productsRoute.get('/', (req: Request, res: Response) => {
  console.log(req.query.title)
  const foundProducts = productsRepository.findProducts(req.query.title ? req.query.title.toString() : null)
  res.send(foundProducts)
  res.send(404)
})

productsRoute.post('/', (req: Request, res: Response) => {
  const newProduct = productsRepository.createProduct(req.body.title)
  res.status(201).send(newProduct)
})

productsRoute.put('/:id', (req: Request, res: Response) => {
  const selectedProducts = productsRepository.changeProductTitle(+req.params.id, req.body.title)
  if (selectedProducts) {
    res.status(201).send(res.send(selectedProducts))
  }
  res.send(404)
})

productsRoute.get('/:id', (req: Request, res: Response) => {
  let selectedProducts = productsRepository.getProductById(+req.params.id)
  if (selectedProducts) {
    res.send(selectedProducts)
  }
  res.send(404)
})

productsRoute.delete('/:id', (req: Request, res: Response) => {
  productsRepository.deleteProductById(+req.params.id) && res.send(204)
  res.send(404)
})
