import { createContext, useState, useContext } from 'react';

const cartContext = createContext();


export const CartProvider =({children})=>{
    const [cart,setCart] =useState([]);

    //add to cart 

    const addToCart = (product) =>{
        const exist = cart.find((item)=>item._id === product._id)
        if(exist){
            setCart(
                cart.map((item)=>
                    item._id === product._id ? {...item, qty:item.qty+1}:item
                )
            )
        }else{
            setCart([...cart,{...product,qty:1}])
        }
    }

    //Incraese qty

    const IncraeseQty = (id)=>{
        setCart(cart.map((item)=>
            item._id===id ?  {...item, qty:item.qty+1}:item
        ))
    }

    // Decrease qty

       const DecraeseQty = (id)=>{
        setCart(cart.map((item)=>
            item._id===id && item.qty>1 ? {...item, qty:item.qty-1}:item
        ))
    }


    //remove 

    const removeItem =(id)=>{
        setCart(cart.filter((item)=>item._id!==id))
    }


    return(
        <cartContext.Provider value={{cart,addToCart,IncraeseQty,DecraeseQty,removeItem}}>
            {children}
        </cartContext.Provider>
    )

}

export const useCart =()=>useContext(cartContext)