import React from 'react'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import ProductCard from '../../Components/ProductCard/ProductCard'
import { getProducts } from '../../services/Axios/Requests/products'
import Alert from '../../Components/Alert/Alert'
import Button from '../../Components/Form/Button/Button'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import './ProductsList.scss'

function ProductsList() {
    const { data: products, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading, isError, error } = useInfiniteScroll('Products', getProducts, 8)
    const ProductCardSkeletonLoader = () => {
        return (
            <div className="product-card skeleton-loading">
                <div className="image-part skeleton"></div>
                <div className="product-body">
                    <span className="product-category skeleton"></span>
                    <p className="card-decription skeleton"></p>
                    <div className="product-price-part skeleton">
                        <div className="price-discount-row">
                            <span className="product-price skeleton"></span>
                            <span className="badge skeleton"></span>
                        </div>
                        <p className="price-before-discount-Value skeleton"></p>
                    </div>
                </div>
            </div>
        );
    };
    if (isLoading) {
        return (
            <div className="products-container">
                <div className="products-row">
                    {Array.from({ length: 8 }, (_, i) => {
                        return <ProductCardSkeletonLoader key={i + 1} />
                    })}
                </div>
            </div>
        )
    }

    if (isError) {
        return <Alert message={error} />
    }
    return (
        <>
            <BreadCrump />
            <div className="products-container">
                {
                    products?.length > 0 ?
                        <div className="products-row">
                            {
                                products?.map(product => {
                                    return <ProductCard  {...product} key={product.id} />
                                })
                            }
                        </div>
                        :
                        <Alert message='no products available' />
                }
                {
                    hasNextPage &&
                    <div className="load-more-button">
                        <Button title='load more' mode='success' onclick={fetchNextPage} disabled={!hasNextPage} isLoading={isFetchingNextPage} />
                    </div>
                }
            </div>
        </>
    )
}
export default ProductsList;