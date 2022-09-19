
export const validatorPositiveZero = value => {
  if (value && value !== '' && value <= 0) {
    return false
  }
  return true
}

export const requiredField = value => {
  if (value && value !== '') {
    return true
  }
  return false
}
