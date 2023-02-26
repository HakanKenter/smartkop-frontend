import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import CookieConsent from "react-cookie-consent";

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'


// import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'
import Landing from './components/layout/Landing'


// CART IMPORTS
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'


// ORDERS IMPORTS
import ListOrders from './components/order/ListOrders'
import OrderDetails from './components/order/OrderDetails'


// USER IMPORTS
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UdpateProfile from './components/user/UdpateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'


// ADMIN IMPORTS
import Dashboard from './components/admin/Dashboard'
import ProductsList from './components/admin/ProductsList'
import NewProduct from './components/admin/NewProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import OrdersList from './components/admin/OrdersList'
import ProcessOrder from './components/admin/ProcessOrder'
import UsersList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'


import ProtectedRoutes from './components/route/ProtectedRoutes'
import { loadUser } from './actions/userActions'
import { useSelector } from 'react-redux'
import store from './store'

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import ProductReviews from './components/admin/ProductReviews'
import SearchPage from './components/layout/SearchPage'
import PricacyPolicy from './rgpd/PricacyPolicy';
import LegalNotice from './rgpd/LegalNotice';
import CGV from './rgpd/CGV';


function App() {

    // const [stripeApiKey, setStripeApiKey] = useState('');
    const [stripeApiKey, setStripeApiKey] = useState('pk_test_51MO0T2EVM622Dx6boiDLuuEcsB9W851y53fLZQmm7RW3pda36hQRHHXgKFeHa724KcLnLqkVJRxvhA7xyAUda9Hd00hkCRgFyo');
    
    const { user, isAuthenticated, loading } = useSelector(state => state.auth)

    useEffect(() => {
      store.dispatch(loadUser())

      // TODO: It is better to load stripe api key, than to set it manually

      // async function getStripApiKey() {
      //   const { data } = await axios.get('/api/v1/stripeapi');

      //   setStripeApiKey(data.stripeApiKey)
      // }

      // getStripApiKey(); 

    }, [])


    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container container-fluid">
            <Routes>

              {/* _______________  REGULAR ROUTES _______________  */}

              <Route path="/" element={<Landing />} exact />
              <Route path="/product/:id" element={<ProductDetails />} exact />
              <Route path="/products-search" element={<SearchPage />} />
              {/* <Route path="/search/:keyword" element={<Home />} /> */}

              <Route path="/cart" element={<Cart />} exact />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/password/forgot" element={<ForgotPassword />} exact />
              <Route path="/password/reset/:token" element={<NewPassword />} exact />
              <Route path="/privacy-policy" element={<PricacyPolicy />} exact />
              <Route path="/cgv" element={<CGV />} exact />
              <Route path="/legal-notice" element={<LegalNotice />} exact />


              {/* _______________  PROTECTED ROUTES _______________  */}


              {/* USER ROUTES */}
              <Route 
                path="/me" 
                element={
                  <ProtectedRoutes>
                    <Profile />
                  </ProtectedRoutes>
                }
                exact
              ></Route>
              <Route 
                path="/me/update" 
                element={
                  <ProtectedRoutes>
                    <UdpateProfile />
                  </ProtectedRoutes>
                }
                exact
              ></Route>
              <Route 
                path="/password/update" 
                element={
                  <ProtectedRoutes>
                    <UpdatePassword />
                  </ProtectedRoutes>
                }
                exact
              ></Route>
              <Route 
                path="/shipping" 
                element={
                  <ProtectedRoutes>
                    <Shipping />
                  </ProtectedRoutes>
                }
              ></Route>
              <Route 
                path="/confirm" 
                element={
                  <ProtectedRoutes>
                    <ConfirmOrder />
                  </ProtectedRoutes>
                }
                exact
              ></Route>
              <Route 
                path="/success" 
                element={
                  <ProtectedRoutes>
                    <OrderSuccess />
                  </ProtectedRoutes>
                }
              ></Route>
              <Route 
                path="/orders/me" 
                element={
                  <ProtectedRoutes>
                    <ListOrders />
                  </ProtectedRoutes>
                }
                exact
              ></Route>
              <Route 
                path="/order/:id" 
                element={
                  <ProtectedRoutes>
                    <OrderDetails />
                  </ProtectedRoutes>
                }
                exact
              ></Route>

              {stripeApiKey && 
                  <Route 
                    path="/payment" 
                    element={
                    
                        <ProtectedRoutes>
                          <Elements stripe={loadStripe(stripeApiKey)}>
                            <Payment />
                          </Elements> 
                        </ProtectedRoutes> 
                    }
                  ></Route>
              }

            </Routes>
          </div>
          
          {/* ADMIN ROUTES */} 
          <Routes>
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoutes isAdmin={true}>
                  <Dashboard />
                </ProtectedRoutes>
              }
              exact
            ></Route>
            <Route 
              path="/admin/products" 
              element={
                <ProtectedRoutes isAdmin={true}>
                  <ProductsList />
                </ProtectedRoutes>
              }
              exact
            ></Route>
            <Route 
              path="/admin/product" 
              element={
                <ProtectedRoutes isAdmin={true}>
                  <NewProduct />
                </ProtectedRoutes>
              }
              exact
            ></Route>
            <Route 
              path="/admin/product/:id" 
              element={
                <ProtectedRoutes isAdmin={true}>
                  <UpdateProduct />
                </ProtectedRoutes>
              }
              exact
            ></Route>
            <Route 
              path="/admin/orders" 
              element={
                <ProtectedRoutes isAdmin={true}>
                  <OrdersList />
                </ProtectedRoutes>
              }
              exact
            ></Route>
            <Route 
              path="/admin/order/:id" 
              element={
                <ProtectedRoutes isAdmin={true}>
                  <ProcessOrder />
                </ProtectedRoutes>
              }
              exact
            ></Route>
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoutes isAdmin={true}>
                  <UsersList /> 
                </ProtectedRoutes>
              }
              exact
            ></Route>
            <Route 
              path="/admin/user/:id" 
              element={
                <ProtectedRoutes isAdmin={true}>
                  <UpdateUser />
                </ProtectedRoutes>
              }
              exact
            ></Route>
            <Route 
              path="/admin/reviews" 
              element={
                <ProtectedRoutes isAdmin={true}>
                  <ProductReviews />
                </ProtectedRoutes>
              }
              exact
            ></Route>
          </Routes>

          {/* {!loading && (!isAuthenticated || user.role !== 'admin') && (
          )} */}
          <Footer />
          <CookieConsent 
            location="bottom"
            cookieName="myAwesomeCookieName3" 
            expires={999} 
            buttonStyle={{height: "40px", backgroundColor: "white", color: "#232f3e"}}
            containerClasses="alert bg-dark col-lg-12"
            buttonText="Accepter"
            enableDeclineButton
            declineButtonText="Refuser"
            declineButtonStyle={{height: "40px", backgroundColor: "#fa9c23", color: "white"}}
            overlay
          >
            Nous utilisons des cookies pour améliorer votre expérience sur notre site. <br />
            En continuant à naviguer sur notre site, vous acceptez notre utilisation des cookies. <br />
            Voir notre <a href='/privacy-policy'>Politique de confidentialité</a> pour en savoir plus sur notre politique des cookies et le traitement des données.
          </CookieConsent>

        </div>
      </Router>
    );
}

export default App;
