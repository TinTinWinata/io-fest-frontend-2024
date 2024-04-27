import { motion } from 'framer-motion';
import { useState } from 'react';
import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import { RiMenu2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/user-context';
import { MENU_LIST } from '../settings/menu-setting';
import Icon from './icon';

export default function MobileNavigation() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => setOpen(false);
  const { user, logout, login } = useUserAuth();
  const getFirstName = (str: string) => str.substring(0, 2).toUpperCase();
  const getEmail = (str: string) => {
    if (str.length > 10) {
      return str.substring(0, 10);
    }
    return str;
  };

  return (
    <>
      <motion.div
        className={`fixed z-[300] left-0 h-full bg-gray-900 rounded-r-xl w-[60%] text-gray-200 px-2`}
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ bounce: true }}
      >
        <div className="flex flex-col gap-2 my-5 h-full">
          <div className="flex items-center gap-3 w-full pb-4 border-b border-white border-opacity-20">
            <div className="rounded-md bg-violet-500 center w-12 h-12 font-semibold">
              {user && user.displayName
                ? getFirstName(user.displayName)
                : getFirstName('GUEST')}
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">
                {user && user.displayName ? user?.displayName : 'Guest'}
              </div>
              <p className="text-xs">
                {user && user.email ? getEmail(user.email) : 'guest@guest.com'}
              </p>
            </div>
          </div>
          {MENU_LIST.map((menu) => (
            <div
              key={menu.name}
              className="pl-2  w-full hover:bg-gray-700 text-sm transition-all duration-300 rounded-xl py-2"
            >
              <div
                onClick={() => {
                  navigate(menu.link);
                  setOpen(false);
                }}
              >
                {menu.name}
              </div>
            </div>
          ))}
          <div className="w-full h-full px-4   mb-12 flex flex-col justify-end">
            {user ? (
              <div
                onClick={logout}
                className="border-white border-opacity-20 border-t pt-4 flex items-center w-full gap-2"
              >
                <IoIosLogOut className="w-6 h-6" />
                <div className="">Logout</div>
              </div>
            ) : (
              <div
                onClick={login}
                className="border-white border-opacity-20 border-t pt-4 flex items-center w-full gap-2"
              >
                <IoIosLogIn className="w-6 h-6" />
                <div className="">Login</div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <motion.div
        onClick={handleClose}
        className={`fixed w-full h-full ${
          isOpen ? 'z-[200]' : 'z-0'
        } bg-gray-500 backdrop-blur-sm bg-opacity-75`}
        initial={false}
        animate={{ opacity: isOpen ? '100%' : '0%' }}
      ></motion.div>
      <div className="absolute z-50 top-10 w-full flex items-center justify-between px-10">
        <RiMenu2Line onClick={handleOpen} className="text-white w-8 h-8" />
        <Icon></Icon>
        <div className="w-8 h-8"></div>
      </div>
    </>
  );
}
