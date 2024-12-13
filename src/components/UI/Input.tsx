import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form';

type FormFields = {
  name: string;
  email: string;
  assignment_description: string;
  github_repo_url: string;
  candidate_level: string;
};

type InputProps = {
  label: string;
  name: keyof FormFields;
  placeholder: string;
  error?: string;
  register: UseFormRegister<FormFields>;
}

const Input: FC<InputProps> = ({ label, name, placeholder, error, register }) => {
  return (
    <div className='flex flex-col items-start w-80'>
      <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <input
        {...register(name)}
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        className="block w-full h-10 min-w-0 grow py-1.5 pl-1 pr-3 bg-white border border-1 border-gray-300 rounded-md text-base text-gray-900 placeholder:text-gray-400"
      />
      <p className='text-xs text-red-600 whitespace-normal'>{error && error}</p>
    </div>
  )
}

export default Input