const products = [{title: 'tom', id: 1}, {title: 'orange', id: 2}]

export const productsRepository = {
  findProducts(title: string | null) {
    if (title) {
      return products.filter(p => p.title.includes(title))
    } else {
      return products
    }
  },
  createProduct(title: string) {
    const newProduct = {
      id: +(new Date()),
      title: title
    }
    products.push(newProduct)
    return products
  },
  changeProductTitle(id: number, title: string) {
    let selectedProducts = products.find(p => p.id === id)
    if (selectedProducts) {
      selectedProducts.title = title
    }
    return selectedProducts
  },
  getProductById(id: number) {
    return products.find(p => p.id === id)
  },
  deleteProductById(id: number) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1)
        return true
      }
    }
  }
}
