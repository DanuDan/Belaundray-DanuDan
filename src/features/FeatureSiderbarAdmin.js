import Sidebar from "@/components/Base/Sidebar";
import LinkItem from "@/components/Link/Item";
import { useState } from "react";

export default function FeatureSidebarAdmin() {

    const [menu, setMenu] = useState([
        {
            label: "Menu",
            children: [
                {
                    name: "Home",
                    icon: "HomeWhite.svg",
                    iconActive: "HomePrimary.svg",
                    link: "/admin/dashboard",
                    active: false,
                    leading: false,
                    children: []
                },
                {
                    name: "Products",
                    icon: "ProductWhite.svg",
                    iconActive: "ProductPrimary.svg",
                    link: "/admin/product",
                    active: false,
                    leading: false,
                    children: []
                },
                {
                    name: "Sales",
                    icon: "SalesWhite.svg",
                    iconActive: "SalesPrimary.svg",
                    link: "/admin/sales",
                    active: false,
                    leading: false,
                    children: []
                },
                {
                    name: "Settings",
                    icon: "SettingsWhite.svg",
                    iconActive: "SettingsPrimary.svg",
                    link: "/admin/settings",
                    active: false,
                    leading: false,
                    children: []
                },
            ]
        },
    ])

    function toggleMenu(indexParent, indexChild) {
        const newArray = [...menu]
        newArray[indexParent].children[indexChild].active = !newArray[indexParent].children[indexChild].active
        setMenu(newArray)
    }

    return (

        <>
            <Sidebar>
                <div className="flex flex-col space-y-4 py-4">
                    {
                        menu && menu.map((item, i) => (
                            <div className="flex flex-col space-y-2" key={i}>
                                <div className="font-semibold text-xl text-white w-full px-6">
                                    {item.label}
                                </div>
                                <div className="flex flex-col space-y-3">
                                    {
                                        item.children.map((link, index) => (
                                            <LinkItem key={index} active={link.active} subClick={() => toggleMenu(i, index)} subItem={link.children} icon={link.icon} title={link.name} iconActive={link.iconActive} leading={link.leading} href={link.link} />
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Sidebar>
        </>
    )
}