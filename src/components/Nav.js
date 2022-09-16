import React from 'react'
import { Navbar, Button } from "flowbite-react";
import { useSelector } from 'react-redux';
import Logout from '../pages/Logout';
import Loading from './Loading';

function Nav() {

    const { user } = useSelector(state => state.users)
    const status = useSelector(state => state.users.status)

    return (
        <div>
            <Navbar
                fluid={true}
                rounded={true}
            >
                <Navbar.Brand href="https://flowbite.com/">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Flowbite
                    </span>
                </Navbar.Brand>

                {
                    status && < div className="flex md:order-2 pr-10"> <Loading></Loading> </div>
                }

                {user && !status && <div className="flex md:order-2">
                    <Logout></Logout>
                    <Navbar.Toggle />
                </div>
                }

                {
                    !user && !status && <div className="flex md:order-2">
                        <div className='mr-5'>
                            <Button href='/login'
                                outline={true}
                                gradientDuoTone="greenToBlue"
                            >
                                    Login
                            </Button>
                        </div>
                        <div>
                            <Button href='/register' gradientMonochrome="info">
                                Register
                            </Button>
                        </div>
                        <Navbar.Toggle />
                    </div>
                }

                <Navbar.Collapse>
                    <Navbar.Link
                        href="/"
                        active={true}
                    >
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="/navbars">
                        About
                    </Navbar.Link>
                    <Navbar.Link href="/products">
                       All Products
                    </Navbar.Link>
                    <Navbar.Link href="/navbars">
                        Pricing
                    </Navbar.Link>
                    <Navbar.Link href="/navbars">
                        Contact
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar >
        </div >
    )
}

export default Nav