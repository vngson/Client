import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import avt from 'src/assets/Images/avatar.png';

const Header = () => {
  const [lastSegment, setLastSegment] = useState('');

  useEffect(() => {
    // Lấy đường dẫn hiện tại
    const currentPath = window.location.pathname;

    // Xử lý chuỗi sau dấu /
    const newLastSegment = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    // Cập nhật state với giá trị mới
    setLastSegment(newLastSegment);

  }, []);

  return (
    <div className="header__wrapper absolute flex w-full h-[60px] bg-blue-800 z-10 float-left items-center select-none">
      <div className="header flex w-full items-center relative bg-transparent">
        <h1 className="header__title flex items-center justify-center ml-[40px] pr-[20px] text-white text-2xl font-semibold cursor-pointer">
          Health Insurance
        </h1>
        <div className="header__line w-[2px] h-[40px] bg-white flex flex-col justify-between items-center mr-8">
          <div className="header__line--dot-top w-[4px] h-[4px] bg-white rounded-full border-none"></div>
          <div className="header__line--dot-bottom w-[4px] h-[4px] bg-white rounded-full border-none"></div>
        </div>
        <div className="header__search flex relative items-center w-[280px] mr-[30px]">
          <div className="header__search--icon-wrapper absolute w-[40px] h-[40px] bg-white border-2 border-blue-900 border-opacity-20 flex-shrink-0 rounded-full flex justify-center items-center left-[-10px]">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="header__search--icon text-black text-xl flex-shrink-0" style={{ transform: 'rotate(90deg)' }} />
          </div>
          <input type="text" className="header__search-input flex-1 rounded-lg border-2 border-rgba-15-45-121-0-2 bg-white justify-center text-center h-[30px]" placeholder="Search" />
        </div>
        <ul className="header__nav flex justify-between list-none">
          <li>
            <Link to="/" 
            className={`header__nav--item flex text-white px-5 cursor-pointer bg-transparent ${
              lastSegment === 'home' ? 'font-semibold' : 'font-normal'
            } text-1.6rem overflow-hidden whitespace-nowrap items-center line-height-2.4rem`}
            >
              <i className="fa-solid fa-house"></i>
              Home
            </Link>
          </li>
          <li>
            <Link to="/contract" 
            className={`header__nav--item flex text-white px-5 cursor-pointer bg-transparent ${
              lastSegment === 'contract' ? 'font-semibold' : 'font-normal'
            } text-1.6rem overflow-hidden whitespace-nowrap items-center line-height-2.4rem`}
            >
              <i className="fa-solid fa-user"></i>
              Contract
            </Link>
          </li>
          <li>
            <Link to="/request" 
             className={`header__nav--item flex text-white px-5 cursor-pointer bg-transparent ${
              lastSegment === 'request' ? 'font-semibold' : 'font-normal'
            } text-1.6rem overflow-hidden whitespace-nowrap items-center line-height-2.4rem`}
            >
              <i className="fa-solid fa-earth-asia"></i>
              Request
            </Link>
          </li>
        </ul>
        <div className="header__user absolute right-[40px] flex h-[50px] w-[200px] justify-between items-center bg-gray-900 bg-opacity-50 rounded-lg border border-blue-600 border-opacity-70">
          <img src={avt} alt='Girl in a jacket' className="header__user--avt flex bg-red-300 w-[30px] h-[30px] rounded-[7px] border-none ml-2"></img>
          <div className="header__user--info flex flex-col">
            <span className="header__user--greeting text-white text-[12px] font-semibold">Welcome back,</span>
            <span className="header__user--name text-white text-[16px] font-semibold">Drennan</span>
          </div>
          <FontAwesomeIcon icon={faChevronUp} className="header__user--icon text-xl px-2 text-green-500" />
        </div>
      </div>
    </div>
  );
};

export default Header;
