import { ReactNode, useEffect, useState } from 'react';
import { IoCloudy, IoRainy, IoSunny, IoThunderstorm } from 'react-icons/io5';

import { LuCloudRainWind } from 'react-icons/lu';

interface IWeather {
  name: string;
  icon: ReactNode;
}

const weathers: IWeather[] = [
  {
    icon: <IoRainy className="w-5 h-5 sm:w-10 sm:h-10" />,
    name: 'Rainy',
  },
  {
    icon: <IoSunny className="w-5 h-5 sm:w-10 sm:h-10" />,
    name: 'Sunny',
  },
  {
    icon: <IoCloudy className="w-5 h-5 sm:w-10 sm:h-10" />,
    name: 'Cloudy',
  },
  {
    icon: <LuCloudRainWind className="w-5 h-5 sm:w-10 sm:h-10" />,
    name: 'Windy',
  },
  {
    icon: <IoThunderstorm className="w-5 h-5 sm:w-10 sm:h-10" />,
    name: 'Stormy',
  },
];

export default function WorldDetailWeather() {
  const getCelcius = () => Math.round(Math.random() * (30 - 16) + 16);
  const [weather, setWeather] = useState<IWeather>(weathers[0]);
  const [number, setNumber] = useState<number>(getCelcius());
  useEffect(() => {
    const randomIdx: number = Math.floor(Math.random() * weathers.length);
    const randomWeather: IWeather = weathers[randomIdx];
    setWeather(randomWeather);
  }, []);
  return (
    <div className=" flex justify-end">
      <div className="flex items-center rounded-full py-3 sm:py-5 px-5 sm:px-8 text-[1.2em] w-fit gap-2 sm:gap-4 bg-secondary bg-opacity-20 mt-8">
        <div className="center">{weather.icon}</div>
        <div className="font-thin text-[0.8em] sm:text-[1.3em]">
          {weather.name}
        </div>
        <div className="text-[0.8em] sm:text-[1.3em]">{number}</div>
      </div>
    </div>
  );
}
