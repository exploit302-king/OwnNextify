import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdRemoveShoppingCart } from "react-icons/md";
import { addCartItem, removeCartItem } from '../redux/actions/cartActions'
import { useSelector, useDispatch } from 'react-redux'
import { errorToast } from '../functions/messages'
import PriceComponent from "../components/PriceComponent";


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [cartPlusDisabled, setCartPlusDisabled] = useState(false);
  const { cartItems } = useSelector((state) => state.cartSlice);

  useEffect(() => {
    const item = cartItems.find((cartItem) => cartItem.id === product.id);

    if (item && item.qty >= product.stock) {
      setCartPlusDisabled(true);
    } else {
      setCartPlusDisabled(false);
    }
  }, [product, cartItems]);

  const addItem = (id) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    if (item) {
      if (item.qty >= product.stock) {
        errorToast(`Only ${product.stock} item(s) available in stock.`);
        return;
      }
      dispatch(addCartItem(id, item.qty + 1));
    } else {
      dispatch(addCartItem(id, 1));
    }
  };

  const decreaseItem = (id) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    if (!item) return;
    if (item.qty > 1) {
      dispatch(addCartItem(id, item.qty - 1));
    } else {
      errorToast("Minimum quantity is 1.");
    }
  };

  const resetCart = (id) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    if (item && item.qty > 1) {
      dispatch(removeCartItem(id, item.qty - 1));
    } else {
      dispatch(removeCartItem(id, 1));
    }
  };
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <Link to={`/Singleproduct/${product._id}`} className="shrink-0 md:order-1">
          <img
            className="h-20 w-20 dark:hidden"
            src={product.image}
            alt={product.name}
          />
          <img
            className="hidden h-20 w-20 dark:block"
            src={product.image}
            alt={product.name}
          />
        </Link>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => decreaseItem(product.id)}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <svg
                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
              value={product.qty} // Controlled input value
              onChange={(e) => setCartQty(Number(e.target.value))} // Update state on input change
              required
            />
            <button
              type="button"
              onClick={() => addItem(product.id)}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <svg
                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">
              ${product.price}
            </p>
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <Link
            to="#"
            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
          >
            {product.name}
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {product.subTitle}
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => resetCart(product.id)}
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:underline dark:text-gray-500"
            >
              <MdRemoveShoppingCart onClick={() => removeCartItem(product._id)} className="text-gray-500 h-6 w-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

const Cart = () => {
  const { cartItems } = useSelector(state => state.cartSlice)

  return (
    <div>
      <section className="py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-4">
                {cartItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* order summary */}
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {cartItems.reduce((acc, item) => acc + item.price, 0)}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Discount percentage
                      </dt>
                      <dd className="text-base font-medium text-blue-600 dark:text-white ">
                        {cartItems.reduce((acc, product) => acc + product.discount, 0)}%
                      </dd>
                    </dl>

                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      {cartItems.reduce((total, item) => total + (item.price * item.qty), 0)}
                    </dd>
                  </dl>
                </div>
                <Link
                  to={cartItems.length > 0 ? "/Checkout" : "#"}
                  state={cartItems.length > 0 ? { cartItems } : null}
                  onClick={(e) => {
                    if (cartItems.length === 0) {
                      e.preventDefault();
                      errorToast("Your cart is empty.");
                    }
                  }}
                  className={`flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition 
                    ${cartItems.length > 0
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed pointer-events-auto"
                    }`}
                >
                  {cartItems.length > 0
                    ? "Proceed to Checkout"
                    : "Cart is Empty"}
                </Link>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <Link to="/" title className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline hover:no-underline dark:text-blue-500" >
                    Continue Shopping
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Do you have a voucher or gift card?{" "}
                    </label>
                    <input
                      type="text"
                      id="voucher"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Apply Code
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Cart;