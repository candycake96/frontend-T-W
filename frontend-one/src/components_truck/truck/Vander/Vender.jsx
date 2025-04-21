import React, { useState } from "react";
import Vender_table_details from "./Vender_table_details";
import Vender_add from "./Vender_add";

const Vender = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const toggleForm = () => {
        setIsFormOpen(prev => !prev);
    };

    return (
        <div className="container">
            <div className="p-3 d-flex justify-content-between align-items-center">
                <p className="fw-bolder fs-5 m-0">ผู้จำหน่ายสินค้า / อู่ซ่อม</p>
                <button className="btn btn-primary" onClick={toggleForm}>
                    {isFormOpen ? "ปิดฟอร์ม" : "เพิ่มข้อมูล"}
                </button>
            </div>

            {isFormOpen && (
              <Vender_add/>
            )}

            <hr className="mb-3" />
<div className="mb-3">
            <Vender_table_details />    
</div>

        </div>
    );
};

export default Vender;
