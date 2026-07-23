const updateWishlistLocalStorage = (wishlist) => {
  localStorage.setItem("wishItems", JSON.stringify(wishlist));
};

export { updateWishlistLocalStorage };
