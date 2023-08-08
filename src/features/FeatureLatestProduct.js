import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/slices/productSlice";
import { useRouter } from "next/router";

export default function FeatureLatestProduct() {

    const router = useRouter()
    const dispatch = useDispatch()
    const allProduct = useSelector((state) => state.product.master.source)


    function moveToDetail(id) {
        router.push('homepage/detail/' + id)
    }

    useEffect(() => {
        dispatch(getProduct())
    }, [])

    return (
        <div className="flex-row pt-8">
            <label className="text-lg px-8  text-primary-dark font-medium w-full mb-2 uppercase">
                our latest product
            </label>
            <div className="flex w-full px-8 space-x-5 transition-all overflow-x-auto scrollbar-none overflow-hidden" >
                {
                    allProduct && allProduct.slice().reverse().map((item, i) => (
                        <div key={i} onClick={() => moveToDetail(item.id)} className="min-w-[12rem] cursor-pointer h-60 relative mt-5 flex  justify-start  items-end rounded-lg border-succes py-2">
                            {/* <Image className="w-full object-cover absolute rounded-lg h-full flex justify-center " src={require(`@/assets/icons/CategoryExample.svg`)} alt="Example" /> */}
                            {item?.image === null || item?.image === "" || item?.image === undefined ? (
                                <>
                                    <div className="flex w-full h-full absolute justify-center items-center text-lg text-black">
                                        No Image
                                    </div>
                                </>
                            ) : (
                                <>
                                    {item?.image && (
                                        <>
                                            <img src={item?.image} alt="image" className="w-full object-cover absolute rounded-lg h-full flex justify-center" />
                                        </>)
                                    }
                                </>
                            )
                            }
                            <div className="flex items-end w-full absolute bg-gradient-to-b opacity-50 rounded-b-lg from-transparent to-primary-darkness h-32  " />
                            <div className="grid p-3 absolute ">
                                <div className="text-xl text-white font-semibold line-clamp-1 hover:line-clamp-none">
                                    {item.name}
                                </div>
                                <div className="text-base text-white font-base">
                                    ${item.price}/pc
                                </div>
                            </div>
                        </div>
                    ))
                }
                {/* <div className="min-w-[12rem] cursor-pointer h-60 relative mt-5 flex  justify-start  items-end rounded-lg border-succes py-2">
                    <Image className="w-full object-cover absolute rounded-lg h-full flex justify-center " src={require(`@/assets/icons/CategoryExample.svg`)} alt="Example" />
                    <div className="flex items-end w-full absolute bg-gradient-to-b opacity-50 rounded-b-lg from-transparent to-primary-darkness h-32  " />
                    <div className="grid p-3 absolute ">
                        <div className="text-xl text-white font-semibold">
                            Jeans
                        </div>
                        <div className="text-base text-white font-base">
                            $10.00/pc
                        </div>
                    </div>
                </div>
                <div className="min-w-[12rem] cursor-pointer h-60 relative mt-5 flex  justify-start  items-end rounded-lg border-succes py-2">
                    <Image className="w-full object-cover absolute rounded-lg h-full flex justify-center " src={require(`@/assets/icons/CategoryExample.svg`)} alt="Example" />
                    <div className="flex items-end w-full absolute bg-gradient-to-b opacity-50 rounded-b-lg from-transparent to-primary-darkness h-32  " />
                    <div className="grid p-3 absolute ">
                        <div className="text-xl text-white font-semibold">
                            Jeans
                        </div>
                        <div className="text-base text-white font-base">
                            $10.00/pc
                        </div>
                    </div>
                </div> */}
            </div>

        </div>
    )
}