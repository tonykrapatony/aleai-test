'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import Input from './UI/Input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from './UI/Button';
import { fetchData } from '@/helper/fetch'
import { redirect } from 'next/navigation';

type FormFields = {
  name: string;
  email: string;
  assignment_description: string;
  github_repo_url: string;
  candidate_level: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(1),
  email: yup.string().required("Email is required").email('Enter correct format email'),
  assignment_description: yup.string().required("Assignment description is required").min(10, 'Minimum 10 characters'),
  github_repo_url: yup.string().required("GitHub repository URL is required").url('Enter correct GitHub repository URL'),
  candidate_level: yup.string().required("Candidate level is required.").oneOf(['Junior', 'Middle', 'Senior', 'Principal'], 'Candidate level must be one of Junior, Middle, Senior or Principal.'),
});

export default function Form() {
  const [levels, setLevels] = useState<string[]>([]);
  const [levelsError, setLevelsError] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormFields) => {
    console.log(data)
    const res = await fetchData('https://tools.qa.public.ale.ai/api/tools/candidates/assignments', "POST", data);
    console.log(res)
    if (res.status === "success") {
      redirect('/thank-you')
    } else {
      setError(res.message);
    }
  }

  useEffect(() => {
    const fetchLevels = async () => {
      const levelsData = await fetchData('https://tools.qa.public.ale.ai/api/tools/candidates/levels');
      if (levelsData?.levels) {
        setLevels(levelsData.levels);
        setLevelsError('')
      } else {
        setLevelsError('Error when getting candidate levels')
      }
    };
    fetchLevels();
  }, [])

  return (
    <form
      className='flex flex-col items-center gap-3'
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className='text-xs text-red-600'>{levelsError}</p>
      <p className='text-xs text-red-600'>{error}</p>
      <Input label='Name' name='name' placeholder='John' register={register} error={errors?.name?.message} />
      <Input label='Email' name='email' placeholder='john@email.com' register={register} error={errors?.email?.message} />
      <div className='flex flex-col items-start w-80'>
        <label htmlFor="assignment_description" className="block text-sm/6 font-medium text-gray-900">
          Assignment description
        </label>
        <textarea
          id="assignment_description"
          placeholder="Your message here..."
          {...register('assignment_description')}
          className="block w-full min-w-0 grow py-1.5 pl-1 pr-3 bg-white border border-1 border-gray-300 rounded-md text-base text-gray-900 placeholder:text-gray-400"
        >
        </textarea>
        <p className='text-xs text-red-600'>{errors?.assignment_description?.message}</p>
      </div>
      <Input label='GitHub repository URL' name='github_repo_url' placeholder='https://github.com/john/' register={register} error={errors?.github_repo_url?.message} />
      <div className='flex flex-col items-start w-80'>
        <label htmlFor="candidate_level" className="block text-sm/6 font-medium text-gray-900">
          Candidate level
        </label>
        <select className="block w-full h-10 min-w-0 grow py-1.5 pl-1 pr-3 bg-white border border-1 border-gray-300 rounded-md text-base text-gray-900 placeholder:text-gray-400"
          id="candidate_level"
          {...register('candidate_level')}
          defaultValue=""
        >
          <option value="" defaultChecked>Select level</option>
          {levels?.length > 0 && levels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <p className='text-xs text-red-600'>{errors?.candidate_level?.message}</p>
      </div>
      <Button type='submit' text='Apply' disabled={!isValid} />
    </form>
  )
}
