import React, { useEffect, useState } from 'react'
import { getSingleProduct } from '../../services/Axios/Requests/products';
import { useParams } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import AnimatedButton from '../../Components/Form/AnimatedButton/AnimatedButton';
import BreadCrump from '../../Components/BreadCrump/BreadCrump';
import RateShow from '../../Components/RateShow/RateShow';
import './ProductDetail.scss'

export default function ProductDetail() {
    const { id } = useParams('id');
    const [productInfo, setProductInfo] = useState({});
    const [activeTabpane, setActiveTabpane] = useState('Description');
    const [productComments, setProductComments] = useState([])
    const getProductInfos = async () => {
        const response = await getSingleProduct(id);
        console.log(response)
        setProductInfo(response)
    };
    useEffect(() => {
        getProductInfos();
    }, [id]);

    useEffect(() => {
        const acceptedComments = productInfo.comments ? productInfo.comments.filter(comment => comment.isAccept === 1) : []
        setProductComments(acceptedComments)
    }, [productInfo])


    return (
        <>
            <BreadCrump />
            <div className="productDetail-container">
                <div className="product-image">
                    <img src={productInfo.productCover} alt="" />
                </div>
                <div className="product-description">
                    <div className="product-detial-top-part">
                        <h1 className="product-detail-title">{productInfo.productTitle}</h1>
                    </div>
                    <p className="product-detail-info">{productInfo.productDescription}</p>
                    <div className="price-rating-part">
                        {
                            productInfo.productDiscount > 0 ?
                                <>
                                    <div className='price-row'>
                                        <div className="price-with-discount">
                                            <h2 className="product-detail-main-price">
                                                ${(productInfo.productPrice - (productInfo.productPrice / 100) * productInfo.productDiscount)}
                                            </h2>
                                            <p className="discount-price">
                                                {productInfo.productPrice}
                                            </p>
                                        </div>
                                        <div className="price-discount-value">
                                            <div className="badge">{productInfo.productDiscount}%</div>
                                        </div>
                                    </div>
                                </>
                                :
                                <h2 className="product-detail-main-price">${productInfo.productPrice}</h2>
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
                        className={`tabpane-list-item ${activeTabpane === 'Description' ? 'active' : ''}`}
                        onClick={() => { setActiveTabpane('Description') }}
                    >
                        description
                    </li>
                    <li
                        className={`tabpane-list-item ${activeTabpane === 'Comments' ? 'active' : ''}`}
                        onClick={() => { setActiveTabpane('Comments') }}
                    >
                        comments
                    </li>
                </ul >
                <div className="tabpane-body">
                    <p className={`tabpane-content product-text ${activeTabpane === 'Description' ? 'active' : ''}`}>
                        {productInfo.productDescription}
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
                                                    <p className="answer-username ">reza azarnia</p>
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
