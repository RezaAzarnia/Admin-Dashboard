import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import AnimatedButton from '../../Components/Form/AnimatedButton/AnimatedButton';
import BreadCrump from '../../Components/BreadCrump/BreadCrump';
import RateShow from '../../Components/RateShow/RateShow';
import useFetchSingleItem from '../../hooks/useFetchSingleItem';
import { getSingleProduct } from '../../services/Axios/Requests/products'
import Alert from '../../Components/Alert/Alert';
import './ProductDetail.scss'

export default function ProductDetail() {
    const { id } = useParams('id');
    const { data: productInfo, isError, error } = useFetchSingleItem('Products', id, getSingleProduct)

    const [activeTabpane, setActiveTabpane] = useState('Description');
    const [productComments, setProductComments] = useState([])

    useEffect(() => {
        const acceptedComments = comments ? comments.filter(comment => comment.isAccept === 1) : []
        setProductComments(acceptedComments)
    }, [productInfo])

    //destructure the product infos  
    const {
        productTitle,
        productCover,
        productDescription,
        productDiscount,
        productPrice,
        comments,
    } = productInfo || {};
    if (isError) {
        return <Alert message={error} />
    }

    return (
        <>
            <BreadCrump />
            <div className="productDetail-container">
                <div className="product-image">
                    <img src={productCover} alt="" />
                </div>
                <div className="product-description">
                    <div className="product-detial-top-part">
                        <h1 className="product-detail-title">{productTitle}</h1>
                    </div>
                    <p className="product-detail-info">{productDescription}</p>
                    <div className="price-rating-part">
                        {
                            productDiscount > 0 ?
                                <>
                                    <div className='price-row'>
                                        <div className="price-with-discount">
                                            <h2 className="product-detail-main-price">
                                                ${(productPrice - (productPrice / 100) * productDiscount).toFixed(2)}
                                            </h2>
                                            <p className="discount-price">
                                                ${productPrice}
                                            </p>
                                        </div>
                                        <div className="price-discount-value">
                                            <div className="badge bg-danger">{productDiscount}%</div>
                                        </div>
                                    </div>
                                </>
                                :
                                <h2 className="product-detail-main-price">${productPrice}</h2>
                        }
                        <div className="rating-part">
                            <RateShow rate={5} />
                        </div>

                    </div>
                    <div className="watchlistBtn">
                        <AnimatedButton title="add to watch list" Icon={FaHeart} mode="warning" />
                    </div>
                </div>
            </div>


            <div className="product-detail-tabPane">
                <ul className="tabpane-header">
                    <li
                        className={`tabpane-list-item ${activeTabpane === 'Description' && 'active'}`}
                        onClick={() => { setActiveTabpane('Description') }}
                    >
                        description
                    </li>
                    <li
                        className={`tabpane-list-item ${activeTabpane === 'Comments' && 'active'}`}
                        onClick={() => { setActiveTabpane('Comments') }}
                    >
                        comments
                    </li>
                </ul >
                <div className="tabpane-body">
                    <p className={`tabpane-content product-text ${activeTabpane === 'Description' ? 'active' : ''}`}>
                        {productDescription}
                    </p>
                    <div className={`tabpane-content ${activeTabpane === 'Comments' ? 'active' : ''}`}>
                        {
                            productComments.length > 0 ?
                                productComments.map(comment => {
                                    return <div className="comment" key={comment.id}>
                                        <div className="comment-header">
                                            <p className="username">{comment.userInfo.userName}</p>
                                            <p className="date">2023/12/25</p>
                                        </div>
                                        <RateShow rate={comment.rate} />
                                        <p className="content">{comment.commentBody}</p>
                                        {
                                            comment.anwser &&
                                            <div className="answer">
                                                <div className="comment-header">
                                                    <p className="answer-username">reza azarnia</p>
                                                    <p className="date">{comment.anwserDate}</p>
                                                </div>
                                                <p className="answer-content">{comment.anwser}</p>
                                            </div>
                                        }
                                    </div>
                                }) : <div className='answer'>there is no comment yet!</div>
                        }
                    </div>
                </div >
            </div >
        </>
    );
}
