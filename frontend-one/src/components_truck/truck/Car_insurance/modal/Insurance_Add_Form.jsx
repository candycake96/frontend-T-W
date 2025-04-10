import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../../config/apiConfig";
import axios from "axios";

const Insurance_Add_form = ({ dataCar }) => {
    if(!dataCar) return null;

    const [insuranceTypes, setInsuranceTypes] = useState([]);

    const fetchInsuranceTypes = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/api/car_insurance_types`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            setInsuranceTypes(response.data);
        } catch (error) {
            console.error("Error fetching vehicle data:", error);
        }
    };

    useEffect(() => {
        fetchInsuranceTypes();
    }, []);

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <p className="fw-bolder">เพิ่มข้อมูลประกันทะเบียนรถ {dataCar.reg_number} </p>
                    </div>

                    <div className="row mb-3">
                        <div className="col-lg-4">
                            <label htmlFor="input_insurance_start_date" className="form-label fw-medium">วันที่เริ่มต้น <span style={{ color: "red" }}> *</span></label>
                            <input
                                type="date"
                                name="insurance_start_date"
                                id="input_insurance_start_date"
                                className="form-control"
                                // value={formTransportInsurance.insurance_start_date}
                                // onChange={(e) => setFormTransportInsurance({ ...formTransportInsurance, insurance_start_date: e.target.value })}
                                placeholder=""
                            />
                            {/* {errors.insurance_start_date && <p className="text-danger">{errors.insurance_start_date}</p>} */}
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="input_insurance_end_date" className="form-label fw-medium">วันที่หมดอายุ <span style={{ color: "red" }}> *</span></label>
                            <input
                                type="date"
                                name="insurance_end_date"
                                id="input_insurance_end_date"
                                className="form-control"
                                // value={formTransportInsurance.insurance_end_date}
                                // onChange={(e) => setFormTransportInsurance({ ...formTransportInsurance, insurance_end_date: e.target.value })}
                                placeholder=""
                            />
                            {/* {errors.insurance_end_date && <p className="text-danger">{errors.insurance_end_date}</p>} */}
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="input_insurance_company" className="form-label fw-medium">บริษัทประกันภัย <span style={{ color: "red" }}> *</span></label>
                            <input
                                type="text"
                                name="insurance_company"
                                id="input_insurance_company"
                                className="form-control"
                                // value={formTransportInsurance.insurance_company}
                                // onChange={(e) => setFormTransportInsurance({ ...formTransportInsurance, insurance_company: e.target.value })}
                                placeholder=""
                            />
                            {/* {errors.insurance_company && <p className="text-danger">{errors.insurance_company}</p>} */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2 mb-3">
                            <label htmlFor="input_insurance_converage_amount" className="form-label fw-medium">จำนวนเงินคุ้มครอง <span style={{ color: "red" }}> *</span></label>
                            <input
                                type="text"
                                name="insurance_converage_amount"
                                id="input_insurance_converage_amount"
                                className="form-control"
                                // value={formTransportInsurance.insurance_converage_amount}
                                // onChange={(e) => setFormTransportInsurance({ ...formTransportInsurance, insurance_converage_amount: e.target.value })}
                                placeholder=""
                            />
                        </div>
                        <div className="col-lg-2 mb-3">
                            <label htmlFor="input_nsurance_premium" className="form-label fw-medium">เบี้ยประกัน <span style={{ color: "red" }}> *</span></label>
                            <input
                                type="text"
                                name="nsurance_premium"
                                id="input_nsurance_premium"
                                className="form-control"
                                // value={formTransportInsurance.nsurance_premium}
                                // onChange={(e) => setFormTransportInsurance({ ...formTransportInsurance, nsurance_premium: e.target.value })}
                                placeholder=""
                            />
                        </div>
                        <div className="col-lg-2 mb-3">
                            <label htmlFor="input_nsurance_premium" className="form-label fw-medium">ประเภทการคุ้มครอง <span style={{ color: "red" }}> *</span></label>
                            <select className="form-select" >
                                <option value="">เลือก</option>
                                <option value="">รถ</option>
                                <option value="">สินค้า</option>
                                <option value="">บุคคล</option>

                               
                            </select>
                        </div>
                        <div className="col-lg-2 mb-3">
                            <label htmlFor="input_insurance_start" className="form-label fw-medium">
                                ชั้นประกัน<span ></span>
                            </label>
                            <select className="form-select" >
                                <option value="">เลือก</option>

                                {insuranceTypes.length > 0 ? (
                                insuranceTypes.map((row, index) => (
                                    <option key={index} value={row.id}>
                                        {row.insurance_type}
                                    </option>
                                ))
                            ): (
                                <option disabled>กำลังโหลด...</option>
                            )
                                }
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="input_insurance_file" className="form-label fw-medium">เอกสารเพิ่มเติม <span style={{ color: "red" }}> *</span></label>
                            <input
                                type="file"
                                name="insurance_file"
                                id="input_insurance_file"
                                className="form-control"
                                // value={formTransportInsurance.insurance_file}
                                // onChange={handleFileInsurance}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="text-center mb-2">
                        <button className="btn btn-primary">บันทึก</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Insurance_Add_form;