import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import './CSS/Home.css'
import ProductCard from '../Components/ProductCard'
import ProductSkeleton from '../Components/ProductSkeleton'
const Home = () => {
  const [products,setProducts] = useState([])
  const [isSearchOpen,SetIsSearchOpen] =useState(false)
  const [search,setSearch] = useState('')

  const [loading,setLoading] =useState(true)

  useEffect(()=>{
    fetch('/Products/products.json')
    .then((res)=>res.json()) 
    .then((data)=>{
     setTimeout(()=>{
      setProducts(data)
      setLoading(false)
     },1500)
  })
    
  },[])

  const filteredProduct = products.filter(item=>item.title.toLowerCase().includes(search.toLocaleLowerCase()))
  
  return (
   <>
   
   <Header
   search={search}
   setSearch={setSearch}
   isSearchOpen = {isSearchOpen}
   SetIsSearchOpen={SetIsSearchOpen}
   />

{!isSearchOpen  && (
<>
   <section id='banner'>
      <img src="public/Images/banner1.jpg" alt="" />
   </section>
  <br />

  <h1 style={{marginLeft:"20px"}}>Dairy, Bread & Eggs</h1> <br />
   <section id='products'>
    {loading ? Array(6).fill().map((__,i)=><ProductSkeleton key={i}/>)
    :products.map((item)=>(
      <ProductCard key={item._id} product={item}/>
    ))}
   </section>
</>
)}




   {/*  search mode*/}

   {isSearchOpen && search !== "" &&(
    <>
      <div className='search-page'>
        {filteredProduct.length===0 ?(
          <h3>No Items Found</h3>
        ):(
          filteredProduct.map(item =>(<ProductCard key={item._id} product={item}/>))
        )}
      </div>
    </>
   )}
   
   </>
  )
}

export default Home