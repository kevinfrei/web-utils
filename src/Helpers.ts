import { MakeError, Type } from '@freik/core-utils';

const err = MakeError('web-helpers-err');

export function Fail(name?: string, message?: string): never {
  const e = new Error();
  if (Type.isString(name)) {
    e.name = name;
  }
  if (Type.isString(message)) {
    e.message = message;
  }
  throw e;
}

// eslint-disable-next-line
export function Catch(e: any, msg?: string): void {
  if (msg) {
    err(msg);
  }
  if (e instanceof Error) {
    err(e);
  } else if (Type.has(e, 'toString') && Type.isFunction(e.toString)) {
    err(e.toString());
  }
}

// eslint-disable-next-line
export function onRejected(msg?: string): (reason: any) => void {
  return (reason: unknown) => {
    if (Type.isString(msg)) {
      err(msg);
    }
    err(reason);
  };
}
