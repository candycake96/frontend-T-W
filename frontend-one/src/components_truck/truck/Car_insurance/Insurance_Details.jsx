import React from "react";

const Insurance_Details = () => {
    return (
        <>
        <div className="container">
            <div className="p-3">
                <div className=" mb-3 d-flex gap-2 btn-sm">
                    <p className="fw-bolder fs-4">ประกันภัยรถ รถทะเบียน xxxxx</p>


                </div>


                <div className="card">
                    <div className="card-body">

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>วันที่เริ่มต้น</th>
                                <th>วันที่สิ้นสุด</th>
                                <th>ทุนประกัน</th>
                                <th>เบี้ยประกัน</th>
                                <th>สถานะ</th>
                                <th className="text-center">เอกสารเพิ่มเติม</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><p>1</p></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><p>ใช้งานปกติ</p></td>
                                <td className="text-center">
                                    <p><i class="bi bi-file-pdf-fill"></i></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
};


export default Insurance_Details;