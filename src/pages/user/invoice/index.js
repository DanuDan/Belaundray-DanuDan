import Image from "next/image";
import UserLayout from "../../../layouts/UserLayout";
import Link from "next/link";
import ButtonSolid from "../../../components/Button/Solid";
import { useSelector } from "react-redux";

export default function invoice() {
    const user =  useSelector((state) => state.user)
    const loading = false

    const topSelling = [
        {
            key: 1,
            name: "Item A",
            value: "$180"
        },
        {
            key: 2,
            name: "Item B",
            value: "$260"
        },
        {
            key: 3,
            name: "Item C",
            value: "$260"
        }
    ]

    return (
        <UserLayout title="Home" >
            <div className="w-full h-full p-8 flex-col">
                <div className="w-full pt-2 pb-10">
                    <Link href={`/user/homepage`}>
                        <Image href src={require("@/assets/icons/chevron_left.svg")} className="" alt="Logo" />
                    </Link>
                </div>
                <div className="bg-primary-darkness border border-info rounded-xl pt-3 mb-8">
                    <div className=" flex justify-center items-center px-2 md:px-6 pb-4 pt-2 border-b">
                        <div className=" font-bold text-white text-2xl uppercase">
                            order summary
                        </div>
                    </div>
                    <div className="bg-white flex justify-center p-y">
                        {loading ? (
                            <div className="w-full flex justify-center items-center h-52 bg-black rounded-3xl ">
                                <LoadingSpinner className="absolute z-50 h-8 w-8" />
                                <ShimmerLoading className="w-full h-52  rounded-3xl " />
                            </div>
                        ) : (
                            <div className="w-full flex-col">
                                <div className="w-full py-2 px-5">
                                    <div className="w-full flex justify-end text-base font-normal uppercase text-primary-dark">
                                        order #21340
                                    </div>
                                    <div className="w-full flex-col flex justify-start">
                                        <div className="font-bold  text-base">
                                            {user.name}
                                        </div>
                                        <div className="flex-col text-[#535353] -space-y-1">
                                            <div className="font-base text-sm capitalize ">
                                                123 Pasir Merah,
                                            </div>
                                            <div className="font-base text-sm capitalize ">
                                                13810, Singapore
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <table className=" border-separate w-full min-w-max table-auto border-spacing-0">
                                    <tbody>
                                        {topSelling && topSelling.map((item, i) => (
                                            <tr key={i} className="w-full hover:bg-gray-200 cursor-pointer !border-none ">
                                                {/* <Image */}
                                                <td className="flex space-x-2 text-start items-center">
                                                    <div className="w-8 h-11 ">
                                                        <Image className="w-full h-full object-cover " src={require(`@/assets/icons/InvoiceBG.svg`)} alt="avatar" />
                                                    </div>
                                                    <div className="flex-row text-start -space-y-1 justify-center">
                                                        <div className="font-semibold">
                                                            {item.name}
                                                        </div>
                                                        <div className="font-normal text-sm text-primary-darkness">
                                                            Qty: 1
                                                        </div>
                                                    </div>

                                                </td>
                                                <td className="text-end">
                                                    <div className="flex-row text-center justify-center">
                                                        <div className="font-medium text-[#535353] text-xs capitalize">
                                                            total
                                                        </div>
                                                        <div className="font-bold text-base text-primary-darkness tracking-widest">
                                                            {item.value}.00
                                                        </div>
                                                    </div>
                                                </td>
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                        }
                    </div>
                    <div className=" flex justify-between items-center p-3">
                        <div className=" text-white font-semibold text-base uppercase">
                            Total Order
                        </div>
                        <div className=" text-white font-semibold text-base tracking-widest uppercase">
                            $204.00
                        </div>
                    </div>
                </div>
                <div className="w-full ">
                    <ButtonSolid icon={"chat_icon.svg"} text={"WHATSAPP US"} className="bg-succes w-full py-3 text-white !rounded-2xl" />
                </div>
            </div>
        </UserLayout>
    )
}