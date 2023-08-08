import Link from "next/link";
import UserLayout from "../../../../layouts/UserLayout";
import Image from "next/image";
import InputNumber from "../../../../components/Input/Number";
import { useState, useEffect} from 'react';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../../../store/slices/productSlice";
import { getCategory } from "../../../../store/slices/categorySlice";

export default function detailProduct() {
    const router = useRouter()
    const detailId = router.query.detailProduct
    const dispatch = useDispatch()
    const productDetail = useSelector((state) => state.product.master.detail.source)

    const patenNumber = productDetail.price
    const [number, setNumber] = useState(patenNumber)
    const [numberValue, setNumberValue] = useState(0)


    useEffect(() => {
        detailId && dispatch(getProductDetail(detailId))
    }, [detailId])

    useEffect(() => {
        dispatch(getCategory())
    }, [])


    useEffect(() => {
        if (numberValue > 0) {
            setNumber(
                patenNumber * numberValue
            )
        }
    }, [numberValue])

    function changeNumber({ target }) {
        const parsedValue = parseInt(target.value, 10);
        if (isNaN(parsedValue) || parsedValue === 0) {
            setNumberValue(1);
        } else {
            setNumberValue(parsedValue);
        }
    }

    function minus() {
        setNumberValue(Math.max(0, numberValue - 1));
    }

    function plus() {
        setNumberValue(
            numberValue + 1
        )
    }

    return (
        <UserLayout title="Product Detail" >
            <div className=" absolute p-10 item-start z-10">
                <Link href={`/user/homepage`}>
                    <Image href src={require("@/assets/icons/chevron_left.svg")} className="cursor-pointer" alt="Logo" />
                </Link>
            </div>
            <div className=" h-96 relative flex justify-start items-end rounded-b-3xl py-2">
                {productDetail.image === null || productDetail.image === "" || productDetail.image === undefined ? (
                    <>
                        <div className="flex w-full h-full absolute justify-center items-center text-lg text-black">
                            No Image
                        </div>
                    </>
                ) : (
                    <>
                        {productDetail.image && (
                            <>
                                <img src={productDetail.image} alt="image" className="w-full h-full object-cover absolute rounded-b-3xl" />
                            </>)
                        }
                    </>
                )
                }
                <div className="flex items-end w-full absolute bg-gradient-to-b opacity-50 rounded-b-3xl from-transparent to-primary-darkness h-[50%]  " />
            </div>
            <div className="w-full p-5 space-y-5 flex-row">
                <div className="w-full  flex">
                    <div className="bg-primary text-primary-dark text-xs rounded-md p-2">
                        {productDetail.category_id}
                    </div>
                </div>
                <div className="w-full flex-row">
                    <div className="w-full font-bold text-primary-dark text-4xl line-clamp-2 hover:line-clamp-none">
                        {productDetail.name}
                    </div>
                    <div className="w-full font-semibold text-primary-darkness text-3xl">
                        $ {number === undefined ? `${productDetail.price}` : `${number}`}.00/pc
                    </div>
                    <div className="w-full font-normal text-base leading-[1.1rem] tracking-tight pt-3 text-[#838383]">
                        {productDetail.description}
                    </div>
                </div>
                {/* <InputNumber className="absolute" /> */}
                <div className="w-full pb-5 justify-center items-center space-x-3 flex">
                    <div onClick={numberValue === 1 || numberValue === 0 ? null : (minus)} className={(numberValue === 1 || numberValue === 0 ? "bg-[#E0E0E0] cursor-default " : "bg-primary-dark cursor-pointer ") + "py-3 px-[0.70rem] rounded-full shadow-2xl "}>
                        <Image className="w-4" src={require("@/assets/icons/minus_icon.svg")} alt="plus" />
                    </div>
                    <InputNumber change={changeNumber} value={numberValue} placeholder="0" className="!w-28 !text-center !text-primary-dark !text-2xl !rounded-xl !font-semibold" />
                    <div onClick={plus} className="p-2 rounded-full cursor-pointer bg-primary-dark shadow-2xl ">
                        <Image className="w-5" src={require("@/assets/icons/plus_icon.svg")} alt="plus" />
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}