// @ts-ignore
import Lottie from 'lottie-react';
import { useState } from 'react';
import cameraAnimation from '../../animations/camera.json';
import Button from '../../components/button';
import Paper from '../../components/paper';
import { toastError } from '../../utils/toast';
import Camera from './camera';

export default function CameraPage() {
  const [isReady, setReady] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setReady(true);
    } catch (error) {
      toastError('Gagal dalam mengakses kamera');
    }
  };

  return (
    <>
      {isReady ? (
        <Camera />
      ) : (
        <div className="center mt-24 sm:mt-36 h-fit ">
          <Paper className="py-6 sm:py-8 px-6 sm:px-12">
            <div className="relative h-[300px]">
              <Lottie
                animationData={cameraAnimation}
                className="w-[250px] sm:w-[300px] abs-center"
              />
            </div>
            <div className="gap-4 leading-9 mt-5 flex flex-col text-center">
              <div className="text-primary-text text-[1.75em] sm:text-[2.5em] font-bold">
                Abadikan Foto-mu
              </div>
              <div className="center">
                <p className="w-full sm:w-3/4 leading-4 text-md text-secondary-text  font-semibold">
                  Aktifkan kamera di web browser anda, agar kami bisa
                  mengabadikan foto anda
                </p>
              </div>
              <Button className="relative z-[100]" onClick={handleClick}>
                Mulai
              </Button>
            </div>
          </Paper>
        </div>
      )}
    </>
  );
}
