import React from 'react'
import Card from "../components/Card";
import { fetchProducts, pages } from '../redux/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button } from "flowbite-react";
import Loading from '../components/Loading';

function Products() {

  const products = useSelector((state) => state.products.items)
  const status = useSelector((state) => state.products.status)
  const hasNextPage = useSelector((state) => state.products.hasNextPage);
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  return (
    <div className='w-full flex flex-col bg-slate-200 items-center justify-center'>

      <h1 className='my-6 text-2xl'>All Products</h1>

      {status === "loading" && <div className='flex mt-56'><Loading></Loading></div>}

      {status === "succeeded" &&
        <Card products={products}></Card>
      }

      {
        hasNextPage && status !== "loading" && <div>
          <Button outline={true} onClick={(e) => {
            e.preventDefault()
            dispatch(fetchProducts(pages))
          }}>
            Load More ({pages})
          </Button>
        </div>
      }
      {
        !hasNextPage && <div className='mb-10'> <Button outline={true} disabled={true}>
          Nothing more to load...
        </Button>
        </div>
      }
    </div>
  )
}

export default Products