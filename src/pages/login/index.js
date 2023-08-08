// import bg from "@/assets/images/BackgroundLogin.png";

import InputPassword from "@/components/Input/Password";
import ButtonSolid from "@/components/Button/Solid";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/Loading/Spinner";
import InputEmail from "../../components/Input/Email";

export default function AuthLogin() {

    const [form, setForm] = useState({
        redirect: false
    })
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    function submitForm(e) {
        e.preventDefault()

        setLoading(true)
        signIn("credentials", form).then((data) => {
            if (data.ok) {
                setLoading(false)
                return router.replace("/user/homepage")
            } else {
                setLoading(false)
                toast(data.error, { autoClose: 2000, type: 'error' })
            }
        })
    }

    function changeForm(params) {
        setForm({
            ...form,
            [params.target.name]: params.target.value
        })
    }

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <div className="w-screen h-screen flex flex-col -space-y-10 sm:space-y-0 lg:flex-auto bg-center bg-no-repeat bg-cover justify-center items-center bg-[#E7F5FD] dark:bg-primary" >
                <div className="w-auto md:w-[30rem] pb-12 flex px-5 justify-start items-center shadow-md bg-white rounded-2xl">
                    <form onSubmit={submitForm} className="justify-center items-start z-50 left-0 w-full h-[80%] space-y-3 rounded-2xl p-4">
                        <div className="w-full flex justify-center">
                            <Image src={require("@/assets/icons/Logo.svg")} className="w-20" alt="Logo" />
                        </div>
                        <div className="flex flex-col w-full space-y-2  justify-center ">

                            <div className="text-primary-darkness font-bold text-3xl items-center pb-2">Login</div>
                        </div>
                        <InputEmail required fieldName="Email" change={changeForm} name="email" className="w-full text-primary-darkness font-semibold placeholder-gray-40 placeholder-opacity-70 " placeholder={"Email"} />
                        <InputPassword required fieldName="Password" change={changeForm} name="password" containe rClassName="!w-full " className=" text-primary-darkness placeholder-primary-darkness font-semibold placeholder-opacity-70" placeholder={"Password"} />
                        <div className="flex w-full justify-between">
                            {
                                loading ? (
                                    <div className="">
                                        <LoadingSpinner className="w-8 h-8 fill-primary" />
                                    </div>
                                ) : (
                                    <ButtonSolid disabled={!form?.email || !form?.password} type="submit" click={submitForm} text="Masuk" className="bg-primary-dark cursor-pointer !px-6 text text-white py-1" />
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}