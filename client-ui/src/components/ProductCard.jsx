import React, { useState, useEffect } from "react";
import { GiHeartPlus, GiHeartMinus } from "react-icons/gi";
import { FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCartItem } from "../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import {
  addWishItem,
  removeWishItem,
} from "../redux/actions/wishAction";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [cartPlusDisabled, setCartPlusDisabled] = useState(false);

  const { cartItems } = useSelector((state) => state.cartSlice);
  const { wishItems } = useSelector((state) => state.WishSlice);

  const isFavorite = wishItems.some(
    (wishItem) => wishItem.id === product?._id
  );

  useEffect(() => {
    const item = cartItems.find(
      (cartItem) => cartItem.id === product?._id
    );

    if (item && item.qty === product?.stock) {
      setCartPlusDisabled(true);
    } else {
      setCartPlusDisabled(false);
    }
  }, [product, cartItems]);

  const addItem = (id) => {
    if (cartItems.some((cartItem) => cartItem.id === id)) {
      const item = cartItems.find((cartItem) => cartItem.id === id);
      dispatch(addCartItem(id, item.qty + 1));
    } else {
      dispatch(addCartItem(id, 1));
    }

    console.log("Item has been added to the cart");
  };
  const navigate = useNavigate();
  const buyNow = (id) => {
    if (product.stock <= 0) return;

    if (cartItems.some((cartItem) => cartItem.id === id)) {
      const item = cartItems.find((cartItem) => cartItem.id === id);
      dispatch(addCartItem(id, item.qty));
    } else {
      dispatch(addCartItem(id, 1));
    }

    navigate("/checkout");
  };

  const toggleFavorite = (id) => {
    if (product.stock <= 0) {
      console.log("Cannot add out-of-stock product to favorites.");
      return;
    }

    if (isFavorite) {
      dispatch(removeWishItem(id));
      console.log("Item removed from wishlist");
    } else {
      dispatch(addWishItem(id, 1));
      console.log("Item added to wishlist");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden max-w-xs mx-3">

      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-72 object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </Link>

        {/* Wishlist */}
        <button
          onClick={() => toggleFavorite(product._id)}
          disabled={product.stock <= 0}
          title={product.stock <= 0 ? "Out of Stock" : "Add to Wishlist"}
          className={`absolute top-3 right-3 text-3xl ${product.stock > 0
            ? "text-red-500"
            : "text-gray-400 cursor-not-allowed"
            }`}
        >
          {isFavorite ? <GiHeartMinus /> : <GiHeartPlus />}
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-yellow-700 dark:text-orange-400">
          {product.title}
        </h2>

        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-700 dark:text-white">
            {product.category}
          </span>

          <span className="text-red-600 font-bold text-xl">
            Rs. {product.price}
          </span>
        </div>

        {/* Buttons */}
        {/* Buttons */}
        <div className="mt-5 space-y-3">

          <Link
            to={`/product/${product._id}`}
            className="block w-full text-center px-4 py-2 bg-gray-300 dark:bg-gray-500 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-400 dark:text-white"
          >
            View Details
          </Link>

          <div className="flex justify-between items-center gap-3">

            <button
              to=""
              disabled={product.stock <= 0}
              onClick={() => buyNow(product._id)}
              className={`flex-1 py-2 rounded-lg font-semibold transition ${product.stock > 0
                ? "bg-gray-800 hover:bg-gray-900 text-white"
                : "bg-gray-400 cursor-not-allowed text-white"
                }`}
            >
              Buy Now
            </button>

            <button
              disabled={product.stock <= 0 || cartPlusDisabled}
              title={
                product.stock <= 0
                  ? "Out of Stock"
                  : cartPlusDisabled
                    ? "Maximum stock added"
                    : "Add to Cart"
              }
              onClick={() => addItem(product._id)}
              className={`text-3xl ${product.stock > 0 && !cartPlusDisabled
                ? "text-black dark:text-white hover:text-green-600 dark:hover:text-green-400"
                : "text-gray-400 cursor-not-allowed"
                }`}
            >
              <FaCartPlus />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;