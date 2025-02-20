import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostShow() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gửi yêu cầu đến API Laravel để lấy chi tiết bài viết theo slug
    axios.get(`${process.env.REACT_APP_API_URL}/chi-tiet-tin-tuc/${slug}`)
      .then(response => {
        setPost(response.data.baiviets);
        setLoading(false);
      })
      .catch(error => {
        console.error('Có lỗi khi gọi API:', error.response ? error.response.data : error.message);
        setError(error);
        setLoading(false);
      });
  }, [slug]);

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
      {/* <img className='mx-auto' src="/images/loading.webp" alt="Loading" /> */}
    </div>;
  }

  if (error) {
    return <div>Có lỗi khi gọi API: {error.message}</div>;
  }

  // Function to modify image URLs in the post detail
  const modifyImageUrls = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    const images = div.getElementsByTagName('img');
    for (let img of images) {
      if (img.src.startsWith('http://localhost:3000/storage/')) {
        img.src = img.src.replace('http://localhost:3000/storage/', 'http://127.0.0.1:8000/storage/');
      } else if (!img.src.startsWith('http://127.0.0.1:8000/storage/')) {
        img.src = `http://127.0.0.1:8000/${img.src}`;
      }
    }
    return div.innerHTML;
  };

  return (
    <div className='mx-auto w-[1200px] post-show'>
      <h2 className='text-xl font-bold'>{post.ten}</h2>
      {/* <img src={`http://127.0.0.1:8000/storage/${post.anhdaidien}`} alt={post.ten} /> */}
      <div className='mx-auto' dangerouslySetInnerHTML={{ __html: modifyImageUrls(post.detail) }} />
    </div>
  );
}

export default PostShow;