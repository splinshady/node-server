import {Request, Response, Router} from "express";
import {addressRepository} from "../repositories/addresses-repository";

export const addressesRoute = Router()

addressesRoute.get('/', async (req: Request, res: Response) => {
  const address = await addressRepository.getAddresses()
  res.send(address)
})

addressesRoute.get('/:id', async (req: Request, res: Response) => {
  let selectedAddress = await addressRepository.getAddressById(+req.params.id)
  if (selectedAddress) {
    res.send(selectedAddress)
  }
  res.send(404)
})
