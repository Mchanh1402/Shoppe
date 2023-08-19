import { InputHTMLAttributes, useState } from 'react'
import { useController, UseControllerProps, FieldValues, FieldPath } from 'react-hook-form'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
}
/**
 *  Rule Validate
 *  Nếu có price_min và price_max thì price max >= price_min
 *  Có price_min thì không có price_max và ngược lại
 */

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputNumberProps) {
  const {
    type,
    onChange,
    className,
    classNameInput = 'w-full border border-gray-300 p-2.5 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFormInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFormInput) || valueFormInput === '')
    if (numberCondition || type !== 'number') {
      setLocalValue(valueFormInput)
      // Gọi field.onChange để cập nhập vào state ReactHookForm
      field.onChange(event)
      // Thực thi onChange callback từ bên ngoài vào props
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input {...rest} {...field} className={classNameInput} onChange={handleChange} value={value || localValue} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}
export default InputV2
