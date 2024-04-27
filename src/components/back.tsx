import { FaAnglesLeft } from 'react-icons/fa6';

interface IBackProps {
  handleBack: () => void;
}

export default function Back({ handleBack }: IBackProps) {
  return (
    <div
      onClick={handleBack}
      className="relative z-[50] hover:underline w-full mb-1 items-center flex gap-1"
    >
      <FaAnglesLeft />
      <div className="">Kembali</div>
    </div>
  );
}
