import Image from "next/image";
import { useEffect, useState } from "react";

export default function InputPassword({
    placeholder,
    change,
    name,
    className,
    containerClassName,
    min,
    required,
    fieldName,
    error,
    label,
    defaultValue
}) {

    const [show, setShow] = useState(false)
    const [valueInput, setValueInput] = useState(null)
    const [onError, setOnError] = useState(null)

    useEffect(() => {
        error && setOnError(error)
    }, [error])

    useEffect(() => {
        if (required && valueInput?.length == 0) {
            setOnError(`Field ${fieldName} is required to be filled in.`)
        } else if (error) {
            setOnError(error)
        }
        else {
            setOnError(null)
        }
    }, [valueInput, error]);

    return (
        <div className={`space-y-1 ${className}`}>
            <div>
                {
                    label && (
                        <label className={(GF == true ? "text-sm whitespace-nowrap " : " text-lg ") + "text-primary-dark font-medium w-full ml-2 mb-2"}>
                            {label}
                        </label>
                    )
                }
            </div>
            <div className="grid relative">
                <input
                    className={(onError ? "border-danger focus:border-danger " : "focus:border-primary-darkness border-gray-100 ") + `py-2 bg-gray-100 px-4 rounded-lg border-2 focus:bg-gray-50 focus:outline-none focus:shadow focus:shadow-primary/30 ${containerClassName}`}
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    onChange={(e) => (change && change(e), setValueInput(e.target.value))}
                    onFocus={(e) => (required && setValueInput(e.target.value))}
                    onBlur={() => (!required && setOnError(null))}
                    min={min}
                    name={name}
                    defaultValue={defaultValue}
                />
                <div onClick={() => setShow(!show)} className="w-8 h-full absolute right-2 cursor-pointer hover:opacity-70 flex justify-center items-center">
                    <Image src={require(`@/assets/icons/${show ? "eye_show.svg" : "eye_hide.svg"}`)} className="w-5 h-5" alt="eye" />
                </div>
            </div>
            {onError && (
                <div className="pl-2 space-x-2 flex">
                    <Image className="w-4" src={require(`@/assets/icons/warning_circle.svg`)} />
                    <div className=" text-xs font-normal text-danger">
                        {onError}
                    </div>
                </div>
            )}
        </div>
    );
}