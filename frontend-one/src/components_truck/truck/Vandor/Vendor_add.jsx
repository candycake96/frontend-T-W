import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../config/apiConfig";

const Vendor_add = () => {
    const [isVendorType, setVendorType] = useState([]);
    const [formDataVendor, setFormDataVendor] = useState({
        vendor_name: "",
        contact_person: "",
        phone: "",
        email: "",
        address: "",
        delivery_address: "",
        tax_id: "",
        organization_type: "",
        file_vendor: null,
        credit_terms: "",
        status: "active",
        warranty_policy: "",
        vendor_type_id: 1
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormDataVendor({ ...formDataVendor, [name]: files[0] });
        } else {
            setFormDataVendor({ ...formDataVendor, [name]: value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("📦 Form Submitted:", formDataVendor);
    
        const payload = new FormData();
    
        Object.keys(formDataVendor).forEach((key) => {
            if (key === "file_vendor" && formDataVendor[key]) {
                payload.append(key, formDataVendor[key]);
            } else if (key !== "file_vendor") {
                payload.append(key, formDataVendor[key]);
            }
        });
    
        try {
            const response = await axios.post(
                `${apiUrl}/api/vendor_add`,
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
            setFormDataVendor({
                vendor_name: "",
                contact_person: "",
                phone: "",
                email: "",
                address: "",
                delivery_address: "",
                tax_id: "",
                organization_type: "",
                file_vendor: null,
                credit_terms: "",
                warranty_policy: "",
                vendor_type_id: ""
            });
            
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการส่งข้อมูล", error);
            alert("เกิดข้อผิดพลาดในการบันทึก");
        }
    };


    const fetchVendorType = async () => {
        try{
            const response = await axios.get(
                `${apiUrl}/api/vendor_type_show`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                );
                setVendorType(response.data);
        } catch (error) {

        }
    };

    useEffect(()=>{
        fetchVendorType();
    }, []);
    
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
                                    value={formDataVendor.vendor_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    placeholder="เบอร์โทร"
                                    name="phone"
                                    value={formDataVendor.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    placeholder="ผู้ติดต่อ"
                                    name="contact_person"
                                    value={formDataVendor.contact_person}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    placeholder="อีเมล"
                                    name="email"
                                    value={formDataVendor.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    placeholder="เลขผู้เสียภาษี"
                                    name="tax_id"
                                    value={formDataVendor.tax_id}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    placeholder="เงื่อนไขเครดิต"
                                    name="credit_terms"
                                    value={formDataVendor.credit_terms}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    placeholder="ลักษณะประกอบการ (บริษัท, ร้าน, อู่)"
                                    name="organization_type"
                                    value={formDataVendor.organization_type}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <select
                                    className="form-select"
                                    name="status"
                                    value={formDataVendor.status}
                                    onChange={handleChange}
                                >
                                    <option value="">ลักษณะประกอบการ (บริษัท, ร้าน, อู่)</option>
                                    {isVendorType.map((row, index) => (
                                    <option value={row.vendor_type_id} key={index}>{row.vendor_type_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-12">
                                <textarea
                                    className="form-control"
                                    placeholder="ที่อยู่"
                                    name="address"
                                    value={formDataVendor.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-12">
                                <textarea
                                    className="form-control"
                                    placeholder="ที่อยู่จัดส่ง"
                                    name="delivery_address"
                                    value={formDataVendor.delivery_address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-12">
                                <textarea
                                    className="form-control"
                                    placeholder="นโยบายการรับประกัน"
                                    name="warranty_policy"
                                    value={formDataVendor.warranty_policy}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">ไฟล์แนบ</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="file_vendor"
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

export default Vendor_add;
