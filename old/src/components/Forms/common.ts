import {
  useRef,
  ChangeEvent,
  ReactNode,
  FocusEvent,
  MutableRefObject
} from 'react';
import { createId } from '../../helpers/utils';

export type CommonInputProps = {
  name: string;
  id?: string;
  value?: string;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  label?: ReactNode;
};

export function useInputId(id?: string): string {
  return useRef(id || `${name}-${createId(3)}`).current;
}