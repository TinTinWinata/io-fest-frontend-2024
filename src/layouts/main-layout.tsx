import { motion } from 'framer-motion';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { IChildren } from '../interfaces/children-interface';

export default function MainLayout({ children }: IChildren) {
  return (
    <div className="bg-primary ">
      <div className="fixed top-0 bottom-0 left-0 right-0 lg:left-32 lg:right-32">
        <div className="absolute w-72 h-72 top-8 left-64 bg-blue-600 rounded-full filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute w-96 h-96 top-40 left-24 bg-blue-600 rounded-full filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute w-64 h-64 top-40 left-48 bg-blue-600 rounded-full filter blur-xl opacity-10 animate-blob animation-delay-4800"></div>
        <div className="absolute w-72 h-72 bottom-8 right-64  bg-blue-600 rounded-full filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute w-96 h-96 bottom-40 right-48 bg-blue-600 rounded-full filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute w-64 h-64 bottom-40 right-24 bg-blue-600 rounded-full filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      <Navbar></Navbar>
      <div className="overflow-hidden z-10 font-semibold text-primary-text  center min-h-screen">
        <div className="max-w-screen-xl w-full">
          <motion.div
            className="center mx-8 xl:mx-0"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 30,
            }}
          >
            {children}
          </motion.div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
