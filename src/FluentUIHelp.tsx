import { Spinner as Spinner9, SpinnerProps } from '@fluentui/react-components';
import { hasField } from '@freik/typechk';
import { Suspense } from 'react';

export type SpinnerUIProps = Partial<SpinnerProps> & {
  children: JSX.Element | JSX.Element[];
};

export function SpinSuspense(props: SpinnerUIProps): JSX.Element {
  const spinProps: Partial<SpinnerProps> = props;
  delete spinProps.children;
  if (!hasField(spinProps, 'label')) {
    spinProps.label = 'Please wait...';
  }
  if (!hasField(spinProps, 'labelPosition')) {
    spinProps.labelPosition = 'below';
  }
  const theSpinner = (
    <div className="mySpinner">
      <Spinner9 {...spinProps} />
    </div>
  );
  return <Suspense fallback={theSpinner}>{props.children}</Suspense>;
}
