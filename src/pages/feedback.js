import React, { useState } from 'react';

function Contact() {
    const [data, setData] = useState({
        hoten: "",
        email: "",
        sdt: "",
        ngaysinh: "",
        gioitinh: "",
        noidung: "",
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    // Thay đổi dữ liệu trong form
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Validate form
    const validateForm = () => {
        let checkErr = true;
        const errors = {};

        const hoten = data.hoten.trim();
        const email = data.email.trim();
        const sdt = data.sdt.trim();
        const ngaysinh = data.ngaysinh;
        const gioitinh = data.gioitinh;
        const noidung = data.noidung.trim();

        if (hoten === "") {
            errors.hoten = "Tên không được trống!";
            checkErr = false;
        } else if (!/^[a-zA-Z\s]+$/.test(hoten)) {
            errors.hoten = "Tên không được chứa ký tự đặc biệt";
            checkErr = false;
        }

        if (email === "") {
            errors.email = "Email không được trống!";
            checkErr = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email không hợp lệ!";
            checkErr = false;
        }

        if (sdt === "") {
            errors.sdt = "Số điện thoại không được trống!";
            checkErr = false;
        } else if (!/^\d+$/.test(sdt)) {
            errors.sdt = "Số điện thoại không hợp lệ!";
            checkErr = false;
        }

        if (!ngaysinh) {
            errors.ngaysinh = "Ngày sinh không được trống!";
            checkErr = false;
        }

        if (!gioitinh) {
            errors.gioitinh = "Giới tính không được trống!";
            checkErr = false;
        }

        if (noidung === "") {
            errors.noidung = "Nội dung không được trống!";
            checkErr = false;
        }

        setErrors(errors);
        return checkErr;
    };

    // Xử lý gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) return; // Nếu có lỗi, không gửi form
    
        try {
            const response = await fetch("http://127.0.0.1:8000/api/contact-react", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const result = await response.json();
                if (response.ok) {
                    setMessage("Gửi ý kiến thành công!");
                    setData({ hoten: "", email: "", sdt: "", ngaysinh: "", gioitinh: "", noidung: "" });
                    setErrors({});
                } else {
                    setErrors(result.errors || {});
                }
            } else {
                console.error("Phản hồi không phải là JSON");
                setMessage("Lỗi khi gửi dữ liệu.");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            setMessage("Lỗi khi gửi dữ liệu.");
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div id="message" className={`fixed top-24 right-5 px-4 py-2 rounded shadow-md ${message ? 'bg-green-500 text-white' : 'hidden'}`}>
                {message}
            </div>
            <form id="contactForm" className="validate_form bg-white p-6 rounded-lg shadow-md w-full max-w-lg" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Biểu mẫu liên hệ</h2>

                <div className="mb-4">
                    <label htmlFor="hoten" className="block text-gray-700 font-medium mb-2">Họ và tên</label>
                    <input type="text" id="hoten" name="hoten" value={data.hoten} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập họ và tên" />
                    {errors.hoten && <p className="text-red-500 text-sm mt-1">{errors.hoten}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                    <input type="email" id="email" name="email" value={data.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập email của bạn" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="sdt" className="block text-gray-700 font-medium mb-2">Số điện thoại</label>
                    <input type="text" id="sdt" name="sdt" value={data.sdt} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập số điện thoại" />
                    {errors.sdt && <p className="text-red-500 text-sm mt-1">{errors.sdt}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="ngaysinh" className="block text-gray-700 font-medium mb-2">Ngày sinh</label>
                    <input type="date" id="ngaysinh" name="ngaysinh" value={data.ngaysinh} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.ngaysinh && <p className="text-red-500 text-sm mt-1">{errors.ngaysinh}</p>}
                </div>

                <div className="mb-4">
                    <span className="block text-gray-700 font-medium mb-2">Giới tính</span>
                    <label className="flex items-center mb-2">
                        <input type="radio" name="gioitinh" value="Nam" checked={data.gioitinh === "Nam"} onChange={handleChange} className="w-5 h-5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
                        <span className="ml-2 text-gray-700">Nam</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="gioitinh" value="Nữ" checked={data.gioitinh === "Nữ"} onChange={handleChange} className="w-5 h-5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
                        <span className="ml-2 text-gray-700">Nữ</span>
                    </label>
                    {errors.gioitinh && <p className="text-red-500 text-sm mt-1">{errors.gioitinh}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="noidung" className="block text-gray-700 font-medium mb-2">Nội dung</label>
                    <textarea id="noidung" name="noidung" value={data.noidung} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập nội dung" rows="4"></textarea>
                    {errors.noidung && <p className="text-red-500 text-sm mt-1">{errors.noidung}</p>}
                </div>

                <button type="submit" className="cursor-pointer w-full bg-red-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 focus:outline-none">
                    Gửi
                </button>
            </form>
        </div>
    );
}

export default Contact;