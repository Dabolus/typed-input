export class HTMLTypedInputElement extends HTMLInputElement {
  // Note: we have to use the any type because otherwise TypeScript complains
  set value(val: any) {
    if (val instanceof Date) {
      super.value = val.toISOString().slice(0, super.type === 'date' ? 10 : -1);
      return;
    }
    if (typeof val === 'boolean') {
      super.checked = val;
      return;
    }
    super.value = `${val}`;
  }

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
