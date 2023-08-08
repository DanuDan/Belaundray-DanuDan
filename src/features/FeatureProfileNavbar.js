
import { AnimatePresence, motion } from "framer-motion";
import { signOut} from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/userSlice";

export default function FeatureProfileNavbar() {

    const dispatch = useDispatch()
    const [toggleMenu, setToggleMenu] = useState(false)
    const user = useSelector((state) => state.user)

    function logout() {
        dispatch(logoutUser())
        signOut()
        setToggleMenu(false)
    }


    return (
        <div className="relative">
            <div onClick={() => setToggleMenu(!toggleMenu)} className="flex space-x-2 select-none md:space-x-3 items-center cursor-pointer hover:opacity-90 transition-all">
                <Image className="w-10 md:w-9" src={require(`../assets/icons/user.svg`)} alt="avatar" />
                <div className="hidden md:flex items-center w-full space-x-3">
                    <div className="flex-col w-auto xl:w-full flex items-end">
                        <div className="text-primary-darkness w-max-[48] text-xl underline  font-bold capitalize line-clamp-1">{user.name}</div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {
                    toggleMenu && (
                        <motion.div
                            initial={{
                                top: 25,
                                opacity: 0
                            }}
                            transition={{
                                duration: 0.2
                            }}
                            animate={{
                                top: 50,
                                opacity: 1
                            }}
                            exit={{
                                opacity: 0
                            }}
                            className="-right-2 fixed w-full sm:right-3 mt-5 z-20">
                            <div className="relative h-screen w-full">
                                <div onClick={() => setToggleMenu(false)} className="w-full h-full absolute" />
                                <div className="absolute right-6 bg-white shadow-lg p-4 rounded-lg w-64 mt-4 border">
                                    <div className="text-lg px-2 text-primary-dark font-bold line-clamp-1">
                                        {user.name}
                                    </div>
                                    <hr className="w-full border my-3" />
                                    <div className="w-full flex flex-col select-none">
                                        <div className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-4 cursor-pointer">
                                            <div className="w-8 h-8">
                                                <Image src={require(`../assets/icons/user.svg`)} alt="user-blue" className="w-full h-full" />
                                            </div>
                                            <div className="text-black text-lg font-semibold">
                                                Profile
                                            </div>
                                        </div>
                                        <div onClick={logout} className="flex items-center space-x-4 hover:bg-gray-100 rounded-lg p-4 cursor-pointer">
                                            <div className="w-5 h-5">
                                                <Image src={require("@/assets/icons/logout-red.svg")} alt="logout-red" className="w-full h-full" />
                                            </div>
                                            <div className="text-danger font-semibold">
                                                Logout
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}