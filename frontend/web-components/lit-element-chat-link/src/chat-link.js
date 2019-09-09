import { css, html, LitElement } from 'lit-element';
import { generatePreview } from './preview-link';

class ChatLink extends LitElement {
  static get properties() {
    return {
      link: { type: String },
      apiEndpoint: { type: String, attribute: 'api-endpoint' },
    };
  }

  // language=CSS
  static get styles() {
    return css`
        :host {
            display: flex;
        }
        
        .preview img {
            max-height: 120px;
            margin-right: 1rem;
        }
        
        .preview {
            cursor: pointer;
            display: flex;
        }
      
        .preview div header {
            font-size: 18pt;
            font-weight: bold;
        }
      
        .preview div p {
            font-size: 16pt;
        } 
    `;
  }

  constructor() {
    super();

    this._link = this.link = '';
    this._apiEndpoint = this.apiEndpoint = '';
    this.preview = null;
    this.isLoading = false;
  }

  set link(value) {
    this._link = value;

    this.updatePreview();
  }

  get link() {
    return this._link;
  }

  set apiEndpoint(value) {
    this._apiEndpoint = value;

    this.updatePreview();
  }

  get apiEndpoint() {
    return this._apiEndpoint;
  }

  updatePreview() {
    if (!this.apiEndpoint || !this.link) {
      this.isLoading = false;
      return;
    }

    this.isLoading = true;

    generatePreview(this.apiEndpoint, this.link).then(
      result => {
        this.isLoading = false;
        this.preview = result;
        return this.requestUpdate();
      },
      () => {
        this.isLoading = false;
        this.preview = null;
        return this.requestUpdate();
      },
    );
  }

  // TODO: This is not translatable yet
  get noPreviewAvailableTemplate() {
    return html `<div>No Preview available</div>`;
  }

  get isLoadingPreviewTemplate() {
    return html`<div>Loading preview...</div>`;
  }

  clickHandler() {
    if (this.preview.url) {
      window.open(this.preview.url, '_blank');
    }
  }

  get previewTemplate() {
    return html`
    <div @click="${this.clickHandler}" class="preview">
    ${this.preview.image
      ? html`<img src="${this.preview.image}" alt="Preview" />`
      : html``
    }
    
        <div>
            <header>${this.preview.title}</header>
            ${this.preview.description
      ? html`<p>${this.preview.description}</p>`
      : html``
    }
        </div>
    </div>
    `;
  }

  render() {
    if (this.isLoading) {
      return this.isLoadingPreviewTemplate;
    }

    if (!this.preview || !this.preview.title) {
      return this.noPreviewAvailableTemplate;
    }

    return this.previewTemplate;
  }
}

customElements.define('lit-element-chat-link', ChatLink);
