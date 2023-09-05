/* eslint-disable @typescript-eslint/no-explicit-any */

// import { type RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//   email: {
//     required: {
//       value: true,
//       message: 'Chưa nhập email!'
//     },
//     pattern: {
//       value:
//         /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
//       message: 'Email không đúng định dạng'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 5 - 160 kí tự'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài từ 5 - 160 kí tự'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Chưa nhập mật khẩu'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 6 - 160 kí tự'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6 - 160 kí tự'
//     }
//   },
//   confirm_password: {
//     required: {
//       value: true,
//       message: 'Vui lòng xác nhận mật khẩu'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 6 - 160 kí tự'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6 - 160 kí tự'
//     },
//     validate:
//       typeof getValues === 'function'
//         ? (value) => value === getValues('password') || 'Xác nhận mật khẩu không trùng khớp'
//         : undefined
//   }
// })

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Chưa nhập email')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài tự 5 - 160 kí tự')
    .max(160, 'Độ dài tự 5 - 160 kí tự'),
  password: yup
    .string()
    .required('Chưa nhập mật khẩu')
    .min(6, 'Độ dài tự 6 - 160 kí tự')
    .max(160, 'Độ dài tự 5 - 160 kí tự'),
  confirm_password: handleConfirmPasswordYup('password'),
  price_min: yup.string().test({
    name: 'price_not_allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price_not_allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required()
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  phone: yup.string().max(20, 'Độ dài tối đa 20 kí tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 kí tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn 1 ngày trong quá khứ'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password')
})

export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
