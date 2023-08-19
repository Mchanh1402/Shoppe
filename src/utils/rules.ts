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
  confirm_password: yup
    .string()
    .required('Chưa nhập xác nhận mật khẩu ')
    .min(6, 'Độ dài tự 6 - 160 kí tự')
    .max(160, 'Độ dài tự 5 - 160 kí tự')
    .oneOf([yup.ref('password')], 'Xác nhận mật khẩu không đúng'),
  //
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

export type Schema = yup.InferType<typeof schema>
