import { useEffect, useState } from 'react';

export function useOrientation() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTable] = useState(false);
  const mobileSize = 640;
  const tabletSize = 1024;
  const [orientation, setOrientation] = useState<
    'mobile' | 'tablet' | 'computer'
  >('computer');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= mobileSize);
      setIsTable(window.innerWidth <= tabletSize);
      if (window.innerWidth <= mobileSize) {
        setOrientation('mobile');
      } else if (window.innerWidth <= tabletSize) {
        setOrientation('tablet');
      } else {
        setOrientation('computer');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return { isMobile, isTablet, orientation };
}
