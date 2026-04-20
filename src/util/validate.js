export const validateEmail = (email) => {
  const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return validRegex.test(email);
};

export const validatePassword = (password) => {
  const validRegex =
    /^(((?=.*[A-Za-z])(?=.*\d))|((?=.*[a-z])(?=.*[A-Z]))|((?=.*[A-Za-z])(?=.*[![\]¥"#$%&'()\-^@;:,.\\_/=~|`{+*}<>?]))|((?=.*\d)(?=.*[![\]¥"#$%&'()\-^@;:,.\\_/=~|`{+*}<>?])))[A-Za-z\d[![\]¥"#$%&'()\-^@;:,.\\_/=~|`{+*}<>?]{8,}$/;
  if (!validRegex.test(password) || password.length > 20) {
    return false;
  }
  return true;
};

export const validateConfirmPassword = (confirmPassword, password) => {
  if (confirmPassword !== password) {
    return false;
  }
  return true;
};
