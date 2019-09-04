import { BaseInput } from './base-input';

const template = document.createElement('template');

template.innerHTML = `<style>
    input {
        width: 100%;
    }
    
    .is-invalid {
        border: 1px solid crimson;
    }
</style>

<button><slot></slot></button>
`;

export class Button extends BaseInput {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.element = this.shadowRoot.querySelector('button');
    this.element.setAttribute('type', 'button');

    this.element.addEventListener('click', () => this.dispatchEvent(new CustomEvent('click')));
  }
}

window.customElements.define('native-web-component-button', Button);
