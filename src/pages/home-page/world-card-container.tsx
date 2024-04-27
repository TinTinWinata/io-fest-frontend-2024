import { forwardRef, useEffect, useState } from 'react';

import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { IPlace } from '../../interfaces/data-interface';
import WorldCard from './world-card';

interface IWorldCardContainerProps {
  datas: IPlace[];
  column?: number;
  onClick?: (data: IPlace) => void;
  onClickLeft?: () => void;
  onClickRight?: () => void;
  viewAll: boolean;
}

const WorldCardContainer = forwardRef<HTMLDivElement, IWorldCardContainerProps>(
  ({ datas, column = 1, onClick, onClickLeft, onClickRight, viewAll }, ref) => {
    const [leftOpacity, setLeftOpacity] = useState<string>('opacity-0');

    useEffect(() => {
      if (column > 1) {
        setLeftOpacity('opacity-100');
      } else setLeftOpacity('opacity-0');
    }, [column]);

    return (
      <div
        className={`relative ${viewAll ? 'h-[80%]' : 'h-[35%]'}  flex flex-col`}
      >
        {!viewAll && (
          <>
            <div
              className={`${leftOpacity} transition-all duration-500 absolute z-10 h-full left-0 w-[200px]  bg-gradient-to-r  from-gray-900 to-transparent`}
            ></div>
            <div
              className={`${leftOpacity} transition-all duration-500 absolute z-20 left-3  top-[50%] translate-y-[-50%]`}
            >
              <FaAngleDoubleLeft
                onClick={() => onClickLeft && onClickLeft()}
                className="w-10 h-10 text-gray-300"
              />
            </div>
            <div
              className={`transition-all duration-500 absolute z-10 h-full right-0 w-[200px]  bg-gradient-to-l  from-gray-900 to-transparent`}
            ></div>
            <div
              className={`transition-all duration-500 absolute z-20 right-3  top-[50%] translate-y-[-50%]`}
            >
              <FaAngleDoubleRight
                onClick={() => onClickRight && onClickRight()}
                className="w-10 h-10 text-gray-300"
              />
            </div>
          </>
        )}
        <div
          style={{
            transform: `translateX(${-1 * (column * 100 - 100)}%)`,
            left: `0`,
          }}
          ref={ref}
          className={`absolute top-0  transition duration-500 w-full h-full ${
            viewAll ? 'grid gap-y-12 grid-cols-6 overflow-y-scroll' : 'flex'
          } gap-x-4  overflow-visible px-4 sm:px-[45px] pb-4`}
        >
          {datas.map((data) => (
            <WorldCard
              viewAll={viewAll}
              key={data.id}
              onClick={onClick}
              place={data}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default WorldCardContainer;
