import axios from 'axios';
import { createRef, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Webcam from 'react-webcam';
import Back from '../../components/back';
import Button from '../../components/button';
import { useOrientation } from '../../hooks/useOrientation';
import { downloadUrl } from '../../utils/download';
import { toastError } from '../../utils/toast';
import CameraFilterButton, { TCameraFilterProps } from './camera-filter-button';

const TABLET_CAMERA_FILTERS: TCameraFilterProps[] = [
  {
    name: '',
    color: 'bg-gray-700',
    image: '/assets/twibbon/2-tablet.png',
  },
  {
    name: '',
    color: 'bg-gray-700',
    image: '/assets/twibbon/4-tablet.png',
  },
  {
    name: 'No Filter',
    color: 'bg-gray-800',
    image: '/assets/twibbon/5-tablet.png',
  },
];

const MOBILE_CAMERA_FILTERS: TCameraFilterProps[] = [
  {
    name: '',
    color: 'bg-gray-700',
    image: '/assets/twibbon/2-mobile.png',
  },
  {
    name: 'Nusantara',
    color: 'bg-gray-700',
    image: '/assets/twibbon/4-mobile.png',
  },
  {
    name: 'No Filter',
    color: 'bg-gray-800',
    image: '/assets/twibbon/5-mobile.png',
  },
];

const CAMERA_FILTERS: TCameraFilterProps[] = [
  {
    name: 'Nusantara',
    color: 'bg-gray-700',
    image: '/assets/twibbon/2.png',
  },
  {
    name: 'Dirgahayu Indonesia',
    color: 'bg-gray-700',
    image: '/assets/twibbon/4.png',
  },
  {
    name: 'Indonesia Negeriku',
    color: 'bg-gray-800',
    image: '/assets/twibbon/5.png',
  },
];

export default function Camera() {
  const [isCameraReady, setCameraReady] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { orientation } = useOrientation();
  const [isAlreadySetFilterMobile, setIsAlreadySetFilterMobile] =
    useState<boolean>(false);

  const canvasRef = createRef<HTMLCanvasElement>();
  const webcamRef = createRef<Webcam>();
  const webcamContainerRef = createRef<HTMLDivElement>();

  const getCurrentFilter = () => {
    if (orientation === 'mobile') {
      return MOBILE_CAMERA_FILTERS[selectedFilter];
    } else if (orientation === 'tablet') {
      return TABLET_CAMERA_FILTERS[selectedFilter];
    }
    return CAMERA_FILTERS[selectedFilter];
  };

  const handleBack = () => {
    window.location.reload();
  };

  async function magicPhoto(dataUrl: Blob): Promise<string> {
    const formData = new FormData();
    formData.append('image', dataUrl, 'image.png');
    formData.append('type', 'pixar');
    try {
      const resp = await axios.post(
        'https://www.ailabapi.com/api/portrait/effects/portrait-animation',
        formData,
        {
          headers: {
            'ailabapi-api-key': import.meta.env.VITE_AI_LAB_API,
          },
        }
      );
      if (resp.status === 200 && resp.data) {
        return resp.data.data.image_url as string;
      }
    } catch (err) {}
    return '';
  }

  async function handlePhoto() {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamContainerRef.current
    ) {
      setLoading(true);
      const { video } = webcamRef.current;
      const canvas = document.createElement('canvas');
      const width = video.videoWidth;
      const height = video.videoHeight;

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const image = new Image();
        image.src = getCurrentFilter().image;

        ctx.drawImage(video, 0, 0, width, height, 0, 0, width, height);
        ctx.drawImage(image, 0, 0, width, height);
        canvas.toBlob(async (blob) => {
          if (blob) {
            const resp = await magicPhoto(blob);
            console.log('resp : ', resp);
            if (resp !== '') {
              downloadUrl(resp);
              return;
            } else {
              toastError(
                'Kuota magic photo telah habis! Silahkan hubungi owner untuk mengupgrade billing'
              );
            }
          }
          const dataUrl = canvas.toDataURL('image/png');
          downloadUrl(dataUrl);
          setLoading(false);
        });
      }
    }
  }

  useEffect(() => {
    const handleMetadataLoaded = () => {
      if (
        webcamRef?.current?.video?.videoWidth &&
        webcamRef.current.video.videoWidth > 0
      ) {
        setCameraReady(true);
      }
    };
    if (webcamRef && webcamRef.current && webcamRef.current.video) {
      const videoElement = webcamRef.current.video;
      if (videoElement.readyState >= 1) {
        handleMetadataLoaded();
      } else {
        videoElement.addEventListener('loadedmetadata', handleMetadataLoaded);
      }
    }

    return () => {
      // Cleanup event listener
      if (webcamRef && webcamRef.current && webcamRef.current.video) {
        webcamRef.current.video.removeEventListener(
          'loadedmetadata',
          handleMetadataLoaded
        );
      }
    };
  }, [webcamRef]);

  return (
    <div className="fixed top-0 center left-0 z-[100] w-screen h-screen bg-black flex-col">
      {!isAlreadySetFilterMobile && orientation === 'mobile' ? (
        <div className="center absolute top-0 left-0 w-full h-full  z-10">
          <div className="flex-col flex gap-3 h-[70%] ">
            {CAMERA_FILTERS.map((filter, index) => (
              <CameraFilterButton
                onClick={() => {
                  setIsAlreadySetFilterMobile(true);
                  setSelectedFilter(index);
                }}
                key={filter.name}
                {...filter}
                color={
                  getCurrentFilter().name === filter.name
                    ? 'bg-gray-700'
                    : 'bg-gray-800'
                }
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-[1300px] px-5 md:px-12 xl:px-0 w-full max-h-[800px] h-[90%]  flex flex-col">
          <Back handleBack={handleBack} />
          <div className="gap-5 relative w-full h-full center">
            <div
              ref={webcamContainerRef}
              className="h-full w-full relative rounded-md overflow-hidden"
            >
              <Webcam
                ref={webcamRef}
                className="object-cover rounded-md overflow-hidden absolute top-0 left-0 w-full  h-full"
              ></Webcam>
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
              ></canvas>
              {isCameraReady && (
                <div className="relative top-0 z-10 left-0 w-full h-full">
                  {getCurrentFilter().image && (
                    <img
                      src={getCurrentFilter().image}
                      className="absolute w-full top-0 left-0 h-full"
                    />
                  )}
                </div>
              )}
            </div>
            {!isCameraReady && (
              <div className="absolute top-0 left-0 center w-full h-full z-10">
                <ReactLoading type="spinningBubbles" className="opacity-50 " />
              </div>
            )}
            <div className="flex-col gap-3 lg:flex h-full hidden">
              {CAMERA_FILTERS.map((filter, index) => (
                <CameraFilterButton
                  onClick={() => setSelectedFilter(index)}
                  key={filter.name}
                  {...filter}
                  color={
                    getCurrentFilter().name === filter.name
                      ? 'bg-gray-700'
                      : 'bg-gray-800'
                  }
                />
              ))}
            </div>
          </div>
          <Button
            disabled={!isCameraReady && !isLoading}
            onClick={handlePhoto}
            className="py-4 mt-4"
          >
            Take Photo
          </Button>
        </div>
      )}
    </div>
  );
}
