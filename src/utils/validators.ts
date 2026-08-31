export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidPassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'A senha deve ter no mínimo 6 caracteres.' };
  }
  return { isValid: true };
};

export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

export const isValidCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11 || !!cleaned.match(/(\d)\1{10}/)) return false;

  let sum = 0;
  for (let i = 1; i <= 9; i++) sum += parseInt(cleaned.substring(i - 1, i), 10) * (11 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(9, 10), 10)) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cleaned.substring(i - 1, i), 10) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(10, 11), 10)) return false;

  return true;
};
