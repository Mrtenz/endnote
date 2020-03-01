import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import fetch from 'node-fetch';
import { stringify } from 'querystring';
import { getVariable } from '../environment';

const RECAPTCHA_ENDPOINT = 'https://www.google.com/recaptcha/api/siteverify';

interface RecaptchaResponse {
  success: boolean;
  'error-codes': string[];
}

/**
 * Validator constraint which implements reCAPTCHA token validation.
 */
@ValidatorConstraint({ async: true })
export class IsValidTokenConstraint implements ValidatorConstraintInterface {
  async validate(token: string): Promise<boolean> {
    const body = stringify({
      secret: getVariable('RECAPTCHA_SECRET'),
      response: token
    });

    const response = await fetch(RECAPTCHA_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Accept: 'application/json'
      },
      body
    });

    const json = (await response.json()) as RecaptchaResponse;
    return json.success;
  }
}

/**
 * Decorator to validate Google reCAPTCHA tokens.
 *
 * @param {ValidationOptions} options
 * @return {Function}
 */
export const IsValidToken = (options?: ValidationOptions): ((object: object, propertyName: string) => void) => {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsValidTokenConstraint
    });
  };
};
