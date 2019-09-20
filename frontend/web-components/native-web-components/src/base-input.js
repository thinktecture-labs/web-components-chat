export class BaseInput extends HTMLElement {
  static get observedAttributes() {
    return [ 'disabled' ];
  }

  constructor() {
    super();

    let border, margin, padding;
    // Debug
    window.addEventListener('message', event => {
      if (event.data) {
        if (event.data.expose) {
          border = this.shadowRoot.host.style.border;
          margin = this.shadowRoot.host.style.margin;
          padding = this.shadowRoot.host.style.padding;
          this.shadowRoot.host.style.border = '5px dashed red';
          this.shadowRoot.host.style.margin = this.shadowRoot.host.style.padding = '0.5rem';
        } else {
          this.shadowRoot.host.style.border = border;
          this.shadowRoot.host.style.margin = margin;
          this.shadowRoot.host.style.padding = padding;
        }
      }
    });
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
