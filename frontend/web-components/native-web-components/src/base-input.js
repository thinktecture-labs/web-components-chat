export class BaseInput extends HTMLElement {
  static get observedAttributes() {
    return [ 'disabled' ];
  }

  get disabled() {
    const result = this.getAttribute('disabled');

    return result === 1 || result === true || result === 'true' || result === 'disabled' ? 'disabled' : false;
  }

  set disabled(value) {
    this.setDisabled(this, value);
  }

  setDisabled(target, value) {
    if (value === 1 || value === true || value === 'true' || value === 'disabled') {
      target.setAttribute('disabled', 'disabled');
      return;
    }

    target.removeAttribute('disabled');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.element) {
      return;
    }
    this.setDisabled(this.element, this.disabled);
  }
}
