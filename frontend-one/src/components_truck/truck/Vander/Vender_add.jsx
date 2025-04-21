import React from "react";

const Vender_add = () => {
    return (
        <>
  <div className="mb-3">
                
                {/* 🛠 คุณสามารถใส่ฟอร์มเพิ่มข้อมูลตรงนี้ */}
                <div className="card p-3 shadow-sm">
                    <h5 className="mb-3">ฟอร์มเพิ่มข้อมูลผู้ขาย</h5>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input className="form-control" placeholder="ชื่อผู้ขาย / อู่" />
                        </div>
                        <div className="col-md-6">
                            <input className="form-control" placeholder="เบอร์โทร" />
                        </div>
                        {/* เพิ่ม field อื่น ๆ ตามต้องการ */}
                    </div>
                    <div className="mt-3 d-flex justify-content-end">
                        <button className="btn btn-success">บันทึก</button>
                    </div>
                </div>
            </div>               
        </>
    )
}
export default Vender_add;



