import Image from "next/image";

export default function ButtonSolid({ text, click, type = 'button', className, disabled, icon }) {

  return (
    <>
      <button
        className={`${disabled && 'bg-gray-500'} shadow-md font-semibold rounded-lg hover:opacity-80 focus:ring-0 focus:outline-none ${className}`}
        type={type}
        onClick={click}
        disabled={disabled}
      >
        {
          icon ? (
            <div className="flex space-x-3 justify-center items-center">
              <div className="w-8 h-8">
                <Image alt="button" src={require(`@/assets/icons/${icon}`)} className="w-full h-full" />
              </div>
              <div>
                {text}
              </div>
            </div>
          ) : (
            <div>
              {text}
            </div>
          )
        }
      </button>
    </>
  );
}