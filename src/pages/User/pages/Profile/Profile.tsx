import Input from 'src/components/Input'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white px-2 pb-10  shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <div className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</div>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ bảo mật tài khoản</div>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='w-full sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>nguyenchanh1402@gmail.com</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='w-full sm:w-[80%] sm:pl-5'>
              <Input classNameInput='px-3 py-2 w-full border rounded-sm border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='flex flex-col flex-wrap sm:mt-2 sm:flex-row'>
            <div className='w-full truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <div className='w-full sm:w-[80%] sm:pl-5'>
              <Input classNameInput='px-3 py-2 w-full border rounded-sm border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='flex flex-col flex-wrap sm:mt-2 sm:flex-row'>
            <div className='w-full truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='w-full sm:w-[80%] sm:pl-5'>
              <Input classNameInput='px-3 py-2 w-full border rounded-sm border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>

          <div className=' flex flex-col flex-wrap sm:mt-2 sm:flex-row'>
            <div className='w-full truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
            <div className='w-full sm:w-[80%] sm:pl-5'>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option value='' disabled>
                    Ngày
                  </option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option value='' disabled>
                    Tháng
                  </option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option value='' disabled>
                    Năm
                  </option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200 '>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src='https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/362956330_649232147140386_4446299982994874975_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=9LBJajYOtEIAX_YYBgm&_nc_oc=AQkfs3t1yvsn7WfUBH8iSl0bdUCbkwmDH6RdTUSu4qM0RlZmrTeJ2sHMpb3XNvyOb0g&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCt1nbG63DFYrib2iTjh1-207xLzlcliEzr-8c0wePaaQ&oe=64EC60D1'
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <input type='file' className='hidden' accept='.jpg,.jpeg,.png' />
            <button
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm
             text-gray-600 shadow-sm'
            >
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
