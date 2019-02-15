export class HTMLTypedInputElement extends HTMLInputElement {
  get value(): any {
    switch (super.type) {
      case 'checkbox':
      case 'radio':
        return super.checked;
      case 'date':
      case 'datetime-local':
        return new Date(super.value);
      case 'number':
      case 'range':
        return parseFloat(super.value);
      // TODO: decide what to do with other input types (e.g. month, time, week, etc.)
    }
    // By default, just return the value attribute as a string
    return super.value;
  }

  get rawValue(): string {
    return super.value;
  }
}

customElements.define('typed-input', HTMLTypedInputElement, { extends: 'input' });
