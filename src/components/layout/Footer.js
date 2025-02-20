import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-footer w-full bg-red-900">
      <div className="2xl:w-[1440px] xl:w-[1200px] lg:w-[900px] md:w-[768px] sm:w-[640px] w-full mx-auto grid grid-cols-12 px-3 py-5 gap-2">
        <div className="sm:col-span-5 col-span-12 text-white sm:mb-0 mb-2">
          <p className="text-md uppercase font-semibold mb-2">
            BAN QUẢN LÝ QUẢNG TRƯỜNG HỒ CHÍ MINH VÀ TƯỢNG ĐÀI BÁC HỒ
          </p>
          <p className="text-sm mb-2">Địa chỉ: Đường Trần Huy Liệu, Phường Trường Thi, Thành phố Vinh, Tỉnh Nghệ An</p>
          <p className="text-sm mb-2">Điện thoại: 02383.590.498; 0987.556.994</p>
          <p className="text-sm mb-2">Điện thoại: 02383.592014</p>
          <p className="text-sm mb-2">Email: dannguyenthongtin@gmail.com</p>
          <p className="text-sm mb-2">Giấy phép số 179/GP-TTĐT, Sở TT&TT cấp ngày 31/12/2021</p>
        </div>
        <div className="sm:col-span-2 col-span-12 text-white sm:mb-0 mb-2">
          <p className="text-sm uppercase font-semibold mb-2">Tin Tức mới nhất</p>
          <ul className="menu-footer">
            {[
              { to: "/post/tin-tuc-su-kien", label: "Tin tức - sự kiện" },
              { to: "/post/chu-tich-ho-chi-minh", label: "Chủ tịch Hồ Chí Minh" },
              { to: "/post/nghien-cuu-khoa-hoc", label: "Nghiên cứu khoa học" },
              { to: "/post/trung-bay", label: "Trưng bày" },
              { to: "/post/ho-tro-tham-quan", label: "Hỗ trợ tham quan" },
            ].map((item, index) => (
              <li key={index} className="hover:pl-2 hover:text-white flex items-center transition-all duration-300">
                <svg className="mr-[1px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M15.54 11.29L9.88 5.64a1 1 0 0 0-1.42 0a1 1 0 0 0 0 1.41l4.95 5L8.46 17a1 1 0 0 0 0 1.41a1 1 0 0 0 .71.3a1 1 0 0 0 .71-.3l5.66-5.65a1 1 0 0 0 0-1.47"/>
                </svg>
                <Link className="block py-2 font-medium text-sm" to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:col-span-2 col-span-12 text-white">
          <p className="text-md uppercase font-semibold mb-2">Về chúng tôi</p>
          <ul className="menu-footer">
            <li className="hover:pl-2 hover:text-white flex items-center transition-all duration-300">
              <svg className="mr-[1px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.54 11.29L9.88 5.64a1 1 0 0 0-1.42 0a1 1 0 0 0 0 1.41l4.95 5L8.46 17a1 1 0 0 0 0 1.41a1 1 0 0 0 .71.3a1 1 0 0 0 .71-.3l5.66-5.65a1 1 0 0 0 0-1.47"/>
              </svg>
              <Link className="block py-2 font-medium text-sm" to="/ve-chung-toi">Về chúng tôi</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;