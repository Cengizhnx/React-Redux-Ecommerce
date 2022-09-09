import React from 'react'
import { TextInput, Label, Button, Checkbox } from "flowbite-react";
import { HiMail, HiKey, HiCheckCircle } from "react-icons/hi";
import { useFormik } from "formik";
import validationSchema from "./validations";
import toast, { Toaster } from 'react-hot-toast';
import { userRegister } from '../../firebase';
import { useNavigate } from "react-router-dom";


function Register() {

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: ""
        },
        onSubmit: async (values) => {
            try {
                const user = await userRegister(values.email, values.password)
                if (user) {
                    toast.success("User Added")
                    navigate('/', {
                        replace: true
                    })
                }
            } catch (error) {
                console.log(error);
            }
        },
        validationSchema
    })

    return (
        <div className='w-full flex items-center justify-center' >
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 md:w-1/4">
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
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="repeat-password"
                            value="Repeat password"
                        />
                    </div>
                    <TextInput
                        name='passwordConfirm' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordConfirm}
                        id="repeat-password"
                        type="password"
                        required={true}
                        shadow={true}
                        icon={HiKey}
                        helperText={formik.touched.passwordConfirm ? formik.errors.passwordConfirm : ""}
                        error={formik.touched.passwordConfirm && (formik.errors.passwordConfirm)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="agree" />
                    <Label htmlFor="agree">
                        I agree with the{' '}
                        <a
                            href="/forms"
                            className="text-blue-600 hover:underline dark:text-blue-500"
                        >
                            terms and conditions
                        </a>
                    </Label>
                </div>
                <div className='flex justify-center'>
                    <Button type="submit">
                        <HiCheckCircle className="mr-2 h-5 w-5" />
                        Register new account
                    </Button>
                </div>
                <Toaster position="top-right"></Toaster>
            </form>
        </div >
    )
}

export default Register