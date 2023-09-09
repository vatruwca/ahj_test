import controlLuhn from './luhn';

export function paySystem(value) {
  let payClass = null;
  if (/^4/.test(value)) {
    payClass = '.visa';
  } if (/^5[1-5]/.test(value)) {
    payClass = '.mastercard';
  } if (/^3[47]/.test(value)) {
    payClass = '.amex';
  } if (/^(?:2131|1800|35\d{3})\d{11}/.test(value)) {
    payClass = '.jcb';
  } if (/^2/.test(value)) {
    payClass = '.mir';
  } if (/^6(?:011|5)/.test(value)) {
    payClass = '.discover';
  } if (/^3(?:0[0-5]|[68])/.test(value)) {
    payClass = '.diners';
  }
  return payClass;
}

export function paramPaySystem(value) {
  if (paySystem(value) != null) {
    return true;
  }
  return false;
}

function paramOnlyNumbers(value) { // содержит не цифры -> false
  const regex = /^[0-9]+$/;
  return regex.test(value);
}

export default function isValidCard(value) {
  const paramLuhn = controlLuhn(value);

  let paramLenght;
  if (value.length >= 14 && value.length <= 16) {
    paramLenght = true;
  } else {
    paramLenght = false;
  }

  const paramOnlyNumber = paramOnlyNumbers(value);

  const paramPay = paramPaySystem(value);

  return (paramLuhn && paramLenght && paramOnlyNumber && paramPay);
}
