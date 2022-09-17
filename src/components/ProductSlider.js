import React from 'react'
import { Carousel } from "flowbite-react";
import ProductCard from './ProductCard';

function ProductSlider({ products }) {
    console.log(products);

    return (
        <div className="grid h-56 grid-cols-2 gap-4 sm:h-64 xl:h-80 2xl:h-96 items-center">
            <Carousel indicators={false}>
                {<img
                    src={products.images[0]}
                    alt="..."
                />}
                {<img
                    src={products.images[1]}
                    alt="..."
                />}
                {<img
                    src={products.images[2]}
                    alt="..."
                />}

            </Carousel>
            <ProductCard products={products}></ProductCard>

        </div>

    )
}

export default ProductSlider