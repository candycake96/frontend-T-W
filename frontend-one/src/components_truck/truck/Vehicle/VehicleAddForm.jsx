import React, { useState, useEffect } from "react";
import VehicleForm from "./VehicleForm";
import FinanceForm from "./FinanceForm";
import TaxForm from "./TaxForm";
import axios from "axios";

const VehicleAddForm = () => {

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [activeForm, setActiveForm] = useState('vehicleForm');

    useEffect(() => {
        setActiveForm('vehicleForm');
    }, []);

    const [isFinance, setFinance] = useState({
        loan_amount: "",
        interest_rate: "",
        monthly_payment: "",
        start_date: "",
        end_date: "",
        insurance_company: "",
        file_finance: null
    });

    const [formData, setFormdata] = useState({
        reg_date: "",
        reg_number: "",
        province: "",
        fuel: "",
        car_type_id: "",
        chassis_number: "",
        usage_type_id: "",
        car_brand: "",
        model_no: "",
        color: "",
        engine_brand: "",
        engine_no: "",
        cylinders: "",
        veh_weight: "",
        max_load: "",
        gross_weight: "",
        possession_date: "",
        operators: "",
        nation: "",
        addr: "",
        trans_type: "",
        license_no: "",
        license_expiry: "",
        rights_to_use: "",
        owner_name: "",
        address: "",
        passenger_count: "",
        file_download: null,
        vehicle_type_id: "",
        chassis_number_location: "",
        engine_on_location: "",
        engine_power: "",
        document_order: "",
        reg_doc_number: "",
        inspection_code: "",
        id_branch: "",
        tax_end: "",
        cmi_start: "",
        cmi_end: "",
        insurance_start: "",
        insurance_end: "",
        insurance_name: ""
    })

    useEffect(() => {
        console.log("Updated formData:", formData);
    }, [formData]);
    
    useEffect(() => {
        console.log("Updated isFinance:", isFinance);
    }, [isFinance]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('FormData before submission:', formData);
        console.log('IsFinance before submission:', isFinance);
    
        const formDataToSend = new FormData();
    
        // Append fields from formData
        Object.keys(formData).forEach((key) => {
            if (key === "file_download" && formData[key]) {
                formDataToSend.append(key, formData[key]);
            } else if (key !== "file_download") {
                formDataToSend.append(key, formData[key]);
            }
        });
    
        // Append fields from isFinance
        Object.keys(isFinance).forEach((key) => {
            if (key === "file_finance" && isFinance[key]) {
                formDataToSend.append(key, isFinance[key]);
            } else if (key !== "file_finance") {
                formDataToSend.append(key, isFinance[key]);
            }
        });
    
        // Log the FormData manually
        for (let pair of formDataToSend.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    
        
        console.log("FormData to be sent:", formDataToSend);
    
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setMessage("Access token is missing. Please log in.");
            setMessageType("error");
            return; // Stop form submission
        }

        
formDataToSend.append('formData', JSON.stringify(formData)); // ใช้ JSON.stringify()
formDataToSend.append('isFinance', JSON.stringify(isFinance)); // ใช้ JSON.stringify()
    
        try {
            const response = await axios.post(
                "http://localhost:3333/api/vehicleAdd",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            console.log("Response from the server:", response.data);
    
            // Handle successful submission
            if (response.data.success) {
                setMessage(response.data.message || "Data submitted successfully.");
                setMessageType("success");
    
                // Optionally reset form after submission
            }
        } catch (error) {
            console.error("Upload Error:", error.response ? error.response.data : error.message);
            setMessage(error.response ? error.response.data.message : "Failed to add vehicle or submit data.");
            setMessageType("error");
        }
    };
    
    
    
    
    
    return (
        <>
            <div className="container p-3">
                <div className="text-center">
                    <p className="fs-4">เพิ่มข้อมูลรถใหม่</p>
                </div>

                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            type="button"
                            className={`nav-link ${activeForm === 'vehicleForm' ? 'active' : ''}`}
                            style={activeForm === 'vehicleForm' ? { backgroundColor: 'blue', color: 'white' } : { color: 'gray' }}
                            onClick={() => setActiveForm('vehicleForm')}
                        >
                            ข้อมูลทะเบียนรถ
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            type="button"
                            className={`nav-link ${activeForm === 'taxForm' ? 'active' : ''}`}
                            style={activeForm === 'taxForm' ? { backgroundColor: 'blue', color: 'white' } : { color: 'gray' }}
                            onClick={() => setActiveForm('taxForm')}
                        >
                            ภาษี / ประกัน
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            type="button"
                            className={`nav-link ${activeForm === 'financeForm' ? 'active' : ''}`}
                            style={activeForm === 'financeForm' ? { backgroundColor: 'blue', color: 'white' } : { color: 'gray' }}
                            onClick={() => setActiveForm('financeForm')}
                        >
                            สินเชื่อรถ
                        </button>
                    </li>
                </ul>
                <div className="card rounded-0 mb-3">
                    <div className="card-body">
                        {message && (
                            <div className="p-1">
                                <div
                                    className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"}`}
                                    style={{
                                        backgroundColor: messageType === "success" ? "#d4edda" : "#f8d7da",
                                        color: messageType === "success" ? "#155724" : "#721c24",
                                        border: `1px solid ${messageType === "success" ? "#c3e6cb" : "#f5c6cb"}`,
                                    }}
                                >
                                    {message}
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            {activeForm === 'vehicleForm' && (
                                <VehicleForm formData={formData} setFormdata={setFormdata} />
                            )}

                            {activeForm === 'financeForm' && (
                                <FinanceForm isFinance={isFinance} setFinance={setFinance} />
                            )}

                            {activeForm === 'taxForm' && (
                                <TaxForm formData={formData} setFormdata={setFormdata} />
                            )}

                            <div className="text-center mb-3">
                                <button type="submit" className="btn" style={{ background: "#4cbec5", color: "#ffffff" }}>บันทึก</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default VehicleAddForm;
