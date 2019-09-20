import { BaseField } from './base-field.js';

class TextField extends BaseField {
  constructor() {
    super();
    this.inputType = 'text';
  }
}

window.customElements.define('native-web-component-text-field', TextField);
