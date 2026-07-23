import { useParams } from "react-router-dom";
import React, {useEffect} from 'react';
import ProductDetails from "../components/ProductDetails";
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from "../redux/actions/productActions";
import { dollarconversion, priceCalculator } from "../functions/func";

const SingleProduct = () => {
  const dispatch = useDispatch()
  const { product } = useSelector(state => state.productSlice)
  const { id } = useParams();  // Get the product ID from the URL
  useEffect(() => {
    dispatch(fetchProduct(id))
  }, [])

  const price = product && priceCalculator( product.price, product.onSale, product.discount);
 const dollarSale =  dollarconversion( price);

  const productDetails = {
    title: product && product.title,
    subTitle: product && product.subtitle,
    // description: product && product.description,
    brand: product && product.brand,
    price: product && product.price,
    image: product && product.image,
    stock: product && product.stock,
    reviews: product && product.reviews,
    isProductNew: product && product.isProductNew,
    numOfReviews: product && product.numOfReviews,
    InStock: product && product.InStock,
    category: product && product.category,
    onSale: product && product.onSale,
    discount: product && product.discount,
    dollarSale: dollarSale, 


  }

  return (

    <div>
      <ProductDetails product={productDetails} />
    </div>
  );
};

export default SingleProduct;
