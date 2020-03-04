import { TextEncoder } from 'util';

if (typeof TextEncoder === 'undefined') {
  // tslint:disable-next-line
  (window as any).TextEncoder = TextEncoder;
}
