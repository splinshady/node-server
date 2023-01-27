const address = [{value: 'address1', id: 5}, {value: 'address2', id: 6}]

export const addressRepository = {
  getAddresses() {
    return address
  },
  getAddressById(id: number) {
    let selectedAddress = address.find(a => a.id === id)
    if (selectedAddress) {
      return selectedAddress
    }
  }
}
