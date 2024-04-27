import { motion } from 'framer-motion';
import { ComponentType } from 'react';

export default function transition(Node: ComponentType) {
  return () => (
    <>
      <Node />
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-secondary z-50 origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="fixed top-0  left-0 w-full h-screen origin-bottom bg-secondary"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}
