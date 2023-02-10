import express, {NextFunction, Request, Response} from 'express'
import bodyParser from 'body-parser'
import {db} from "./db";
import {ApolloServer, gql} from "apollo-server-express";
import {models} from "./models";

const app = express()
const port = process.env.PORT || 3000

db.connect("mongodb+srv://splin:anton@cluster17.azmyvzb.mongodb.net/?retryWrites=true&w=majority");

let visitCount = 0

const visitCountMiddleware = (req: Request, res: Response, next: NextFunction) => {
  visitCount++
  next()
}

app.use(bodyParser(), visitCountMiddleware)
app.get('/', (req: Request, res: Response) => {
  let hello = 'Hi node!' + visitCount;
  res.send(hello)
})

const typeDefs = gql`
  type Note {
    id: ID
    content: String
    author: String
  }
  type Query {
    notes: [Note]
    note(id: ID): Note
  }
  type Mutation {
    newNote(content: String!): Note
  }
`

const resolvers = {
  Query: {
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent: any, args: any) => {
      return await models.Note.findById(args.id);
    },
  },
  Mutation: {
    newNote: async (parent: any, args: any) => {
      return await models.Note.create({
        content: args.content,
        author: "You"
      })
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers});

const startApp = async () => {
  await server.start()
  server.applyMiddleware({ app, path: '/api' });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}${server.graphqlPath}`)
  })
}

startApp()

