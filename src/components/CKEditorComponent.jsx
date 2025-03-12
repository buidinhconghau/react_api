import React, { useEffect, useRef } from "react";

const CKEditorComponent = ({ value, onChange }) => {
    const editorRef = useRef(null);
    const containerRef = useRef(null);
    const isEditorInitialized = useRef(false); // 🟢 Ngăn chặn init 2 lần

    const initEditor = () => {
        if (!isEditorInitialized.current && window.ClassicEditor && containerRef.current) {
            isEditorInitialized.current = true; // ✅ Đánh dấu đã khởi tạo

            window.ClassicEditor
                .create(containerRef.current)
                .then(editor => {
                    editorRef.current = editor;
                    editor.setData(value || ""); // 🟢 Gán dữ liệu cũ

                    editor.model.document.on("change:data", () => {
                        onChange(editor.getData());
                    });

                    editor.editing.view.change(writer => {
                        writer.setStyle("height", "300px", editor.editing.view.document.getRoot());
                    });
                })
                .catch(error => {
                    console.error("CKEditor lỗi:", error);
                });
        }
    };

    useEffect(() => {
        initEditor();
    }, []);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setData(value || "");
        }
    }, [value]);

    return <textarea ref={containerRef} id="editor"></textarea>;
};

export default CKEditorComponent;
