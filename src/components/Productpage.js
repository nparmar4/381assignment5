import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import ProductList from './ProductList';
import Cart from './Cart';
import Footer from './Footer';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Productpage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleLogin = () => {
    setLoggedIn(true); // Set loggedIn state to true upon successful login
  };

  const switchForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div>
      <Header />
      {/* Check if user is logged in, if not, show login form */}
      {!loggedIn ? (
        <div>
          {showLoginForm ? (
            <LoginForm switchToSignup={switchForm} onLogin={handleLogin} />
          ) : (
            <SignupForm switchToLogin={switchForm} />
          )}
        </div>
      ) : (
        // If user is logged in, show product list and cart
        <table>
          <tbody>
            <tr>
              <td><ProductList products={products} /></td>
              <td><Cart cartItems={cartItems} /></td>
            </tr>
          </tbody>
        </table>
      )}
      <Footer />
    </div>
  );
};

export default Productpage;
