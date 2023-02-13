import {gql} from "apollo-server-express";

export const typeDefs = gql`
  scalar DateTime
  type User {
    id: ID!
    userName: String!
    email: String!
    avatar: String
    notes: [Note]!
    favorites: [Note!]!
  }
  type Note {
    id: ID
    content: String
    author: String
    createdAt: DateTime!
    updatedAt: DateTime!
    favoriteCount: Int!
    favoriteBy: [User!]
  }
  type Query {
    user(userName: String!): User
    users: [User!]!
    me: User!
    notes: [Note]
    note(id: ID): Note
  }
  type Mutation {
    newNote(content: String!): Note!
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
    signUp(email: String!, userName: String!, password: String!): String!
    signIn(email: String, userName: String, password: String!): String!
    toggleFavorite(id: ID!): Note!
  }
`
