import React from "react";

const RepairRequestForm = () => {
    return (
        <>
            <div className="container p-3">
                <div className="text-center mb-3 ">
                    <p className="fw-bolder fs-5">ข้อมูลแจ้งซ่อม</p>
                </div>

                <div className="card mb-3">
                    <div className="card-body">

                    </div>
                    
                </div>

                <div className="mb-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ประเภทรถ</th>
                                <th>ทะเบียนรถ</th>
                                <th>เลขไมล์ล่าสุด</th>
                                <th>เลขไมล์ซ่อมบำรุง</th>
                                <th>แผนการซ่อมบำรุง</th>
                                <th className="col-1">แจ้งส่งซ่อม</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="">

                </div>
            </div>
        </>
    )
}

export default RepairRequestForm;