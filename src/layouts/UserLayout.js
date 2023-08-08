import Head from "next/head";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getInfoUser } from "../store/slices/userSlice";
import { useSession } from "next-auth/react";


export default function UserLayout({ children, title, icon, description }) {

    const dispatch = useDispatch()
    const { update } = useSession({required:true})
    useEffect(() => {
        dispatch(getInfoUser()).then((data) => {
            console.log(data)
            update({
                name: data.name
            })
        })
    }, [])

    return (
        <>
            <Head>
                <title>{`${title && title + ' - '} Home`}</title>
                <meta name="description" content={description} />
            </Head>
            <div className="w-full max-w-sm relative min-h-[100vh] h-full mx-auto !bg-[#E7F5FD] ">
                {children}
            </div>
        </>
    )
}