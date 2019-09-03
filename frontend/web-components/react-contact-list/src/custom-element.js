import React from 'react';
import ReactDOM from 'react-dom';

// by Konstantin Denerz <konstantin.denerz@thinktecture.com>
// enhanced by Manuel Rauber <manuel.rauber@thinktecture.com>
export default function defineElement(Component, elementName, observedAttributes = []) {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      observedAttributes.forEach(property => Object.defineProperty(this, property, { set: value => this.setterProxy(property, value) }))
    }

    setterProxy(name, value) {
      this.attributeChangedCallback(name, value, value);
    }

    connectedCallback() {
      const props = [...this.attributes].reduce((props, attribute) => ({ ...props, [attribute.name]: attribute.value }),
        { root: this });
      const instance = (<Component {...(props)}/>);
      ReactDOM.render(instance, this);
      this.instance = instance;
      this.props = props;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      const { instance } = this;
      if (!instance) return;
      const newProps = { ...(this.props), ...({ [name]: newValue }) };
      const newInstance = (<Component {...(newProps)}/>);
      ReactDOM.render(newInstance, this);
      this.instance = newInstance;
      this.props = newProps;
    }
  }

  CustomElement.observedAttributes = observedAttributes;
  window.customElements.define(elementName, CustomElement);
}
