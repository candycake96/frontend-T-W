import React from "react";
import { Button } from "react-bootstrap";

const Vehicle_models = () => {
    return (
        <>
        <div className="container py-3">
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                        <h5 className="fw-bold text-primary mb-1">ตั้งค่าข้อมูลรถ</h5>
                        <p className="text-muted mb-0">
                            รายงานการตั้งค่าข้อมูลรถเพื่อใช้ในการเพิ่มข้อมูลรถ
                        </p>
                    </div>
                    <div className="btn-group" role="group">
                       
                    </div>
                </div>
            </div>
            <hr className="mb-3" />
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
                <p>ข้อมูลยี่ห้อ/รุ่นรถ</p>
                <Button className="btn-sm">เพิ่มข้อมูล</Button>
            </div>
            <div className="">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ยี่ห้อ</th>
                            <th>รุ่น</th>
                            <th>*</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>aaa</td>
                            <td>aaa</td>
                            <td>aaa</td>
                            <td><Button className=""><i class="bi bi-feather"></i></Button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
};

export default Vehicle_models;