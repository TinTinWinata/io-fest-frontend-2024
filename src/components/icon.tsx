import { Link } from 'react-router-dom';

interface IIconProps {
  className?: string;
}

export default function Icon({ className }: IIconProps) {
  return (
    <Link to="/home">
      <img src="/icon-5.png" className={`w-8 h-8 ${className}`}></img>
    </Link>
  );
}
