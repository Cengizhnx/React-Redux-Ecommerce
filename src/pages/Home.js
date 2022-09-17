import React from 'react'
import Slider from '../components/Slider';
import Card from "../components/Card";
import { fetchProducts } from '../redux/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loading from '../components/Loading';

function Home() {

  const products = useSelector((state) => state.products.items)
  const status = useSelector((state) => state.products.status)

  const dispatch = useDispatch()

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])


  return (
    <div className='w-full flex flex-col bg-slate-200 items-center justify-center'>
      <Slider></Slider>

      {status === "loading" && <Loading></Loading>}

      {status === "succeeded" &&
        <Card products={products}></Card>
      }
    </div>
  )
}

export default Home