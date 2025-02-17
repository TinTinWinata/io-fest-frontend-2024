import { useEffect, useState } from 'react';

export default function useTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour12: false,
    timeZone: 'Asia/Jakarta',
  });

  return formattedTime;
}
