import React from 'react'
import { IoMdStar } from "react-icons/io";
import { Link } from 'react-router-dom';
import './ProductCard.scss'

export default function ProductCard({ id, productTitle, productPrice, productDiscount, category, productDescription, productCover }) {
    const fixedProoductPrice = Number(productPrice).toFixed(2)
    return (
        <div className="product-card">
            <Link to={`/Products/${id}`} className='product-card-link'>
                <div className="image-part">
                    <img src={productCover} alt="" />
                </div>
                <div className="product-body">
                    <span className='product-category'>{category.categoryName}</span>
                    <h3 className='card-title'>{productTitle}</h3>
                    <p className='card-decription'>{productDescription}</p>
                    <div className="rating-star">
                        <IoMdStar />
                        <span>5</span>
                    </div>
                    <div className="product-price-part">
                        {
                            productDiscount > 0 ? (
                                <>
                                    <div className="price-discount-row">
                                        <span className='product-price'>
                                            ${(productPrice - (productPrice / 100) * productDiscount).toFixed(2)}
                                        </span>
                                        <span className='badge bg-error'>{productDiscount}%</span>
                                    </div>
                                    <p className='price-before-discount-Value'>
                                        ${fixedProoductPrice}
                                    </p>
                                </>
                            ) : (
                                <span className='product-price' >
                                    ${fixedProoductPrice}
                                </span>
                            )
                        }
                    </div>
                </div>
            </Link >
        </div >

    )
}
