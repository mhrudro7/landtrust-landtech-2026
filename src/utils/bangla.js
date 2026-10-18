const BENGALI_DIGITS = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const ENGLISH_DIGITS = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

/**
 * Converts English digits in a number or string to Bengali digits
 */
export function toBengaliDigits(input) {
  if (input === undefined || input === null) return '';
  return String(input).replace(/[0-9]/g, (digit) => BENGALI_DIGITS[digit] || digit);
}

/**
 * Converts Bengali digits in a string to English digits
 */
export function toEnglishDigits(banglaStr) {
  if (!banglaStr) return '';
  return banglaStr.replace(/[০-৯]/g, (digit) => ENGLISH_DIGITS[digit] || digit);
}

/**
 * Formats a currency amount into Bangladeshi Taka format with Bengali digits (e.g. ১,২৫,০০০ ৳)
 */
export function formatBengaliCurrency(amount) {
  const num = typeof amount === 'string' ? parseFloat(toEnglishDigits(amount)) || 0 : amount || 0;

  const parts = num.toFixed(0).split('.');
  let lastThree = parts[0].substring(parts[0].length - 3);
  const otherNumbers = parts[0].substring(0, parts[0].length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formattedEn = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  return `${toBengaliDigits(formattedEn)} ৳`;
}

/**
 * Formats land area in Decimals (শতক)
 */
export function formatBengaliDecimal(area) {
  const num = typeof area === 'string' ? parseFloat(toEnglishDigits(area)) || 0 : area || 0;
  return `${toBengaliDigits(num.toFixed(2))} শতক`;
}
