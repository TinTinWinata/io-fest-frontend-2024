// @ts-ignore
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AnimatedCursor from 'react-animated-cursor';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './contexts/user-context';
import './font.css';
import MainRouter from './router';

function App() {
  const client = new QueryClient();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <QueryClientProvider client={client}>
      <div className="md:opacity-100 opacity-0">
        <AnimatedCursor
          innerSize={8}
          outerSize={8}
          color="255,255,255"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
          clickables={[
            'a',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            'label[for]',
            'select',
            'textarea',
            'button',
            '.link',
          ]}
        />
      </div>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/*" element={<MainRouter />}></Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
