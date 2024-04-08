// ProductList.js
import React, { useState, useEffect } from 'react';
import Product from './Product';

const ProductList = ({ onAddToCart }) => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const response = await fetch('http://127.0.0.1:5000/products');
        if(!response.ok){
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProductsData(data);
        console.log(data);
        setLoading(false);
      } catch (error){
        console.error('Error fetching products: ', error.message);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="product-list">
      {productsData.map(product => (
        <Product key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );

};

export default ProductList;