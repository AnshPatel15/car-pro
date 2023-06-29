export const getCartFromStorage = () => {
  try {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error retrieving cart from local storage:", error);
    return [];
  }
};

export const saveCartToStorage = (cartData: any) => {
  try {
    const serializedCart = JSON.stringify(cartData);
    localStorage.setItem("cart", serializedCart);
  } catch (error) {
    console.error("Error saving cart to local storage:", error);
  }
};
