import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../config/apiConfig";
import { useLocation } from "react-router-dom";
import Insurance_Add_form from "./modal/Insurance_Add_Form";

const Insurance_Details = () => {


    const location = useLocation();
    const rowMiData = location.state || {};

    const [isInsuranceData, setInsuraceData] = useState([]);
    const [isOpenPopoverInsurance, setOpenPopoverInsurance] = useState(false);
    const [isPopoverInsuranceData, setPopoverInsuranceData] = useState(null);

// ฟังก์ชันสำหรับเปิด/ปิด popover
const handleTogglePopoverInsuranceAddForm = (data) => {
    setOpenPopoverInsurance((prevState) => !prevState);  // เปลี่ยนสถานะให้เปิด/ปิด
    if (!isOpenPopoverInsurance) {
        setPopoverInsuranceData(data); // ตั้งค่า data เมื่อเปิด popover
    } else {
        setPopoverInsuranceData(null); // รีเซ็ตข้อมูลเมื่อปิด popover
    }
}

    const fetchInsuranceData = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/api/car_insurance_details/${rowMiData.reg_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            setInsuraceData(response.data);
        } catch (error) {
            console.error("Error fetching vehicle data:", error);
        }
    };

    useEffect(() => {
        fetchInsuranceData();
    }, []);

    // ฟังก์ชันแปลงวันที่
    const formatDate = (dateString) => {
        const date = new Date(dateString); // สร้างอ็อบเจกต์ Date จากวันที่ที่ได้รับ
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('th-TH', options); // แสดงผลในรูปแบบวัน เดือน ปี (ภาษาไทย)
    };

    return (
        <>
            <div className="container">
                <div className="p-3">
                    <div className=" mb-3 d-flex gap-2 btn-sm">
                        <p className="fw-bolder fs-4">ประกันภัยรถ รถทะเบียน {rowMiData.reg_number}</p>
                        <button className="btn btn-primary" onClick={()=> handleTogglePopoverInsuranceAddForm(rowMiData)}> <i class="bi bi-journal-plus"></i> เพิ่มข้อมูลประกันภัย</button>
                    </div>
<div className="mb-3">
    <div className="">
        {isOpenPopoverInsurance && (
            <div className="">
                <div className="mb-2">
                    <hr />
                </div>
            <Insurance_Add_form dataCar={isPopoverInsuranceData} />                
            </div>
        )  
        }
    </div>
</div>
<div className="mb-3">
    <hr />
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
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isInsuranceData && isInsuranceData.length > 0 ? (
                                        isInsuranceData.map((row, index) => (
                                            <tr key={index}>
                                                <td><p>{index + 1}</p></td>
                                                <td>{formatDate(row.insurance_start_date)}</td>
                                                <td>{formatDate(row.insurance_end_date)}</td>
                                                <td>{row.insurance_converage_amount}</td>
                                                <td>{row.insurance_premium}</td>
                                                <td>{row.status}</td>
                                                <td className="text-center">
                                                    {row.insurance_file ? (
                                                        <a href={row.insurance_file} style={{ color: "#cd6155" }}>
                                                            <i className="bi bi-file-pdf-fill"></i> ไฟล์
                                                        </a>
                                                    ) : (
                                                        <p>NO!</p>
                                                    )}
                                                </td>
                                                <td>
                                                    <button className="btn btn-primary">แก้ไข</button>
                                                    <button className="btn btn-danger">ลบ</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center text-muted">
                                                ไม่มีข้อมูลประกัน
                                            </td>
                                        </tr>
                                    )}
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