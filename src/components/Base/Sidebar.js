import { changeShow } from "../../store/slices/sidebarSlice";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar({ children }) {

    const dispatch = useDispatch()

    const router = useRouter()

    const showHide = useSelector((state) => state.sidebar.show)

    function toggle(init = null) {
        if (init == false) {
            dispatch(changeShow(false))
        } else {
            dispatch(changeShow(!showHide))
        }
    }

    useEffect(() => {
        router.pathname && toggle(false)
    }, [router.pathname])

    return (
        <>
            {(showHide ? (<>
                <AnimatePresence>
                    <motion.div className="w-full relatve md:relative md:w-60 md:flex flex-col h-screen overflow-hidden bg-primary-dark"

                        initial={{
                            opacity: 0.2,
                            x: -200,
                        }}
                        transition={{
                            duration: 0.5
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: -200,
                        }}>
                        <div className="w-full h-24 2xl:h-32 flex px-6 justify-between relative md:px-0 md:justify-center items-center">
                            <Image src={require("@/assets/icons/LogoWithWord.svg")} className="w-[80%] 2xl:w-auto" alt="Logo" />
                            <Image src={require("@/assets/icons/times.svg")} className="w-5 md:hidden cursor-pointer hover:opacity-80" onClick={toggle} alt="close" />
                        </div>
                        <div className="w-full h-[calc(100vh-8rem)] 2xl:h-[calc(100vh-10rem)] overflow-y-auto scrollbar-thin scrollbar-track-primary-dark scrollbar-thumb-primary-darkness">
                            {children}
                        </div>
                        <div className="absolute bottom-0 w-full bg-primary-dark">
                            <div className="w-full flex space-x-1 justify-center items-center h-6 2xl:h-8">
                                <Image src={require("@/assets/icons/copyright.svg")} alt="copyright" className="h-4 w-4" />
                                <div className="text-white text-xs 2xl:text-sm">2023 Signature Solutions </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </>) : (<>
                <div className="hidden w-60 2xl:w-72 md:relative md:w-60 md:flex flex-col h-screen overflow-hidden bg-primary-dark"
                    initial={{
                        opacity: 0.2,
                        x: -200,
                    }}
                    transition={{
                        duration: 0.5
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    exit={{
                        opacity: 0,
                        x: -200,
                    }}>
                    <div className="w-full h-24 2xl:h-32 flex px-6 justify-between relative md:px-0 md:justify-center items-center">
                        <Image src={require("@/assets/icons/LogoWithWord.svg")} className="w-[80%] 2xl:w-auto" alt="Logo" />
                        <Image src={require("@/assets/icons/Logo.svg")} className="w-5 md:hidden cursor-pointer hover:opacity-80" onClick={toggle} alt="close" />
                    </div>
                    <div className="w-full h-[calc(100vh-8rem)] 2xl:h-[calc(100vh-10rem)] px-6 overflow-y-auto scrollbar-thin scrollbar-track-primary-dark scrollbar-thumb-primary-darkness">
                        {children}
                    </div>
                    <div className="absolute bottom-0 w-full bg-primary-dark">
                        <div className="w-full flex space-x-1 justify-center items-center h-6 2xl:h-8">
                            <Image src={require("@/assets/icons/copyright.svg")} alt="copyright" className="h-4 w-4" />
                            <div className="text-white text-xs 2xl:text-sm">2023 Signature Solutions</div>
                        </div>
                    </div>
                </div></>))}

        </>

    )
}