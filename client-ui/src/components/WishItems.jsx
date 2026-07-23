import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { IoMdHeartDislike } from "react-icons/io";
import { removeWishItem } from '../redux/actions/wishAction';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@headlessui/react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const resetWish = (id) => {
    dispatch(removeWishItem(id));
  };
  const { cartItems } = useSelector((state) => state.cartSlice);
   useEffect(() => {
      const item = cartItems.find((cartItem) => cartItem.id === product?._id);
      if (item && item.qty === product?.stock) {
        setCartPlusDisabled(true);
      }
    }, [product, cartItems]);
  return (
    <div className="bg-gradient-to-br rounded-lg shadow-2xl p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <Link to={`/Singleproduct/${product._id}`} className="block">
          <img
            className="w-full h-48 object-cover rounded-lg mb-4"
            src={product.image}
            alt={product.name}
          />
        </Link>
        <button
          onClick={() => resetWish(product.id)}
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-400 transition"
        >
          <IoMdHeartDislike className="text-xl" />
        </button>
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 truncate">{product.name}</h3>
        <p className="text-sm text-gray-600 truncate">{product.subTitle}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">${product.price}</span>
          <Link
            to={`/product/${product._id}`}
            className="text-sm text-gray-600 hover:underline"
          >
            View Details
          </Link>
        </div>
        <div className="mt-4">
          <button
            onClick={() => resetWish(product.id)}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Remove from Wishlist
          </button>
        </div>
      </div>

    </div>

  );
};

const Wish = () => {
  const { wishItems } = useSelector((state) => state.WishSlice);

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold dark:text-gray-300 text-gray-800 mb-6">Your Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div>
        <Button>
          <Link to="/" className="w-full flex my-10 bg-blue-600 text-white py-2 px-10 rounded-lg hover:bg-green-700 transition" >
            Go Back Home
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Wish;
