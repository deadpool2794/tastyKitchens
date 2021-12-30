export const pageStatusOptions = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILURE',
}

export const addToLocalStorage = foodItemDetails => {
  const cartData = JSON.parse(localStorage.getItem('cartData'))
  let updatedCartData
  if (cartData === null) {
    localStorage.setItem('cartData', JSON.stringify([foodItemDetails]))
    return [foodItemDetails]
  }
  if (cartData !== null) {
    if (cartData.find(each => each.id === foodItemDetails.id)) {
      updatedCartData = cartData.map(each => {
        if (foodItemDetails.id === each.id) {
          const newCartItem = {...each, quantity: each.quantity + 1}
          return newCartItem
        }
        return each
      })

      localStorage.setItem('cartData', JSON.stringify(updatedCartData))
      return updatedCartData
    }
    updatedCartData = [...cartData, foodItemDetails]
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    return updatedCartData
  }
  return null
}

export const decrementQuantity = foodItemDetails => {
  const cartData = JSON.parse(localStorage.getItem('cartData'))
  if (foodItemDetails.quantity < 1) {
    const filteredCartData = cartData.filter(
      each => each.id !== foodItemDetails.id,
    )
    localStorage.setItem('cartData', JSON.stringify(filteredCartData))
    return filteredCartData
  }
  const updatedCartData = cartData.map(each => {
    if (each.id === foodItemDetails.id) {
      const newCartItem = {...each, quantity: each.quantity - 1}
      return newCartItem
    }
    return each
  })
  localStorage.setItem('cartData', JSON.stringify(updatedCartData))
  return updatedCartData
}
