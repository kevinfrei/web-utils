import { Type } from '@freik/core-utils';
import React from 'react';

export type CenterDirectionName = {
  direction?:
    | 'vertical'
    | 'horizontal'
    | 'v'
    | 'h'
    | 'row'
    | 'r'
    | 'column'
    | 'c'
    | 'both'
    | 'b'
    | 'hv';
};

export type CenterDirectionHorizontal =
  | { horizontal: boolean }
  | { column: boolean }
  | { col: boolean };
export type CenterDirectionVertical = { vertical: boolean } | { row: boolean };
export type CenterDirectionBoth =
  | { both: boolean }
  | (CenterDirectionHorizontal & CenterDirectionVertical);

export type CenterPropsBasics = {
  style?: React.CSSProperties;
  children?: JSX.Element | string | (JSX.Element | string)[];
};

export type CenterProps = (
  | CenterDirectionBoth
  | CenterDirectionHorizontal
  | CenterDirectionName
  | CenterDirectionVertical
) &
  CenterPropsBasics;

const baseStyle: React.CSSProperties = {
  display: 'flex',
};

export function Center(props: CenterProps): JSX.Element {
  const divStyle = { ...baseStyle, ...props.style };
  const h =
    Type.has(props, 'horizontal') ||
    Type.has(props, 'column') ||
    Type.has(props, 'col') ||
    Type.has(props, 'both') ||
    (Type.hasStr(props, 'direction') &&
      (props.direction[0] === 'h' ||
        props.direction[0] === 'c' ||
        props.direction[0] === 'b'));
  const v =
    Type.has(props, 'vertical') ||
    Type.has(props, 'row') ||
    Type.has(props, 'both') ||
    (Type.hasStr(props, 'direction') &&
      (props.direction === 'hv' ||
        props.direction[0] === 'v' ||
        props.direction[0] === 'r' ||
        props.direction[0] === 'b'));
  if (h) {
    divStyle.flexDirection = 'column';
  } else if (v) {
    divStyle.flexDirection = 'row';
  }
  if (h || v) {
    divStyle.justifyContent = 'center';
  }
  if (h && v) {
    divStyle.alignItems = 'center';
  }
  return (
    <div className={`Center${h ? 'H' : ''}${v ? 'V' : ''}`} style={divStyle}>
      {props.children}
    </div>
  );
}
