import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DanhmucCreate() {
    const [ten, setTen] = useState("");
    const [slug, setSlug] = useState("");
    const [captren, setCaptren] = useState("0"); // Giá trị mặc định
    const [danhmucs, setDanhmucs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8000/api/danhmucs", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDanhmucs(response.data?.danhmucs || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://127.0.0.1:8000/api/danhmucs", {
                ten,
                captren
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                // Lưu thông báo vào localStorage để chuyển qua trang khác vẫn hiển thị
                localStorage.setItem("successMessage", response.data.message);
                
                // Điều hướng về danh sách danh mục
                navigate("/dashboard/danhmucs");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const createSlug = (ten) => {
        return ten
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/[^a-z0-9 -]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setTen(value);
        setSlug(createSlug(value));
    };

    if (loading) {
        return (
            <div className="mx-auto w-[1200px]">
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
            </div>
        );
    }

    return (
        <div className="container w-[1200px] mx-auto my-4 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Thêm danh mục mới</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="ten" className="block text-sm font-medium text-gray-700">
                        Tên
                    </label>
                    <input
                        type="text"
                        name="ten"
                        value={ten}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="ten"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                        Slug
                    </label>
                    <input
                        type="text"
                        name="slug"
                        value={slug}
                        readOnly
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="slug"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="captren" className="block text-sm font-medium text-gray-700">
                        Cấp trên
                    </label>
                    <select
                        id="captren"
                        name="captren"
                        value={captren}
                        onChange={(e) => setCaptren(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="0" className="text-gray-500">
                            Vui lòng chọn
                        </option>
                        {danhmucs.length > 0 &&
                            danhmucs.map((danhmuc) => (
                                <option key={danhmuc.id} value={danhmuc.id}>
                                    {danhmuc.ten}
                                </option>
                            ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Thêm danh mục
                </button>
            </form>
        </div>
    );
}

export default DanhmucCreate;
