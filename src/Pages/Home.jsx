import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import './CSS/Home.css'
import ProductCard from '../Components/ProductCard'
const Home = () => {
  const [products,setProducts] = useState([])

  useEffect(()=>{
    fetch('/Products/products.json')
    .then((res)=>res.json())
    .then((data)=>setProducts(data))
  },[])
  return (
   <>
   <Header/>
   <section id='banner'>
      <img src="public/Images/banner1.jpg" alt="" />
   </section>
 <br />
  <h1 style={{marginLeft:"20px"}}>Dairy, Bread & Eggs</h1> <br />
   <section id='products'>
    {products.map((item)=>(
      <ProductCard key={item._id} product={item}/>
    ))}
   </section>
   
   </>
  )
}

export default Home