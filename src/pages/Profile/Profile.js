import React from 'react'
import { TextInput, Label, Button } from "flowbite-react";
import { HiMail, HiUser, HiRefresh, HiPhone, HiGlobeAlt, HiHome } from "react-icons/hi";
import { Toaster } from 'react-hot-toast';
import { useFormik } from "formik";
import validationSchema from './validations';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { userUpdate } from '../../firebase';

function Profile() {

    let { data } = useSelector(state => state.datas)
    const status = useSelector(state => state.datas.status)

    const formik = useFormik({
        initialValues: {
            email: data[0].mail || "",
            name: data[0].name || "",
            surname: data[0].surname || "",
            phone_number: data[0].phone_number || "",
            country: data[0].country || "",
            address: data[0].addres || ""
        },
        onSubmit: async (values) => {
            try {
                await userUpdate(values)
            } catch (error) {
                console.log(error);
            }
        },
        validationSchema
    })


    return (
        <div className='w-full flex flex-col items-center justify-center' >

            <div className='m-4'>
                <h1 className='text-2xl'>Profile</h1>
            </div>

            {status && <Loading></Loading>}

            {!status &&
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 md:w-3/4 lg:w-2/4">
                    <div className='flex flex-row  justify-center'>
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

                    <div className='flex justify-center mb-4'>
                        <Button type="submit">
                            <HiRefresh className="mr-2 h-5 w-5" />
                            Update Profile
                        </Button>
                    </div>
                    <Toaster position="top-right"></Toaster>
                </form>


            }


        </div >
    )
}

export default Profile