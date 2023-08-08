export default function FeatureTopSelling() {

    const topSelling = (
        [
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
    )

    return (
        <div className="w-full md:w-96">
            <div className="grid">
                <div className="py-4 px-4 bg-white rounded-t-2xl flex justify-between">
                    <div className=" font-bold text-xl">
                        Top selling product
                    </div>
                </div>
                <div className="pt-2 pb-2 bg-white rounded-b-2xl flex justify-between">
                    <table className=" border-separate w-full min-w-max table-auto border-spacing-0">
                        <thead>
                            <tr className="h-12 text-gray-500 !font-medium text-base ">
                                <th className="text-start">Name</th>
                                <th className="text-end">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topSelling && topSelling.map((item, i) => (
                                <tr key={i} className="w-full font-semibold text-base hover:bg-gray-200 cursor-pointer odd:bg-white even:bg-gray-100 ">
                                    <td className="text-start">{item.name}</td>
                                    <td className="text-end">{item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}