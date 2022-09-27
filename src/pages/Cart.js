import React from 'react'
import Loading from "../components/Loading";
import { db } from '../firebase';
import { collection } from "firebase/firestore";
import Tables from '../components/Tables';
import { useCollectionData } from "react-firebase-hooks/firestore";

const productConverter = {
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)

        return {
            id: snapshot.id,
            ...data
        }

    }
}

function Cart() {

    const [cart, loading] = useCollectionData(collection(db, "cart").withConverter(productConverter))

    return (
        <div className='bg-slate-200'>

            <div className='w-2/3 m-auto bg-white rounded-xl shadow-lg p-5 mt-10'>

                {
                    loading && <Loading></Loading>
                }

                {
                    !loading && <Tables cart={cart}></Tables>
                }

            </div>



        </div>
    )
}

export default Cart