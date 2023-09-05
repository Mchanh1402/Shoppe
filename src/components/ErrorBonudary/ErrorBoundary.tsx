import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error: ', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          <div className='bg-gradient-to-r from-purple-300 to-blue-200'>
            <div className='m-auto flex min-h-screen w-9/12 items-center justify-center py-16'>
              <div className='overflow-hidden bg-white pb-8 shadow sm:rounded-lg'>
                <div className='border-t border-gray-200 pt-8 text-center'>
                  <h1 className='text-9xl font-bold text-purple-400'>500</h1>
                  <h1 className='mx-2 py-8 text-6xl font-medium'>oops! Some thing went wrong</h1>
                  <a
                    href='/'
                    className='hover:to-orange-500 mr-6 rounded-md bg-gradient-to-r from-purple-400 to-blue-500 px-6 py-3 font-semibold text-white hover:from-pink-500'
                  >
                    GO HOME
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
