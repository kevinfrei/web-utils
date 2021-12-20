import {
  IconButton,
  IDetailsList,
  IFontStyles,
  ISeparatorStyles,
  IStyle,
  IToggleStyles,
  Separator,
  Spinner as FluentSpinner,
  SpinnerLabelPosition,
  SpinnerSize,
  Stack,
  Text,
  Toggle,
} from '@fluentui/react';
import { Type } from '@freik/core-utils';
import { Suspense, useState } from 'react';
import { CallbackInterface, RecoilState } from 'recoil';
import { BoolState, KeyEventType } from './Hooks.js';

let lastHeard = performance.now();

export function kbListHook<T extends KeyEventType>(
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
      set(filterState, (oldVal: string): string => {
        const srchString = clear ? ev.key : oldVal + ev.key;
        if (shouldFocus() && listRef !== null && srchString.length > 0) {
          const index = getIndex(srchString);
          listRef.focusIndex(index);
        }
        return srchString;
      });
    };
}

export type SpinnerProps = {
  children: JSX.Element | JSX.Element[];
  label?: string;
  position?: SpinnerLabelPosition;
  size?: SpinnerSize;
};

export function Spinner({
  children,
  label,
  position,
  size,
}: SpinnerProps): JSX.Element {
  const theLabel = label || 'Please wait...';
  const pos = position || 'bottom';
  const sz = size || SpinnerSize.medium;
  const theSpinner = (
    <div className="mySpinner">
      <FluentSpinner label={theLabel} labelPosition={pos} size={sz} />
    </div>
  );
  return <Suspense fallback={theSpinner}>{children}</Suspense>;
}

type StateToggleProps = {
  label: string;
  state: BoolState;
  disabled?: boolean;
  style?: IStyle;
};
// A helper for a toggle that uses a BoolState variable
export function StateToggle({
  label,
  state,
  disabled,
  style,
}: StateToggleProps): JSX.Element {
  const customStyle: Partial<IToggleStyles> = {};
  if (style) {
    customStyle.root = style;
  }
  return (
    <Toggle
      inlineLabel
      disabled={disabled}
      label={label}
      checked={state[0]}
      styles={customStyle}
      onChange={(_ev, checked?: boolean) => state[checked ? 2 : 1]()}
    />
  );
}

// A little control that expands or collapses the children
// with the header provided
export function Expandable({
  children,
  label,
  defaultShow,
  separator,
  variant,
}: {
  children: JSX.Element | JSX.Element[];
  label: string | JSX.Element;
  defaultShow?: boolean;
  separator?: boolean;
  variant?: keyof IFontStyles;
}): JSX.Element {
  const [hidden, setHidden] = useState(!defaultShow);
  const button = (
    <IconButton
      iconProps={{
        iconName: hidden ? 'ChevronRight' : 'ChevronDown',
      }}
      onClick={() => setHidden(!hidden)}
    />
  );
  let theHeader: JSX.Element;
  if (separator) {
    const customStyle: Partial<ISeparatorStyles> = {
      root: { marginLeft: '-10px' },
    };
    const v = variant || 'large';
    theHeader = (
      <Separator alignContent="start" styles={customStyle}>
        {button}
        {Type.isString(label) ? (
          <Text variant={v}>
            &nbsp;
            {label}
          </Text>
        ) : (
          label
        )}
      </Separator>
    );
  } else {
    const v = variant || 'medium';
    theHeader = (
      <Stack horizontal verticalAlign="center" style={{ marginTop: 10 }}>
        {button}
        {Type.isString(label) ? <Text variant={v}>{label}</Text> : label}
      </Stack>
    );
  }
  return (
    <>
      {theHeader}
      <div style={hidden ? { display: 'none' } : {}}>{children}</div>
    </>
  );
}
