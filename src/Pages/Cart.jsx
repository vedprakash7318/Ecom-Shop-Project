import React from 'react'
import { useCart } from '../Context/CartContext'

const Cart = () => {
const {cart,IncraeseQty,DecraeseQty,removeItem} = useCart()

const total = cart.reduce((sum,item)=>sum+item.price*item.qty,0)

  return (
    <>
        <div style={{padding:"20px"}}>
        <h1>My Cart</h1>

        {cart.length===0 && <h1>Your cart is empty</h1>}

        {cart.map((item)=>(
            <div key={item._id}>
                <img src={item.image}/>
                <div>
                    <h4>{item.title}</h4>
                    <p>{item.price}</p>

                    <button onClick={()=>DecraeseQty(item._id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={()=>IncraeseQty(item._id)}>+</button>

                    <br />

                    <button onClick={()=>removeItem(item._id)}>Remove</button>
                </div>


            </div>
        ))}


        <h2>Total Price : {total}rs</h2>

        </div>
    
    </>
  )
}

export default Cart