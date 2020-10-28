export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    // If we find the item, return it with quantity
    return cartItems.map(cartItem => 
      cartItem.id === cartItemToAdd.id 
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
    );
  }

  return [...cartItems, {...cartItemToAdd, quantity: 1}]
};