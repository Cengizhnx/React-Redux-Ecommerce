import React from 'react'
import { Carousel } from "flowbite-react";
import ProductCard from './ProductCard';

function ProductSlider({ products }) {

    return (
        <div className="grid h-full lg:grid-cols-2 lg:grid-rows-none gap-4 shadow-2xl rounded-lg bg-white mt-10 px-10 sm:h-full sm:grid-rows-2 items-center">
            <Carousel indicators={false}>
                {<img
                    className='sm:h-72 md:h-72'
                    src={products?.images[0]}
                    alt="..."
                />}
                {<img
                    className='sm:h-72 md:h-72'

                    src={products?.images[1]}
                    alt="..."
                />}
                {<img
                    className='sm:h-72 md:h-72'

                    src={products?.images[2]}
                    alt="..."
                />}

            </Carousel>
            <ProductCard products={products}></ProductCard>

        </div>

    )
}

export default ProductSlider