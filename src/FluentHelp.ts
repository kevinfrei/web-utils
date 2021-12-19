import { IDetailsList } from '@fluentui/react';
import { useState } from 'react';
import { CallbackInterface, RecoilState } from 'recoil';
import { BoolState, KeyEventType } from './RecoilHelp';

export type DialogData = [boolean, () => void];
// A simplifier for dialogs: [0] shows the dialog, [1] is used in the dialog
export type DialogState = [() => void, DialogData];

/**
 * A short cut for on/off states to make some things (like dialogs) cleaner
 *
 * @returns {BoolState} [state, trueSetter(), falseSetter()]
 */
export function useBoolState(initial: boolean): BoolState {
  const [state, setState] = useState(initial);
  return [state, () => setState(false), () => setState(true)];
}

export function useDialogState(): DialogState {
  const [isHidden, setHidden] = useState(true);
  return [() => setHidden(false), [isHidden, () => setHidden(true)]];
}

let lastHeard = performance.now();

export function kbHook<T extends KeyEventType>(
  filterState: RecoilState<string>,
  listRef: IDetailsList | null,
  shouldFocus: () => boolean,
  getIndex: (srch: string) => number,
) {
  return ({ set }: CallbackInterface) =>
    (ev: T): void => {
      if (ev.key.length > 1 || ev.key === ' ') {
        set(filterState, '');
        return;
      }
      const time = performance.now();
      const clear: boolean = time - lastHeard > 750;
      lastHeard = time;
      // const newFilter = clear ? ev.key : keyFilter + ev.key;
      set(filterState, (oldVal): string => {
        const srchString = clear ? ev.key : oldVal + ev.key;
        if (shouldFocus() && listRef !== null && srchString.length > 0) {
          const index = getIndex(srchString);
          listRef.focusIndex(index);
        }
        return srchString;
      });
    };
}
