import Image from "next/image";
import { useEffect, useState } from "react";

export default function InputArea({
    placeholder,
    change,
    name,
    row,
    label,
    className,
    defaultValue,
    value,
    error,
    disabled,
    required,

}) {

    const [valueInput, setValueInput] = useState(value)
    const [onError, setOnError] = useState(null)

    useEffect(() => {
        error && setOnError(error)
    }, [error])

    useEffect(() => {
        value && setValueInput(error)
    }, [value])

    useEffect(() => {
        if (required && valueInput?.length == 0) {
            setOnError(`Field ${fieldName} wajib diisi!`)
        } else {
            setOnError(null)
        }
    }, [valueInput])


    return (

        <>
            <div className="grid">
                {
                    label ? (
                        <label className="text-lg text-primary-dark font-medium w-full mb-2 ">
                            {label}
                        </label>
                    ) : (
                        ""
                    )
                }
                <textarea
                    rows={row}
                    className={(onError ? "border-danger focus:border-danger " : "focus:border-primary-darkness border-primary-dark ") + `bg-gray-100 h-32 px-4 py-2 rounded-lg border-2 focus:bg-gray-50 focus:outline-none border-gray-100 focus:border-primary focus:shadow focus:shadow-primary/30 resize-none  ${className}`}
                    placeholder={placeholder}
                    onChange={(e) => (change && change(e), setValueInput(e.target.value))}
                    onFocus={(e) => setValueInput(e.target.value)}
                    value={value}
                    defaultValue={defaultValue}
                    name={name}
                    disabled={disabled}
                />
                {onError && (
                    <div className="pl-2 space-x-2 flex">
                        <Image className="w-4" src={require(`@/assets/icons/warning_circle.svg`)} />
                        <div className="text-xs text-danger">
                            {onError}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}