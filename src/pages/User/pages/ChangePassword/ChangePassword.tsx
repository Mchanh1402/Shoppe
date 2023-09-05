import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Resolver, useForm } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { UserSchema, userSchema } from 'src/utils/rules'
import { toast } from 'react-toastify'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])
export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    // type script không thể hiểu yupResolver(passwordSchema) nên sử dụng Resolver để ép kiểu
    resolver: yupResolver(passwordSchema) as Resolver<FormData>
  })

  const updateProfileMutation = useMutation(userApi.updateProfile)
  console.log()
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message)
      reset
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='rounded-sm bg-white px-2 pb-10  shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <div className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</div>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ bảo mật tài khoản</div>
      </div>
      <form className='mr-auto mt-8 max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:mt-2 sm:flex-row'>
            <div className='w-full truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu cũ</div>
            <div className='w-full sm:w-[80%] sm:pl-5'>
              <Input
                register={register}
                name='password'
                placeholder='Mật khẩu cũ'
                type='password'
                className='relative'
                errorMessage={errors.password?.message}
                classNameInput='px-3 py-2 w-full border rounded-sm border-gray-300 outline-none 
            focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>

          <div className='flex flex-col flex-wrap sm:mt-2 sm:flex-row'>
            <div className='w-full truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu mới</div>
            <div className='w-full sm:w-[80%] sm:pl-5'>
              <Input
                register={register}
                name='new_password'
                placeholder='Mật khẩu mới'
                type='password'
                className='relative'
                errorMessage={errors.new_password?.message}
                classNameInput='px-3 py-2 w-full border rounded-sm border-gray-300 outline-none 
            focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>

          <div className='flex flex-col flex-wrap sm:mt-2 sm:flex-row'>
            <div className='w-full truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Nhập lại mật khẩu</div>
            <div className='w-full sm:w-[80%] sm:pl-5'>
              <Input
                register={register}
                name='confirm_password'
                placeholder='Nhập lại mật khẩu'
                type='password'
                errorMessage={errors.confirm_password?.message}
                className='relative'
                classNameInput='px-3 py-2 w-full border rounded-sm border-gray-300 outline-none 
            focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>

          <div className=' flex flex-col flex-wrap sm:mt-2 sm:flex-row'>
            <div className='w-full truncate pt-3 capitalize sm:w-[20%] sm:text-right'></div>
            <div className='w-full sm:w-[80%] sm:pl-5'>
              <Button
                type='submit'
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center
             text-white hover:bg-orange/80
          '
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
