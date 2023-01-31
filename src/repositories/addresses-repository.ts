const address = [{value: 'address1', id: 5}, {value: 'address2', id: 6}]

export const addressRepository = {
  async getAddresses() {
    return address
  },
  async getAddressById(id: number) {
    let selectedAddress = address.find(a => a.id === id)
    if (selectedAddress) {
      return selectedAddress
    }

  }
}
