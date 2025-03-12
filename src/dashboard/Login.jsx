import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
            console.log(response.data);
        } catch (error) {
            console.log(error);

            // Kiểm tra nếu API trả về lỗi
            if (error.response) {
                setError(error.response.data.message || 'Sai tài khoản hoặc mật khẩu');
            } else {
                setError('Lỗi kết nối, vui lòng thử lại');
            }
        } finally {
            setLoading(false);
        }
    };
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-900">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập mật khẩu của bạn"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        
        </div>
)}
export default Login;