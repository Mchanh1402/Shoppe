import { InputHTMLAttributes, forwardRef, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}
/**
 *  Rule Validate
 *  Nếu có price_min và price_max thì price max >= price_min
 *  Có price_min thì không có price_max và ngược lại
 */

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberIner(
  {
    errorMessage,
    className,
    classNameInput = 'w-full border border-gray-300 p-2.5 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      // Thực thi onchange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
      // Cập nhập localValue state
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input {...rest} className={classNameInput} onChange={handleChange} value={value || localValue} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})
export default InputNumber
