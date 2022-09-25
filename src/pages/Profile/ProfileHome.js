import React from 'react'
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loading from '../../components/Loading';
import { db } from '../../firebase';
import Profile from './Profile';

function ProfileReducer() {

    const [cart, loading] = useCollectionData(collection(db, "users"))

    return (
        <div className='bg-slate-200'>
            <div className='w-2/3 m-auto bg-white rounded-xl shadow-lg p-5 mt-10'>

                {
                    loading && <Loading></Loading>
                }

                {
                    !loading && <Profile cart={cart}></Profile>
                }

            </div>
        </div>
    )
}

export default ProfileReducer