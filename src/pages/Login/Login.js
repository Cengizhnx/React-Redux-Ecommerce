import React from 'react'
import { TextInput, Label, Button } from "flowbite-react";
import { HiMail, HiKey, HiOutlineArrowRight } from "react-icons/hi";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { Toaster } from 'react-hot-toast';
import { userLogin } from '../../firebase';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: ""
        },
        onSubmit: async (values) => {
            const user = await userLogin(values.email, values.password)
            console.log(user);
            if (user) {
                navigate('/', {
                    replace: true
                })
            }

        },
        validationSchema
    })
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 md:w-1/4 ">
                <div>
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
                        shadow={true}
                        helperText={formik.touched.email ? formik.errors.email : ""}
                        error={formik.touched.email && (formik.errors.email)}
                        icon={HiMail}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password2"
                            value="Your password"
                        />
                    </div>
                    <TextInput
                        name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
                        id="password2"
                        type="password"
                        required={true}
                        shadow={true}
                        icon={HiKey}
                        helperText={formik.touched.password ? formik.errors.password : ""}
                        error={formik.touched.password && (formik.errors.password)}
                    />
                </div>

                <div className="flex items-center gap-2">

                </div>
                <div className='flex justify-center'>
                    <Button type="submit">
                        <HiOutlineArrowRight className="mr-2 h-5 w-5" />
                        Login
                    </Button>
                </div>
                <Toaster position="top-right"></Toaster>
            </form>
        </div>
    )
}

export default Login