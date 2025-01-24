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
                                <VehicleForm />
                            )}

                            {activeForm === 'financeForm' && (
                                <FinanceForm />
                            )}

                            {activeForm === 'taxForm' && (
                                <TaxForm />
                            )}

                        </form>


                    </div>
                </div>
            </div>



        </>
    )
}


export default VehicleAddForm;