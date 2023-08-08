import { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
// import InputSelect from "@/components/Input/Select";
import Image from "next/image";
import { Line } from "react-chartjs-2";
// import { useDispatch, useSelector } from "react-redux";
// import {  filterQRISMonthPartner, filterQRISYearPartner, getchartPartner, resetFilterQrisPartner} from "@/store/slice/dashboardSlice";
import ShimmerLoading from "@/components/Loading/Shimmer";
import LoadingSpinner from "@/components/Loading/Spinner";
import InputSelect from "../components/Input/Select";
import { useDispatch, useSelector } from "react-redux";
import { getChart } from "../store/slices/chartSlice";

Chart.register(...registerables)
Chart.defaults.borderColor = '#FFFFFF';
Chart.defaults.scales.linear.beginAtZero = true
// Chart.defaults.scales.linear.ticks = {
//     callback: function (value) {
//         if (value < 2000) {
//             return value
//         } else if (value < 1000000) {
//             return value / 1000 + ' Ribu'
//         } else if (value < 1000000000) {
//             return value / 1000000 + ' Juta'
//         } else {
//             return value / 1000000000 + ' Milliar'
//         }
//     }
// }


function FeatureChart() {
    const dispatch = useDispatch()
    const chart = useSelector((state) => state.chart.master.source)
    const loading = false

    useEffect(() => {
        dispatch(getChart())
    }, [])

    // function changeInput({ target }) {
    //     target.name == 'year' && dispatch(filterQRISYearPartner(target.value))
    //     target.name == 'month' && dispatch(filterQRISMonthPartner(target.value))
    //     dispatch(getchartPartner())
    // }

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "",
                fill: false,

                type: "bar",
                data: [],
                borderColor: "#B2C5D4",
                backgroundColor: "#B2C5D4",
                hoverBackgroundColor: "#3E7DAB",
                borderRadius: 5,
                borderSkipped: false,
                cubicInterpolationMode: 'monotone',
            }
        ]
    });

    useEffect(() => {
        chart && setChartData({
            labels: [
                ...chart.map((item) => item.created_at)
            ],
            datasets: [
                {
                    label: "",
                    fill: false,
    
                    type: "bar",
                    data: chart.map((item) => item.total),
                    borderColor: "#B2C5D4",
                    backgroundColor: "#B2C5D4",
                    hoverBackgroundColor: "#3E7DAB",
                    borderRadius: 5,
                    borderSkipped: false,
                    cubicInterpolationMode: 'monotone',
                }
            ]
        })
    }, [chart])

    const options = {
        maintainAspectRatio: true,
        responsive: true,
        interaction: {
            intersect: false,
        },
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            y: {
                stacked: false,
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                }
            },
        }
    }

    const optionsMobile = {
        maintainAspectRatio: true,
        aspectRatio: 1,
        responsive: true,
        interaction: {
            intersect: true,
        },
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            y: {
                stacked: false,
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                }
            },
        }
    }

    // function resetFilter() {
    //     dispatch(resetFilterQrisPartner())
    // }


    return (
        <>
            <div className="bg-white border border-info rounded-2xl py-3 mb-5">
                <div className=" flex justify-between items-center px-2 md:px-6 pb-4 pt-2 border-b">
                    <div className=" font-bold text-xl">
                        Product Sold
                    </div>
                    <div className="flex items-center md:justify-end" >
                        <InputSelect name="year" value="" placeholder="This week" calendar="true" className="w-32 !py-1">
                            <option value="2023" className="text-black not-italic bg-white">2023</option>
                        </InputSelect>
                    </div>
                </div>
                <div className="bg-white hidden md:flex justify-center p-4">
                    {loading ? (
                        <div className="w-full flex justify-center items-center h-52 bg-black rounded-3xl ">
                            <LoadingSpinner className="absolute z-50 h-8 w-8" />
                            <ShimmerLoading className="w-full h-52  rounded-3xl " />
                        </div>
                    ) : (
                        <>
                            <Line options={options}
                                height={'100%'}
                                data={chartData} />
                        </>
                    )
                    }
                </div>
                <div className="bg-white flex md:hidden justify-center p-4">
                    {loading ? (
                        <div className="w-full flex justify-center items-center h-52 bg-black rounded-3xl ">
                            <LoadingSpinner className="absolute z-50 h-8 w-8" />
                            <ShimmerLoading className="w-full h-52  rounded-3xl " />
                        </div>
                    ) : (
                        <>
                            <Line options={optionsMobile}
                                height={'100%'}
                                data={chartData} />
                        </>
                    )
                    }
                </div>
            </div>
        </>
    );
}

export default FeatureChart;
