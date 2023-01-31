import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";
import {body} from "express-validator";

export const productsRoute = Router()

const titleValidation = body('title').trim().isLength({min: 3, max: 10})
  .withMessage('Title should bo from 3 to 10 symbols')

productsRoute.get('/', async (req: Request, res: Response) => {
  console.log(req.query.title)
  const foundProducts = await productsRepository.findProducts(req.query.title ? req.query.title.toString() : null)
  res.send(foundProducts)
})

productsRoute.post('/',
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const newProduct = await productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
  })

productsRoute.put('/:id', async(req: Request, res: Response) => {
  const selectedProducts = await productsRepository.updateProduct(+req.params.id, req.body.title)
  if (selectedProducts) {
    res.status(201).send(res.send(selectedProducts))
  }
})

productsRoute.get('/:id', async(req: Request, res: Response) => {
  let selectedProducts = await productsRepository.getProductById(+req.params.id)
  if (selectedProducts) {
    res.send(selectedProducts)
  }
})

productsRoute.delete('/:id', async (req: Request, res: Response) => {
  const isDeleted = await productsRepository.deleteProductById(+req.params.id)
  isDeleted ? res.send(204) : res.send(404)
})
