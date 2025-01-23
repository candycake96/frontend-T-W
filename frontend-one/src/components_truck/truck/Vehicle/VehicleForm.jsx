import axios from "axios";
import React, { useEffect, useState } from "react";

const VehicleForm = () => {

    const [isCarType, setCarType] = useState([]);
    const [isUsageType, setUsageType] = useState([]);

    const fetchCarType = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            console.log("Stored Token:", token); // ✅ ตรวจสอบ Token

            if (!token) {
                console.error("No access token found");
                return;
            }

            const response = await axios.get("http://localhost:3333/api/detailscartype", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("API Response:", response.data); // ✅ ตรวจสอบ Response

            setCarType(response.data);
        } catch (error) {
            console.error("Error fetching detailscartype:", error);
            if (error.response) {
                console.error("Response Status:", error.response.status); // ✅ ดูว่าเป็น 403 จริงไหม
                console.error("Response Data:", error.response.data); // ✅ ดูข้อความจากเซิร์ฟเวอร์
            }
        }
    };

    const fetchVehicleUsageType = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.error("No access token found");
                return;
            }

            const response = await axios.get("http://localhost:3333/api/detailsvehicleusagetype", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("API Response:", response.data); // ✅ ตรวจสอบ Response

            setUsageType(response.data);
        } catch (error) {
            console.error("Error fetching VehicleUsageType:", error);
            if (error.response) {
                console.error("Response Status:", error.response.status); // ✅ ดูว่าเป็น 403 จริงไหม
                console.error("Response Data:", error.response.data); // ✅ ดูข้อความจากเซิร์ฟเวอร์
            }
        }
    };

    useEffect(() => {
        fetchCarType();
        fetchVehicleUsageType();
    }, []);

    // useEffect(() => {
    //     console.log("Updated isCarType:", isCarType); // ✅ ตรวจสอบ State
    // }, [isCarType]);


    return (
        <>
            <div className="container">
                <div className="text-center p-3">
                    <p className="fs-4"> เพิ่มข้อมูลรถใหม่</p>
                    <hr />
                </div>

                <div className="card  rounded-0 mb-3">
                    <div className="card-body">
                        <form action="">
                            <div className="text-center mb-3">
                                <p className="fw-bolder">รายการจดทะเบียน</p>
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="input_reg_date" className="form-label fw-medium">วันที่จดทะเบียน</label>
                                    <input type="date" name="reg_date" id="input_reg_date" className="form-control" />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label htmlFor="input_reg_number" className="form-label fw-medium">เลขทะเบียน</label>
                                    <input type="text" name="reg_number" id="input_reg_number" className="form-control" placeholder="กรอกเลขทะเบียน" />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label htmlFor="input_province" className="form-label fw-medium">จังหวัด</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="กรอกจังหวัด" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">เชื้อเพลิง / รหัสตรวจสภาพ</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="เชื้อเพลิง / รหัสตรวจสภาพ" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">ประเภท</label>
                                    <select className="form-select">
                                        <option value="">เลือกประเภทรถ</option>
                                        {isUsageType.length > 0 ? (
                                            isUsageType.map((rowUsageType) => (
                                                <option key={rowUsageType.usage_id} value={rowUsageType.usage_id}>
                                                    {rowUsageType.usage_type}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>กำลังโหลด...</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">ลักษณะ / มาตรฐาน</label>
                                    <select className="form-select">
                                        <option value="">เลือกประเภทรถ</option>
                                        {isUsageType.length > 0 ? (
                                            isUsageType.map((rowUsageType) => (
                                                <option key={rowUsageType.usage_id} value={rowUsageType.usage_id}>
                                                    {rowUsageType.usage_type}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>กำลังโหลด...</option>
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">ยี่ห้อรถ</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="ยี่ห้อรถ" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">แบบ / รุ่น</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">สี</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="สี" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">เลขตัวถัง</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="ยี่ห้อรถ" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">อยู่ที่</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">ยี่ห้อเครื่องยนต์</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="ยี่ห้อรถ" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">เลขเครื่องยนต์</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">อยู่ที่</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-2">
                                    <label htmlFor="input_province" className="form-label fw-medium">จำนวนสูบ</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="ยี่ห้อรถ" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="input_province" className="form-label fw-medium">แรงม้า</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="input_province" className="form-label fw-medium">น้ำหนักรถ</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="input_province" className="form-label fw-medium">จำนวนผู้โดยสาร</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="input_province" className="form-label fw-medium">น้ำหนักบรรทุก(ลงเพลา)</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="input_province" className="form-label fw-medium">น้ำหนักรวม</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-2">
                                    <label htmlFor="car_type_id" className="form-label fw-medium">ประเภทรถ</label>
                                    <select className="form-select">
                                        <option value="">เลือกประเภทรถ</option>
                                        {isCarType.length > 0 ? (
                                            isCarType.map((rowCarType) => (
                                                <option key={rowCarType.car_type_id} value={rowCarType.car_type_id}>
                                                    {rowCarType.car_type_name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>กำลังโหลด...</option>
                                        )}
                                    </select>
                                </div>
                            </div>


                            <hr className="mb-3" />
                            <div className="text-center mb-3">
                                <p className="fw-bolder">เจ้าของรถ</p>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">ลำดับที่ </label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="xxx" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">วัน เดือน ปี ที่ครอบครอง</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">ผู้ประกอบการขนส่ง </label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="xxx" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">หนังสือสำคัณแสดงการจดทะเบียน</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">สัญชาติ</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">ที่อยู่ </label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="xxx" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">ประกอบการขนส่งประเภท</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">ใบอนุญาตเลขที่</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">วันสิ้นอายุใบอนุญาต </label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="xxx" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">มีสิทธิครอบครองและใช้รถโดย</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">ใบอนุญาตเลขที่</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_province" className="form-label fw-medium">ผู้ถือกรรมสิทธิ์ </label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="xxx" />
                                </div>
                                <div className="col-lg-8">
                                    <label htmlFor="input_province" className="form-label fw-medium">ที่อยู่</label>
                                    <input type="text" name="province" id="input_province" className="form-control" placeholder="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="input_province" className="form-label fw-medium">ไฟล์สแกนเอกสารรถ (ถ้ามี) </label>
                                    <input type="file" name="province" id="input_province" className="form-control" />
                                </div>
                            </div>

                            <div className="text-center mb-3">
                                <button className="btn" style={{ background: "#4cbec5", color: "#ffffff" }}>บันทึก</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VehicleForm;
