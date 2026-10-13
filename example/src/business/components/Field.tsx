import ownedStyles0 from './Field.module.css';
import { componentClasses } from '../class-names';
import { cloneElement, isValidElement, useId, type ReactNode } from 'react';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function Field({ label, children, hint, htmlFor, control = false }: { label: string; children: ReactNode; hint?: string; htmlFor?: string; control?: boolean }) {
  const generatedId = useId();
  const hintId = `${generatedId}-hint`;
  const isControl = isValidElement<{ id?: string; 'aria-describedby'?: string }>(children) && ((typeof children.type === 'string' && ['input', 'select', 'textarea'].includes(children.type)) || control);
  const controlId = htmlFor || (isControl ? children.props.id : undefined) || generatedId;
  const content = isControl ? cloneElement(children, {
    id: controlId,
    'aria-describedby': [children.props['aria-describedby'], hint ? hintId : undefined].filter(Boolean).join(' ') || undefined,
  }) : htmlFor ? children : <div role="group" aria-labelledby={`${generatedId}-label`}>{children}</div>;
  return <div data-ui="aw-business-field" className={cn("aw-business-field")}><label id={`${generatedId}-label`} htmlFor={isControl || htmlFor ? controlId : undefined}>{label}</label>{content}{hint ? <small id={hintId}>{hint}</small> : null}</div>;
}
