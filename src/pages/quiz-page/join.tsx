import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { useUserAuth } from "../../contexts/user-context";
import { useQuiz } from "../../api/quiz";
import { useState } from "react";
import { useMutation } from "react-query";

export default function JoinQuizPage() {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const { joinRoom } = useQuiz();
  const [name, setName] = useState<string>(user?.displayName ?? "");
  const [code, setCode] = useState<string>("")

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: joinRoom,
    mutationKey: ["create-room"],
  });

  const onSubmit = async () => {
    await mutateAsync({ code, name });
    navigate(`/quiz/room/${code}`);
  };

  return (
    <div className="center flex-col gap-8 h-screen w-full max-w-xl ">
      <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-center">
        Ikut Ruang Quiz
      </h1>
      <div className="flex flex-col gap-6 w-full p-8 isolate rounded-xl bg-white/10 shadow-lg ring-1 ring-black/5">
        <div className="relative h-16 w-full min-w-[200px]">
          <input
            type="text"
            className="peer h-full w-full rounded-[7px] border border-white bg-transparent border-t-transparent placeholder-shown:border-t-white px-3 py-2.5 font-sans text-xl font-normal  !text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-base font-normal leading-[0.75] !text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:leading-[3.5] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-base peer-focus:leading-[0.75] peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Masukkan Kode Room
          </label>
        </div>
        <div className="relative h-16 w-full min-w-[200px]">
          <input
            type="text"
            className="peer h-full w-full rounded-[7px] border border-white bg-transparent border-t-transparent placeholder-shown:border-t-white px-3 py-2.5 font-sans text-xl font-normal  !text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-base font-normal leading-[0.75] !text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:leading-[3.5] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-base peer-focus:leading-[0.75] peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Masukkan Nama
          </label>
        </div>
        <Button
          className="text-4xl font-bold py-4 relative"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading && (
            <svg
              className="absolute top-5 animate-spin h-8 w-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          Ikut
        </Button>
      </div>
    </div>
  );
}
