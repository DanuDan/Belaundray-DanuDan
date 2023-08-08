import Image from "next/image";

export default function FeatureMostOrdered() {
    return (
        <div className="flex-row px-8 pt-8 ">
            <label className="text-lg text-primary-dark font-medium w-full mb-2 uppercase">
                your most ordered
            </label>
            <div className="w-full h-60 relative mt-5 flex  justify-start  items-end rounded-lg border-succes py-2">
                <Image className="w-full object-cover absolute rounded-lg h-full flex justify-center " src={require(`@/assets/icons/CategoryExample.svg`)} alt="Example" />
                <div className="flex items-end w-full absolute bg-gradient-to-b opacity-50 rounded-b-lg from-transparent to-primary-darkness h-32 "/>
                <div className="grid p-3 absolute ">
                    <div className="text-xl text-white font-semibold">
                        Dry Cleaning
                    </div>
                    <div className="text-base text-white font-base">
                        12x | total of $4000
                    </div>
                </div>
            </div>

        </div>
    )
}