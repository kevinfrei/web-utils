import { Spinner, SpinnerProps } from '@fluentui/react-components';
import { hasField } from '@freik/typechk';
import { Suspense } from 'react';

export type SpinnerUIProps = SpinnerProps & {
  children: JSX.Element | JSX.Element[];
};

export function SpinSuspense(props: Partial<SpinnerUIProps>): JSX.Element {
  const children = hasField(props, 'children') ? props.children : <></>;
  if (!hasField(props, 'label')) {
    props.label = 'Please wait...';
  }
  if (!hasField(props, 'labelPosition')) {
    props.labelPosition = 'below';
  }
  const theSpinner = (
    <div className="mySpinner">
      <Spinner {...props} />
    </div>
  );
  return <Suspense fallback={theSpinner}>{children}</Suspense>;
}
