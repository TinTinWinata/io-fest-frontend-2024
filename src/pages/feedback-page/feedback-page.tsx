import { useEffect } from 'react';
import { applyVisme } from '../../utils/visme.js';

export default function FeedbackPage() {
  useEffect(() => {
    applyVisme();
  }, []);

  return (
    <div className="center relative z-[20] w-full min-h-screen">
      <div
        className="visme_d "
        data-title="Jelajah Nusantara"
        data-url="z4rw6v7v-jelajah-nusantara"
        data-domain="forms"
        data-full-page="false"
        data-min-height="700px"
        data-form-id="28253"
      ></div>
    </div>
  );
}
