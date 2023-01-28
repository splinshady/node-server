import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";
import {body} from "express-validator";

export const productsRoute = Router()

const titleValidation = body('title').trim().isLength({min: 3, max: 10})
  .withMessage('Title should bo from 3 to 10 symbols')

productsRoute.get('/', (req: Request, res: Response) => {
  console.log(req.query.title)
  const foundProducts = productsRepository.findProducts(req.query.title ? req.query.title.toString() : null)
  res.send(foundProducts)
  res.send(404)
})

productsRoute.post('/',
  titleValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
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
