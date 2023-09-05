import { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Input from '../Input'
import InputNumber from '../InputNumber'
import { UserSchema } from 'src/utils/rules'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'avatar' | 'date_of_birth'>
export default function Info() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()
  return (
    <Fragment>
      <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
        <div className='w-full truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
        <div className='w-full sm:w-[80%] sm:pl-5'>
          <Input
            register={register}
            name='name'
            placeholder='Tên'
            errorMessage={errors.name?.message}
            classNameInput='px-3 py-2 w-full border rounded-sm border-gray-300 outline-none 
                focus:border-gray-500 focus:shadow-sm'
          />
        </div>
      </div>
      <div className='flex flex-col flex-wrap sm:mt-2 sm:flex-row'>
        <div className='w-full truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
        <div className='w-full sm:w-[80%] sm:pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                placeholder='Số điện thoại'
                errorMessage={errors.phone?.message}
                classNameInput='px-3 py-2 w-full border rounded-sm border-gray-300 outline-none 
                    focus:border-gray-500 focus:shadow-sm'
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </Fragment>
  )
}
