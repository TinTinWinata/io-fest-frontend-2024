import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ReactTyped } from 'react-typed';
import { getAllIsland } from '../../api/island';
import { useOrientation } from '../../hooks/useOrientation';
import './home.css';
import { World } from './world';
import WorldModal from './world-modal';

export default function Home() {
  const { data, isLoading } = useQuery({
    queryFn: () => getAllIsland(),
    queryKey: ['islands'],
  });
  const [isReady, setReady] = useState<boolean>(false);
  const [isRemoveBackground, setRemoveBackground] = useState<boolean>(false);
  const { orientation } = useOrientation();
  useEffect(() => {
    if (isReady) {
      setTimeout(() => {
        setRemoveBackground(true);
      }, 1000);
    }
  }, [isReady]);

  return (
    <div className="overflow-hidden">
      {!isRemoveBackground && (
        <div className="z-[100] fixed top-0 left-0 w-full h-screen overflow-hidden">
          <motion.div
            animate={isReady && { width: 0, height: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="flex-col  center abs-center rounded-full w-[3000px] h-[3000px] bg-black"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={!isReady ? { opacity: 1 } : { opacity: 0 }}
              transition={!isReady ? { duration: 5 } : { duration: 1 }}
              className="abs-center center flex-col"
            >
              {orientation === 'computer' ? (
                <ReactTyped
                  className="dancing-script text-[5em] w-[1000px] text-white font-bold tracking-wide text-center"
                  strings={[
                    'Lestarikan Indonesia',
                    'Budaya Indonesia',
                    '17 Agustus 1945',
                    'NKRI Dibawa Mati',
                  ]}
                  loop={true}
                  backSpeed={100}
                  typeSpeed={150}
                ></ReactTyped>
              ) : (
                <ReactTyped
                  className="dancing-script text-[3em] text-white font-bold tracking-wide text-center"
                  strings={[
                    'Lestarikan',
                    'Budaya',
                    '17 Agustus',
                    '1945',
                    'NKRI',
                  ]}
                  loop={true}
                  backSpeed={100}
                  typeSpeed={150}
                ></ReactTyped>
              )}
              <div
                onClick={() => setReady(true)}
                className="mt-3 font-bold select-none rounded-full text-sm text-white border-2 transition-all hover:bg-white duration-1000 hover:text-gray-800 tracking-wider py-4 px-10 border-white"
              >
                Jelajah Nusantara
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
      <div className={`relative ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        {!isLoading && <WorldModal />}
        <World data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}
