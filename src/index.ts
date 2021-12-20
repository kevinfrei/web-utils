/* eslint-disable @typescript-eslint/naming-convention */
import type {
  ConfirmationDialogProps,
  TextInputProps as tip,
} from './Dialogs.js';
import { ConfirmationDialog, TextInput as ti } from './Dialogs.js';
import type { DockProps as dP } from './Dock.js';
import { Dock as localDock } from './Dock.js';
import type { FillProps as fillP } from './Fill.js';
import { Fill as localFill } from './Fill.js';
import type { FullPageProps as fpP } from './FullPage.js';
import { FullPage as localFP } from './FullPage.js';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Layout {
  export const Dock = localDock;
  export const Fill = localFill;
  export const FullPage = localFP;
  export type FillProps = fillP;
  export type FullPageProps = fpP;
  export type DockProps = dP;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Dialogs {
  export type ConfirmationProps = ConfirmationDialogProps;
  export type TextInputProps = tip;
  export const Confirmation = ConfirmationDialog;
  export const TextInput = ti;
}

export * from './FluentHelp.js';
export * from './Helpers.js';
export * from './RecoilHelp.js';
export * from './Hooks.js';
