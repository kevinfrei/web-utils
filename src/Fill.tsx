export type FillProps = {
  direction?:
    | 'vertical'
    | 'horizontal'
    | 'v'
    | 'h'
    | 'row'
    | 'r'
    | 'column'
    | 'c';
  style?: React.CSSProperties;
  children?: JSX.Element | JSX.Element[];
};

const baseStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
};

export function Fill({
  direction: which,
  style,
  children,
}: FillProps): JSX.Element {
  const divStyle = { ...baseStyle, ...style };
  if (which && (which[0] === 'v' || which[0] === 'c')) {
    divStyle.flexDirection = 'column';
    divStyle.height = '100%';
  } else {
    divStyle.flexDirection = 'row';
    divStyle.width = '100%';
  }
  return <div style={divStyle}>{children}</div>;
}
