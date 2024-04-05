// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from the backend API endpoint
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/products'); 
        setProducts(response.data); 
      } 
      catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to ensure the effect runs only once after component mount

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
