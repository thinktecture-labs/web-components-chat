import { Component, ComponentDidLoad, Event, EventEmitter, h, Listen, State, Element } from '@stencil/core';

@Component({
  tag: 'stencil-message-composer',
  styleUrl: 'message-composer.component.css',
  shadow: true,
})
export class MessageComposerComponent implements ComponentDidLoad {
  @Event() messageComposed: EventEmitter<string>;
  @State() value: string;
  @State() isInvalid: boolean = true;
  @Element() hostElement: HTMLElement;

  private textFieldElement: HTMLInputElement;

  private messageComposedHandler(event: Event = undefined) {
    if (this.isInvalid) {
      return;
    }

    this.messageComposed.emit(this.value);
    this.value = '';
    this.isInvalid = true;

    if (event) {
      event.preventDefault();
    }
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'Enter') {
      this.messageComposedHandler();
    }
  }

  componentDidLoad() {
    // TODO: Can we use JSX for that?
    this.textFieldElement.addEventListener('valueChange', (event: CustomEvent) => {
      this.value = event.detail;
      this.isInvalid = !this.value;
    });

    let border, margin, padding;
    // Debug
    window.addEventListener('message', event => {
      if (event.data) {
        if (event.data.expose) {
          border = this.hostElement.style.border;
          margin = this.hostElement.style.margin;
          padding = this.hostElement.style.padding;
          this.hostElement.style.border = '5px dashed purple';
          this.hostElement.style.margin = this.hostElement.style.padding = '0.5rem';
        } else {
          this.hostElement.style.border = border;
          this.hostElement.style.margin = margin;
          this.hostElement.style.padding = padding;
        }
      }
    });
  }

  render() {
    return <form>
      <native-web-component-text-field value={this.value} ref={e => this.textFieldElement = e}/>
      <native-web-component-button onClick={() => this.messageComposedHandler()} disabled={this.isInvalid}>
        <slot name="button">Send</slot>
      </native-web-component-button>
    </form>;
  }
}
