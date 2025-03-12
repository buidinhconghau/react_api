import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CKEditorComponent from "../../components/CKEditorComponent";

function UpdateTintuc (){
    const { id } = useParams();
    const [ten, setTen] = useState('');
    const [slug, setSlug] = useState('');
    const [mota, setMota] = useState('');
    const [detail, setDetail] = useState('');
    const [anhdaidien, setAnhdaidien] = useState('');
    const [danhmuc_id, setDanhmuc_id] = useState('');
    const [danhmucs, setDanhmuc] = useState([]);
    const [baiviets, setBaiviet] = useState([]);
    const [showImage, setShowImage] = useState(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8000/api/baiviets/edit/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("Dữ liệu API trả về:", response.data);

                if (response.data.baiviets) {
                    const baiviet = response.data.baiviets;
                    setTen(baiviet.ten || "");
                    setSlug(baiviet.slug || "");
                    setMota(baiviet.mota || "");
                    setDetail(baiviet.detail || "");
                    setDanhmuc_id(baiviet.danhmuc_id || "");
                    
                    
                    // Hiển thị ảnh đại diện đúng
                    setAnhdaidien(baiviet.anhdaidien ? `http://localhost:8000/storage/${baiviet.anhdaidien}` : "");

                    console.log("Ảnh đại diện:", baiviet.anhdaidien);
                }
                setBaiviet(response.data.baiviets );
                    // console.log("Danh mục:", baiviets.ten_danhmuc);
                
                setDanhmuc(response.data?.danhmucs || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
                setError("Không thể tải dữ liệu bài viết.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);
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
    const handleEditorChange = (newContent) => {
        setDetail(newContent);
        console.log("Nội dung mới:", newContent);
    };

    

    const handleFileChange = (e) => {
        setAnhdaidien(e.target.files[0]);
        setShowImage(false);
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("ten", ten);
    formData.append("mota", mota);
    formData.append("detail", detail);
    formData.append("danhmuc_id", danhmuc_id);
    formData.append('anhdaidien', anhdaidien);
    formData.append("slug", ten.replace(/\s+/g, "-").toLowerCase());
    
    formData.append("_method", "PUT"); // Laravel hỗ trợ PUT thông qua POST

    console.log("Dữ liệu gửi đi:", Object.fromEntries(formData));

    try {
        const response = await axios.post(
            `http://127.0.0.1:8000/api/baiviets/${id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (response.data.success) {
            localStorage.setItem("successMessage", response.data.message);
            navigate("/dashboard/tintucs");
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật bài viết:", error);
    }
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
        <div className="col-span-10 w-full mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Sửa Bài viết </h1>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="ten" className="block text-sm font-medium text-gray-700">Tên</label>
                    <input type="text" name="ten"
                        value={ten}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="ten" required />
                </div>
                <div className="mb-4 ">
                    <label htmlFor="anhdaidien" className="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
                    <div className="mt-2 flex items-center space-x-4">
                    {showImage && anhdaidien && (
                            <img
                                src={anhdaidien}
                                alt="Ảnh đại diện"
                                className="w-32 h-32 object-cover rounded-lg"
                            />
                        )}
                        <input type="file" name="anhdaidien"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                            id="anhdaidien" />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="danhmuc_id" className="block text-sm font-medium text-gray-700">
                        Danh mục
                    </label>
                    {/* <select
                        id="danhmuc_id"
                        name="danhmuc_id"
                        value={danhmuc_id}
                        onChange={(e) => setDanhmuc_id(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="0" className="text-gray-500">
                            Vui lòng chọn
                        </option>
                        {danhmucs?.length > 0 &&
                            danhmucs?.map((danhmuc) => (
                                <option key={danhmuc.id} value={danhmuc.id}>
                                    {danhmuc.ten}
                                </option>
                            ))}
                    </select> */}
                    <select
                        value={danhmuc_id || 0} 
                        onChange={(e) => setDanhmuc_id(Number(e.target.value))}
                        className="mt-1 block w-full px-3 py-2 border rounded-md"
                    >
                        
                        <option value="0">
                            {baiviets.ten_danhmuc || "Chọn danh mục"}
                        </option>

                        {danhmucs.map((danhmuc) => (
                            <option key={danhmuc.id} value={danhmuc.id}>
                                {danhmuc.ten}
                            </option>
                        ))}
                    </select>

                </div>
                <div className="mb-4">
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
                    <input type="text" name="slug"
                        value={slug}
                        readOnly
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="slug" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="mota" className="block text-sm font-medium text-gray-700">Mô tả</label>
                    <textarea name="mota" value={mota} onChange={(e) => setMota(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="mota" rows="3" required></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="detail" className="block text-sm font-medium text-gray-700">Chi tiết</label>
                    <CKEditorComponent value={detail} onChange={handleEditorChange} />
                </div>
                <button type="submit" className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sửa bài viết
                </button>
            </form>
        </div>
    );
}
export default UpdateTintuc;