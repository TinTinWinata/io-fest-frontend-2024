import { useState } from 'react';
import { IoWarning } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../contexts/user-context';
import { useOrientation } from '../hooks/useOrientation';
import { MENU_LIST } from '../settings/menu-setting';
import { toastSuccess } from '../utils/toast';
import CoolButton from './cool-button';
import Icon from './icon';
import MobileNavigation from './mobile-navigation';

export default function Navbar() {
  const [isShowLogout, setShowLogout] = useState<boolean>(false);
  const { login, logout, user } = useUserAuth();
  const { orientation } = useOrientation();
  const handleLogin = () => {
    if (!user) login();
    else {
      toastSuccess(`Senang bertemu dengan anda, ${user.displayName}`);
    }
  };

  if (orientation === 'computer')
    return (
      <div className="fixed top-8 z-50 w-full center">
        <div className="mx-5 backdrop-blur-sm	flex max-w-screen-md w-full border-gray-500 border-opacity-50 border font-semibold text-white text-md py-3 rounded-2xl center gap-3">
          <Icon />
          <div className="w-3/4 center">
            <div className="flex gap-4">
              {MENU_LIST.map((menu, index) => (
                <Link
                  key={index}
                  className="hover:underline transition-all duration-200 mx-2"
                  to={menu.link}
                >
                  {menu.name}
                </Link>
              ))}
            </div>
          </div>
          <div
            className="relative"
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
          >
            <CoolButton
              onClick={handleLogin}
              className="z-20 relative truncate"
            >
              {user ? user.displayName?.split(' ')[0] : 'Login'}
            </CoolButton>
            <div
              onClick={logout}
              className={`${
                isShowLogout && user ? 'top-8 h-[70px]' : 'top-0 h-[0px]'
              } absolute z-10  left-[50%] overflow-hidden transform -translate-x-1/2 text-sm bg-gray-50 border border-opacity-20 border-white transition-all duration-300 hover:bg-opacity-90 bg-text-sky-600 bg-opacity-75 backdrop-blur-sm rounded-b-md w-[80%] center text-blue-500 py-2 flex-col`}
            >
              <IoWarning className="w-6 h-6" />
              <div className="">Logout</div>
            </div>
          </div>
        </div>
      </div>
    );
  else return <MobileNavigation />;
}
