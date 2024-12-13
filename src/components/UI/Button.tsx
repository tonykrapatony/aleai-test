import React, { FC } from 'react'

type ButtonProps = {
  type: "submit" | "reset" | "button";
  text: string;
  disabled: boolean;
}

const Button: FC<ButtonProps> = ({ type, text, disabled }) => {
  return (
    <button type={type} disabled={disabled}
      className='text-black border border-black rounded-md py-1.5 px-4 text-base text-gray-900 hover:bg-gray-900 hover:text-white disabled:text-gray-400 disabled:border-gray-400 disabled:hover:bg-white'
    >
        {text}
    </button>
  )
}

export default Button