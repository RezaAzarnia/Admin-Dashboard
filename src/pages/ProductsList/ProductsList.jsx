import React from 'react'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import ProductCard from '../../Components/ProductCard/ProductCard'
import { getPaginatedProducts } from '../../services/Axios/Requests/products'
import Alert from '../../Components/Alert/Alert'
import Button from '../../Components/Form/Button/Button'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import './ProductsList.scss'

export default function ProductsList() {
    const { data: products, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteScroll('Products', getPaginatedProducts , 4)
    return (
        <>
            <BreadCrump />
            <div className="products-container">
                {products?.pages?.length > 0 ?
                    <div className="products-row">
                        {
                            products?.pages?.map(product => {
                                return product.map(item => {
                                    return <ProductCard {...item} key={item.id} />
                                })
                            })
                        }
                    </div>
                    :
                    <Alert message='no products available' />}

                <Button title='next page' mode='success' onclick={fetchNextPage} disabled={!hasNextPage} isLoading={isFetchingNextPage} />
            </div>
        </>
    )
}
