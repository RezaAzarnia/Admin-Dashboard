import React, { useEffect, useState } from 'react'
import BreadCrump from '../../Components/BreadCrump/BreadCrump'
import ProductCard from '../../Components/ProductCard/ProductCard'
import { getProducts } from '../../services/Axios/Requests/products'
import Alert from '../../Components/Alert/Alert'
import './ProductsList.scss'

export default function ProductsList() {
    const [products, setProducts] = useState([])
    const getProduct = async () => {
        const response = await getProducts()
        setProducts(response)
    }
    useEffect(() => {
        getProduct()
    }, [])
    return (
        <>
            <BreadCrump />
            <div className="products-container">
                {products.length > 0 ?
                    <div className="products-row">
                        {
                            products?.map(product => {
                                return <ProductCard {...product} key={product.id} />
                            })
                        }
                    </div>
                    :
                    <Alert message='no products available' />}
            </div>
        </>
    )
}
