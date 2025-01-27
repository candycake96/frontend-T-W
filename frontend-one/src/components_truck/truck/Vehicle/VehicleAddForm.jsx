import React, { useState, useEffect } from "react";
import VehicleForm from "./VehicleForm";
import FinanceForm from "./FinanceForm";
import TaxForm from "./TaxForm";

const VehicleAddForm = () => {

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
        file_finance: ""
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

                        <form action="">

                            {activeForm === 'vehicleForm' && (
                                <VehicleForm formData={formData} setFormdata={setFormdata}  />
                            )}

                            {activeForm === 'financeForm' && (
                                <FinanceForm isFinance={isFinance} setFinance={setFinance} />
                            )}

                            {activeForm === 'taxForm' && (
                                <TaxForm formData={formData} setFormdata={setFormdata}  />
                            )}

                            <div className="text-center mb-3">
                                <button type="submit" className="btn" style={{ background: "#4cbec5", color: "#ffffff" }}>บันทึก</button>
                            </div>

                        </form>


                    </div>
                </div>
            </div>



        </>
    )
}


export default VehicleAddForm;