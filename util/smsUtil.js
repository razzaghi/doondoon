export const generateVerifyCode = (length) => {
  let x = Math.pow(10, length - 1)
  let y = Math.pow(10, length) - x
  return Math.floor(Math.random() * y + x).toString()
}
