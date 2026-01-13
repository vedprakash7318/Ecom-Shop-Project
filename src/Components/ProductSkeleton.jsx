import React from 'react'
import './CSS/ProductSkeleton.css'

const ProductSkeleton = () => {
  return (
    <>
        <div className="skeleton-card">
            <div className="skeleton-img"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line small"></div>
            <div className="skeleton-btn-outer">
            <div className="skeleton-btn"></div>
            <div className="skeleton-btn"></div>
            </div>
        </div>
    </>
  )
}

export default ProductSkeleton