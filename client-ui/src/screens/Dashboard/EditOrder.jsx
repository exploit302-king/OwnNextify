import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apis from "../../config/apis";
import { useAuth } from "../../context/auth";

const EditOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [auth] = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [order, setOrder] = useState(null);
    const [customer, setCustomer] = useState({});
    const [products, setProducts] = useState([]);
    const [shippingAddress, setShippingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");
    const [notes, setNotes] = useState("");
    const [shippingCharges, setShippingCharges] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showProductModal, setShowProductModal] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);


    const fetchOrder = async () => {
        try {
            const { data } = await axios.get(
                `${apis[2]}/order/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                }
            );
            if (data.ok) {
                const o = data.order;
                setOrder(o);
                setCustomer(o.customer);
                setProducts(o.products);
                setShippingAddress(o.shippingAddress);
                setPaymentMethod(o.paymentMethod);
                setPaymentStatus(o.paymentStatus);
                setOrderStatus(o.orderStatus);
                setTrackingNumber(o.trackingNumber);
                setNotes(o.notes);
                setShippingCharges(o.shippingCharges);
                setTaxAmount(o.taxAmount);
                setDiscountAmount(o.discountAmount);
                setTotalAmount(o.totalAmount);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Failed to fetch order");
        }
        finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {

        try {

            const { data } = await axios.get(`${apis[1]}`);

            if (data.ok) {

                setAllProducts(data.products);

                setFilteredProducts(data.products);

            }

        }

        catch (error) {

            console.log(error);

        }

    };

    const addProductToOrder = (product) => {
        const exist = products.find(
            (item) => item.product._id === product._id
        );
        if (exist) {
            toast.warning("Product already exists");
            return;
        }
        setProducts([
            ...products,
            {
                product,
                quantity: 1,
                price: product.price,
                stock: product.stock,
            }
        ]);
        toast.success("Product Added");
        setShowProductModal(false);
    };

    const increaseQty = (index) => {

        const updated = [...products];

        const stock =
            updated[index].stock ??
            updated[index].product.stock;

        if (updated[index].quantity >= stock) {

            toast.warning(`Only ${stock} item(s) available`);

            return;

        }

        updated[index].quantity += 1;

        setProducts(updated);

    };

    const decreaseQty = (index) => {

        const updated = [...products];

        if (updated[index].quantity === 1) {

            const confirmDelete = window.confirm(
                "Remove this product from the order?"
            );

            if (confirmDelete) {

                removeProduct(index);

            }

            return;

        }

        updated[index].quantity -= 1;

        setProducts(updated);

    };

    const removeProduct = (index) => {

        const updated = [...products];

        updated.splice(index, 1);

        setProducts(updated);

    };

    const canEditProducts =
        orderStatus === "Pending" ||
        orderStatus === "Confirmed";

    const canEditShipping =
        orderStatus === "Pending";

    const canEditStatus =
        ![
            "Delivered",
            "Cancelled",
        ].includes(orderStatus);

    const readOnly =
        [
            "Delivered",
            "Cancelled",
        ].includes(orderStatus);

    useEffect(() => {
        if (auth?.token) {
            fetchOrder();
        }
    }, [auth]);

    useEffect(() => {

        fetchProducts();

    }, []);

    useEffect(() => {

        const result = allProducts.filter((product) =>

            product.title
                .toLowerCase()
                .includes(searchProduct.toLowerCase())

        );

        setFilteredProducts(result);

    }, [searchProduct, allProducts]);

    useEffect(() => {
        let subtotal = 0;
        products.forEach((item) => {
            subtotal += item.price * item.quantity;
        });
        setTotalAmount(subtotal);
    }, [products]);

    const handleUpdateOrder = async () => {
        if (
            orderStatus === "Delivered" &&
            paymentStatus !== "Paid"
        ) {
            toast.warning("Delivered order should be Paid.");
        }

        if (
            orderStatus === "Shipped" &&
            trackingNumber.trim() === ""
        ) {
            toast.error("Tracking Number is required");
            return;
        }
        try {
            setSaving(true);

            const { data } = await axios.put(
                `${apis[2]}/update-order/${id}`,
                {
                    products,
                    shippingAddress,
                    paymentMethod,
                    paymentStatus,
                    orderStatus,
                    trackingNumber,
                    notes,
                    shippingCharges,
                    taxAmount,
                    discountAmount,
                    totalAmount,

                    // 👇 Add this
                    deliveredAt:
                        orderStatus === "Delivered"
                            ? new Date()
                            : order?.deliveredAt,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                }
            );

            if (data.ok) {
                toast.success("Order Updated Successfully");
                navigate("/dashboard/order");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to update order");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {

        return (

            <div className="p-8">

                <h1 className="text-xl dark:text-white">

                    Loading Order...

                </h1>

            </div>

        );

    }

    return (

        <div className="p-6">


            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-3xl font-bold dark:text-white">

                        Edit Order

                    </h1>

                    <p className="text-gray-500">

                        #{order?._id.slice(-6).toUpperCase()}

                    </p>

                </div>

                <Link

                    to="/dashboard/order"

                    className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg"

                >

                    Back

                </Link>

            </div>

            {/* Customer and Shipping */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    {/* customer */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                        <h2 className="text-xl font-bold mb-5 dark:text-white">
                            Customer Information
                        </h2>
                        <p className="dark:text-white">
                            <b>Name :</b>
                            {customer?.name}
                        </p>
                        <p className="dark:text-white">
                            <b>Email :</b>
                            {customer?.email}
                        </p>
                        <p className="dark:text-white">
                            <b>Phone :</b>
                            {customer?.phone}
                        </p>
                    </div>
                    {/* Shipping */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                        <h2 className="text-xl font-bold mb-5 dark:text-white">
                            Shipping
                        </h2>
                        <textarea
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            disabled={!canEditShipping}
                            rows={4}
                            className="w-full border rounded-lg p-3 dark:bg-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                        <h2 className="text-xl font-bold mb-5 dark:text-white">
                            Order Summary
                        </h2>
                        <p className="dark:text-white">
                            Subtotal :
                            Rs. {totalAmount.toLocaleString()}
                        </p>
                        <p className="dark:text-white">
                            Shipping :
                            Rs. {shippingCharges}
                        </p>
                        <p className="dark:text-white">
                            Tax :
                            Rs. {taxAmount}
                        </p>
                        <p className="dark:text-white">
                            Discount :
                            Rs. {discountAmount}
                        </p>
                        <hr className="my-3" />
                        <h2 className="text-2xl font-bold text-green-600">
                            Total :
                            Rs.
                            {(
                                totalAmount +
                                shippingCharges +
                                taxAmount -
                                discountAmount
                            ).toLocaleString()}
                        </h2>
                    </div>
                </div>

                {/* Order Management */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-8">

                        <h2 className="text-xl font-bold mb-6 dark:text-white">
                            Order Management
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            {/* Payment Method */}

                            <div>

                                <label className="block mb-2 font-semibold dark:text-white">
                                    Payment Method
                                </label>

                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    disabled={readOnly}
                                    className="w-full border rounded-lg p-3 dark:bg-gray-900 dark:text-white"
                                >
                                    <option>Cash on Delivery</option>
                                    <option>Credit Card</option>
                                    <option>Website Wallet</option>
                                    <option>Bank Transfer</option>
                                </select>

                            </div>

                            {/* Payment Status */}

                            <div>

                                <label className="block mb-2 font-semibold dark:text-white">
                                    Payment Status
                                </label>

                                <select
                                    value={paymentStatus}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                    disabled={readOnly}
                                    className="w-full border rounded-lg p-3 dark:bg-gray-900 dark:text-white"
                                >
                                    <option>Pending</option>
                                    <option>Paid</option>
                                    <option>Failed</option>
                                    <option>Refunded</option>
                                </select>

                            </div>

                            {/* Order Status */}

                            <div>

                                <label className="block mb-2 font-semibold dark:text-white">
                                    Order Status
                                </label>

                                <select
                                    value={orderStatus}
                                    onChange={(e) => setOrderStatus(e.target.value)}
                                    disabled={!canEditStatus}
                                    className="w-full border rounded-lg p-3 dark:bg-gray-900 dark:text-white"
                                >
                                    <option>Pending</option>
                                    <option>Confirmed</option>
                                    <option>Processing</option>
                                    <option>Packed</option>
                                    <option>Shipped</option>
                                    <option>Out for Delivery</option>
                                    <option>Delivered</option>
                                    <option>Cancelled</option>
                                    <option>Returned</option>
                                    <option>Refunded</option>
                                </select>

                            </div>

                            {/* Tracking */}

                            <div>

                                <label className="block mb-2 font-semibold dark:text-white">
                                    Tracking Number
                                </label>

                                <input
                                    type="text"
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                    disabled={readOnly}
                                    placeholder="Enter Tracking Number"
                                    className="w-full border rounded-lg p-3 dark:bg-gray-900 dark:text-white"
                                />

                            </div>

                        </div>

                        {/* Notes */}

                        <div className="mt-6">

                            <label className="block mb-2 font-semibold dark:text-white">
                                Seller Notes
                            </label>

                            <textarea
                                rows={5}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                disabled={readOnly}
                                className="w-full border rounded-lg p-3 dark:bg-gray-900 dark:text-white"
                                placeholder="Internal notes..."
                            />

                        </div>

                    </div>
                </div>

                <div className="space-y-6">
                    {/* Product...etc */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow mt-8">

                        <div className="p-6">

                            <div className="flex justify-between items-center mb-6">

                                <h2 className="text-2xl font-bold dark:text-white">

                                    Products

                                </h2>

                                {canEditProducts && (

                                    <button

                                        onClick={() => setShowProductModal(true)}

                                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"

                                    >

                                        + Add Product

                                    </button>

                                )}

                            </div>

                            <div className="space-y-5">

                                {products.map((item, index) => (

                                    <div
                                        key={item.product?._id}
                                        className="flex justify-between items-center border-b pb-5"
                                    >

                                        <div className="flex items-center gap-5">

                                            <img
                                                src={item.product?.image?.[0]}
                                                alt=""
                                                className="w-24 h-24 rounded-lg object-cover border"
                                            />

                                            <div>

                                                <h2 className="font-bold text-lg dark:text-white">

                                                    {item.product?.title}

                                                </h2>

                                                <p className="text-gray-500">

                                                    Brand :
                                                    {" "}
                                                    {item.product?.brand}

                                                </p>

                                                <p className="text-green-600 font-semibold">

                                                    Rs. {item.price}

                                                </p>

                                            </div>

                                        </div>

                                        <div className="flex flex-col items-end">

                                            {
                                                canEditProducts ?

                                                    (

                                                        <div className="flex items-center gap-2">

                                                            <button
                                                                onClick={() => decreaseQty(index)}
                                                                className="bg-red-500 text-white w-9 h-9 rounded-full"
                                                            >
                                                                -
                                                            </button>

                                                            <span className="text-lg font-bold dark:text-white w-8 text-center">

                                                                {item.quantity}

                                                            </span>

                                                            <button
                                                                onClick={() => increaseQty(index)}
                                                                className="bg-green-600 text-white w-9 h-9 rounded-full"
                                                            >
                                                                +
                                                            </button>

                                                        </div>

                                                    )

                                                    :

                                                    (

                                                        <p className="dark:text-white">

                                                            Qty :
                                                            {" "}
                                                            {item.quantity}

                                                        </p>

                                                    )

                                            }

                                            <h2 className="mt-3 text-xl font-bold text-green-600">

                                                Rs.
                                                {" "}
                                                {(item.price * item.quantity).toLocaleString()}

                                            </h2>

                                            {

                                                canEditProducts && (

                                                    <button

                                                        onClick={() => removeProduct(index)}

                                                        className="mt-3 text-red-600 hover:text-red-700 font-semibold"

                                                    >

                                                        Remove

                                                    </button>

                                                )

                                            }

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>
                    {
                        showProductModal && (

                            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

                                <div className="bg-white dark:bg-gray-900 rounded-xl w-11/12 lg:w-3/4 max-h-[85vh] overflow-hidden">

                                    <div className="p-5 border-b flex justify-between">

                                        <h2 className="text-2xl font-bold dark:text-white">

                                            Add Product

                                        </h2>

                                        <button

                                            onClick={() => setShowProductModal(false)}

                                            className="text-red-500 text-xl"

                                        >

                                            ✕

                                        </button>

                                    </div>

                                    <div className="p-5">

                                        <input

                                            type="text"

                                            placeholder="Search Product..."

                                            value={searchProduct}

                                            onChange={(e) => setSearchProduct(e.target.value)}

                                            className="w-full border rounded-lg p-3 mb-5 dark:bg-gray-800 dark:text-white"

                                        />

                                        <div className="grid lg:grid-cols-2 gap-5 max-h-[500px] overflow-y-auto">

                                            {

                                                filteredProducts.map((product) => (

                                                    <div

                                                        key={product._id}

                                                        className="border rounded-xl p-4 flex gap-4"

                                                    >

                                                        <img

                                                            src={product.image?.[0]}

                                                            className="w-24 h-24 rounded-lg object-cover"

                                                        />

                                                        <div className="flex-1">

                                                            <h2 className="font-bold dark:text-white">

                                                                {product.title}

                                                            </h2>

                                                            <p className="text-gray-500">

                                                                {product.brand}

                                                            </p>

                                                            <p className="text-green-600 font-bold">

                                                                Rs. {product.price}

                                                            </p>

                                                            <p className="text-gray-500">

                                                                Stock: {product.stock}

                                                            </p>

                                                            <button

                                                                disabled={product.stock === 0}

                                                                onClick={() => addProductToOrder(product)}

                                                                className={`mt-3 px-5 py-2 rounded-lg text-white
    
    ${product.stock === 0

                                                                        ?

                                                                        "bg-gray-400 cursor-not-allowed"

                                                                        :

                                                                        "bg-green-600 hover:bg-green-700"

                                                                    }
    
    `}

                                                            >

                                                                {

                                                                    product.stock === 0

                                                                        ?

                                                                        "Out Of Stock"

                                                                        :

                                                                        "Add"

                                                                }

                                                            </button>

                                                        </div>

                                                    </div>

                                                ))

                                            }

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )
                    }

                </div>


            </div>



            <div className="flex justify-end gap-3 mt-8">

                <Link
                    to="/dashboard/order"
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
                >
                    Cancel
                </Link>

                <button
                    onClick={handleUpdateOrder}
                    disabled={
                        saving ||
                        readOnly ||
                        products.length === 0
                    }
                    className={`px-6 py-3 rounded-lg text-white ${readOnly
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>

            </div>

        </div>
    )
};

export default EditOrder;