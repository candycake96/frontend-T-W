import React from "react";

const CompanyManagement = () => {
    return (
        <>
        <div className="container p-3">
            <div className="mb-3">
                <button 
                className="btn">เพิ่มข้อมูลองค์กรใหม่</button>
            </div>
        <div className="card">
                <div className="card-body">

                    <div className="row">
                        <div className="col-lg-6">
                            <p className="fs-5 fw-normal">ข้อมูลหน่วยงาน</p>
                        </div>
                        <div className="col-lg-6 d-grid gap-2 d-md-flex justify-content-md-end">
                            <button className="btn md-flex">แก้ไข</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-2">
                            <img src="" alt="" />
                        </div>
                        <div className="col-lg-9">
                        <p className="fs-4 fw-bolder mb-2">NCL international logistics</p>
                        <p className="">ที่อยู่</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CompanyManagement;