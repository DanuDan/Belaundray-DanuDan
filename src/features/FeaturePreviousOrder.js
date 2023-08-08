import Image from "next/image";
import Link from "next/link";

export default function FeaturePreviousOrder() {
    return (
        <Link href="/user/invoice">
            <div className="grid px-8 cursor-pointer">
                <label className="text-lg text-primary-dark font-medium w-full mb-2 uppercase">
                    previous order
                </label>
                <div className="bg-white flex w-full rounded-lg pl-5 min-h-[6rem] h-auto">
                    <div className="flex w-full justify-between">
                        <div className="flex space-x-4">
                            <div className="w-16 h-24 py-2">
                                <Image className="w-full h-full object-cover " src={require(`@/assets/icons/InvoiceBG.svg`)} alt="avatar" />
                            </div>
                            <div className="grid space-y-3 py-2">
                                <div className="text-black text-lg font-semibold tracking-wider line-clamp-1 hover:line-clamp-none ">
                                    Bag of Laundry
                                </div>
                                <div className="flex-row -space-y-1">
                                    <div className="text-[#535353] text-xs tracking-wider font-medium">
                                        Total Order
                                    </div>
                                    <div className="font-bold text-lg text-primary-darkness tracking-widest">
                                        $180.00
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="!w-[5.1rem] h-full flex  rounded-r-lg justify-center bg-gradient-to-br from-primary-darkness to-primary">
                            <div className="grid items-end justify-center">
                                <div className="w-full h-full items-end flex justify-center">
                                    <Image className="w-8 h-8 flex justify-center " src={require(`@/assets/icons/invoice.svg`)} alt="avatar" />
                                </div>
                                <div className="text-white text-center pb-1 tracking-wider text-xs font-medium uppercase">
                                    invoice
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}