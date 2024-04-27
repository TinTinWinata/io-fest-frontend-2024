import Navbar from '../components/navbar';
import { IChildren } from '../interfaces/children-interface';

export default function FullLayout({ children }: IChildren) {
  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      <div className="center">{children}</div>
    </div>
  );
}
