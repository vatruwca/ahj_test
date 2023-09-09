import isValidCard, { paySystem } from './validation';

export default class InnFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onSubmit = this.onSubmit.bind(this);
  }

  bindToDOM() {
    this.element = this.parentEl.querySelector('.validator_body');
    this.submit = this.element.querySelector('.button');
    this.input = this.element.querySelector('.input');

    this.result = this.element.querySelector('.result');
    this.textResult = this.element.querySelector('.result_text');

    this.submit.addEventListener('click', (e) => {
      e.preventDefault();
      this.onSubmit();
    });
  }

  onSubmit() {
    const { value } = this.input;
    if (isValidCard(value)) {
      this.showCard(value);
      this.showMessage('valid', 'invalid', 'card is valid');
    } else {
      this.showMessage('invalid', 'valid', 'card is not valid');
    }
  }

  showCard(value) {
    this.cardPay = this.element.querySelector(paySystem(value));
    this.cardPay.classList.remove('cardDisabled');
    this.cardPay.classList.add('cardSelected');
  }

  showMessage(classAdd, classRemote, text) {
    this.result.classList.add(classAdd);
    this.result.classList.remove(classRemote);
    this.textResult.textContent = text;
    this.result.classList.remove('hidden');
    this.textResult.classList.remove('hidden');

    this.input.addEventListener('click', () => {
      this.clearAll();
    });
  }

  clearAll() {
    this.result.classList.add('hidden');
    this.textResult.classList.add('hidden');
    this.input.value = '';

    this.input.removeEventListener('click', () => {
      this.clearAll();
    });

    this.cardPay.classList.remove('cardSelected');
    this.cardPay.classList.add('cardDisabled');
  }
}
