import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import notFound from '../animations/not-found-2.json';
import Button from '../components/button';

type TNotFoundProps = {
  text?: string;
  buttonText?: string;
  link?: string;
};

export default function NotFoundPage({
  text = "Ups! It's looks you're missing!",
  buttonText = 'Take me to home page',
  link = '/',
}: TNotFoundProps) {
  return (
    <div className="min-h-screen rounded-xl pt-8 pb-20 center flex-col  w-full h-full">
      <Lottie className=" sm:w-[500px]" animationData={notFound} />
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-[1.5em] sm:text-[2.4em] text-center font-bold">
          {text}
        </h1>
        <Link className="relative z-100" to={link}>
          <Button className="text-sm sm:text-lg py-2 px-8 sm:py-2 sm:px-20">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
}
