import React from 'react'
import ProductSlider from '../components/ProductSlider'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../redux/products/productSlice';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom'

function ProductDetail() {

    const { products_id } = useParams()

    const products = useSelector((state) => state.products.items.find((item) => item.id === Number(products_id)))
    const status = useSelector((state) => state.products.status)

    const dispatch = useDispatch()

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts())
        }
    }, [dispatch, status])

    return (
        <div className='w-full h-auto flex flex-col'>
            <div className="w-full flex justify-center">
                {status === "loading" && <Loading></Loading>}

                {status === "succeeded" &&
                    <ProductSlider products={products}></ProductSlider>
                }
            </div>

        </div>
    )
}

export default ProductDetail