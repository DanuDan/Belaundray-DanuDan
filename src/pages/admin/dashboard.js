import FeatureChart from "../../features/FeatureChart";
import FeatureTopSelling from "../../features/FeatureTopSelling";
import SuperAdminLayout from "../../layouts/SuperadminLayout";

export default function DashboardAdmin() {
    return (
        <SuperAdminLayout title="Home" >
            <div className="space-y-5 p-5 md:p-6">
                <FeatureChart />
            </div>
            <div className="space-y-5 p-5 md:p-6">
                <FeatureTopSelling />

            </div>
        </SuperAdminLayout>
    )
}