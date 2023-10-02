import React from 'react';
import { BiLogoXing } from 'react-icons/bi';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex items-center justify-center">
        <BiLogoXing className="text-3xl cursor-pointer" />
        <h1 className="text-3xl font-semibold ml-2 cursor-pointer">
          Picture Paradise
        </h1>
      </div>
    </header>
  );
};

export default Header;
