import FeatureCreateProduct from "../../../features/FeatureCreateProduct";
import AdminLayout from "../../../layouts/SuperadminLayout";


export default function Product() {
    return (
        <AdminLayout title="Product" >
            <FeatureCreateProduct />


        </AdminLayout>
    )
}