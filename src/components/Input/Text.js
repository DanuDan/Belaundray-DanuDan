import Image from "next/image";
import { useEffect, useImperativeHandle, useRef, useState } from "react";

export default function InputText({
    placeholder,
    change,
    name,
    className,
    disabled,
    defaultValue,
    label,
    value,
    min,
    error,
    fieldName,
    required,
    submit,
    icon
}) {

    const inputRef = useRef().current
    const [valueInput, setValueInput] = useState(value)
    const [onError, setOnError] = useState(null)

    useEffect(() => {
        error && setOnError(error)
    }, [error])

    useEffect(() => {
        if (required && valueInput?.length == 0) {
            setOnError(`Field ${fieldName} wajib diisi!`)
        } else if (min && valueInput?.length < min) {
            setOnError(`Huruf kurang dari ${min}`)
        } else {
            setOnError(null)
        }
    }, [valueInput]);

    useImperativeHandle(inputRef, () => ({
        resetValue() {
            console.log("Ter reset");
        }
    }))

    return (
        <div className="relative">
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
                <input
                    className={(onError ? "border-danger focus:border-danger " : "focus:border-primary-darkness border-primary-dark ") + `py-3 bg-gray-100 px-4 rounded-lg border-2 focus:bg-gray-50 focus:outline-none focus:shadow focus:shadow-primary/30 ${className}`}
                    type="text"
                    placeholder={placeholder}
                    onChange={(e) => (change && change(e), setValueInput(e.target.value))}
                    onFocus={(e) => setValueInput(e.target.value)}
                    onBlur={() => !required && setOnError(null)}
                    name={name}
                    value={value}
                    onSubmit={submit}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    min={min}
                />
                {
                    icon ? (
                        <div className="absolute inset-y-0 right-2 flex items-center pl-2">
                            <div className="p-1 focus:outline-none focus:shadow-outline">
                                <Image alt="icon" src={require(`@/assets/icons/${icon}`)} className="w-5 h-5" />
                            </div>
                        </div>
                    ) : (
                        <div>
                        </div>
                    )
                }
                {onError && (
                    <div className="pl-2 space-x-2 flex pt-1">
                        <Image className="w-4" src={require(`@/assets/icons/warning_circle.svg`)} alt="warning" />
                        <div className="text-xs text-danger">
                            {onError}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}