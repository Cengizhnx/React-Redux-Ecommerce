import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { userLogout, userVerified } from '../firebase'
import { logout } from '../redux/users/userSlice'
import { Avatar, Dropdown } from "flowbite-react";

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

    const handleVerification = async () => {
        await userVerified()
    }

    return (
        <div className='mr-5'>
            <Dropdown
                label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
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

                {!user.emailVerified &&
                    <button onClick={handleVerification} className="w-full">
                        <Dropdown.Item>
                            E-mail Verified
                        </Dropdown.Item>
                    </button>
                }

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