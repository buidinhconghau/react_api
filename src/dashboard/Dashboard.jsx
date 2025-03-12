import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
function Dashboard() {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token"); // Lấy token từ localStorage
            // console.log("Token trước khi gọi API:", token);
        
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
        
                setUser(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin user:", error);
            }
        }

        fetchData();
    }, []); // Chỉ chạy một lần khi component mount

    const handleLogout = async () => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
    
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
    
            localStorage.removeItem("token"); // Xóa token sau khi logout
            window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
        }
    };
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="grid grid-cols-12  h-[100vh] ">
        
            <div className="sm:col-span-2  relative bg-black transition header-menu-wrapper hidden sm:block nav-web z-100">
                <div className="hidden header-menu sm:block  fixed top-0 left-0 z-10 overflow-y-auto h-[100vh]">
                    <div className="flex border-y-2 border-white">
                        <img  className="h-16 w-16" src="http://127.0.0.1:8000/assets/images/fvicon.jpg" alt=""/>
                        <div className="flex items-center justify-center">
                            <span className="uppercase text-xl text-white font-medium text-center pl-2">
                                 dashboard test123
                            </span>
                        </div>
                    </div>
            
                    <Link to="/dashboard" className="active:bg-white active:text-black active:fill-black text-white fill-white pt-3 font-semibold text-md flex w-full border-b-[1px] border-white pb-[1px] px-2">
                        <svg className="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        
                        <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                        <p className="ml-3">Dashboard</p>
                    </Link>
                    <div className="text-white fill-white ">
                        <div className="active:bg-white active:text-black active:fill-black pt-3 font-semibold text-md flex w-full border-b-[1px] border-white pb-[1px] px-2 parent-dashboard cursor-pointer" onClick={toggleMenu}
                            >
                            <svg className="w-5 h-5 ml-1 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M224 32L64 32C46.3 32 32 46.3 32 64l0 64c0 17.7 14.3 32 32 32l377.4 0c4.2 0 8.3-1.7 11.3-4.7l48-48c6.2-6.2 6.2-16.4 0-22.6l-48-48c-3-3-7.1-4.7-11.3-4.7L288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32zM480 256c0-17.7-14.3-32-32-32l-160 0 0-32-64 0 0 32L70.6 224c-4.2 0-8.3 1.7-11.3 4.7l-48 48c-6.2 6.2-6.2 16.4 0 22.6l48 48c3 3 7.1 4.7 11.3 4.7L448 352c17.7 0 32-14.3 32-32l0-64zM288 480l0-96-64 0 0 96c0 17.7 14.3 32 32 32s32-14.3 32-32z"/></svg>
                            Quản lý tin tức
                            <svg className={`w-3 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512">
                                <path
                                    d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                        </div>
                        {isOpen && (
                            <ul className=" children-dashboard z-[1000]">
                                <li className="flex border-b-[0.5px] active:bg-white active:text-black active:fill-black border-gray-600 pb-2 pt-3 pl-[40px] block  text-sm w-full">
                                    <svg className="w-5 h-5 ml-1 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"/></svg>
                                    <Link className=""
                                    to="/dashboard/danhmucs" >Danh mục bài viết</Link>
                                </li>
                                <li className="flex border-b-[0.5px] active:bg-white active:text-black active:fill-black border-gray-600 pb-2 pt-3 pl-[40px] block  text-sm w-full ">
                                    <svg className="w-5 h-5 ml-1 mr-2"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5l0 39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9l0 39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7l0-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1L257 256c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
                                    <Link className=""
                                        to="/dashboard/tintucs">Bài viết</Link>
                                </li>
                                
                            </ul>
                         )}
                    </div>
                    <div className="text-white fill-white">
                        <div className="pt-3 font-semibold text-md flex w-full border-b-[1px] border-white pb-[1px] px-2 parent-dashboard  "
                            to="/dashboard">
                            <svg className="w-5 h-5 ml-1 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path d="M256 0L576 0c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64l-320 0c-35.3 0-64-28.7-64-64l0-224c0-35.3 28.7-64 64-64zM476 106.7C471.5 100 464 96 456 96s-15.5 4-20 10.7l-56 84L362.7 169c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l80 0 48 0 144 0c8.9 0 17-4.9 21.2-12.7s3.7-17.3-1.2-24.6l-96-144zM336 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM64 128l96 0 0 256 0 32c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-32 160 0 0 64c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 192c0-35.3 28.7-64 64-64zm8 64c-8.8 0-16 7.2-16 16l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0zm0 104c-8.8 0-16 7.2-16 16l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0zm0 104c-8.8 0-16 7.2-16 16l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0zm336 16l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16z"/></svg>
                            Quản lý thư viện
                            <svg className="w-3 ml-2" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512">
                                <path
                                    d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                        </div>
                        <ul className="hidden children-dashboard z-[1000]">
                            <li className="flex border-b-[0.5px] border-gray-600 pb-2 pt-3 pl-[40px] block  text-sm w-full">
                                <svg className="w-5 h-5 ml-1 mr-2"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path d="M64 464c-8.8 0-16-7.2-16-16L48 64c0-8.8 7.2-16 16-16l160 0 0 80c0 17.7 14.3 32 32 32l80 0 0 288c0 8.8-7.2 16-16 16L64 464zM64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-293.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0L64 0zm96 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm69.2 46.9c-3-4.3-7.9-6.9-13.2-6.9s-10.2 2.6-13.2 6.9l-41.3 59.7-11.9-19.1c-2.9-4.7-8.1-7.5-13.6-7.5s-10.6 2.8-13.6 7.5l-40 64c-3.1 4.9-3.2 11.1-.4 16.2s8.2 8.2 14 8.2l48 0 32 0 40 0 72 0c6 0 11.4-3.3 14.2-8.6s2.4-11.6-1-16.5l-72-104z"/></svg>
                                <Link className=""
                                    to="/dashboard">Danh mục hình ảnh</Link>
                            </li>
                            <li className="flex border-b-[0.5px] border-gray-600 pb-2 pt-3 pl-[40px] block  text-sm w-full ">
                                <svg className="w-5 h-5 ml-1 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M160 32c-35.3 0-64 28.7-64 64l0 224c0 35.3 28.7 64 64 64l352 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L160 32zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320l-144 0-48 0-80 0c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120L0 344c0 75.1 60.9 136 136 136l320 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-320 0c-48.6 0-88-39.4-88-88l0-224z"/></svg>
                                <Link className=""
                                    to="/dashboard" >Thư viện ảnh</Link>
                            </li>
                            <li className="flex border-b-[0.5px] border-gray-600 pb-2 pt-3 pl-[40px] block  text-sm w-full ">
                                <svg className="w-5 h-5 ml-1 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>
                                <Link className=""
                                    to="/dashboard" >Thư viện video</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="text-white fill-white">
                        <div className="pt-3 font-semibold text-md flex w-full border-b-[1px] border-white pb-[1px] px-2  "
                            to="/dashboard">
                            <svg className="w-5 h-5 ml-1 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                            Quản lý liên hệ
                            <svg className="w-3 ml-2" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512">
                                
                                <path
                                    d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                        </div>
                        <ul className="hidden children-dashboard z-[1000]">
                            <li>
                                <Link className="border-b-[1px] border-white pb-[1px] pt-3 pl-[40px] block font-medium text-md w-full"
                                    to="/dashboard">Tin tức- sự kiện</Link>
                            </li>
                            <li>
                                <Link className="border-b-[1px] border-white pb-[1px] pt-3 pl-[40px] block font-medium text-md w-full"
                                    to="/dashboard">Chủ tịch Hồ Chí Minh</Link>
                            </li>
                            <li>
                                <Link className="border-b-[1px] border-white pb-[1px] pt-3 pl-[40px] block font-medium text-md w-full"
                                    to="/dashboard">Nghiên cứu khoa học</Link>
                            </li>
                            <li>
                                <Link className="border-b-[1px] border-white pb-[1px] pt-3 pl-[40px] block font-medium text-md w-full"
                                    to="/dashboard">Trưng bày</Link>
                            </li>
                            <li>
                                <Link className="border-b-[1px] border-white pb-[1px] pt-3 pl-[40px] block font-medium text-md w-full"
                                    to="/dashboard">Hỗ trợ tham quan</Link>
                            </li>
                        </ul>
                    </div>
                    <Link to="/dashboard" className="flex text-white fill-white pt-3 font-semibold text-md flex w-full border-b-[1px] border-white pb-[1px] px-2">
                        <svg className="w-5 h-5 ml-1"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                        <path d="M211.2 96a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM32 256c0 17.7 14.3 32 32 32l85.6 0c10.1-39.4 38.6-71.5 75.8-86.6c-9.7-6-21.2-9.4-33.4-9.4l-96 0c-35.3 0-64 28.7-64 64zm461.6 32l82.4 0c17.7 0 32-14.3 32-32c0-35.3-28.7-64-64-64l-96 0c-11.7 0-22.7 3.1-32.1 8.6c38.1 14.8 67.4 47.3 77.7 87.4zM391.2 226.4c-6.9-1.6-14.2-2.4-21.6-2.4l-96 0c-8.5 0-16.7 1.1-24.5 3.1c-30.8 8.1-55.6 31.1-66.1 60.9c-3.5 10-5.5 20.8-5.5 32c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32c0-11.2-1.9-22-5.5-32c-10.8-30.7-36.8-54.2-68.9-61.6zM563.2 96a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM321.6 192a80 80 0 1 0 0-160 80 80 0 1 0 0 160zM32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l576 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 416z"/></svg>
                        <p className="ml-2">Liên kết Website</p>
                    </Link>
                    <Link to="/dashboard" className="flex text-white fill-white pt-3 font-semibold text-md flex w-full border-b-[1px] border-white pb-[1px] px-2">
                        <svg className="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                        <p className="ml-2">Quản lý tài khoản</p>
                    </Link>
                    <Link to="/dashboard" className="flex text-white fill-white pt-3 font-semibold text-md flex w-full border-b-[1px] border-white pb-[1px] px-2">
                        <svg className="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                            
                            <path d="M 25 0 C 22.792969 0 21 1.792969 21 4 C 21 6.207031 22.792969 8 25 8 C 27.207031 8 29 6.207031 29 4 C 29 1.792969 27.207031 0 25 0 Z M 19.375 6.09375 C 14.804688 8.050781 12 12.457031 12 18 C 12 29 8.199219 31.761719 5.9375 33.40625 C 4.933594 34.132813 4 34.808594 4 36 C 4 40.207031 10.28125 42 25 42 C 39.71875 42 46 40.207031 46 36 C 46 34.808594 45.066406 34.132813 44.0625 33.40625 C 41.800781 31.761719 38 29 38 18 C 38 12.441406 35.199219 8.046875 30.625 6.09375 C 29.769531 8.367188 27.566406 10 25 10 C 22.433594 10 20.230469 8.363281 19.375 6.09375 Z M 19 43.875 C 19 43.914063 19 43.960938 19 44 C 19 47.308594 21.691406 50 25 50 C 28.308594 50 31 47.308594 31 44 C 31 43.960938 31 43.914063 31 43.875 C 29.117188 43.953125 27.117188 44 25 44 C 22.882813 44 20.882813 43.953125 19 43.875 Z"></path>
                            </svg>
                        <p className="ml-2">Chữ chạy đầu trang</p>
                    </Link>
                </div>
                 
                         
                <div className="flex justify-end  fixed top-0 right-0">
                        <button type="button" id="setting" className=" flex p-2 ">
                            <svg className="my-auto w-5 h-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128l0 64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9l0-64c0-16.8-12.9-30.5-29.3-31.9zM336 144l0 16c0 53-43 96-96 96l-32 0c-53 0-96-43-96-96l0-16c0-26.5 21.5-48 48-48l128 0c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512l98.3 0 0-64c0-17.7 14.3-32 32-32l128 0c17.7 0 32 14.3 32 32l0 64 98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16l0 48 32 0 0-48c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg>
                            {user &&<b className="text-sm  mx-1"> {user.name}</b>}
                            
                        </button>
                        
                        <button className="pr-3 hover:fill-blue-700" onClick={handleLogout} id="logoutButton">
                            <svg className="w-5 h-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                            </svg>
                        </button>
                        
                </div>
                

            </div>
            <div className="sm:col-span-10 col-span-12">
                
                <Outlet/>
            </div>
                {/* <div className="bg-gray-100 p-4 flex justify-between">
                    <p>Chào {user ? user.name : "khách"}!</p>                     
                        Đăng xuất
                    </button>
                </div> */}
            

       
        
    </div>
    );
}
export default Dashboard;