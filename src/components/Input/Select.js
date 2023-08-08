import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function InputSelect({
    placeholder,
    change,
    name,
    className,
    error,
    children,
    loading,
    label,
    defaultValue,
    // calendar,
    required,
    fieldName,
    value
}) {

    const [placeholderSelect, setPlaceholderSelect] = useState(false)
    const [valueInput, setValueInput] = useState(null)
    const [onError, setOnError] = useState(null)

    useEffect(() => {
        if (!value && !defaultValue) {
            setPlaceholderSelect(false)
        } else {
            setPlaceholderSelect(true)
        }
    }, [value, defaultValue])
    

    useEffect(() => {
        error && setOnError(error)
    }, [error])

    useEffect(() => {
        if (required && valueInput == fieldName) {
            setOnError(`Field ${fieldName} wajib diisi!`)
        } else {
            setOnError(null)
        }
    }, [valueInput]);

    return (
        <div className="grid">

            {label && (
                <label className="text-lg text-primary-dark font-medium w-full ml-2 mb-2">
                    {label}
                </label>)
            }
            <div className="relative flex justify-center items-center w-full">
                {/* {calendar && (
                    <div className="absolute w-7 left-0 pl-3">
                        <Image className="w-full" src={require(`@/assets/icons/calendar-remove.svg`)} alt="warning" />
                    </div>
                )
                } */}
                <select
                    defaultValue={defaultValue}
                    value={value}
                    disabled={loading}
                    className={(onError ? "border-danger focus:border-danger " :
                        "focus:border-primary border-[#CCE0EE]") + ((defaultValue || value && placeholderSelect) && "text-black not-italic " || !placeholderSelect && " text-black not-italic ") + (loading && "bg-gray-400 ") +
                        //  (calendar && " !px-8 !bg-info !text-white ") + 
                         `  bg-no-repeat bg-right appearance-none bg-white px-4 sm:py-2 rounded-lg border-2 focus:bg-gray-100 focus:outline-none focus:shadow focus:shadow-primary/30 ${className}`}
                    placeholder={placeholder}
                    onChange={(e) => (change && change(e), setPlaceholderSelect(e.target.value ? true : false), setValueInput(null))}
                    onFocus={(e) => setValueInput(e.target.value)}
                    name={name}
                >
                    <option disabled={value || defaultValue || placeholderSelect} className="text-gray-400 bg-white italic">{placeholder}</option>
                    {children}
                </select>
                <div className="absolute w-8 right-0 pr-3">
                    {/* {calendar ? ( */}
                    <Image src={require(`@/assets/icons/chevron_down.svg`)} alt="refresh"/>
                    {/* // ) : <Image className="w-full" src={require(`@/assets/icons/chevron_down.svg`)} alt="warning" /> } */}
                </div>
            </div>
            {
                onError && (
                    <div className="pl-2 pt-2 space-x-2 flex">
                        <Image className="w-4" src={require(`@/assets/icons/warning_circle.svg`)} alt="warning" />
                        <div className="text-xs text-danger">
                            {onError}
                        </div>
                    </div>
                )
            }
        </div >
    );
}