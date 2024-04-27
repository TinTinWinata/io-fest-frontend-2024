import { createRef, useEffect, useState } from 'react';
import { FaAnglesDown, FaAnglesUp } from 'react-icons/fa6';
import { useOrientation } from '../../hooks/useOrientation';
import useTime from '../../hooks/useTime';
import { IIsland, IPlace } from '../../interfaces/data-interface';
import WorldCardContainer from './world-card-container';
import WorldDetailWeather from './world-detail-weather';
import WorldDetailYoutube from './world-detail-youtube';

interface IWorldDetailProps {
  onRedirectDetailPage: (data: IPlace) => void;
  selectedDatas: IPlace[];
  onExitPreview: () => void;
  selectedIsland: IIsland | undefined;
}

export default function WorldDetail({
  onRedirectDetailPage,
  selectedDatas,
  onExitPreview,
  selectedIsland,
}: IWorldDetailProps) {
  useEffect(() => {
    setColumn(1);
  }, [selectedDatas]);
  const [column, setColumn] = useState<number>(1);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const { orientation } = useOrientation();
  const ref = createRef<HTMLDivElement>();
  const handleClickLeft = () => {
    setColumn((prev) => {
      if (prev <= 1) return prev;
      return prev - 1;
    });
  };
  const handleClickRight = () => {
    if (ref.current) {
      const max = Math.ceil(
        ref.current?.scrollWidth / ref.current?.clientWidth
      );
      setColumn((prev) => {
        if (prev === max) {
          return 1;
        }
        return prev + 1;
      });
    }
  };
  const handleClickViewAll = () => {
    setViewAll((prev) => !prev);
  };
  const time = useTime();
  return (
    <>
      <div
        className={`${
          selectedDatas.length > 0 ? ' z-50 opacity-100' : 'opacity-0 z-0'
        }  bg-gradient-to-t transition duration-500 from-black to-transparent absolute flex flex-col w-full bottom-0 h-full`}
      >
        {selectedDatas.length > 0 && (
          <div className={`${viewAll ? 'h-[20%]' : 'h-[65%]'} flex items-end`}>
            {!viewAll && <WorldDetailYoutube />}
            <div onClick={onExitPreview} className="w-full h-full"></div>
            {!viewAll && (
              <div className="flex  flex-col justify-end h-full">
                <div
                  onClick={() => {
                    if (orientation === 'mobile' || orientation === 'tablet')
                      onExitPreview();
                  }}
                  className="pb-5 text-white h-full mr-8 justify-center pt-10 tracking-widest flex flex-col "
                >
                  <div className="text-[2.4em] sm:text-[5em] text-right font-bold leading-[1.3em] truncate">
                    {selectedIsland && selectedIsland.name}
                  </div>
                  <div className="text-[2.5em] mt-2 sm:mt-0 sm:text-[5em] text-right font-thin leading-[0.9em]">
                    {time}
                  </div>
                  <WorldDetailWeather />
                  <div className="text-right mt-3">
                    {selectedDatas.length > 0 && selectedDatas[0].province_name}
                  </div>
                </div>
                <div
                  onClick={handleClickViewAll}
                  className="gap-2 text-gray-100 flex justify-end w-full pr-10 pb-3"
                >
                  <div className="hover:underline">View All</div>
                  <div className="center">
                    <FaAnglesUp className="" />
                  </div>
                </div>
              </div>
            )}
            {viewAll && (
              <div
                onClick={handleClickViewAll}
                className="gap-2 text-gray-100 flex justify-end w-full pr-10 pb-3"
              >
                <div className="hover:underline">Back</div>
                <div className="center">
                  <FaAnglesDown className="" />
                </div>
              </div>
            )}
          </div>
        )}
        <WorldCardContainer
          viewAll={viewAll}
          onClickRight={handleClickRight}
          onClickLeft={handleClickLeft}
          ref={ref}
          column={column}
          onClick={onRedirectDetailPage}
          datas={selectedDatas}
        />
      </div>
    </>
  );
}
