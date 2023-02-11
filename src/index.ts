import express, {NextFunction, Request, Response} from 'express'
import {db} from "./db";
import {ApolloServer} from "apollo-server-express";
import {typeDefs} from "./schema";
import {resolvers} from "./resolvers";
import {models} from "./models";

const app = express()
const port = process.env.PORT || 3000

db.connect("mongodb+srv://splin:anton@cluster17.azmyvzb.mongodb.net/?retryWrites=true&w=majority");

let visitCount = 0

const visitCountMiddleware = (req: Request, res: Response, next: NextFunction) => {
  visitCount++
  next()
}

app.use(visitCountMiddleware)
app.get('/', (req: Request, res: Response) => {
  let hello = 'Hi node!' + visitCount;
  res.send(hello)
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {models}
  }
});

const startApp = async () => {
  await server.start()
  server.applyMiddleware({app, path: '/api'});
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}${server.graphqlPath}`)
  })
}

startApp()

