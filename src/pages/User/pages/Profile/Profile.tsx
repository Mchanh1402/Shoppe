import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import { useForm, Resolver, Controller, FormProvider } from 'react-hook-form'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { UserSchema, userSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useMemo, useState } from 'react'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfiletoLS } from 'src/utils/auth'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import InputFile from 'src/components/InputFile'
import Info from 'src/components/Info'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'avatar' | 'date_of_birth'>
type FormDataError = Omit<
  FormData,
  'date_of_birth' & {
    date_of_birth?: string
  }
>
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'avatar', 'date_of_birth'])
export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  // Tạo ra 1 đoạn url từ file
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data?.data
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    // type script không thể hiểu yupResolver(profileSchema) nên sử dụng Resolver để ép kiểu
    resolver: yupResolver(profileSchema) as Resolver<FormData>
  })
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = methods

  const avatar = watch('avatar')

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      setProfiletoLS(res.data.data)
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  return (
    <div className='rounded-sm bg-white px-2 pb-10  shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <div className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</div>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ bảo mật tài khoản</div>
      </div>
      <FormProvider {...methods}>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='w-full truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
              <div className='w-full sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>{profile?.email}</div>
              </div>
            </div>
            <Info />
            <div className='flex flex-col flex-wrap sm:mt-2 sm:flex-row'>
              <div className='w-full truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
              <div className='w-full sm:w-[80%] sm:pl-5'>
                <Input
                  register={register}
                  name='address'
                  placeholder='Địa chỉ'
                  errorMessage={errors.address?.message}
                  classNameInput='px-3 py-2 w-full border rounded-sm border-gray-300 outline-none 
                focus:border-gray-500 focus:shadow-sm'
                />
              </div>
            </div>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

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
          <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200 '>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24'>
                <img
                  src={previewImage || getAvatarUrl(avatar)}
                  alt=''
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <InputFile onChange={handleChangeFile} />
              <div className='mt-3 text-gray-400'>
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
