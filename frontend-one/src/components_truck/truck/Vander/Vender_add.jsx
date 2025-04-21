import axios from "axios";
import React, { useState } from "react";
import { apiUrl } from "../../../config/apiConfig";

const Vender_add = () => {
    const [formDataVender, setFormDataVender] = useState({
        vendor_name: "",
        contact_person: "",
        phone: "",
        email: "",
        address: "",
        delivery_address: "",
        tax_id: "",
        organization_type: "",
        file_vender: null,
        credit_terms: "",
        status: "active",
        warranty_policy: "",
        vendor_type_id: ""
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormDataVender({ ...formDataVender, [name]: files[0] });
        } else {
            setFormDataVender({ ...formDataVender, [name]: value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("📦 Form Submitted:", formDataVender);
    
        const payload = new FormData();
    
        Object.keys(formDataVender).forEach((key) => {
            if (key === "file_vender" && formDataVender[key]) {
                payload.append(key, formDataVender[key]);
            } else if (key !== "file_vender") {
                payload.append(key, formDataVender[key]);
            }
        });
    
        try {
            const response = await axios.post(
                `${apiUrl}/api/vender_add`,
                payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            alert("บันทึกสำเร็จ");
    
            // ✅ Optional: Reset form
            setFormDataVender({
                vendor_name: "",
                contact_person: "",
                phone: "",
                email: "",
                address: "",
                delivery_address: "",
                tax_id: "",
                organization_type: "",
                file_vender: null,
                credit_terms: "",
                status: "active",
                warranty_policy: "",
                vendor_type_id: ""
            });
    
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการส่งข้อมูล", error);
            alert("เกิดข้อผิดพลาดในการบันทึก");
        }
    };
    
    return (
        <>
            <div className="mb-3">
                <form onSubmit={handleSubmit}>
                    <div className="card p-3 shadow-sm">
                        <h5 className="mb-3">ฟอร์มเพิ่มข้อมูลผู้ขาย</h5>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    placeholder="ชื่อผู้ขาย / อู่"
                                    name="vendor_name"
                                    value={formDataVender.vendor_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    placeholder="เบอร์โทร"
                                    name="phone"
                                    value={formDataVender.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    placeholder="ผู้ติดต่อ"
                                    name="contact_person"
                                    value={formDataVender.contact_person}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    placeholder="อีเมล"
                                    name="email"
                                    value={formDataVender.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    placeholder="เลขผู้เสียภาษี"
                                    name="tax_id"
                                    value={formDataVender.tax_id}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    placeholder="เงื่อนไขเครดิต"
                                    name="credit_terms"
                                    value={formDataVender.credit_terms}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    placeholder="ลักษณะประกอบการ (บริษัท, ร้าน, อู่)"
                                    name="organization_type"
                                    value={formDataVender.organization_type}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <select
                                    className="form-select"
                                    name="status"
                                    value={formDataVender.status}
                                    onChange={handleChange}
                                >
                                    <option value="active">เปิดใช้งาน</option>
                                    <option value="inactive">ปิดใช้งาน</option>
                                </select>
                            </div>

                            <div className="col-md-12">
                                <textarea
                                    className="form-control"
                                    placeholder="ที่อยู่"
                                    name="address"
                                    value={formDataVender.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-12">
                                <textarea
                                    className="form-control"
                                    placeholder="ที่อยู่จัดส่ง"
                                    name="delivery_address"
                                    value={formDataVender.delivery_address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-12">
                                <textarea
                                    className="form-control"
                                    placeholder="นโยบายการรับประกัน"
                                    name="warranty_policy"
                                    value={formDataVender.warranty_policy}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">ไฟล์แนบ</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="file_vender"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mt-4 d-flex justify-content-end">
                            <button type="submit" className="btn btn-success">
                                บันทึก
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Vender_add;
