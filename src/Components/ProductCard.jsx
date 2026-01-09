import React from 'react'
import './CSS/ProductCard.css'
import { useCart } from '../Context/CartContext'
const ProductCard = ({product}) => {
  const {addToCart} =useCart();
  return (
    <>
        <div className='product-card-outer'>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.quantity}</p>
        <p>{product.price}</p>

       <div className='product-btn-outer'>
         <button onClick={()=>addToCart(product)}>Add to cart</button>
        <button>Buy Now</button>
       </div>
        </div>
    </>
  )
}

export default ProductCard