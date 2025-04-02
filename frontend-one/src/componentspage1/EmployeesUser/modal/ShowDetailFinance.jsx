import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../config/apiConfig";

const ShowDetailFinance = ({ emp, onEdit }) => {
    if (!emp) return null; //ตรวจสอบค่าเพื่อไม่ให้ error 
    const id = emp.id_emp;
    const [Salary, setSalary] = useState([]);
    const [socialSecurity, setSocialSecurity] = useState([]);
    const fetchsetSalary = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/api/getFinanceSalaries/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            // console.log("Fetched positions:", response.data); // Check fetched data
            setSalary(response.data);
        } catch (error) {
            console.error("Error fetching job positions:", error);
        }
    };

    useEffect(() => {
        fetchsetSalary()
    }, []);

    const fetchsetsocial_security = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/api/get_social_security/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            // console.log("Fetched positions:", response.data); // Check fetched data
            setSocialSecurity(response.data);
        } catch (error) {
            console.error("Error fetching job positions:", error);
        }
    };

    useEffect(() => {
        fetchsetsocial_security()
    }, []);

    
    // ฟังก์ชันแปลงวันที่
    const formatDate = (dateString) => {
        if (!dateString) return "-"; // ป้องกัน error กรณีค่าเป็น null หรือ undefined
        const date = new Date(dateString);
        return date.toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <>
            <div className="">
                {Salary.map((row) => (
                    <div key={row.salary_id}>
                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="col-4 fw-bold">เงินเดือน</div>
                                <button style={{ color: '#008000', border: 'none', background: 'transparent' }} onClick={() => onEdit(row)}>
                                    <i className="bi bi-pencil-square"></i> แก้ไข
                                </button>
                            </div>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-lg-4"><p> จำนวนเงินก : {row.base_salary} </p></div>
                                    <div className="col-lg-5">วันที่เริ่มต้นหัก : {formatDate(row.effective_date)} </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                ))}

                {socialSecurity.map((row) => (
                    <div key={row.social_security_id}>
                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="col-4 fw-bold">ประกันสังคม</div>
                                <button style={{ color: '#008000', border: 'none', background: 'transparent' }} onClick={() => onEdit(row)}>
                                    <i className="bi bi-pencil-square"></i> แก้ไข
                                </button>
                            </div>
                            <div className="mb-3">
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-4"><p> จำนวนเงินที่หัก : {row.contribution_amount} </p></div>
                                    <div className="col-4">อัตราการหัก :  </div>
                                    <div className="col-4">วันที่เริ่มต้นหัก :</div>
                                </div>                                
                            </div>
                            </div>
                        </div>
                    </div>
                ))}

{socialSecurity.map((row) => (
                    <div key={row.social_security_id}>
                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="col-4 fw-bold">กองทุนสำรองเลี้ยงชีพ</div>
                                <button style={{ color: '#008000', border: 'none', background: 'transparent' }} onClick={() => onEdit(row)}>
                                    <i className="bi bi-pencil-square"></i> แก้ไข
                                </button>
                            </div>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-4"><p> จำนวนเงินที่หัก : {row.contribution_amount} </p></div>
                                    <div className="col-4">อัตราการหัก :  </div>
                                    <div className="col-4">วันที่เริ่มต้นหัก :</div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default ShowDetailFinance;