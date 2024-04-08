import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ProductList from './ProductList';
import Cart from './Cart';
import Footer from './Footer';
// import {Context} from '../App';

const Productpage = () => {
  const navigate = useNavigate();  
  const [cartItems, setCartItems] = useState([]);
    
  // Load cart items from localStorage on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if(isLoggedIn == 'false'){
      navigate('/login');
    }
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      console.log("Loaded cart items from localStorage:", storedCartItems);
      console.log("Loaded cart items in JSON", JSON.parse(storedCartItems));
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []); 
  

  useEffect(() => {
    console.log("Productpage component Re-rendered");
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]); 

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId) {
        if (item.quantity === 1) {
          return null; 
        } else {
          return { ...item, quantity: item.quantity - 1}; 
        }
      }
      return item;
    }).filter(item => item !== null); // Filter out null entries to remove removed items from cart

    console.log("Updated Cart Items:", updatedCartItems);
    setCartItems(updatedCartItems);

  };


  return (
    <div>
      <Header />
      <table>
        <tbody>
          <tr>
            <td><ProductList onAddToCart={addToCart} /></td>
            <td style={{ verticalAlign: 'top' }}><Cart cartItems={cartItems} onRemove={removeFromCart} /></td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default Productpage;
