import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../config/apiConfig";

const Vendor_add = () => {
    const [isVendorType, setVendorType] = useState([]);
    const [isOrganization, setOrganization] = useState([]);
    const [formDataVendor, setFormDataVendor] = useState({
        vendor_name: "",
        contact_person: "",
        phone: "",
        email: "",
        address: "",
        delivery_address: "",
        tax_id: "",
        organization_type_id: "",
        file_vendor: null,
        credit_terms: "",
        warranty_policy: "",
        vendor_type_id: "",
        remarks: "",
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

        console.log("payload to be sent:", payload);
        payload.append('formDataVendor', JSON.stringify(formDataVendor)); // ใช้ JSON.stringify()

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
                organization_type_id: "",
                file_vendor: null,
                credit_terms: "",
                warranty_policy: "",
                vendor_type_id: "",
                remarks: ""
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

    const fetchOrganizationType = async () => {
        try{
            const response = await axios.get(
                `${apiUrl}/api/vendor_organization_type_show`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                );
                setOrganization(response.data);
        } catch (error) {

        }
    };
    useEffect(()=>{
        fetchVendorType();
        fetchOrganizationType();
    }, []);
    
    return (
        <>
           <div className="mb-3">
    <form onSubmit={handleSubmit}>
        <div className="card p-4 shadow-sm">
            <h5 className="mb-4 fw-bold">ฟอร์มเพิ่มข้อมูลผู้ขาย</h5>
            <div className="row g-3">

                <div className="col-md-6">
                    <label className="form-label">ชื่อผู้ขาย / อู่</label>
                    <input
                        className="form-control"
                        name="vendor_name"
                        value={formDataVendor.vendor_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">เลขผู้เสียภาษี</label>
                    <input
                        className="form-control"
                        name="tax_id"
                        value={formDataVendor.tax_id}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">เบอร์โทร</label>
                    <input
                        className="form-control"
                        name="phone"
                        value={formDataVendor.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">ผู้ติดต่อ</label>
                    <input
                        className="form-control"
                        name="contact_person"
                        value={formDataVendor.contact_person}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">อีเมล</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formDataVendor.email}
                        onChange={handleChange}
                    />
                </div>


                <div className="col-lg-4">
                    <label className="form-label">เงื่อนไขเครดิต (วัน)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="credit_terms"
                        value={formDataVendor.credit_terms}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">ลักษณะประกอบการ</label>
                    <select
                        className="form-select"
                        name="organization_type_id"
                        value={formDataVendor.organization_type_id}
                        onChange={handleChange}
                    >
                        <option value="">เลือกประเภท</option>
                        {isOrganization.map((row, index) => (
                            <option key={index} value={row.organization_type_id}>
                                {row.organization_type_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <label className="form-label">หมวดหมู่</label>
                    <select
                        className="form-select"
                        name="vendor_type_id"
                        value={formDataVendor.vendor_type_id}
                        onChange={handleChange}
                    >
                        <option value="">เลือกหมวดหมู่</option>
                        {isVendorType.map((row, index) => (
                            <option key={index} value={row.vendor_type_id}>
                                {row.vendor_type_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label">ที่อยู่</label>
                    <textarea
                        className="form-control"
                        name="address"
                        value={formDataVendor.address}
                        onChange={handleChange}
                        rows={2}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">ที่อยู่จัดส่ง</label>
                    <textarea
                        className="form-control"
                        name="delivery_address"
                        value={formDataVendor.delivery_address}
                        onChange={handleChange}
                        rows={2}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">นโยบายการรับประกัน</label>
                    <textarea
                        className="form-control"
                        name="warranty_policy"
                        value={formDataVendor.warranty_policy}
                        onChange={handleChange}
                        rows={2}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">หมายเหตุเพิ่มเติม</label>
                    <textarea
                        className="form-control"
                        name="remarks"
                        value={formDataVendor.remarks}
                        onChange={handleChange}
                        rows={2}
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
                <button type="submit" className="btn btn-success px-4">
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
