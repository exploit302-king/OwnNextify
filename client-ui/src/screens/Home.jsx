import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { fetchProducts } from '../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import MetaData from '../components/MetaData';

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.productSlice);

    // State to store the selected product
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts()); // Fetch products when the component mounts
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className='text-red-500 text-center'>Error: {error}</div>;
    }

    // If no product is selected, use a default title, otherwise use selected product's title
    const pageTitle = selectedProduct ? selectedProduct.title : 'Home Page';

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b">
            <div>
                <MetaData title={pageTitle} />
            </div>
            {/* Header Section */}
            <header className="py-6 md:py-10">
                <h1 className="text-2xl sm:text-5xl md:text-[90px] pl-12 dark:text-gray-200 text-black" style={{ lineHeight: "1" }}>
                    Fast, reliable and <br /> convenient Delivery
                </h1>

                <p className="pl-12 text-black pt-10 text-sm sm:text-base md:text-lg dark:text-gray-200 ">
                    Enjoy your free time while we deliver everything you need
                </p>
            </header>

            <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 my-5'>
                {products?.map((product, index) => (
                    <div key={index} onClick={() => setSelectedProduct(product)}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </main>
            
        </div>
    );
};

export default Home;
