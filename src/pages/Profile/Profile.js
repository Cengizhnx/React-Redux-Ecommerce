import React from 'react'
import { TextInput, Label, Button } from "flowbite-react";
import { HiMail, HiUser, HiRefresh, HiPhone, HiGlobeAlt, HiHome, HiAtSymbol } from "react-icons/hi";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from "formik";
import validationSchema from './validations';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { getUserPhoto, storage, userUpdate, userVerified } from '../../firebase';
import { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { useEffect } from 'react';

function Profile({ cart }) {

    const status = useSelector(state => state.datas.status)
    const { user } = useSelector(state => state.users)
    const data = cart.find(item => item.uid === user.uid)

    const [image, setImage] = useState(null)

    const formik = useFormik({
        initialValues: {
            email: data?.mail || "",
            name: data?.name || "",
            surname: data?.surname || "",
            phone_number: data?.phone_number || "",
            country: data?.country || "",
            address: data?.addres || "",
            uid: data?.uid || ""
        },
        onSubmit: async (values) => {
            try {
                uploadImage()
                await userUpdate(values)
            } catch (error) {
                console.log(error);
            }
        },
        validationSchema
    })

    const handleVerification = async () => {
        await userVerified()
    }

    const uploadImage = () => {
        if (image == null) {
            const url = getUserPhoto()
            setImage(url)
        }
        else {
            const imageRef = ref(storage, `images/users/${user.uid}`)
            uploadBytes(imageRef, image).then(() => {
                toast.success("Image added")
            });
        }

    }

    useEffect(() => {
        if (!status) {
            getUserPhoto()
        }
    }, [status])

    const handleConvert = (e) => {

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            const img = document.getElementById('myimg');
            img.setAttribute('src', reader.result);
            setImage(e.target.files[0])
        };
        reader.onerror = error => {
            toast.error("Error: ", error);
        };
    }

    return (
        <div className='w-full flex flex-col items-center justify-center' >

            <div className='m-4'>
                <h1 className='text-2xl'>Profile</h1>
            </div>

            {status && <Loading></Loading>}

            {!status &&
                <form onSubmit={formik.handleSubmit} className="flex flex-col mt-1 gap-4 md:w-3/4 lg:w-3/4">
                    <div className='flex flex-col justify-center items-center space-x-8'>
                        <div className="shrink-0 mb-8">
                            <img className='w-24 h-24 object-cover rounded-full' id='myimg' alt='' />
                        </div>
                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                            <input type="file" onChange={(e) => { handleConvert(e) }} className="block w-full text-xs text-slate-500 rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                        </label>
                    </div>
                    <div className='flex md:flex-row justify-center sm:flex-col'>
                        <div className='w-full px-12'>
                            <div className='py-3'>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="name"
                                        value="Your Name"
                                    />
                                </div>
                                <TextInput
                                    name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}
                                    id="name"
                                    type="name"
                                    required={true}
                                    shadow={true}
                                    icon={HiUser}
                                    helperText={formik.touched.name ? formik.errors.name : ""}
                                    error={formik.touched.name && (formik.errors.name)}
                                />
                            </div>

                            <div className='py-3'>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="surname"
                                        value="Your Surname"
                                    />
                                </div>
                                <TextInput
                                    name='surname' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.surname}
                                    id="surname"
                                    type="surname"
                                    required={true}
                                    shadow={true}
                                    icon={HiUser}
                                    helperText={formik.touched.surname ? formik.errors.surname : ""}
                                    error={formik.touched.surname && (formik.errors.surname)}
                                />
                            </div>

                            <div className='py-3'>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="phone_number"
                                        value="Your Phone Number"
                                    />
                                </div>
                                <TextInput
                                    name='phone_number' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone_number}
                                    id="phone_number"
                                    type="number"
                                    required={true}
                                    shadow={true}
                                    icon={HiPhone}
                                    helperText={formik.touched.phone_number ? formik.errors.phone_number : ""}
                                    error={formik.touched.phone_number && (formik.errors.phone_number)}
                                />
                            </div>
                        </div>


                        <div className='w-full px-12'>

                            <div className='py-3'>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email2"
                                        value="Your email"
                                    />
                                </div>
                                <TextInput
                                    name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
                                    id="email2"
                                    type="email"
                                    placeholder="name@flowbite.com"
                                    required={true}
                                    disabled={true}
                                    shadow={true}
                                    helperText={formik.touched.email ? formik.errors.email : ""}
                                    error={formik.touched.email && (formik.errors.email)}
                                    icon={HiMail}
                                />
                            </div>

                            <div className='py-3'>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="country"
                                        value="Your Country"
                                    />
                                </div>
                                <TextInput
                                    name='country' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.country}
                                    id="country"
                                    type="country"
                                    required={true}
                                    shadow={true}
                                    icon={HiGlobeAlt}
                                    helperText={formik.touched.country ? formik.errors.country : ""}
                                    error={formik.touched.country && (formik.errors.country)}
                                />
                            </div>

                            <div className='py-3'>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="address"
                                        value="Your Address"
                                    />
                                </div>
                                <TextInput
                                    name='address' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address}
                                    id="address"
                                    type="address"
                                    required={true}
                                    shadow={true}
                                    icon={HiHome}
                                    helperText={formik.touched.address ? formik.errors.address : ""}
                                    error={formik.touched.address && (formik.errors.address)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-evenly items-center mb-4 md:flex-row  sm:flex-col'>
                        <div className='flex justify-center mb-4'>
                            <Button type="submit">
                                <HiRefresh className="mr-2 h-5 w-5" />
                                Update Profile
                            </Button>
                        </div>
                        {!user.emailVerified && <div className='flex justify-center mb-4'>
                            <Button color="dark" onClick={handleVerification}>
                                <HiAtSymbol className="mr-2 h-5 w-5" />
                                E-mail Verified
                            </Button>
                        </div>}

                    </div>
                    <Toaster position="top-right"></Toaster>
                </form>


            }


        </div >
    )
}

export default Profile