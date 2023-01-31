import {productTypeCollection} from "./db";

export type ProductType = {
  title: string,
  id: number
}

export const productsRepository = {
  async findProducts(title: string | null): Promise<ProductType[]> {

    let filters: any = {}
    if (title) {
      filters = {title: {$regex: title}}
    }
    return productTypeCollection.find(filters).toArray()
  },
  async createProduct(title: string) {
    const newProduct = {
      id: +(new Date()),
      title: title
    }
    await productTypeCollection.insertOne(newProduct)
    return newProduct
  },
  async updateProduct(id: number, title: string) {

    const result = await productTypeCollection.updateOne({id: id}, {$set: {title: title}})
    return result.matchedCount === 1
  },
  async getProductById(id: number) {
    const product = await productTypeCollection.find({id: id})
    return product ? product : null
  },
  async deleteProductById(id: number) {
    const result = await productTypeCollection.deleteOne({id: id})
    return result.deletedCount === 1
  }
}
