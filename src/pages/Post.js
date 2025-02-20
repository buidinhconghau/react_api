import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Post() {
  const [data, setData] = useState(null);

  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { slug } = useParams();
  useEffect(() => {
    // Hàm fetch dữ liệu theo trang
    const fetchPosts = (page = 1) => {

      axios
        .get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000/api/'}/react-posts?slug=${slug}&page=${page}`)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          setPagination(response.data.pagination || {}); // Kiểm tra pagination

        })
        .catch((error) => {
          setError(error);

        });
    };


    fetchPosts(currentPage);
  }, [slug, currentPage]); // Gọi lại API khi đổi trang


  if (error) {
    return <div>Có lỗi khi gọi API: {error.message}</div>;
  }

  return (
    <div className="container mx-auto w-[1200px]">
      <div className="flex">
        <img src="/images/loading.webp" alt="Loading" className="w-8 h-8" />
        <h2 className="text-2xl font-bold mb-4">{data?.danhmucs?.ten || "Danh mục chưa xác định"}</h2>
      </div>

      <ul className="grid grid-cols-12 gap-4">
        {data?.baiviets?.map((post) => (
          <li key={post.id} className="col-span-12 md:col-span-6 lg:col-span-4">
            <Link
              to={`/chi-tiet-tin-tuc/${post.slug}`}
              className="h-[401px] block p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              {post.anhdaidien && (
                <img
                  src={`http://127.0.0.1:8000/storage/${post.anhdaidien}`}
                  alt={post.ten}
                  className="w-full h-48 object-cover mb-4 rounded-lg"/>
              )}
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.ten}</h3>
              <p className="text-gray-700 line-clamp-3">{post.mota}</p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Phân trang */}
      <div className="flex justify-center space-x-2 my-4">
        {pagination.prev_page_url && (
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded hover:bg-gray-900 group cursor-pointer transition-colors duration-300">
            <svg
              className="w-6 h-6 group-hover:fill-red-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.69,17.29 C15.08,16.9 15.08,16.27 14.69,15.88 L10.81,12 L14.69,8.12 C15.08,7.73 15.08,7.1 14.69,6.71 C14.3,6.32 13.67,6.32 13.28,6.71 L8.69,11.3 C8.3,11.69 8.3,12.32 8.69,12.71 L13.28,17.3 C13.66,17.68 14.3,17.68 14.69,17.29 Z" />
            </svg>
          </button>
        )}
        <span className="text-lg font-medium">
          Trang {pagination.current_page} / {pagination.last_page}
        </span>
        {pagination.next_page_url && (
          <button onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded hover:bg-gray-900 group cursor-pointer transition-colors duration-300">
            <svg className="w-6 h-6 group-hover:fill-red-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.31,6.71 C8.92,7.1 8.92,7.73 9.31,8.12 L13.19,12 L9.31,15.88 C8.92,16.27 8.92,16.9 9.31,17.29 C9.7,17.68 10.33,17.68 10.72,17.29 L15.31,12.7 C15.7,12.31 15.7,11.68 15.31,11.29 L10.72,6.7 C10.34,6.32 9.7,6.32 9.31,6.71 Z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default Post;