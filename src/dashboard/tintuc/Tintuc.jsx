import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Tintuc (){
    const [baiviets, setBaiviets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token"); // Lấy token từ localStorage (nếu có)
                const response = await axios.get("http://localhost:8000/api/baiviets", {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Thêm token vào request
                    },
                    withCredentials: true, // Nếu API dùng cookie để xác thực
                });
                setBaiviets(response.data.baiviets || []);
                // console.log(response.data.baiviets);
                setLoading(false);
                const message = localStorage.getItem("successMessage");
                if (message) {
                    setSuccessMessage(message);
                    localStorage.removeItem("successMessage"); // Xóa sau khi hiển thị
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 2000);
                }
            } catch (error) {
                setLoading(false);
                console.error("Lỗi khi lấy danh sách danh mục:", error);
            }
        };

        fetchData();
    }, []);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };
    
    const offset = currentPage * itemsPerPage;
    const currentItems = baiviets.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(baiviets.length / itemsPerPage);
    if (loading) {
        return (
            <div className='mx-auto w-[1200px] '>
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
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8000/api/baiviets/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setBaiviets(baiviets.filter((baiviet) => baiviet.id !== id));
            alert("Xóa thành công!");
        } catch (error) {
            console.error("Lỗi khi xóa bài viết:", error);
            alert("Không thể xóa bài viết.");
        }
    };
    return (
        <div className="dashboard-content container lg:w-[1500px] mx-auto p-6 bg-white rounded-lg shadow-md">
            {successMessage && (
                <div className="alert alert-success fixed top-1 right-0 bg-green-500 text-white p-3 rounded-md shadow-md z-100">
                    {successMessage}
                </div>
            )}
            <h1 className="text-2xl font-bold mb-4">Danh sách bài viết</h1>
            <div className="flex ">
                <Link to="/dashboard/tintucs/create" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-4">
                    Thêm bài viết
                </Link>
                
            </div>
            
            <div className="overflow-y-auto">
                
                <table className="divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr >
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 w-[500px] py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider ">Tên</th>
                            
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Danh mục</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ảnh đại diện</th>
                            
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ngày đăng</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Thao tác</th>
                        </tr>
                    </thead>
                    {currentItems && currentItems.length > 0 ? (
                        <tbody className="bg-white divide-y divide-gray-200  ">
                            {currentItems.map((baiviets) => (
                                <tr key={baiviets.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{baiviets.id}</td>
                                    <td className="w-32 px-6 py-4  text-sm text-gray-500 ">
                                        {baiviets.ten}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {baiviets.ten_danhmuc}
                                    </td>
                                    
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/* @if($baiviet->anhdaidien) */}
                                            <img src={`http://127.0.0.1:8000/storage${baiviets.anhdaidien}`} alt="{{ $baiviet->ten }}" className="w-20 h-20 object-cover"/>
                                        {/* @else
                                            <span>Chưa có ảnh</span>
                                        @endif */}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(baiviets.created_at).toLocaleDateString('vi-VN')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="bg-green-700 hover:bg-green-400 hover:text-black p-2 font-bold text-white shadow-xl rounded-md" >
                                            <Link to={`/dashboard/tintucs/edit/${baiviets.id}`} >Sửa</Link>
                                        </button>
                                        <div className="inline-block ml-2 ">
                                            <button onClick={() => handleDelete(baiviets.id)} className="cursor-pointer bg-red-600 p-2 font-bold text-white hover:bg-red-300 hover:text-black shadow-xl rounded-md">Xóa</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (null)}
                </table>
                
            </div>
            <ReactPaginate
              previousLabel={"«"}
              nextLabel={"»"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="flex items-center justify-center mt-4 space-x-2"
              pageClassName="px-4 py-2 border rounded-md hover:bg-gray-200 cursor-pointer"
              activeClassName="bg-blue-500 text-white cursor-pointer"
              previousClassName="px-4 py-2 border rounded-md hover:bg-gray-200 cursor-pointer"
              nextClassName="px-4 py-2 border rounded-md hover:bg-gray-200 cursor-pointer"
              breakClassName="px-3 cursor-pointer"
          />

            
        </div>
    );
}
export default Tintuc;