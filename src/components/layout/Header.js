import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Header = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000/api'}/menu`)
      .then(response => {
        setData(response.data);
        // console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <header className="sticky top-0 z-[10000] bg-red-900">
      <nav>
        <div className="transition nav-web w-full z-[10000] bg-red-900">
          <ul className="hidden bg-red-900 sm:flex sm:flex-wrap justify-center 2xl:w-[1440px] xl:w-[1200px] lg:w-[900px] md:w-[768px] sm:w-[640px] w-full mx-auto ">
            <li className="hover:bg-gray-200 group text-white hover:text-red-600 parent relative">
              <Link className="uppercase px-5 block py-3 font-semibold text-sm flex fill-white group-hover:fill-red-600" to="/">
                <svg className="w-5 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>
                Trang chủ
                <svg className="w-3 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
              </Link>
              <ul className="children absolute left-0 top-[110%] min-w-[200px] shadow-md rounded invisible bg-gray-200 z-[10000]">
                <li className="hover:bg-red-900 parent relative hover:pl-2 hover:text-white">
                  <Link className="uppercase px-2 block py-2 font-medium text-sm" to="http://localhost:3000/">test1</Link>
                </li>
                <li className="hover:bg-red-900 parent relative hover:pl-2 hover:text-white">
                  <Link className="uppercase px-2 block py-2 font-medium text-sm" to="http://localhost:3000/">test2</Link>
                </li>
                <li className="hover:bg-red-900 parent relative hover:pl-2 hover:text-white">
                  <Link className="uppercase px-2 block py-2 font-medium text-sm" to="http://localhost:3000/">test3</Link>
                </li>
              </ul>
            </li>
            {Array.isArray(data?.menu) && data.menu.length > 0 ? (
              data.menu.map(parent => (
                <li key={parent.id} className="hover:bg-gray-200 group text-white hover:text-red-600 parent relative">
                  <Link className="uppercase px-5 block py-3 font-semibold text-sm flex fill-white group-hover:fill-red-600" to={`/post/${parent.slug}`}>
                    {parent.ten}
                    {Array.isArray(parent.children) && parent.children.length > 0 && (
                      <svg className="w-3 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                      </svg>
                    )}
                  </Link>

                  {/* Kiểm tra nếu có danh mục con thì hiển thị */}
                  {Array.isArray(parent.children) && parent.children.length > 0 && (
                    <ul className="children absolute left-0 top-[110%] min-w-[200px] shadow-md rounded invisible bg-gray-200 z-[10000] group-hover:visible">
                      {parent.children.map(child => (
                        <li key={child.id} className="hover:bg-red-900 parent relative hover:pl-2 hover:text-white">
                          <Link className="uppercase px-2 block py-2 font-medium text-sm" to={`/post/${child.slug}`}>
                            {child.ten}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))
            ) : null}

          </ul>
          
        </div>
      </nav>
    </header>
  );
};

export default Header;