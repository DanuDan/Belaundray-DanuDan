import { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function InputNumber({
    placeholder,
    change,
    name,
    className,
    min,
    max,
    error,
    value,
    defaultValue,
    fieldName,
    required,
    label
}) {


    const [valueInput, setValueInput] = useState(null)
    const [onError, setOnError] = useState(null)
    const [valueNumber, setValueNumber] = useState(valueInput)

    useEffect(() => {
        error && setOnError(error)
    }, [error])

    const exceptThisSymbols = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

    useEffect(() => {
        setValueNumber(value)
    }, [value])

    useEffect(() => {
        if (required && valueInput?.length == 0) {
            setOnError(`Field ${fieldName} wajib diisi!`)
        } else if (min > valueInput?.length) {
            setOnError(`Nomor kurang dari ${min}`)
        } else if (max < valueInput?.length) {
            setOnError(`Nomor lebih dari ${max}`)
        } else {
            setOnError(null)
        }

        if (valueInput < 0) {
            setValueNumber(0)
        }
        else {
            setValueNumber(valueInput)
        }
    }, [valueInput]);

    return (
        <div className="relative">
            <div className="grid">
                {
                    label ? (
                        <label className="text-lg text-primary-dark font-medium w-full mb-2">
                            {label}
                        </label>
                    ) : (
                        ""
                    )
                }
                <input
                    className={(onError ? "border-danger focus:border-danger " : "focus:border-primary-darkness border-primary-dark ") + ` py-3 appearance-none bg-gray-100 px-4 rounded-lg border-2 focus:bg-gray-50 focus:outline-none focus:shadow focus:shadow-primary/30 ${className}`}
                    type="number"
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    value={valueNumber}
                    onChange={(e) => (change && change(e), setValueInput(e.target.value))}
                    onFocus={(e) => (required && setValueInput(e.target.value))}
                    onBlur={() => (!required && setOnError(null))}
                    onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                    name={name}
                />
                {onError && (
                    <div className="pl-2 space-x-2 flex pt-1">
                        <Image className="w-4" src={require(`@/assets/icons/warning_circle.svg`)} alt="circle" />
                        <div className="text-xs text-danger">
                            {onError}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}