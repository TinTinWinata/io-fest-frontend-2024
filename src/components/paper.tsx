import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IChildren } from '../interfaces/children-interface';

interface IPaperProps extends IChildren {
  props?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  className?: string;
}

export default function Paper({ children, props, className }: IPaperProps) {
  return (
    <div
      {...props}
      className={`${className} rounded-xl bg-secondary bg-opacity-10`}
    >
      {children}
    </div>
  );
}
