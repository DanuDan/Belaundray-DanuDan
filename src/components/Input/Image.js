import LoadingSpinner from "@/components/Loading/Spinner";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function InputFileImage({
    change,
    name,
    row,
    className,
    rounded,
    error,
    loading,
    defaultValue = null
}) {

    const [preview, setPreview] = useState(null);
    const [onError, setOnError] = useState(null);
    const [valueInput, setValueInput] = useState(null);

    useEffect(() => {
        defaultValue && setPreview(defaultValue)
    },[defaultValue])

    useEffect(() => {
        error && setOnError(error)
    }, [error])

    useEffect(() => {
        if (valueInput) {
            if (!valueInput[0]) return
            if (valueInput[0].type === "image/png" || valueInput[0].type === "image/jpeg" || valueInput[0].type === "image/jpg") {
                setOnError(null)
            } else {
                setPreview(null)
                setOnError(`File yang diinput tidak Support`)
            }
        }
    }, [valueInput]);

    const handleChange = (e) => {
        if (!e.target.value) return
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const inputRef = useRef()

    return (
        <>
            <div className="">
                {
                    loading ? (
                        <div className="w-60 h-44 2xl:w-full flex items-center justify-center group">
                            <div className="p-2 items-center flex justify-center absolute z-10 rounded-full bg-primary-dark shadow-2xl">
                                <LoadingSpinner className="!w-8 !mr-0" />
                            </div>
                        </div>
                    ) : (
                        <>
                            {preview || !preview === null || !preview === "" ? (
                                <div>
                                    <div className=" w-full h-96 md:h-64 2xl:w-full flex items-center justify-center group" onClick={() => inputRef?.current.click()}>
                                        <div className="p-2 absolute z-10 rounded-full hidden group-hover:block group-hover:opacity-80 cursor-pointer bg-primary-dark shadow-2xl">
                                            <Image className="w-4 cursor-pointer" src={require("@/assets/icons/plus_icon.svg")} alt="plus" />
                                        </div>
                                        <img src={preview} alt="preview" className={(rounded ? "rounded-[3rem] " : " ") + "w-full h-96 md:h-64 object-cover object-center group-hover:opacity-80 cursor-pointer"}/>
                                    </div>
                                    {onError && (
                                        <div className="text-xs text-danger">{onError}</div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <label onClick={() => inputRef?.current.click()} className={(onError ? "border-2 border-danger focus:border-danger " : "focus:border-primary border-gray-100 ") + (rounded ? "rounded-[3rem] " : " ") +
                                        "w-full h-96 md:h-64  flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-gray-100 group"}>
                                        <div className="flex flex-col items-center justify-center space-y-12 md:space-y-8 py-3 px-4">
                                            <div className="p-2 absolute rounded-full bg-primary-dark shadow-2xl hidden group-hover:block ">
                                                <Image className="w-4" src={require("@/assets/icons/plus_icon.svg")} alt="plus" />
                                            </div>
                                            {/* <svg aria-hidden="true" className="w-10 h-10 mb-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg> */}
                                            <Image className="w-44 h-44 md:w-32 md:h-32 " src={require("@/assets/icons/picture_icon.svg")} alt="picture" />
                                            <div className= "text-primary-darkness font-semibold underline text-3xl md:text-lg text-center max-w-xs">Upload Image Here</div>
                                        </div>
                                    </label>
                                    {onError && (
                                        <div className="pl-2 py-2 space-x-2 flex">
                                            <Image className="w-4" src={require(`@/assets/icons/warning_circle.svg`)} alt="warning" />
                                            <div className="text-xs text-danger">
                                                {onError}
                                            </div>
                                        </div>
                                    )}
                            </>     
                            )}
                        </>
                    )
                }


                <input
                    ref={inputRef}
                    rows={row}
                    className={`hidden ${className}`}
                    onChange={(e) => (handleChange(e), change && change(e), setValueInput(e.target.files))}
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    name={name}
                />
            </div>

        </>
    );
}