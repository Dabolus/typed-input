/**
 * By using this interface instead of `HTMLInputElement`, we avoid
 * having the generated typings include most DOM API already provided by
 * TypeScript. This is particularly useful since different versions of
 * TypeScript may have different DOM API typings (e.g. TS 3.0.3 and TS 3.1.1).
 */
interface InputElement {
  type: string;
  value: string;
  checked: boolean;
}

type Constructor<T> = new(...args: any[]) => T;

export const typed =
  <T extends Constructor<InputElement>>(baseElement: T) =>
    class extends baseElement {
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
  };

export class HTMLTypedInputElement extends typed(HTMLInputElement) {}

customElements.define('typed-input', HTMLTypedInputElement, { extends: 'input' });
