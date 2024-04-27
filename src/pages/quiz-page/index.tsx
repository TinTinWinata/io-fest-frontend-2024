import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import { useUserAuth } from '../../contexts/user-context';
import { toastError } from '../../utils/toast';

export default function QuizPage() {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const proxyNavigate = (str: string) => {
    if (user) navigate(str);
    else toastError('Anda harus login untuk memulai perjalanan quiz anda!');
  };
  return (
    <div className="mt-36 flex-col gap-6 flex h-fit w-full max-w-xl">
      <h1 className="text-7xl sm:text-9xl font-black tracking-tighter text-center">
        QUIZ
      </h1>
      <p className=" text-center text-xl sm:text-2xl text-secondary-text">
        Test kemampuanmu dalam memahami sejarah dan budaya Indonesia bersama
        teman
      </p>
      <div className="grid grid-cols-2 grid-rows-[10rem] gap-8 p-8 isolate rounded-xl bg-white/10 shadow-lg ring-1 ring-black/5">
        <div
          className="grid"
          onClick={() => proxyNavigate("/quiz/create")}
        >
          <Button className="text-lg sm:text-2xl font-bold ">Buat Ruang</Button>
        </div>
        <div
          className="grid"
          onClick={() => proxyNavigate("/quiz/join")}
        >
          <Button className="text-lg sm:text-2xl font-bold">Ikut Ruang</Button>
        </div>
      </div>
    </div>
  );
}
