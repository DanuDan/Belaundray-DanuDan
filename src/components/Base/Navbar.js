
import { changeShow } from "../../store/slices/sidebarSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import FeatureProfileNavbar from "../../features/FeatureProfileNavbar";


export default function Navbar({ title, icon }) {

    const dispatch = useDispatch()
    const sidebar = useSelector((state) => state.sidebar)

    function toggle() {
        dispatch(changeShow(!sidebar.show))
    }

    return (
        <nav>
            <div className="w-full flex justify-between bg-white items-center h-16 md:h-24 print-none">
                <div className="flex w-full md:w-[60%] items-center px-2 py-2">
                    <button className="px-2" onClick={toggle}>
                        <Image src={require("@/assets/icons/Logo.svg")} className="md:hidden 2xl:w-auto" alt="Logo" />
                    </button>
                    <div className="flex items-center py-3 pl-2 xl:pl-5 space-x-2 w-full lg:space-x-4">
                        {icon &&
                            <div className="flex items-center w-2 h-2 mt-1">
                                <Image src={require(`@/assets/icons/${icon}.svg`)} className="" alt="Logo" />
                            </div>
                        }
                        <div className="hidden text-4xl md:flex text-black line-clamp-1 w-full text-start h-12 tracking-widest font-bold bg-clip-text ">
                            {title}
                        </div>
                    </div>
                </div>
                <div className="w-auto flex justify-end items-center px-0 md:px-5">
                    <div className="flex space-x-1 md:space-x-3 pr-5 items-center">
                        <FeatureProfileNavbar />
                    </div>
                </div>
            </div>
        </nav>
    )

}