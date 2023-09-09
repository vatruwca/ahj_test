import isValidInn, { paySystem } from '../validation';

test.each([
  ['', false],
  ['7000123456789014', false],
  ['4276807014927947', false],
  ['4276844027853695', false],
  ['2202200112561350', true],
  ['4000123456789017', true],
  ['5412751234123452', true],
  ['3540123456789016', true],
  ['30220298952472', true],
  ['6011004440227649', true],
  ['378742263945793', true],
  ['4000123456788a', false],
  ['427680014927-947', false],
  ['4000123456788', false],
  ['4000123,456788', false],
])(
  ('name validator for %s'),
  (numberCard, expecting) => {
    const result = isValidInn(numberCard);
    expect(result).toBe(expecting);
  },
);

test.each([
  ['2202200112561350', '.mir'],
  ['4111111111111111', '.visa'],
  ['5555555555554444', '.mastercard'],
  ['3530111333300000', '.jcb'],
  ['30220298952472', '.diners'],
  ['6011111111111117', '.discover'],
  ['378742263945793', '.amex'],
])(
  ('name validator for %s'),
  (numberCard, expecting) => {
    const result = paySystem(numberCard);
    expect(result).toBe(expecting);
  },
);
