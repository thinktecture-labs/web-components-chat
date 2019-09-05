import { BaseInput } from './base-input';

const template = document.createElement('template');

template.innerHTML = `
<style>
    input {
        width: 100%;
        font-size: 16pt;
        padding: 0.25rem 1rem;
        border: 2px solid #08e375;
        border-radius: 1000px;
    }
    
    input:active:not(:disabled), input:focus:not(:disabled) {
        outline: none;
        border-color: #38a3e5;
    }
    
    input:disabled {
        border-color: #5d6b75;
    }
    
    .is-invalid {
        border: 2px solid #fb313b;
    }
</style>

<input />
`;

export class BaseField extends BaseInput {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.element = this.shadowRoot.querySelector('input');
    this.inputType = '--invalid--';

    this.element.addEventListener('input', () => {
      this.value = this.element.value;
      this.dispatchEvent(new CustomEvent('valueChange', { detail: this.element.value }));
    });
  }

  static get observedAttributes() {
    return [ 'placeholder', 'value' , 'required'];
  }

  get placeholder() {
    return this.getAttribute('placeholder');
  }

  set placeholder(value) {
    this.setAttribute('placeholder', value);
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  set isInvalid(value) {
    value = value === 'true' || value === 'required' || value === 1;
    this.setAttribute('isInvalid', value);
  }

  get isInvalid() {
    return !!this.getAttribute('isInvalid');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    super.render();

    this.element.setAttribute('type', this.inputType);
    this.element.setAttribute('placeholder', this.placeholder || '');
    this.element.setAttribute('value', this.value || '');

    if (this.isInvalid) {
      this.element.classList.add('is-invalid');
    }
    else {
      this.element.classList.remove('is-invalid');
    }
  }
}
