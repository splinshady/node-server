import {Request, Response, Router} from "express";

const address = [{value: 'address1', id: 5}, {value: 'address2', id: 6}]

export const addressesRoute = Router()

addressesRoute.get('/', (req: Request, res: Response) => {
  res.send(address)
})

addressesRoute.get('/:id', (req: Request, res: Response) => {
  let selectedAddress = address.find(a => a.id === +req.params.id)
  if (selectedAddress) {
    res.send(selectedAddress)
  }
  res.send(404)
})
