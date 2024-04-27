import { useState } from 'react';

interface IYoutube {
  artist: string;
  title: string;
  url: string;
}

const youtubes: IYoutube[] = [
  {
    artist: 'NiKi',
    title: 'High School in Jakarta',
    url: 'https://www.youtube.com/embed/d4CF4km1rUQ?si=nbtN6O8OtuFl-ysm?autoplay=1',
  },
  {
    artist: 'ID',
    title: 'REWIND INDONESIA 2023',
    url: 'https://www.youtube.com/embed/Q5vQawTFJ0I?si=vjBp4Sft4LCRdHGZ?autoplay=1',
  },
  {
    artist: 'SI24',
    title: 'Epic Rap Battles 2024',
    url: 'https://www.youtube.com/embed/3_NZRBahmb0?si=Cj7O3KWWHuLuMU89?autoplay=1',
  },
  {
    artist: 'SI24',
    title: 'DPR Musikal',
    url: 'https://www.youtube.com/embed/TNMuoXcO5do?si=3_cajbBOBe_JEL7Q?autoplay=1',
  },
];

export default function WorldDetailYoutube() {
  const getRandom = (): IYoutube => {
    const randomIdx = Math.floor(Math.random() * youtubes.length);
    return youtubes[randomIdx];
  };
  const [youtube, setYoutube] = useState<IYoutube>(getRandom());
  return (
    <div className="lg:flex hidden h-full justify-end pl-12 mb-8 flex-col gap-1">
      <div className="flex items-end gap-2">
        <div className="text-white font-bold text-[3.25em]">
          {youtube.artist}
        </div>
        <div className="text-white font-thin text-[1.6em] mb-3">
          - {youtube.title}
        </div>
      </div>
      <iframe
        width="400"
        height="230"
        src={youtube.url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
}
