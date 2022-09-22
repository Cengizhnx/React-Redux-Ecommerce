import React from 'react'
import { Carousel } from "flowbite-react";
import { Link } from 'react-router-dom';

function Slider({ products }) {

    return (
        <div className='w-3/4 items-center mt-8 mb-10'>

            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                    {
                        products.map((item) => (
                            <Link to={`/products/${item.id}`}>
                                <img
                                    className='object-scale-down w-full h-96 relative bg-white'
                                    key={item.id}
                                    src={item.images[0]}
                                    alt="..."
                                />
                                <p className=' bg-white rounded-sm p-2 absolute top-32 left-12 text-black text-center sm:text-sm md:text-xl'>{item.title}</p>
                                <p className=' bg-white rounded-sm p-2 font-semibold tracking-wide absolute top-44 left-12 text-black text-center sm:text-sm md:text-2xl'>$ {item.price}</p>

                            </Link>
                        ))
                    }
                </Carousel>
            </div>

        </div>
    )
}

export default Slider