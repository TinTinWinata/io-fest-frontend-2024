import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import ReactLoading from 'react-loading';
import Back from '../../components/back';
import Button from '../../components/button';
import { useOrientation } from '../../hooks/useOrientation';

const examples = [
  'Apa ibu kota Indonesia?',
  'Kuil kompleks terkenal mana, yang terletak di Jawa Tengah, dianggap sebagai salah satu kuil Buddha terbesar di dunia?',
  'Indonesia adalah gugusan kepulauan terbesar di dunia. Sekitar berapa banyak pulau yang membentuk Indonesia?',
  'Apa nama gunung berapi aktif di Indonesia yang meletus pada tahun 2018, menyebabkan evakuasi massal dan gangguan penerbangan?',
  'Apa bahasa resmi Indonesia?',
];

export default function WorldModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string[]>([]);
  const [value, setValue] = useState<string>('Mengapa indonesia ');
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const addText = (newText: string) => {
    setText((prev) => [...prev, newText]);
  };
  const newText = async (formData: FormData) => {
    setLoading(true);
    addText(formData.get('prompt') as string);
    const resp = await axios.post<string>(
      import.meta.env.VITE_API_URL + '/chatbot/PostChatBot/',
      formData
    );
    if (resp.status === 200) {
      addText(resp.data);
    }
    setLoading(false);
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (text) {
      setSubmitted(true);
      newText(formData);
      setSubmitted(false);
    }
    e.currentTarget.reset();
  };
  const { orientation } = useOrientation();
  useEffect(() => {
    if (open) setText([]);
  }, [open]);
  return (
    <>
      <div
        className={`center fixed ${
          open ? ' z-[100] opacity-100 ' : ' z-0 opacity-0 '
        }  text-white bg-gray-500 bg-opacity-30 transition-all duration-500 backdrop-blur-lg top-0 left-0 w-full h-screen`}
      >
        <form
          onSubmit={onSubmit}
          className="px-20 lg:px-5 lg:p-5 max-h-[75%]  w-full  lg:w-1/2  rounded-lg flex flex-col gap-2"
        >
          <Back
            handleBack={() => {
              setOpen(false);
            }}
          ></Back>
          <h1 className="text-2xl font-semibold">Apa yang bisa saya bantu ?</h1>

          {!isSubmitted && text.length < 1 && (
            <div className="flex flex-col gap-5 py-5">
              {examples.map((example, index) => {
                if (orientation === 'mobile' && index >= 1) return;
                return (
                  <div
                    onClick={() => {
                      const formData = new FormData();
                      formData.append('prompt', example);
                      newText(formData);
                    }}
                    className="w-full rounded-lg border border-opacity-50 border-1 py-3 px-3 hover:bg-white hover:text-gray-500 transition-all duration-300"
                    key={index}
                  >
                    {example}
                  </div>
                );
              })}
            </div>
          )}
          {text.length > 0 && (
            <div className="flex flex-col gap-3 py-5">
              {text.map((t, idx) => (
                <div
                  key={idx}
                  className="relative border border-opacity-30 border-white rounded-md font-semibold py-2 px-4"
                >
                  {idx % 2 === 1 && (
                    <div className="absolute top-0 right-0 w-5 h-5 bg-sky-400 animate-pulse translate-x-[50%] translate-y-[-50%] rounded-full"></div>
                  )}
                  <p>{t}</p>
                </div>
              ))}
            </div>
          )}
          {open && isLoading && (
            <div className="w-full h-[200px] center">
              <ReactLoading className="opacity-75"></ReactLoading>
            </div>
          )}
          {text.length < 1 ? (
            <div className="flex sm:flex-row flex-col gap-3">
              <div className="relative h-12 w-full min-w-[200px]">
                <input
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  name="prompt"
                  type="text"
                  className="peer h-full w-full rounded-[7px] border border-gray-200 bg-transparent border-t-transparent placeholder-shown:border-t-gray-200 px-3 py-2.5 font-sans text-xl font-normal  !text-gray-200 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:none disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=""
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-base font-normal leading-[0.75] !text-gray-200 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-200 after:transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:leading-[3] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent  peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Tulis disini
                </label>
              </div>
              <Button className="sm:py-2 py-3">Submit</Button>
            </div>
          ) : (
            <Button
              props={{ type: 'button' }}
              className="py-3"
              onClick={() => setOpen(false)}
            >
              Kembali
            </Button>
          )}
        </form>
      </div>
      <div
        onClick={() => setOpen(true)}
        className="flex items-center justify-start w-[20em] rounded-full h-16 border-opacity-20 border border-white absolute bottom-10 right-5 search z-50 transition-all duration-1000 hover:w-[18em]"
      >
        <IoSearchOutline className="text-white w-8 h-8 ml-6" />
      </div>
    </>
  );
}
