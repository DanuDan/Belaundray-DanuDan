import { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function InputEmail({
    placeholder,
    change,
    name,
    label,
    className,
    defaultValue,
    fieldName,
    disabled,
    required,
    error
}) {
    const [valueInput, setValueInput] = useState(null)
    const [onError, setOnError] = useState(null)

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    useEffect(() => {
        error && setOnError(error)
    }, [error])

    useEffect(() => {
        if (required && valueInput?.length == 0) {
            setOnError(`Field ${fieldName} is required to be filled in.`)
        } else {
            setOnError(null)
        }
    }, [valueInput]);

    useEffect(() => {
        if (valueInput) {
            if (validateEmail(valueInput)) {
                setOnError(``)
            } else {
                setOnError(`Email not in correct format`)
            }
        }
    }, [valueInput]);

    return (
        <>
            <div className="relative">
                <div className="grid space-y-1">
                    {
                        label ? (
                            <label className="text-lg text-primary-dark font-medium w-full ml-2 mb-2 ">
                                {label}
                            </label>
                        ) : (
                            ""
                        )
                    }
                    <input
                        disabled={disabled}
                        className={(onError ? "border-danger focus:border-danger " : "focus:border-primary-dark border-gray-100 ") + ` py-2 bg-gray-100 px-4 rounded-lg border-2 focus:bg-gray-50 focus:outline-none focus:shadow focus:shadow-primary/30 ${className}`}
                        type="email"
                        placeholder={placeholder}
                        onChange={(e) => (change && change(e), setValueInput(e.target.value))}
                        onFocus={(e) => (required && setValueInput(e.target.value))}
                        onBlur={() => (!required && setOnError(null))}
                        name={name}
                        defaultValue={defaultValue}
                    />
                    {onError && (
                        <div className="pl-2 space-x-2 flex">
                            <Image alt="warning" className="w-4" src={require(`@/assets/icons/warning_circle.svg`)} />
                            <div className="text-xs text-danger">
                                {onError}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}