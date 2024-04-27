import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps } from 'react';
import { IChildren } from '../interfaces/children-interface';

interface IButton extends IChildren {
  style?: CSSProperties;
  className?: string;
  type?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  props?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}

export default function Button({
  type = 'primary',
  children,
  style,
  className,
  onClick,
  props,
  disabled = false,
}: IButton) {
  let bgColor = '';
  if (type === 'primary') {
    bgColor = 'from-accent-1 to-accent-2 bg-gradient-to-b';
  } else if (type === 'secondary') {
    bgColor = 'bg-gray-700';
  }
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={() => onClick && onClick()}
      style={style}
      className={`${className} ${bgColor} cursor-none transition-all py-1.5 px-5  rounded-md `}
    >
      {children}
    </button>
  );
}
