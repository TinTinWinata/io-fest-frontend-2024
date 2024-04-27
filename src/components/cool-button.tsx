import { IChildren } from '../interfaces/children-interface';
import Button from './button';

interface ICoolButton extends IChildren {
  className?: string;
  onClick?: () => void;
}

export default function CoolButton({
  children,
  className,
  onClick,
}: ICoolButton) {
  return (
    <Button onClick={() => onClick && onClick()} className={className}>
      {children}
    </Button>
  );
}
