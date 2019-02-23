import { typed } from './typed-input-mixin';

export class HTMLTypedInputElement extends typed(HTMLInputElement) {}

customElements.define('typed-input', HTMLTypedInputElement, { extends: 'input' });
