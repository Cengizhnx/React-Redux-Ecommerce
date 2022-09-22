import { Button, Table } from 'flowbite-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth, deleteProductCart } from '../firebase'
import { getCartsLength } from '../redux/carts/cartsSlice'
import { HiShoppingCart } from "react-icons/hi";

function Tables({ cart }) {

    const handleDelete = useCallback((id) => {
        deleteProductCart(id)
    }, [])

    const data = cart.filter(item => item.uid === auth.currentUser.uid)
    const [total, setTotal] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartsLength(data.length))
    }, [dispatch, data.length])

    useEffect(() => {
        let price = 0;
        data.map((item) => (
            price += item.product_price
        ))
        setTotal(price)
    },[data])


    return (
        <div>

            {data &&
                <div>
                    <h1 className='text-xl mb-3'>Products ({data.length})</h1>

                    <Table striped={true}>
                        <Table.Head>
                            <Table.HeadCell>
                                Product name
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Category
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Price
                            </Table.HeadCell>
                            <Table.HeadCell>

                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">

                            {
                                data.map((item) => (
                                    <Table.Row key={item.product_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <Link to={`/products/${item.product_id}`}>
                                                <p className='hover:underline'>{item.product_name}</p>
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {item.product_category}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <p className='font-medium text-slate-700'> ${item.product_price}</p>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="font-medium text-red-600  dark:text-blue-500"
                                            >
                                                ❌
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>

                                ))
                            }

                        </Table.Body>

                        <Table.Body className="divide-y">
                            <Table.Row>

                                <Table.Cell>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='flex justify-end items-center'>
                                        <p className='text-lg font-bold pr-10 text-black'>${total}</p>

                                        <Button size="sm">
                                            <HiShoppingCart className="mr-2 h-4 w-4" />
                                            Buy now
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            }

        </div>
    )
}

export default Tables