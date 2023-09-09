export default function controlLuhn(value) {
  let sum = 0;
  let even = false;
  if (value) {
    const temp = String(value).replace(/[^\d]/g, '');
    for (let i = temp.length - 1; i >= 0; i -= 1) {
      let int = parseInt(temp.charAt(i), 10);
      if (even) {
        int *= 2;
        if (int > 9) {
          int -= 9;
        }
      }
      sum += int;
      even = !even;
    }
    return (sum % 10) === 0;
  }
  return false;
}
