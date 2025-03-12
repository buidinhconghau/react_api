import React, { useState } from 'react';

function Contact() {
    const [data, setData] = useState({
        hoten: '',
        diachi: '',
        sdt: '',
        ngaysinh: '',
        noidung: ''
    });

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };
    const validateForm = () => {
        let checkErr = true;
        const errors = {};

        const hoten = data.hoten.trim();
        const diachi = data.diachi.trim();
        const sdt = data.sdt.trim();
        const ngaysinh = data.ngaysinh;
        const noidung = data.noidung.trim();

        if (hoten === "") {
            errors.hoten = "Tên không được trống!";
            checkErr = false;
        } else if (!/^[a-zA-Z\s]+$/.test(hoten)) {
            errors.hoten = "Tên không được chứa ký tự đặc biệt";
            checkErr = false;
        }

        if (diachi === "") {
            errors.diachi = "Địa chỉ không được trống!";
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

        if (noidung === "") {
            errors.noidung = "Nội dung không được trống!";
            checkErr = false;
        }

        setErrors(errors);
        return checkErr;
    };
    // function showMessage(message, type) {
    //     const mess = document.getElementById('message');
    //     mess.textContent = message;
    //     if (type === "success") {
    //         mess.className = "fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md";
    //     } else {
    //         mess.className = "fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-md";
    //     }

    //     mess.classList.remove('hidden');
    //     setTimeout(() => {
    //         mess.classList.add('hidden');
    //     }, 3000);
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/api/contact-react', {
                method: 'POST', // Sử dụng phương thức HTTP chính xác dựa trên tài liệu API
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                if (response.ok) {
                    setData({
                        hoten: '',
                        diachi: '',
                        sdt: '',
                        ngaysinh: '',
                        noidung: ''
                    });
                    setMessage(data.message || "Gửi ý kiến thành công!");
                    document.getElementById('message').className = "fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md";
                    setTimeout(() => {
                        document.getElementById('message').className = "hidden";
                    }, 2000);
                } else {
                    setMessage(data.message || "Có lỗi xảy ra!");
                    document.getElementById('message').className = "fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-md";
                    setTimeout(() => {
                        document.getElementById('message').className = "hidden";
                    }, 2000);
                }
            } else {
                setMessage("Phản hồi không phải là JSON");
            }
        } catch (error) {
            setMessage('Có lỗi xảy ra khi gửi dữ liệu!');
            console.error('There was an error!', error);
        }
    };
    return (
        <div  className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div id="message" className={`fixed top-24 right-5 px-4 py-2 rounded shadow-md ${message ? 'bg-green-500 text-white' : 'hidden'}`}>
                {message}
            </div>
            <form onSubmit={handleSubmit} id="contactForm" className="validate_form bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Biểu mẫu liên hệ</h2>

                <div className="mb-4">
                    <label htmlFor="hoten" className="block text-gray-700 font-medium mb-2">Họ và tên</label>
                    <input type="text" id="hoten" name="hoten" value={data.hoten} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập họ và tên" />
                    {errors.hoten && <p className="text-red-500 text-sm mt-1">{errors.hoten}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="diachi" className="block text-gray-700 font-medium mb-2">Địa chỉ</label>
                    <input type="text" id="diachi" name="diachi" value={data.diachi} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập địa chỉ" />
                    {errors.diachi && <p className="text-red-500 text-sm mt-1">{errors.diachi}</p>}
                </div>

                
                
                <div className="mb-4">
                    <label htmlFor="sdt" className="block text-gray-700 font-medium mb-2">Số điện thoại</label>
                    <input type="number" id="sdt" name="sdt" value={data.sdt} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập số điện thoại" />
                    {errors.sdt && <p className="text-red-500 text-sm mt-1">{errors.sdt}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="ngaysinh" className="block text-gray-700 font-medium mb-2">Ngày sinh</label>
                    <input type="date" id="ngaysinh" name="ngaysinh" value={data.ngaysinh} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.ngaysinh && <p className="text-red-500 text-sm mt-1">{errors.ngaysinh}</p>}
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
    // return (
    //     <form onSubmit={handleSubmit} className="p-4 border rounded">
    //         <input
    //             type="text"
    //             name="hoten"
    //             defaultValue={data.hoten}
    //             onChange={handleChange}
    //             placeholder="Name"
    //             className="border p-2 mb-2 w-full "
    //         />
    //         <input
    //             type="text"
    //             name="diachi"
    //             defaultValue={data.diachi}
    //             onChange={handleChange}
    //             placeholder="dia chi"
    //             className="border p-2 mb-2 w-full "
    //         />
    //         <input
    //             type="number"
    //             name="sdt"
    //             defaultValue={data.sdt}
    //             onChange={handleChange}
    //             placeholder="sdt"
    //             className="border p-2 mb-2 w-full "
    //         />
    //         <input
    //             type="date"
    //             name="ngaysinh"
    //             defaultValue={data.ngaysinh}
    //             onChange={handleChange}
    //             placeholder="ngaysinh"
    //             className="border p-2 mb-2 w-full "
    //         />
    //         <textarea
    //             name="noidung"
    //             defaultValue={data.noidung}
    //             onChange={handleChange}
    //             placeholder="noidung"
    //             className="border p-2 mb-2 w-full "
    //         ></textarea>
    //         <button type="submit" className="bg-blue-500 text-white p-2 w-full cursor-pointer">
    //             Send
    //         </button>
    //         {message && <p className="mt-2 text-red-500">{message}</p>}
    //     </form>
    // );
}

export default Contact;