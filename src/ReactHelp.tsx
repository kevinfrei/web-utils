import { Type } from '@freik/core-utils';
import React from 'react';

const msgsToUse = ['fetching from sources...', 'loading account...'];

export function useRecurringTimeout(
  ms: number,
  func: () => void,
  deps: unknown[],
) {
  return React.useEffect(() => {
    const timeout = setTimeout(() => func(), ms);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [func, ms, ...deps]);
}

export type TextRotaterProps = {
  every?: number;
  messages?: string[];
};

export function TextRotater({
  every,
  messages,
}: TextRotaterProps): JSX.Element {
  // Default to the first message passed
  const msg = messages || msgsToUse;
  const tm = Type.isNumber(every) && every > 0 ? every : 1000;
  const msgLen: number = msg.length;
  const [messageIndex, setMessageIndex] = React.useState(0);
  useRecurringTimeout(
    tm,
    () => {
      setMessageIndex((messageIndex + 1) % msgLen);
    },
    [messages, messageIndex],
  );

  return <div>{msg[messageIndex]}</div>;
}
