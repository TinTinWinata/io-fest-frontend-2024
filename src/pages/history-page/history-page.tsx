import { useOrientation } from '../../hooks/useOrientation';
import { HISTORIES_DATA } from '../../settings/history-setting';
import HistoryCardContainer from './history-card-container';
import HistoryParallax from './history-parallax';
import HistoryLine from './line';

export default function HistoryPage() {
  const { orientation } = useOrientation();
  return (
    <div className="max-w-screen-lg">
      <div className="min-h-screen px-12 mt-28 sm:mt-32">
        <div className="">
          <div className="text-center center flex-col">
            <p className="w-fit px-5 py-1 rounded-full bg-secondary bg-opacity-20">
              Indonesia
            </p>
            <div className="text-primary-text text-[1.8em] sm:text-[3.5em] font-bold">
              Sejarah Yang Terlupakan
            </div>
            <p className="text-secondary-text text-lg sm:text-xl font-semibold">
              Cermin masa lalu, guru masa kini, dan penunjuk masa depan.
            </p>
          </div>
          <div className="relative">
            <HistoryParallax />
          </div>
        </div>
      </div>
      <div
        className={`relative ${
          orientation === 'tablet' ? 'mx-24' : 'mx-12'
        } flex flex-col gap-[150px] xl:gap-[200px]`}
      >
        <div className="xl:block hidden absolute top-[10px] left-[-115px] select-none">
          <HistoryLine />
        </div>
        {HISTORIES_DATA.map((historyContainer, index) => (
          <HistoryCardContainer {...historyContainer} key={index} />
        ))}
      </div>
      <div className="h-[150px] sm:h-[250px]"></div>
      <div
        data-aos="fade-up"
        className="lg:flex-row flex-col center gap-4 lg:gap-7 mb-12 mt-12"
      >
        <img
          src="/assets/histories/syahrir.png"
          className="w-[18em] rounded-full"
          alt=""
        />
        <div className="center lg:px-0 px-12">
          <div className="md:px-32 sm:text-center lg:text-left lg:px-3 pb-10 pt-3 mt-8 flex flex-col gap-2 w-full text-left">
            <div className="center ">
              <p className=" text-primary-text text-xl lg:text-3xl italic">
                “Menghargai sejarah berarti menghormati perjuangan nenek moyang
                kita dan menghargai warisan yang mereka tinggalkan bagi kita.”
              </p>
            </div>
            <h1 className="text-secondary-text text-[1em]">Sultan Syahrir</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
