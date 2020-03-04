if (typeof TextEncoder === 'undefined') {
  const { TextEncoder } = require('util');
  (window as any).TextEncoder = TextEncoder; // tslint:ignore-line
}
