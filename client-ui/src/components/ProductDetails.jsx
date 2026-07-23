import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import MetaData from "../components/MetaData";
import PriceComponent from "./PriceComponent";

const ProductDetails = ({ product }) => {
  const { id } = useParams(); // Fetch product ID from URL params
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Assuming the products are being passed as props or fetched from API
  useEffect(() => {
    // Example fetch logic, you can replace this with your actual data fetching
    if (product) {
      setSelectedProduct(product);
    } else {
      // Fetch product by ID if the product prop is not passed
      const foundProduct = products.find((p) => p._id === id);
      setSelectedProduct(foundProduct);
    }
  }, [id, product]);

  // If no product is found, show loading state
  if (!selectedProduct) return <div>Loading...</div>;

  const { title, subTitle, description, brand, image, category, stock, isProductNew, numOfReviews, InStock } = selectedProduct;

  const comments = [
    {
      name: 'Bilal',
      comment: 'Excellent Product!',
      rating: 5,
      date: '12:50 pm, 20 Dec, 2024',
    },
    {
      name: 'Shaheer',
      comment: 'This is fantastic and highly recommended for everyone.',
      rating: 3,
      date: '12:50 pm, 20 Dec, 2024',
    },
    {
      name: 'Khubaib',
      comment: 'Very useful and affordable. Totally worth it.',
      rating: 4,
      date: '12:50 pm, 20 Dec, 2024',
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <MetaData title={title} /> {/* Update page title dynamically */}

      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <img className="myImage" src={image} alt={title} />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-4xl text-red-300 capitalize font-bold">
            {title}
            &nbsp;
            <sup className="text-orange-400 text-base font-bold">
              {isProductNew && "(New Arrival)"}
            </sup>
          </h1>
          <h1 className="text-3xl text-red-500">Brand: &nbsp; {brand}</h1>
          <div className="border-t"></div>
          <div className="flex items-center my-3">
            <div className="flex text-red-500">
              <b>SubTitle: &nbsp;</b> {subTitle}
            </div>
          </div>

          <div className="border-t">
            <PriceComponent product={selectedProduct} />
          </div>

          <p className="my-2 border-t">
            <span className="font-semibold text-[18px]">
              {category === "Electronics" ||
              category === "Laptops" ||
              category === "Mobiles" ||
              category === "Gaming Console" ||
              category === "Accessories"
                ? <span className="dark:text-red-500 text-red-800">Specifications:</span>
                : <span className='dark:text-red-500 text-red-800'>Small Details:</span>}
            </span>
            <span className="text-blue-400">{category}</span>
          </p>

          <div className="border-t"></div>
          <p className="font-bold my-2">
            {InStock ? (
              <>
                <span className="text-orange-300 font-bold">In Stock:</span>
                {stock === 1 ? (
                  <span className="text-red-300 dark:text-red-300">only {stock} Item left</span>
                ) : stock > 1 && stock <= 10 ? (
                  <span className="text-purple-800 dark:text-purple-300">only {stock} Items left</span>
                ) : stock >= 11 ? (
                  <span className="text-red-800 dark:text-blue-800">{stock} Items left</span>
                ) : ""}
              </>
            ) : (
              <span className="text-red-600 font-bold">Out of Stock</span>
            )}
          </p>

          <p className="my-2 dark:text-orange-500 text-red-800">
            <span className="font-semibold text-[18px] dark:text-red-500 text-red-800">Category:</span>
            {category}
          </p>

          <div className="my-4">
            <h2 className="text-xl font-bold text-red-400">
              <b className="text-orange-400">Description:</b> &nbsp; {description}
            </h2>
          </div>

          <div className="border-t font-semibold">
            <span className="dark:text-green-800 text-red-500"><b>Reviews:</b></span>
            <span className="text-orange-500"> ({numOfReviews} reviews) </span>
            {comments.map((comment, index) => (
              <div key={index} className="border-t py-2">
                <p className="text-yellow-600 font-semibold">{comment.name}</p>
                <small className="float-right text-sm text-slate-500">{comment.date}</small>
                <div className="flex item-center">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx}>
                      {idx < comment.rating ? (
                        <RiStarSFill className="text-yellow-500 text-lg" />
                      ) : (
                        <RiStarSLine className="text-yellow-500 text-lg" />
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-red-400">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
