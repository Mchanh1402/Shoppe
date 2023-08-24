import path from 'src/constants/path'
import Popover from '../Popover'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { purchasesStatus } from 'src/constants/purchase'

export default function NavHeader() {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='flex justify-end'>
      <Popover
        className='flex items-center  py-1  hover:text-white/70'
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col py-2 pl-2 pr-28'>
              <button className='px-3 py-2 hover:text-orange'>Tiếng Việt</button>
              <button className='mt-2 px-3 py-2 hover:text-orange'>English</button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>

        <span className='mx-1'>Tiếng việt</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {isAuthenticated && (
        <Popover
          className='ml-6 flex cursor-pointer items-center  py-1  hover:text-white/70'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link
                to={path.profile}
                className='block w-full bg-white px-4 py-2 text-left hover:bg-slate-100 hover:text-cyan-400'
              >
                Tài khoản của tôi
              </Link>
              <Link to='/' className='block w-full bg-white px-4 py-2 text-left hover:bg-slate-100 hover:text-cyan-400'>
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full bg-white px-4 py-2 text-left hover:bg-slate-100 hover:text-cyan-400'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='mr-2 h-5 w-5 flex-shrink-0'>
            <img
              src='data:image/jpeg;base64,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'
              alt='avtar'
              className='h-full w-full rounded-full object-cover'
            />
          </div>
          <div>{profile?.email}</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70 '>
            Đăng Ký
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40 '></div>
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70 '>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
