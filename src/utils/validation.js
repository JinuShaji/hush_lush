/**
 * Validates an email address.
 * Strict rules:
 * - Must not be empty.
 * - Must strictly match standard email format: local-part@domain.tld
 * - TLD must be at least 2 characters (e.g. .com, .ae, .org)
 */
export function validateEmail(email) {
  const trimmed = (email || '').trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: 'Email address is required.',
    };
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address (e.g., name@example.com).',
    };
  }

  return { isValid: true };
}

/**
 * Validates a password.
 * Strict rules:
 * - Must not be empty.
 * - Must be at least 6 characters long.
 * - Must contain at least one letter and at least one number.
 */
export function validatePassword(password) {
  if (!password) {
    return {
      isValid: false,
      error: 'Password is required.',
    };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      error: 'Password must be at least 6 characters long.',
    };
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigit = /\d/.test(password);

  if (!hasLetter || !hasDigit) {
    return {
      isValid: false,
      error: 'Password must contain at least one letter and one number.',
    };
  }

  return { isValid: true };
}

/**
 * Calculates password strength meter (0 to 100)
 */
export function getPasswordStrength(password) {
  if (!password) return { score: 0, label: 'Empty', color: 'bg-slate-200' };

  let score = 0;
  if (password.length >= 6) score += 25;
  if (password.length >= 8) score += 25;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 25;
  if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score += 25;

  if (score <= 25) return { score, label: 'Weak', color: 'bg-red-500' };
  if (score <= 50) return { score, label: 'Fair', color: 'bg-amber-500' };
  if (score <= 75) return { score, label: 'Good', color: 'bg-blue-500' };
  return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
}
