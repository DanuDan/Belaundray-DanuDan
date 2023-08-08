
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Base/Navbar";
import FeatureSidebarAdmin from "../features/FeatureSiderbarAdmin";
import { useEffect } from 'react';
import { useSession } from "next-auth/react";
import { getInfoUser } from "../store/slices/userSlice";


export default function AdminLayout({ children, title, icon, description }) {

    const showHide = useSelector((state) => state.sidebar.show)
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
                <title>{`${title && title + ' - '} Admin`}</title>
                <meta name="description" content={description} />
            </Head>
            <div className="w-full flex h-screen">
                <div className={(showHide ? "w-full md:w-auto print-none" : " w-auto 2xl:w-72 print-none")}>
                    <FeatureSidebarAdmin />
                </div>
                <div className={(showHide ? "hidden xl:!relative xl:block " : "relative ") + "!bg-[#E7F5FD] flex-grow h-screen overflow-y-auto"}>
                    <Navbar title={title} icon={icon} />
                    <div className=" w-full">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}