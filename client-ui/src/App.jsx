import React from 'react'
import "./css/index.css";
import "./css/custom.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Navbar from './components/Header';
import AddProducts from './screens/Dashboard/AddProducts';
import AllProducts from './screens/Dashboard/AllProducts';
import ViewProduct from "./screens/Dashboard/ViewProduct";
import EditProduct from "./screens/Dashboard/EditProducts";
import AllUsers from "./screens/Dashboard/AllUsers"; // ------->
import ViewUser from "./screens/Dashboard/ViewUser"; // ------->
import EditUser from "./screens/Dashboard/EditUser"; // ------->
import SingleProduct from './screens/SingleProduct';
import Footer from './components/Footer';
import Dashboard from './screens/Dashboard/Dashboard'
import ForgetPassword from './screens/Dashboard/Auth/ForgetPassword';
import ChangePassword from './screens/Dashboard/ChangePassword.jsx';
import ActivateAccount from './screens/Dashboard/Auth/ActivateAccount';
import Checkout from './components/Cheakout.jsx'
import ResetPassword from './screens/Dashboard/Auth/ResetPassword';
import AccessAccount from './screens/Dashboard/Auth/AccessAccount';
import AuthProvider from './context/auth.jsx';
import Profile from './screens/Dashboard/Profile';
import UpdateProfile from './screens/Dashboard/UpdateProfile';
import CartPage from './components/Cardtem.jsx';
import NotFoundPage from './screens/P404.jsx';
import PrivateRoute from './Route/PrivateRoute.jsx';
import OrderSummary from './components/OrderSummary.jsx';
import PaymentConfirmation from './components/PaymentConformation.jsx';
import Wish from './components/WishItems.jsx';
import Sidebar from './screens/Dashboard/Sidebar.jsx';
import UploadImage from './screens/Dashboard/UploadImage.jsx';
import Contact from './components/Contact.jsx';
// import Checkout from "./screens/Checkout.jsx";
import Search from './components/Search.jsx';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <AuthProvider>
        <Navbar />
        <main className=" pt-16 flex-grow bg-gray-200 dark:bg-gray-800 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path='/product/:id' element={<SingleProduct />} />
            <Route path='/auth/forgetpassword' element={<ForgetPassword />} />
            <Route path="/auth/verify/:token" element={<ActivateAccount />} />
            <Route path='/auth/reset-password' element={<ResetPassword />} />
            <Route path="/auth/access/:resetCode" element={<AccessAccount />} />
            {/* <Route path="/*" element={<NotFoundPage />} /> */}
            <Route path='Checkout' element={<Checkout />} />
            <Route path='CartPage' element={<CartPage />} />
            <Route path='Conformation' element={<PaymentConfirmation />} />
            <Route path='WishCard' element={<Wish />} />
            {/* <Route path="Checkout" element={<Checkout />} /> */}
            <Route path='summary' element={<OrderSummary />} />

            <Route element={<PrivateRoute />}>
              {/* dashboard items start  */}
              <Route path='/dashboard' element={<Dashboard />} >

                {/* <Route path='sidebar' element={<Sidebar />} /> */}
                <Route path='profile' element={<Profile />} />
                <Route path='updateprofile' element={<UpdateProfile />} />
                <Route path='upload-image' element={<UploadImage />} />
                <Route path='changepassword' element={<ChangePassword />} />
                <Route path='addproducts' element={<AddProducts />} />
                <Route path='allproducts' element={<AllProducts />} />
                <Route path="viewproduct/:id" element={<ViewProduct />} />
                <Route path="edit-product/:id" element={<EditProduct />} />
                <Route path='allusers' element={<AllUsers />} />
                <Route path="edituser/:id" element={<EditUser />} />
                <Route path="viewuser/:id" element={<ViewUser />} />


              </Route>
              {/* dashboard items end */}

            </Route>


          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>

  )
}
export default App