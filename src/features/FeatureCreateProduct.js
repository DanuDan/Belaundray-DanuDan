import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import ButtonSolid from "../components/Button/Solid";
import InputArea from "../components/Input/Area";
import InputFileImage from "../components/Input/Image";
import InputNumber from "../components/Input/Number";
import InputText from "../components/Input/Text";
import LinkTab from "../components/Link/Tab";
import { getCategory } from "../store/slices/categorySlice";
import { createProduct } from "../store/slices/productSlice";


export default function FeatureCreateProduct() {

    const dispatch = useDispatch()
    const showHide = useSelector((state) => state.sidebar.show)
    const tab = useSelector((state) => state.category.master.source)
    const [form, setForm] = useState({image: "https://m.media-amazon.com/images/I/51FIaqed1eL._SR600%2C315_PIWhiteStrip%2CBottomLeft%2C0%2C35_SCLZZZZZZZ_FMpng_BG255%2C255%2C255.jpg"})

    function doCreate() {
        dispatch(createProduct(form)).then(()=> setForm({}))
    }

    useEffect(() => {
        dispatch(getCategory())
    }, [])

    useEffect(() => {
        console.log(form)
    }, [form])

    function changeForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleTab(active) {
        setForm({
            ...form,
            category_id: (active)
        })
    }

    return (
        <div className="flex h-full w-full">
            <div className="space-y-5 p-5 md:p-6 w-full md:w-[75%]">
                <div className="text-[2rem] w-full text-center md:text-start whitespace-nowrap font-bold tracking-widest transition-all overflow-x-auto scrollbar-none overflow-hidden" >
                    Add New Product
                </div>
                <div className="space-y-8 py-5 ">
                    <InputText label="Product Name" name="name" change={changeForm}/>
                    <InputArea label="Product Description" name="description" change={changeForm} />
                    <div className="grid md:flex w-full space-y-5 md:space-y-0 md:space-x-10">
                        <InputText label="SKU" name="sku" change={changeForm} />
                        <InputNumber label="Stock" name="stock" change={changeForm} className="w-32 md:w-full" />
                    </div>
                    <LinkTab
                        label="Category"
                        source={tab}
                        // defaultValue={activeTab}
                        active={(active) => handleTab(active)}
                    />
                    <div className="flex w-full justify-between items-end ">
                        <InputNumber change={changeForm} name="price" label="Price" className="w-40 md:w-52" />
                        <ButtonSolid click={doCreate} text="Publish" className="hidden md:block bg-succes py-3 px-12 text-white text-lg " />
                    </div>
                    <div className="block md:hidden">
                        <InputFileImage  rounded />
                    </div>
                    <div className="flex w-full">
                        <ButtonSolid click={doCreate} text="Publish" className="block md:hidden bg-succes !mt-5 py-3 px-12 !w-full text-white text-lg " />
                    </div>
                </div>

            </div>
            <div className="hidden md:block bg-[#F5FCFF] h-[120vh] w-[25%] p-5">
                <InputFileImage />
            </div>

        </div>

    )
}