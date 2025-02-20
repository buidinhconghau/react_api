import React, { useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slicks  from "../utils/Slicks";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
  useEffect(() => {
    // Gửi yêu cầu đến API Laravel để lấy chi tiết bài viết theo slug
    axios.get(`${process.env.REACT_APP_API_URL}/home-react`)
      .then(response => {
        setData(response.data);
        // console.log(response.data?.marquee);
        setLoading(false);
        Slicks();
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);
  if (error) {
    return <div>Có lỗi khi gọi API: {error.message}</div>;
  }
  if (loading) {
    return <div className='mx-auto w-[1200px] '>
      <div className="pixel-loader">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>;
  }

  return (
    <div className='main px-2'>
      <div className="2xl:w-[1440px] xl:w-[1200px] lg:w-[900px] md:w-[768px] sm:w-[640px] w-full mx-auto mb-2 mt-[1px]">
        <div className="flex border-y-[1px] h-8 w-full">
          <div className="w-fit px-3 bg-red-800 fill-white py-1">
            <svg className="h-3 w-3 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
            </svg>
          </div>
          <div className="marquee flex-1 px-2">
            <ul className="flex list-disc text-red-900 ">
              {data?.marquee?.map((marquee) => (
                <li key={marquee.id} className="mx-4 md:text-lg sm:text-md text-sm text-[#394E79] ">
                  {marquee.ten}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-8 bg-red-800"> 
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-12 2xl:w-[1440px] xl:w-[1200px] lg:w-[900px] md:w-[768px] sm:w-[640px] w-full mx-auto gap-4">
        <div className="sm:col-span-9 col-span-12 grid grid-cols-12 gap-x-4 h-fit">
          {data?.tinmoi && data?.tinmoi.length > 0 ? (
            <div className="sm:col-span-6 col-span-12">
              <Link to={`/chi-tiet-tin-tuc/${data?.tinmoi[0]?.slug}`}>
              <img
                    src={`http://127.0.0.1:8000/storage${data?.tinmoi[0]?.anhdaidien}`}
                    alt={data?.tinmoi[0]?.ten}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                  />
                <h2 className="font-bold text-[20px] text-[#b21c37] py-[5px]">
                  {data?.tinmoi[0]?.ten}
                  
                </h2>
              </Link>   
              <span className="text-[#989898] fill-[#989898] font-light text-sm align-bottom leading-5">
                <svg className="mr-[2px] align-text-top h-[14px] inline" xmlns="http://www.w3.org/2000/svg"
                  height="1em" viewBox="0 0 448 512">
                          <path
                              d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z">
                          </path>
                      </svg>
                    {new Date(data?.tinmoi[0]?.created_at).toLocaleDateString('vi-VN')}
                  </span>
                  <p className="text-gray-600 text-sm">{data?.tinmoi[0]?.mota}</p>
                  
            </div>
          ):(null)}
          {data?.tinmoi && data?.tinmoi.length > 0 ? (
            <div className="sm:col-span-6 col-span-12">
                  <div className="title flex flex-wrap items-center bg-[#b21c37] mb-3">
                      <div className="w-1/12 ml-5">
                          <img className="" src={`http://127.0.0.1:8000/assets/images/icon-new.gif`} alt="tin tức cập nhật"/>
                      </div>
                      <p className="uppercase font-semibold text-[17px] text-white ml-5">tin tức cập nhật</p>
                  </div>
                  <ul>
                      {data?.tinmoi.slice(1, 8).map((item, index) => (
                        <li key={index} className="flex items-center fill-[#b21c37] hover:text-[#b21c37] border-dotted border-b-[2px] mb-[5px]">
                          <svg className="mr-2 w-3 h-3" xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 512 512">
                            <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z">
                            </path>
                          </svg>
                          <Link className="leading-5 text-sm py-[1px]" to={`/chi-tiet-tin-tuc/${item.slug}`}>{item.ten.length > 130 ? item.ten.substring(0, 130) + "..." : item.ten}</Link>
                        </li>
                      ))}
                  </ul>
                
            </div>
          ):(null)}
          <div className="col-span-12">
                <img loading="lazy" src={`http://127.0.0.1:8000/assets/images/capture-1-doubleextralarge.png`} alt="img1"/>
          </div>
          <div className="new grid grid-cols-12 col-span-12 gap-3 mb-3">
            {data?.tintonghop && data?.tintonghop.length > 0 ? (  
              <div className="sm:col-span-6 col-span-12">
                <Link to={`/post/${data?.tintonghop[0].danhmuc.slug}`} className="flex justify-between bg-[#dedede] mb-2">
                  <div className="new-title relative bg-[#b21c37] leading-[26px] font-semibold text-base text-white">{data?.tintonghop[0].danhmuc.ten}</div>
                    <div className="flex items-center text-sm relative mr-2 hover:text-[#b21c37] hover:fill-[#b21c37]">
                      Xem thêm
                      <svg className="h-3 ml-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z">
                        </path>
                      </svg>
                  </div>
                </Link>
                    <div className="new-content">
                    
                        <Link to={`/chi-tiet-tin-tuc/${data?.tintonghop[0].slug}`} className="list-top grid grid-cols-12 gap-2 mb-2">
                            <div className="col-span-4">
                                <img className="h-[105px] w-full" loading="lazy"
                                    src={`http://127.0.0.1:8000/storage${data?.tintonghop[0].anhdaidien}`} alt={data?.tintonghop[0].anhdaidien}/>
                            </div>
                            <div className="title col-span-8">
                                <p className="font-semibold text-[15px] text-[#b21c37]">{data?.tintonghop[0].ten}</p>
                                <p className="break-words text-[14px] line-clamp-3">{data?.tintonghop[0].mota}</p>
                                <span
                                    className="text-[#989898] fill-[#989898] font-light text-sm align-bottom leading-5">
                                    <svg className="mr-[2px] align-text-top h-[14px] inline"
                                        xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path
                                            d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z">
                                        </path>
                                    </svg>
                                    {new Date(data?.tintonghop[0]?.created_at).toLocaleDateString('vi-VN')}
                                </span>
                            </div>
                        </Link>
                      
                        <div className="list-bottom bg-[#dedede] px-2 py-3 rounded-sm">
                            <ul>
                                {data?.tintonghop.slice(1, 5).map((item, index) => (
                                  <li key={index} className="flex fill-[#b21c37] hover:text-[#b21c37] text-[14px]">
                                      <svg className="h-5 w-3 mr-2" xmlns="http://www.w3.org/2000/svg" width="10"
                                          height="10" viewBox="0 0 1664 1408">
                                          <path
                                              d="M768 896v384q0 52-38 90t-90 38H128q-52 0-90-38t-38-90V896q0-52 38-90t90-38h512q52 0 90 38t38 90zm0-768v384q0 52-38 90t-90 38H128q-52 0-90-38T0 512V128q0-52 38-90t90-38h512q52 0 90 38t38 90zm896 768v384q0 52-38 90t-90 38h-512q-52 0-90-38t-38-90V896q0-52 38-90t90-38h512q52 0 90 38t38 90zm0-768v384q0 52-38 90t-90 38h-512q-52 0-90-38t-38-90V128q0-52 38-90t90-38h512q52 0 90 38t38 90z">
                                          </path>
                                      </svg>
                                      <Link aria-label="Chuỗi hoạt động chào mừng ngày Di sản Văn hóa Việt Nam 23/11"
                                          to={`/chi-tiet-tin-tuc/${item.slug}`}>
                                          {item.ten}
                                      </Link>
                                  </li>
                                ))}
                            </ul>
                      
                        </div>
                        
                    </div>
              </div>
            ):(null)}
            {data?.tintuc && data?.tintuc.length > 0 ? (  
              <div className="sm:col-span-6 col-span-12">
                  <Link to={`/post/${data?.tintuc[0].danhmuc.slug}`} className="flex justify-between bg-[#dedede] mb-2">
                    <div className="new-title relative bg-[#b21c37] leading-[26px] font-semibold text-base text-white">{data?.tintuc[0].danhmuc.ten }</div>
                      <div className="flex items-center text-sm relative mr-2 hover:text-[#b21c37] hover:fill-[#b21c37]">
                            Xem thêm
                            <svg className="h-3 ml-2" xmlns="http://www.w3.org/2000/svg" height="1em"
                                viewBox="0 0 512 512">
                                <path
                                    d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z">
                                </path>
                            </svg>
                    </div>
                  </Link>
                    <div className="new-content">
                        <Link to={`/chi-tiet-tin-tuc/${data?.tintuc[0].slug}`} className="list-top grid grid-cols-12 gap-2 mb-2">
                            <div className="col-span-4">
                                <img className="h-[105px] w-full" loading="lazy"
                                    src={`http://127.0.0.1:8000/storage${data?.tintuc[0].anhdaidien}`} alt={data?.tintuc[0].anhdaidien}/>
                            </div>
                            <div className="title col-span-8">
                                <p className="font-semibold text-[15px] text-[#b21c37]">{data?.tintuc[0].ten}</p>
                                <p className="break-words text-[14px] line-clamp-3">{data?.tintuc[0].mota}</p>
                                <span
                                    className="text-[#989898] fill-[#989898] font-light text-sm align-bottom leading-5">
                                    <svg className="mr-[2px] align-text-top h-[14px] inline"
                                        xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path
                                            d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z">
                                        </path>
                                    </svg>
                                    {new Date(data?.tintuc[0]?.created_at).toLocaleDateString('vi-VN')}
                                </span>
                            </div>
                        </Link>
                        
                        <div className="list-bottom bg-[#dedede] px-2 py-3 rounded-sm">
                            <ul>
                                {data?.tintuc.slice(1, 5).map((item, index) => (
                                  <li key={index} className="flex fill-[#b21c37] hover:text-[#b21c37] text-[14px]">
                                      <svg className="h-5 w-3 mr-2" xmlns="http://www.w3.org/2000/svg" width="10"
                                          height="10" viewBox="0 0 1664 1408">
                                          <path
                                              d="M768 896v384q0 52-38 90t-90 38H128q-52 0-90-38t-38-90V896q0-52 38-90t90-38h512q52 0 90 38t38 90zm0-768v384q0 52-38 90t-90 38H128q-52 0-90-38T0 512V128q0-52 38-90t90-38h512q52 0 90 38t38 90zm896 768v384q0 52-38 90t-90 38h-512q-52 0-90-38t-38-90V896q0-52 38-90t90-38h512q52 0 90 38t38 90zm0-768v384q0 52-38 90t-90 38h-512q-52 0-90-38t-38-90V128q0-52 38-90t90-38h512q52 0 90 38t38 90z">
                                          </path>
                                      </svg>
                                      <Link aria-label="Chuỗi hoạt động chào mừng ngày Di sản Văn hóa Việt Nam 23/11"
                                          to={`/chi-tiet-tin-tuc/${item.slug}`}>
                                        {item.ten}
                                      </Link>
                                  </li>
                                ))}
                                
                            </ul>
                        </div>
                    </div>
              </div>
            ):(null)}
            {data?.bacHo && data?.bacHo.length > 0 ? (  
              <div className="sm:col-span-6 col-span-12">
                  <Link to={`/post/${data?.bacHo[0].danhmuc.slug}`} className="flex justify-between bg-[#dedede] mb-2">
                      <div className="new-title relative bg-[#b21c37] leading-[26px] font-semibold text-base text-white">{data?.bacHo[0].danhmuc.ten}</div>
                        <div className="flex items-center text-sm relative mr-2 hover:text-[#b21c37] hover:fill-[#b21c37]">
                            Xem thêm
                            <svg className="h-3 ml-2" xmlns="http://www.w3.org/2000/svg" height="1em"
                                viewBox="0 0 512 512">
                                <path
                                    d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z">
                                </path>
                            </svg>
                      </div>
                  </Link>
                    <div className="new-content">
                        <Link to={`/chi-tiet-tin-tuc/${data?.bacHo[0].slug}`} className="list-top grid grid-cols-12 gap-2 mb-2">
                            <div className="col-span-4">
                                <img className="h-[105px] w-full" loading="lazy" src={`http://127.0.0.1:8000/storage${data?.bacHo[0].anhdaidien}`} alt=""/>
                            </div>
                            <div className="title col-span-8">
                                <p className="font-semibold text-[15px] text-[#b21c37]">{data?.bacHo[0].ten}</p>
                                <p className="break-words text-[14px] line-clamp-3">{data?.bacHo[0].mota}</p>
                                <span
                                    className="text-[#989898] fill-[#989898] font-light text-sm align-bottom leading-5">
                                    <svg className="mr-[2px] align-text-top h-[14px] inline"
                                        xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path
                                            d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z">
                                        </path>
                                    </svg>
                                    {new Date(data?.bacHo[0]?.created_at).toLocaleDateString('vi-VN')}
                                </span>
                            </div>
                        </Link>
                        <div className="list-bottom bg-[#dedede] px-2 py-3 rounded-sm">
                            <ul>
                                {data?.bacHo.slice(1, 5).map((item, index) => (
                                  <li key={index} className="flex fill-[#b21c37] hover:text-[#b21c37] text-[14px]">
                                      <svg className="h-5 w-3 mr-2" xmlns="http://www.w3.org/2000/svg" width="10"
                                          height="10" viewBox="0 0 1664 1408">
                                          <path
                                              d="M768 896v384q0 52-38 90t-90 38H128q-52 0-90-38t-38-90V896q0-52 38-90t90-38h512q52 0 90 38t38 90zm0-768v384q0 52-38 90t-90 38H128q-52 0-90-38T0 512V128q0-52 38-90t90-38h512q52 0 90 38t38 90zm896 768v384q0 52-38 90t-90 38h-512q-52 0-90-38t-38-90V896q0-52 38-90t90-38h512q52 0 90 38t38 90zm0-768v384q0 52-38 90t-90 38h-512q-52 0-90-38t-38-90V128q0-52 38-90t90-38h512q52 0 90 38t38 90z">
                                          </path>
                                      </svg>
                                      <Link aria-label="Chuỗi hoạt động chào mừng ngày Di sản Văn hóa Việt Nam 23/11"
                                        to={`/chi-tiet-tin-tuc/${item.slug}`}>
                                          {item.ten}
                                      </Link>
                                  </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
              </div>
            ):(null)}
            {data?.imgs && data?.imgs.length > 0 ? (  
                <div className="sm:col-span-6 col-span-12">
                    <Link to="/" className="flex justify-between bg-[#dedede] mb-2">
                        <div className="new-title relative bg-[#b21c37] leading-[26px] font-semibold text-base text-white">Thư viện ảnh</div>
                        <div className="flex items-center text-sm relative mr-2 hover:text-[#b21c37] hover:fill-[#b21c37]">
                            Xem thêm
                            <svg className="h-3 ml-2" xmlns="http://www.w3.org/2000/svg" height="1em"
                                viewBox="0 0 512 512">
                                <path
                                    d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z">
                                </path>
                            </svg>
                        </div>
                    </Link>
                    
                      <div className="list-video-top mb-1">
                        {data?.imgs.map((img, index) => (
                          <img 
                            key={index} 
                            style={{ height: '250px' }} 
                            src={`http://127.0.0.1:8000/storage/${img.anh}`} 
                            alt={img.anh || "Hình ảnh"}
                          />
                        ))}      
                      </div> 
                    

                      <ul class="grid grid-cols-12 list-video-bottom bg-[#dedede]  rounded-sm relative ">
                    
                        {data?.imgs.map((img, index) => (
                            <img 
                              key={index} 
                              style={{ height: '67px' }} 
                              className="px-2" 
                              src={`http://127.0.0.1:8000/storage/${img.anh}`} 
                              alt={img.anh || "Hình ảnh"}
                            />
                          ))}
                      </ul>
                </div>
            ):(null)}    
          </div>
          <div className="banner-body col-span-12 mb-2">
                <img src="http://127.0.0.1:8000/assets/images/538.png" alt="img2"/>
          </div>
          {data?.HCM_nghean && data?.HCM_nghean.length > 0 ? (
            <div className="col-span-12 grid grid-cols-12 mb-3 gap-2">
            <Link to={`/post/${data?.HCM_nghean[0].danhmuc.slug}`} className="title col-span-12 flex items-center">
                    <p className="font-bold text-xl text-[#b21c37] py-[5px] flex mb-2 pr-2 w-fit">
                        <img className="mb-2 mr-2" src="https://dbndnghean.vn/assets/60a0a746/images/lotus-draw.svg" alt="" />
                        {data?.HCM_nghean[0].danhmuc.ten }
                    </p>
            </Link>
                <Link to={`/chi-tiet-tin-tuc/${data?.HCM_nghean[0].slug}`} className="sm:col-span-6 col-span-12">
                    <img loading="lazy" className="mb-2" src={`http://127.0.0.1:8000/storage${data?.HCM_nghean[0].anhdaidien}`} alt=""/>
                    <h2 className="font-bold text-[20px] text-[#b21c37] py-[5px]">
                        <p aria-label="Trưng bày chuyên đề “ Hồ Chí Minh - Người là ánh sáng soi đường”...">
                            
                            {data?.HCM_nghean[0].ten}
                        </p>
                    </h2>
                    <span className="text-[#989898] fill-[#989898] font-light text-sm align-bottom leading-5">
                        <svg className="mr-[2px] align-text-top h-[14px] inline" xmlns="http://www.w3.org/2000/svg"
                            height="1em" viewBox="0 0 448 512">
                            <path
                                d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z">
                            </path>
                        </svg>
                        {new Date(data?.HCM_nghean[0]?.created_at).toLocaleDateString('vi-VN')}
                    </span>
                    <p className="text-gray-600 text-sm">{data?.HCM_nghean[0].mota }</p>
                </Link>
                <div className="sm:col-span-6 col-span-12">
                  {data?.HCM_nghean.slice(1, 5).map((item) => ( 
                    <Link key={item.slug}  to={`/chi-tiet-tin-tuc/${item.slug}`} className="grid grid-cols-12 gap-2 col-span-12 border-b-[1px] mb-2">
                        <div className="sm:col-span-4 col-span-12">
                            <img loading="lazy" className="mb-2"
                                src={`http://127.0.0.1:8000/storage/${item.anhdaidien }`} alt={item.anhdaidien }/>
                        </div>
                        <div className="sm:col-span-8 col-span-12">
                            <h2 className="font-bold text-[15px] text-[#b21c37]">
                                <p aria-label="Công An tỉnh Nghệ An dâng hoa, dâng hương, báo công... ">
                                    {item.ten}
                                </p>
                            </h2>
                            <span className="text-[#989898] fill-[#989898] font-light text-sm align-bottom leading-5">
                                <svg className="mr-[2px] align-text-top h-[14px] inline"
                                    xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                    <path
                                        d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z">
                                    </path>
                                </svg>
                                {new Date(item.created_at).toLocaleDateString('vi-VN')}
                            </span>
                            <p className="text-gray-600 text-[13px] line-clamp-3">{item.mota}</p>
                        </div>
                    </Link>
                  ))}
                </div>
            </div>
          ):(null)}
          <div className="col-span-12">
            <img loading="lazy" src="http://127.0.0.1:8000/assets/images/capture-1-doubleextralarge.png"alt="img-ngang"/>
          </div>
          {data?.videos && data?.videos.length > 0 ? (
            <div className="col-span-12 mb-2">
                <Link to="/">
                    <p className="uppercase text-xl text-center hover:text-red-900 text-[#b21c37] font-semibold">Thư viện video</p>
                </Link>
                <div className="h-[2px] bg-[#b21c37] w-[70px] mx-auto mb-4"></div>
                  <div className="grid grid-cols-12 gap-2" style={{ backgroundImage: 'url(http://127.0.0.1:8000/assets/images/queminhxunghe.jpg)', backgroundPosition: 'left', backgroundSize: 'contain' }}>
                    <div className="col-span-12 sm:col-span-7 p-4">
                      <div className="rounded-lg">
                        <iframe className="rounded-lg w-full" width="auto" height="315"
                          src={`https://www.youtube.com/embed/${data?.videos[0].youtube_id}`}
                          title="YouTube video player" frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                      </div>
                      <Link to="/">
                        <h3 className="leading-8 hover:text-red-500 text-center text-white font-bold text-xl">
                          {data?.videos[0].ten}
                        </h3>
                      </Link>
                    </div>
                    <div className="sm:col-span-5 col-span-12 gap-2 py-3">
                      {data?.videos.slice(1, 4).map((item, index) => (
                        <Link key={index} to="{{ $videos[$i]->url ??''}}" className="grid grid-cols-12 gap-2 py-3">
                          <img 
                            className="col-span-5 rounded-xl h-full" 
                            src={item.thumbnail} 
                            alt="images" 
                            style={{ width: '100%', height: '101px', objectFit: 'cover' }}
                          />
                          <div className="col-span-7 my-auto">
                            <p className="hover:text-red-200 text-white text-sm py-2"> {item.ten}</p>
                            <p className="text-blue-200 text-sm">{new Date(item.created_at).toLocaleDateString('vi-VN')}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
            </div>
          ):(null)}
        </div>
        <div className="sm:col-span-3 col-span-12">
            <div className="">
            <div className="new-content">
              {data?.imgs && data?.imgs.length > 0 ? (
                <>
                  <div className="title px-3 py-[1px] bg-[#dedede] border-[#b21c37] border-l-[2px] mb-2">
                    <p className="text-[#b21c37] font-bold">Thư viện ảnh</p>
                  </div>
                  <div className="list-video-top mb-1">
                    {data.imgs.map((img, index) => (
                      <img 
                        key={index} 
                        className="rounded-lg" 
                        style={{ height: '250px', objectFit: 'cover' }} 
                        src={`http://127.0.0.1:8000/storage${img.anh}`} 
                        alt={img.anh}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            <div className="image my-3">
                <div className="title px-3 py-[1px] bg-[#dedede] border-[#b21c37] border-l-[2px] ">
                    <p className="text-[#b21c37] font-bold">Tham quan trực tuyến</p>
                </div>
                <div >
                    <Link to={'https://vanhoa360.com/qthcm/index.html'} className="py-1 ">
                        <img className="pt-1 " src="http://127.0.0.1:8000/assets/images/trung-bay-360.jfif" alt="trungbay360"/>
                    </Link>
                </div>
            </div>
            {data?.phongcachHCMs && data?.phongcachHCMs.length > 0 ? (
              <div className="mb-2">
                  <div className="title px-3 py-[1px] bg-[#dedede] border-[#b21c37] border-l-[2px] mb-2">
                      <p className="text-[#b21c37] font-bold">{data?.phongcachHCMs[0].danhmuc.ten}</p>
                  </div>
                  <ul className="content border-[#b21c37] border-[1px] py-2">
                      {data?.phongcachHCMs.map((phongcachHCM, index) => (
                          <li key={index} className="text-xs mb-2 pl-2 hover:text-[#b21c37] hover:fill-[#b21c37]">
                              <Link to={`/chi-tiet-tin-tuc/${phongcachHCM.slug}`} className="flex items-center hover:underline">
                                  <svg className="mr-2 h-2 w-2" xmlns="http://www.w3.org/2000/svg" height="1em"
                                      viewBox="0 0 512 512">
                                      <path
                                          d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z">
                                      </path>
                                  </svg>
                                  {phongcachHCM.ten }
                              </Link>
                          </li>
                      ))}
                      
                  </ul>
                  
              </div>
            ):(null)}
            <div className="image mb-2">
                <img className="w-full" loading="lazy" src="http://127.0.0.1:8000/storage/images/T3_29%20b%C3%A0i%203_1.jpeg"
                    alt="img"/>
            </div>
            <div className="image mb-7">
                <img className="w-full" loading="lazy" src="http://127.0.0.1:8000/assets/images/anh-8.png" alt=""
                  />
            </div>
            <div className="image mb-7">
                <img className="w-full" loading="lazy"
                    src="http://127.0.0.1:8000/assets/images/quang-truong-ho-chi-minh-12.jpg" alt=""/>
            </div>
            <div className="image mb-7">
                <img loading="lazy" src="http://127.0.0.1:8000/assets/images/quang-truong-ho-chi-minh-9.jpg"
                    alt=""/>
            </div>
            <div className="mb-2">
                <div className="title px-3 py-[1px] bg-[#ccc] border-[#b21c37] border-l-[2px] mb-2">
                    <p className=" text-xl text-[#b21c37] font-bold">Liên kết Website</p>
                </div>
                <ul className="content border-[#b21c37] border-[1px] py-2 divide-y divide-gray-100 overflow-y-scroll" role="list"  style={{height: '16.5rem'}}>
                    
                    <li className=" pl-2 hover:bg-red-500 flex gap-x-2 py-2 items-center">
                        <img className=" h-8 w-8 flex-none rounded-full bg-gray-50" src="http://127.0.0.1:8000/assets/images/icon-lk.png" />
                        <div className="min-w-0">
                            <Link to="http://www.btxvnt.org.vn">
                                <p className="text-sm font-semibold leading-6 text-gray-900  ">Bào tàng Xô Viết Nghệ Tĩnh</p>
                            </Link>
                        </div>
                    </li>
                    
                    <li className=" pl-2 hover:bg-red-500 flex gap-x-2 py-2 items-center">
                        <img className=" h-8 w-8 flex-none rounded-full bg-gray-50" src="http://127.0.0.1:8000/assets/images/icon-lk.png"/>
                        <div className="min-w-0">
                            <Link to="https://www.facebook.com/thuvientinhnghean">
                                <p className="text-sm font-semibold leading-6 text-gray-900 ">Thư
                                    viện tỉnh Nghệ An</p>
                            </Link>
                        </div>
                    </li>
                    <li className=" pl-2 hover:bg-red-500 flex gap-x-2 py-2 items-center">
                        <img className=" h-8 w-8 flex-none rounded-full bg-gray-50" src="http://127.0.0.1:8000/assets/images/icon-lk.png"/>
                        <div className="min-w-0">
                            <Link to="https://www.facebook.com/TTNTTTNA/">
                                <p className="text-sm font-semibold leading-6 text-gray-900  ">
                                    Trung tâm Nghệ thuật truyền thống tỉnh Nghệ An</p>
                            </Link>
                        </div>
                    </li>
                    <li className=" pl-2 hover:bg-red-500 flex gap-x-2 py-2 items-center">
                        <img className=" h-8 w-8 flex-none rounded-full bg-gray-50" src="http://127.0.0.1:8000/assets/images/icon-lk.png"/>
                        <div className="min-w-0">
                            <Link to="http://vanhoanghean.com.vn">
                                <p className="text-sm font-semibold leading-6 text-gray-900  ">
                                    Văn hóa Nghệ An</p>
                            </Link>
                        </div>
                    </li>
                    <li className=" pl-2 hover:bg-red-500 flex gap-x-2 py-2 items-center">
                        <img className=" h-8 w-8 flex-none rounded-full bg-gray-50" src="http://127.0.0.1:8000/assets/images/icon-lk.png"/>
                        <div className="min-w-0">
                            <Link to="https://dancaxunghe.vn/">
                                <p className="text-sm font-semibold leading-6 text-gray-900  ">
                                    Dân ca xứ Nghệ</p>
                            </Link>
                        </div>
                    </li>
                    <li className=" pl-2 hover:bg-red-500 flex gap-x-2 py-2 items-center">
                        <img className=" h-8 w-8 flex-none rounded-full bg-gray-50" src="http://127.0.0.1:8000/assets/images/icon-lk.png"/>
                        <div className="min-w-0">
                            <Link to="https://baotanghochiminh.vn/">
                                <p className="text-sm font-semibold leading-6 text-gray-900  ">
                                    Bảo tàng Hồ Chí Minh</p>
                            </Link>
                        </div>
                    </li>
                    <li className=" pl-2 hover:bg-red-500 flex gap-x-2 py-2 items-center">
                        <img className=" h-8 w-8 flex-none rounded-full bg-gray-50" src="http://127.0.0.1:8000/assets/images/icon-lk.png"/>
                        <div className="min-w-0">
                            <Link to="http://www.khuditichkimlien.gov.vn">
                                <p className="text-sm font-semibold leading-6 text-gray-900  ">
                                    Khu di tích Kim Liên</p>
                            </Link>
                        </div>
                    </li>
                    <li className=" pl-2 hover:bg-red-500 flex gap-x-2 py-2 items-center">
                        <img className=" h-8 w-8 flex-none rounded-full bg-gray-50" src="http://127.0.0.1:8000/assets/images/icon-lk.png"/>
                        <div className="min-w-0">
                            <Link to=" http://banquanlyditichnghean.gov.vn">
                                <p className="text-sm font-semibold leading-6 text-gray-900  ">
                                    Ban Quản lý di tích Nghệ An</p>
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="image mb-7">
                <img className="w-full" loading="lazy" src="./assets/images/anh-8.png" alt=""
                    />            
            </div>
            <div className="image mb-7">
                <img className="w-full" loading="lazy"
                    src="./assets/images/quang-truong-ho-chi-minh-12.jpg" alt="" />
            </div>
           
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
