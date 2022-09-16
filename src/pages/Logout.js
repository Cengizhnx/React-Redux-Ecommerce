import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { auth, storage, userLogout } from '../firebase'
import { logout } from '../redux/users/userSlice'
import { Dropdown } from "flowbite-react";
import { getDownloadURL, ref } from 'firebase/storage'

function Logout() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.users)

    const handleLogout = async () => {
        await userLogout()
        dispatch(logout())
        navigate('/login', {
            replace: true
        })
    }

    const handleUser = async () => {
        getDownloadURL(ref(storage, `images/users/${auth.currentUser.uid}`))
            .then((url) => {
                const img = document.getElementById('avatar');
                img.setAttribute('src', url);
                return url;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    handleUser()

    return (
        <div className='mr-5 flex flex-row items-center'>
            <img className='rounded-full w-10 h-10' id='avatar' alt="" />
            <Dropdown
                arrowIcon={true}
                inline={true}
            >
                <Dropdown.Header>
                    <span className="block text-sm">
                        {user.name}
                    </span>
                    <span className="block truncate text-sm font-medium">
                        {user.emailVerified === false ? <span className='text-red-600' >{user.email}</span> : <span className='text-blue-600' >{user.email}</span>}
                    </span>
                </Dropdown.Header>

                <Link to="/profile">

                    <Dropdown.Item>
                        Profile
                    </Dropdown.Item>
                </Link>

                <Dropdown.Divider />
                <button onClick={handleLogout} className="w-full">
                    <Dropdown.Item>
                        Logout
                    </Dropdown.Item>
                </button>
            </Dropdown>

        </div>
    )
}

export default Logout