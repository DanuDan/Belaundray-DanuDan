import { useEffect, useState } from "react"
import { motion } from "framer-motion";

export default function LinkTab({ source, active, defaultValue, label }) {
    const [pointer, setPointer] = useState(defaultValue)

    useEffect(() => {
        pointer && active(pointer)
    }, [pointer])

    useEffect(() => {
        defaultValue && setPointer(defaultValue)
    }, [defaultValue])

    return (
        <motion.div
            initial={{
                opacity: 0.2,
                scale: 0
            }}
            transition={{
                duration: 0.1
            }}
            animate={{
                opacity: 1,
                scale: 1
            }}
            exit={{
                opacity: 0,
                scale: 0
            }}
            className=" w-full">
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
                <div className="grid grid-cols-2 gap-2 md:gap-0 md:flex md:space-x-5 items-center text-white">
                    {
                        source && source.map((item, i) => (
                            <div key={i} onClick={() => setPointer(item.id)} className="flex flex-col w-max-[11rem] transition-all cursor-pointer hover:opacity-80">
                                <div className={`${pointer == item.id ? 'text-white rounded-lg  bg-primary-dark' : 'text-white rounded-lg bg-primary'} text-white px-3 md:px-5 min-h-[3rem] max-h-20 h-auto flex items-center justify-center text-center whitespace-nowrap text-sm md:text-base md:text-left font-semibold uppercase`}>{item.name}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </motion.div >
    )
}