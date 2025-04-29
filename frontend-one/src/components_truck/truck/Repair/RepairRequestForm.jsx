import React from "react";

const RepairRequestForm = () => {
    return (
        <>
            <div className="container p-3">
                <div className="text-center mb-3 ">
                    <p className="fw-bolder fs-5">ฟร์อมแจ้งซ่อม</p>
                </div>

                <div className="card mb-3">
                    <div className="card-body">
                        <p className=""></p>
                        <div className="row">
                            <div className="col-lg-3">
                                <label htmlFor="a1" className="form-label">เลขที่ใบแจ้งซ่อม</label>
                                <input type="text" className="form-control" id="a1"/>
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="a1" className="form-label">วันที่แจ้ง</label>
                                <input type="date" className="form-control" id="a1"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg-3">
                                <label htmlFor="a1" className="form-label">ผู้แจ้ง</label>
                                <input type="text" className="form-control" id="a1"/>
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="a1" className="form-label">ตำแหน่ง</label>
                                <input type="text" className="form-control" id="a1"/>
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="a1" className="form-label">ทะเบียนรถ</label>
                                <input type="text" className="form-control" id="a1"/>
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="a1" className="form-label">เลขไมล์ปัจุบัน</label>
                                <input type="text" className="form-control" id="a1"/>
                            </div>
                        </div>
                        <hr />
                        <div className="row mb-3">
                        <div className="col-lg-3">
                                <label htmlFor="a1" className="form-label">ระบบ</label>
                                <input type="text" className="form-control" id="a1"/>
                            </div>
                            <div className="col-lg-3 mb-3">
                                <label htmlFor="a1" className="form-label">อะไหล่</label>
                                <input type="text" className="form-control" id="a1"/>
                            </div>
                            <div className="col-lg-3 mb-3">
                                <label htmlFor="a1" className="form-label">ราคาประเมิณ</label>
                                <input type="text" className="form-control" id="a1"/>
                            </div>
                            <div className="col-lg-1 mb-3">
                                <label htmlFor="a1" className="form-label">vat</label>
                                <input type="text" className="form-control" id="a1"/>
                            </div>
                            <div className="col-lg-1 mb-3">
                                <label htmlFor="a1" className="form-label">ลบ</label>
                                <button className="btn btn-secondary"><i class="bi bi-trash3-fill"></i></button>
                            </div>
                            <div className="">
                                <button className="btn btn-primary">เพิ่ม</button>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary">บันทึก</button>
                        </div>
                    </div>
                </div>




            </div>
        </>
    )
}

export default RepairRequestForm;