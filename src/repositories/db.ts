import {MongoClient} from "mongodb";
import mongoose from "mongoose";
import {ProductType} from "./products-repository";

const mongoUri = process.env.mongoURI || "mongodb+srv://splin:anton@cluster17.azmyvzb.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(mongoUri)
const db = client.db("shop");
export const productTypeCollection = db.collection<ProductType>('products');

export async function runDb() {
  try {
    await mongoose.connect(mongoUri)
    await client.connect()
    await client.db("shop").command({ping: 1})
    console.log("Connected MongoDB")
  } catch (e) {
    console.log(e)
    await client.close()
  }
}
