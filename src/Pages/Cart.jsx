import React, { useEffect, useState } from 'react'
import { useCart } from '../Context/CartContext'
import Swal from 'sweetalert2'
const Cart = () => {
const {cart,IncraeseQty,DecraeseQty,removeItem} = useCart()
const discount = 5
const [showForm,setShowForm] =useState(false)
const [orderData,setOrderData] =useState({
    name :"",
    mobile:"",
    address:""
})
const [cupanCode,setCupanCode] =useState("")

const matchCupanCode = "VED123"

const handleChange =(e)=>{
    setOrderData({
        ...orderData,[e.target.name]:e.target.value
    })
}

const handleSubmit=(e)=>{
    e.preventDefault()
    if(!orderData.name || !orderData.address || !orderData.mobile){
        Swal.fire({
            title: 'Error!',
            text: 'Please Fill all field',
            icon: 'error',
        })
        return
    }   
    const order = {
        customer :orderData,
        product:cart,
        totalAmount:total,
        orderDate:new Date().toLocaleString()
    }

    localStorage.setItem("myOrder",JSON.stringify(order))
    Swal.fire({
            icon: 'success',
            title: 'Order Confirmed',
            text: 'Your Order has beed placed successfully',
            confirmButtonColor:"#3085d6"
        })
    setShowForm(false)
    setOrderData({
        name:"",
        mobile:"",
        address:""
    })

}
const [finalTotal,setfinalTotal] =useState(0)
const handleApplyCupon =()=>{
    if(cupanCode===matchCupanCode){
         Swal.fire({
            icon: 'success',
            title: 'Discount Apply',
            text: 'Your discount has beed apply successfully',
            confirmButtonColor:"#3085d6"
        })
    const a = total-discount
    setfinalTotal(a)

    }
    console.log(cupanCode)
}
const total = cart.reduce((sum,item)=>sum+item.price*item.qty,0)
useEffect(()=>{
    setfinalTotal(total)
},[])
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

        <p><input type="text" onChange={(e)=>setCupanCode(e.target.value)} value={cupanCode} /> <button onClick={handleApplyCupon}>Apply</button></p>

        <h2>Total Price : {finalTotal}rs</h2>


        <button onClick={()=>setShowForm(true)}>Buy Now</button>
        </div>


    {showForm && (
        <div style={modalStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h2>Order Details</h2>

                <input 
                type="text" 
                name='name'
                placeholder='Full name'
                value={orderData.name}
                onChange={handleChange}
                style={inputStyle}
                />
                <input 
                type="tel" 
                name='mobile'
                placeholder='Mobile Number'
                value={orderData.mobile}
                onChange={handleChange}
                style={inputStyle}
                />
                <textarea
                name="address"
                placeholder='Delivery Address'
                value={orderData.address}
                onChange={handleChange}
                style={inputStyle}
                />

                <div style={{display:"flex", gap:"10px"}}>
                    <button type='submit'>Confirm Order</button>
                    <button type='button' onClick={()=>setShowForm(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )}
    </>
  )
}

export default Cart



const modalStyle ={
    position:"fixed",
    top:0,
    left:0,
    width:"100%",
    height:"100%",
    background:"rgba(0,0,0,0.5)",
    display:"flex",
    justifyContent:"center",
    alignItem:"center"

}
const formStyle ={
    background:"#fff",
    padding:"10px",
    width:"500px"
}

const inputStyle = {
    width:"90%",
    padding:"9px",
    marginBottom:"10px"
}