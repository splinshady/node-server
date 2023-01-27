import {Request, Response, Router} from "express";
import {addressRepository} from "../repositories/addresses-repository";

export const addressesRoute = Router()

addressesRoute.get('/', (req: Request, res: Response) => {
  const address = addressRepository.getAddresses()
  res.send(address)
})

addressesRoute.get('/:id', (req: Request, res: Response) => {
  let selectedAddress = addressRepository.getAddressById(+req.params.id)
  if (selectedAddress) {
    res.send(selectedAddress)
  }
  res.send(404)
})
