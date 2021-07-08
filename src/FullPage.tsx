const fullPageSize: React.CSSProperties = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export type FullPageProps = {
  style?: React.CSSProperties;
  children?: JSX.Element | JSX.Element[] | string;
};

export function FullPage({ style, children }: FullPageProps): JSX.Element {
  const newStyle = { ...fullPageSize, ...style };
  return <div style={newStyle}>{children}</div>;
}
