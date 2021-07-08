import { Type } from '@freik/core-utils';

const dockStyle = new Map<
  string,
  'column' | 'column-reverse' | 'row' | 'row-reverse'
>([
  ['top', 'column'],
  ['bottom', 'column-reverse'],
  ['left', 'row'],
  ['right', 'row-reverse'],
]);

export type DockProps = {
  location: 'top' | 'bottom' | 'left' | 'right';
  style?: React.CSSProperties;
  children?: JSX.Element | JSX.Element[] | string;
};

const theStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'stretch', // Maybe switch to center based on something?
};

export function Dock({ location, style, children }: DockProps): JSX.Element {
  const mostChildren = Type.isArray(children)
    ? children.slice(0, children.length - 1)
    : [];
  const lastChild = Type.isArray(children) ? (
    children[children.length - 1]
  ) : Type.isString(children) ? (
    children
  ) : (
    <div />
  );
  const divStyle = {
    ...theStyle,
    flexDirection: dockStyle.get(location),
    ...style,
  };
  return (
    <div style={divStyle}>
      {mostChildren}
      <div style={{ flexGrow: 1 }}>{lastChild}</div>
    </div>
  );
}
