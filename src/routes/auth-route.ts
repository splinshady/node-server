import {Request, Response, Router} from "express";
export const authRoute =  Router()

authRoute.post('/registration', async (req: Request, res: Response) => {
  res.send('server works')
})

authRoute.post('/login', async (req: Request, res: Response) => {
  res.send('server works')
})

authRoute.get('/users', async (req: Request, res: Response) => {
  res.send('server works')
})
