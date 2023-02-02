import {productTypeCollection} from "./db";

export const authRepository = {
  async getUsers() {
    let filters: any = {}

    return productTypeCollection.find(filters).toArray()
  },
}
