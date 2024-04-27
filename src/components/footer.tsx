import { Link } from 'react-router-dom';
import { MENU_LIST } from '../settings/menu-setting';
import Icon from './icon';

export default function Footer() {
  return (
    <div className="relative z-10 mt-20 p-10">
      <div className="w-full p-12 border-t border-opacity-40 border-gray-600">
        <div className="flex justify-between items-start sm:flex-row flex-col sm:gap-0 gap-2">
          <div className="flex items-start flex-col gap-1">
            <div className="flex center gap-3">
              <Icon />
              <div className="text-xl font-semibold">Jelajah Nusantara</div>
            </div>
            <p className="text-md text-secondary-text">
              Indonesia Culture Website
            </p>
          </div>
          <div className=""></div>
          <div className="flex flex-col gap-5 mr-3 text-secondary-text">
            {MENU_LIST.filter((menu, index) => index < 2).map((menu) => (
              <Link
                key={menu.name}
                className="text-sm cursor-pointer hover:underline"
                to={menu.link}
              >
                {menu.name}
              </Link>
            ))}
            <Link
              className="text-sm cursor-pointer hover:underline"
              to="/feedback"
            >
              Feedback
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full center">
        <div className="max-w-screen-lg w-full">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#989AA6]/[0.5] to-transparent"></div>
          <p className="font-normal text-center p-8">
            Made with love 💌 by Blue Jacket
          </p>
        </div>
      </div>
    </div>
  );
}
