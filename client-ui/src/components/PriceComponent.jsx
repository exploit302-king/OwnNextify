import React from 'react';
import { priceCalculator } from '../functions/func';
import { PiCurrencyDollar } from 'react-icons/pi';


const PriceComponent = ({product}) => {
  console.log(product.discount)
  return (
    <div>
      {product.onSale ? (
        <p className="font-bold text-2xl text-red-300 leading-6 mr-2">
          Rs. {priceCalculator(product.price, product.onSale, product.discount )}
          {/* Uncomment and use if needed */}
          <small className="font-semibold text-blue-800 ml-4">
            {product.dollarSale} <PiCurrencyDollar style={{
              display: "inline",
              marginLeft: "-10px"
            }} />
          </small>
          <br />
          <small className="font-semibold line-through text-gray-400">
            Rs. {product.price}
          </small>
          <small className="font-semibold dark:text-yellow-500 text-gray-700">
            {product.discount}% Off
          </small>
        </p>
      ) : (
        <p className="font-bold text-2xl text-red-400">
          Rs. {product.price}
          <small className='font-semibold text-blue-800 ml-4'>
            {product.dollarSale} <PiCurrencyDollar style={{
              display: "inline",
              marginLeft: "-10px"
            }} />
          </small>
        </p>
      )}
    </div>
  );
};

export default PriceComponent;