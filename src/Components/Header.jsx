import React, { useState } from 'react'
import './CSS/Header.css'
import { useCart } from '../Context/CartContext'
import { useNavigate } from 'react-router-dom'
const Header = ({ search, setSearch, isSearchOpen, SetIsSearchOpen }) => {
    const { cart } = useCart();
    const navigate = useNavigate();

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)

    const [isFocused ,setIsFocused] = useState(false)
    const placeHolders = [
        "Search Vegitable",
        "Search Bread",
        "Search Fruits"
    ]
    const [placeholderIndex, setPlaceholderIndex] = useState(0)
    useState(() => {
        if (search) return;
        const interval = setInterval(() => {
            setPlaceholderIndex((p) => (p + 1) % placeHolders.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [search])



    return (
        <>
            <div className="header-outer">
                <div className="header-logo"><span className='ecom'>E</span><span className='shop'>Shop</span></div>
                <div className="header-location">
                    <h4>Delivery in 6 minutes</h4>
                    <span>B-36 2nd floor Aliganj Lucknow</span>
                </div>
                <div className="header-search">
                    <div className="search-outer">
                        <div className="search-icon"><i class="bi bi-search"></i></div>
                       {!isFocused && (
                         <span key={placeholderIndex} className='search-placeholder'>
                            {placeHolders[placeholderIndex]}
                        </span>
                       )}
                        <input
                            type="search"
                            onFocus={() => {SetIsSearchOpen(true); setIsFocused(true) }}
                            onBlur={()=>setIsFocused(false)}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="header-btn">
                    {!isSearchOpen && (
                        <button>Login</button>
                    )}
                    <button onClick={() => navigate("/cart")}> <i class="bi bi-cart4"></i> My Cart {totalItems}</button>
                </div>
            </div>

        </>
    )
}

export default Header