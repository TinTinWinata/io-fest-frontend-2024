import { useEffect, useRef } from 'react';

import { useOrientation } from '../../hooks/useOrientation';
import './history-parallax.css';

type THistoryPeoples = {
  image: string;
  name: string;
  background: string;
};

const HISTORIES_PEOPLE: THistoryPeoples[] = [
  {
    image: '/assets/histories/soekarno.png',
    name: 'Soekarno',
    background: '/assets/histories/history-1.jpg',
  },
  {
    image: '/assets/histories/hatta.png',
    name: 'Mohammad Hatta',
    background: '/assets/histories/history-2.jpg',
  },
  {
    image: '/assets/histories/kartini.png',
    name: 'RA. Kartini',
    background: '/assets/histories/history-3.webp',
  },
  {
    image: '/assets/histories/tanmalaka.png',
    name: 'Tan Malaka',
    background: '/assets/histories/history-4.jpg',
  },
];

export default function HistoryParallax() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const backgroundsRef = useRef<HTMLDivElement[]>([]);
  const { orientation } = useOrientation();

  useEffect(() => {
    const calcValue = (a: number, b: number) => ((a / b) * 40 - 20).toFixed(1);
    let timeout: number;

    const handleMouseMove = (event: MouseEvent) => {
      const { x, y } = event;
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }

      timeout = window.requestAnimationFrame(() => {
        const yValue = calcValue(y, window.innerHeight);
        const xValue = calcValue(x, window.innerWidth);

        if (cardsRef.current) {
          cardsRef.current.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;
        }

        imagesRef.current.forEach((image) => {
          if (image) {
            image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
          }
        });

        backgroundsRef.current.forEach((background) => {
          if (background) {
            background.style.backgroundPosition = `${
              parseFloat(xValue) * 0.45
            }px ${-yValue * 0.45}px`;
          }
        });
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="rounded-lg  flex justify-center items-center px-10 py-10 z-0"
      ref={cardsRef}
    >
      {HISTORIES_PEOPLE.map((history, index) => {
        if (orientation === 'mobile' && index >= 1) return;
        if (orientation === 'tablet' && index >= 3) return;
        return (
          <div key={history.name} className="card">
            <div
              ref={(el) => el && backgroundsRef.current.push(el)}
              className="absolute top-0 bottom-0 left-0 right-0 transform -translate-z-50"
              style={{
                backgroundImage: `url("${history.background}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <img
              className="absolute top-5 left-0 h-full"
              src={history.image}
              alt={history.name}
              ref={(el) => el && imagesRef.current.push(el)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black bg-opacity-55 flex flex-col justify-center items-center py-2">
              <p className="text-white font-semibold text-lg">{history.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
