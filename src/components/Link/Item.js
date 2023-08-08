import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LinkItem({ icon, iconActive, title, href, className, active, leading, subClick, subItem }) {


    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);
    const router = useRouter()
    const currentActiveRoute = router.pathname == href
    const masterRoute = router.pathname.split("/")[2] == href.split("/")[2]

    return (
        leading ? (
            <>
                <div onClick={subClick} className={`${((subItem && active) || masterRoute) && 'bg-transparent/10'} cursor-pointer select-none px-8 py-3 2xl:py-4 hover:bg-transparent/20 transition-all flex items-center space-x-3 w-full ${className}`}>
                    {
                        icon && (
                            <div className="2xl:h-5 2xl:w-5 h-4 w-4">
                                {/* <Image alt="icon" className="w-full h-full" src={require(`@/assets/icons/${icon}`)} /> */}
                            </div >
                        )
                    }
                    <div className="text-sm 2xl:text-base flex-grow text-white font-semibold">
                        {title}
                    </div>
                    <div className={`transition-all h-2.5 w-2.5 ${(active || masterRoute) && 'rotate-90'}`}>
                        {/* <Image alt="icon" className="w-full h-full" src={require(`@/assets/icons/chevron-right.svg`)} /> */}
                    </div>
                </div>
                {
                    ((subItem && active) || masterRoute) && subItem.map((item, i) => (
                        <Link key={i} href={item.link} className={`${(router.pathname == item.link) && 'bg-transparent/20'} bg-transparent/10 select-none px-7 py-5 hover:bg-transparent/20 transition-all flex items-center space-x-3 w-full ${className}`}>
                            {
                                item.icon && (
                                    <div className="2xl:h-5 2xl:w-5 h-4 w-4">
                                        {/* <Image alt="icon" className="w-full h-full" src={require(`@/assets/icons/${item.icon}`)} /> */}
                                    </div >
                                )
                            }
                            <div className={`${!item.icon && 'pl-8'} text-sm 2xl:text-base flex-grow text-white font-semibold`}>
                                {item.name}
                            </div>
                        </Link >
                    ))
                }
            </>

        ) : (
            <Link href={href} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`${currentActiveRoute && 'bg-white !text-primary-dark'} hover:text-primary-dark text-white select-none px-8 py-4 rounded-lg hover:bg-white transition-all flex items-center space-x-3 w-full ${className}`}>
                {
                    icon && (
                        <div className="2xl:h-5 2xl:w-5 h-4 w-4">
                            {currentActiveRoute ?
                                <Image alt="icon" className="w-full h-full" src={require(`@/assets/icons/${iconActive}`)} /> :
                                <>
                                    {
                                        isHovering ?
                                            <Image alt="icon" className="w-full h-full" src={require(`@/assets/icons/${iconActive}`)} />
                                            :
                                            <Image alt="icon" className="w-full h-full" src={require(`@/assets/icons/${icon}`)} />
                                    }
                                </>
                            }
                        </div >
                    )
                }
                <div className="text-xl flex-grow  font-semibold">
                    {title}
                </div>
            </Link >
        )
    )
}   