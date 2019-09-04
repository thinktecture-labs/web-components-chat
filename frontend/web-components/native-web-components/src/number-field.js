import { BaseField } from './base-field';

class NumberField extends BaseField {
  constructor() {
    super();
    this.inputType = 'number';
  }
}

window.customElements.define('native-web-component-number-field', NumberField);
