import * as TWEEN from '@tweenjs/tween.js';
import { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { IIsland, IPlace } from '../../interfaces/data-interface';
import { replaceAllSymbol } from '../../utils/helper';
import WorldDetail from './world-detail';
import './world.css';

export interface IMarker {
  lat: number;
  lng: number;
}

const INDONESIA_POSITION: IMarker = {
  lat: -1.950605881363336,
  lng: 120.72461545298373,
};

const markerSvg = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>
`;

interface IWorldProps {
  data: AxiosResponse<IIsland[]> | undefined;
  isLoading: boolean;
}
export const World = ({ data, isLoading }: IWorldProps) => {
  const navigate = useNavigate();

  const [gData, setGData] = useState<IMarker[]>([INDONESIA_POSITION]);
  const [isRedirect, setRedirect] = useState<boolean>(false);
  const globeRef = useRef<GlobeMethods>();
  const [selectedMarker, setSelectedMarker] = useState<IMarker>();
  const [selectedDatas, setSelectedDatas] = useState<IPlace[]>([]);
  const [selectedIsland, setSelectedIsland] = useState<IIsland>();

  useEffect(() => {
    setGDataToIsland();
  }, [data]);

  useEffect(() => {
    setGDataToProvince();
  }, [selectedIsland]);

  const setGDataToProvince = () => {
    if (selectedIsland) {
      const arr: IMarker[] = selectedIsland.provinces.map((data) => ({
        lat: data.latitude,
        lng: data.longitude,
      }));
      setGData(arr);
    }
  };

  const setGDataToIsland = () => {
    if (data && data.data) {
      const arr: IMarker[] = data.data.map((data) => ({
        lat: data.latitude,
        lng: data.longitude,
      }));
      setGData(arr);
    }
  };

  const addCloud = () => {
    if (!globeRef.current) return;
    const globe = globeRef.current;

    const CLOUDS_IMG_URL = '/assets/clouds.png';
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006;

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
      const material = new THREE.MeshPhongMaterial({
        map: cloudsTexture,
        transparent: true,
        opacity: 1,
      });
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(
          globe.getGlobeRadius() * (1 + CLOUDS_ALT),
          75,
          75
        ),
        material
      );

      globe.scene().add(clouds);

      function animateCloud() {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(animateCloud);
      }
      animateCloud();
    });
  };

  const handleMarkerClick = (d: IMarker) => {
    const globe = globeRef.current;
    if (!globe) return;

    const { lat, lng } = d;
    if (selectedIsland) {
      // Selecting province, because already have island
      const province = selectedIsland.provinces.find(
        (data) => data.longitude === lng && data.latitude === lat
      );
      if (province) {
        setGData([]);
        setSelectedDatas(province.contents);

        zoomGlobeWithLatitude(lat - 5, lng, 2.3);
        enableRotation();

        setSelectedMarker(d);
      }
    } else if (data && data.data) {
      // Selecting island because not already selecting island
      const island = data.data.find(
        (data) => data.latitude === lat && data.longitude === lng
      );
      if (island) {
        setSelectedIsland(island);
        zoomGlobeWithLatitude(lat, lng, 1.5);
      }
    }
  };

  const setInitialPosition = () => {
    const globe = globeRef.current;
    if (!globe) return;

    const pos = globe.getCoords(INDONESIA_POSITION.lat, INDONESIA_POSITION.lng);
    zoomGlobe(pos.x, pos.y, pos.z, 3, 1000, false);
  };

  const zoomGlobeWithLatitude = (
    lat: number,
    lng: number,
    zoomFactor: number = 1,
    duration: number = 1000,
    isAnimation: boolean = true
  ) => {
    const globe = globeRef.current;
    if (!globe) return;
    const cameraPosition = globe.getCoords(lat, lng);

    zoomGlobe(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z,
      zoomFactor,
      duration,
      isAnimation
    );
  };

  const zoomGlobe = (
    x: number,
    y: number,
    z: number,
    zoomFactor: number = 1,
    duration: number = 1000,
    animation: boolean = true
  ) => {
    const globe = globeRef.current;
    if (!globe) return;
    if (animation)
      new TWEEN.Tween(globe.camera().position)
        .to(
          { x: x * zoomFactor, y: y * zoomFactor, z: z * zoomFactor },
          duration
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
          globe.controls().update();
        })
        .start();
    else {
      globe
        .camera()
        .position.set(x * zoomFactor, y * zoomFactor, z * zoomFactor);
      globe.controls().update();
    }
  };

  const onRedirectDetailPage = (data: IPlace) => {
    if (selectedMarker) {
      const { lat, lng } = selectedMarker;
      zoomGlobeWithLatitude(lat, lng, 1.2, 500);
    }
    disableRotation();
    setSelectedMarker(undefined);
    setSelectedDatas([]);
    setRedirect(true);
    setTimeout(() => {
      navigate(`/content/${replaceAllSymbol(data.title, ' ', '-')}`);
    }, 1000);
  };

  const onExitPreview = () => {
    if (selectedMarker) {
      const { lat, lng } = selectedMarker;
      zoomGlobeWithLatitude(lat, lng, 3);
    }
    disableRotation();
    setGDataToIsland();
    setSelectedMarker(undefined);
    setSelectedDatas([]);
    setSelectedIsland(undefined);
  };

  const enableRotation = () => {
    const globe = globeRef.current;
    if (globe) {
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.5;
    }
  };

  const disableRotation = () => {
    const globe = globeRef.current;
    if (globe) {
      globe.controls().autoRotate = false;
    }
  };

  const onGlobeReady = () => {
    const globe = globeRef.current;
    if (!globe) return;

    globe.controls().enableZoom = false;

    addCloud();
    setInitialPosition();
  };

  if (isLoading)
    return (
      <div className="center h-[500px] w-full">
        <ReactLoading
          className="opacity-20"
          color="#bababa"
          type="spinningBubbles"
        ></ReactLoading>
      </div>
    );

  return (
    <div className="relative world">
      <div
        className={`${
          isRedirect ? 'bg-primary z-50' : 'bg-transparent z-0'
        } absolute top-0 left-0 w-full h-full  duration-500 transition`}
      ></div>
      <div
        className={`absolute globe__background-gradient left-0 top-0 w-full h-full transition-all duration-300 `}
      ></div>
      <Globe
        onGlobeReady={onGlobeReady}
        animateIn={false}
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        objectLabel="name"
        objectLat="lat"
        backgroundColor="rgba(0,0,0, 0)"
        objectLng="lng"
        objectAltitude="alt"
        htmlElementsData={gData}
        htmlElement={(d) => {
          const el = document.createElement('div');
          el.innerHTML = markerSvg;
          el.classList.add('marker');
          el.onclick = () => {
            handleMarkerClick(d as IMarker);
          };
          return el;
        }}
      />
      <WorldDetail
        selectedIsland={selectedIsland}
        onExitPreview={onExitPreview}
        onRedirectDetailPage={onRedirectDetailPage}
        selectedDatas={selectedDatas}
      />
    </div>
  );
};
