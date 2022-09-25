import { Button, Table } from 'flowbite-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { addOrders, auth, deleteAllCart, deleteProductCart } from '../firebase'
import { HiShoppingCart } from "react-icons/hi";
import toast, { Toaster } from 'react-hot-toast'

function Tables({ cart }) {
    
    const handleDelete = useCallback((id) => {
        if (window.confirm("🤔 Are you sure ?")) {
            deleteProductCart(id)
        }
    }, [])

    const data = cart.filter(item => item.uid === auth.currentUser.uid)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let price = 0;
        data.map((item) => (
            price += item.product_price
        ))
        setTotal(price)
    }, [data])

    const handleOrder = (data, total) => {
        if (data.length !== 0 && auth.currentUser.emailVerified !== false) {
            addOrders(data, total)
            deleteAllCart({ data })
        }
        else{
            toast.error("Email is not verified. Please verify from the Profile page.")
        }
    }


    return (
        <div>

            {data && data.length > 0 &&
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
                    </Table>
                    <div className='md:flex justify-end p-6 pt-8 items-center sm:flex-row'>
                        <p className='text-lg tracking-wider pr-2 text-black'>Subtotal =</p>
                        <p className='text-lg font-bold tracking-wide pr-10 text-black'>${total}</p>

                        <Button onClick={() => handleOrder(data, total)} size="sm">
                            <HiShoppingCart className="mr-2 h-4 w-4" />
                            Buy now
                        </Button>
                    </div>
                </div>

            }

            {
                data.length <= 0 && <h1>🧺 Empty Basket</h1>
            }
            <Toaster position="top-right"></Toaster>

        </div>
    )
}

export default Tables