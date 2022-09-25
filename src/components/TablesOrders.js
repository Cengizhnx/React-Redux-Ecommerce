import { Card } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'

function TablesOrders({ cart }) {

    const data = cart.filter(item => item.uid === auth.currentUser.uid)

    return (
        <div>
            {data && data.length > 0 &&
                <div className="max-w-full">
                    <div className="flex items-center justify-between">
                        <h5 className="text-xl mb-4 font-bold leading-none text-gray-900 dark:text-white">
                            Orders ({data.length})
                        </h5>
                    </div>
                    <div className='lg:grid lg:grid-cols-3 lg:items-start sm:grid-cols-1 sm:flex sm:flex-col sm:items-center'>

                        {

                            data.map((item) => (
                                <div className='sm:my-3 md:my-3' key={item.id}>
                                    <Card style={{ width: "18rem", backgroundColor:"ghostwhite" }}>
                                        <div className="flow-root w-60">
                                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">

                                                <li className="py-2 sm:py-2" >
                                                    {
                                                        item.data.map((i) => (
                                                            <div key={i.product_id} className="flex items-center space-x-10 ">
                                                                <div className="min-w-0 my-1 flex-1">
                                                                    <p className="truncate text-sm font-medium hover:underline text-gray-900 dark:text-white">
                                                                        <Link to={`/products/${i.product_id}`}>
                                                                            {i.product_name}
                                                                        </Link>                                                        </p>
                                                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                                                        {i.product_category}
                                                                    </p>
                                                                </div>
                                                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                                    ${i.product_price}
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </li>

                                                {
                                                    <div className='flex justify-end pt-4 items-center sm:justify-center'>
                                                        <p className='text-sm tracking-wide pr-2 text-black'>Order Amount =</p>
                                                        <p className='text-sm font-bold tracking-wide text-black'>${item.price}</p>
                                                    </div>
                                                }

                                            </ul>
                                        </div>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>

                </div>

            }

            {
                data.length <= 0 && <h1>🧺 Empty Order</h1>
            }
        </div >
    )
}

export default TablesOrders