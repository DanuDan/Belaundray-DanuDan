import Image from "next/image";
import UserLayout from "../../../layouts/UserLayout";
import FeaturePreviousOrder from "../../../features/FeaturePreviousOrder";
import FeatureMostOrdered from "../../../features/FeatureMostOrdered";
import FeatureLatestProduct from "../../../features/FeatureLatestProduct";
import { useSelector } from "react-redux";

export default function homepage() {
    const user =  useSelector((state) => state.user)
    return (
        <UserLayout title="Home" >
            <Image className="w-full h-56 object-cover absolute " src={require(`@/assets/icons/BGCircle.svg`)} alt="avatar" />
            <div className="w-full h-72 flex justify-center px-6 pt-6">
                <div className="space-y-2 absolute pt-5 ">
                    <div className="pl-2 text-xl  z-50 font-semibold text-white">
                        Welcome, {user.name}
                    </div>
                    <div className=" rounded-xl overflow-hidden shadow-md flex justify-end w-full h-44 relative" >
                        <div className="w-full p-4 absolute bottom-0 right-0 items-end justify-end">
                            <div className="text-lg flex justify-end font-medium">
                                Your Balance
                            </div>
                            <div className="text-4xl tracking-wider  flex justify-end font-bold text-primary-darkness ">
                                $200,00
                            </div>
                        </div>
                        <Image className="w-full object-cover " src={require(`@/assets/icons/Card.svg`)} alt="avatar" />
                    </div>
                </div>
            </div>
            <FeaturePreviousOrder />
            <FeatureMostOrdered />
            <FeatureLatestProduct />
        </UserLayout>
    )
}