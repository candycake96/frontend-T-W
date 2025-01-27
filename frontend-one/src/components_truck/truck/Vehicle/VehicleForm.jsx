import axios from "axios";
import React, { useEffect, useState } from "react";

const VehicleForm = (formData, setFormdata) => {

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const [isCarType, setCarType] = useState([]);
    const [isVehicleType, setVehicleType] = useState([]);
    const [isUsageType, setUsageType] = useState([]);
    const [branches, setBranches] = useState([]);

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

    const fetchVehicleType = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.error("No access token found");
                return;
            }

            const response = await axios.get("http://localhost:3333/api/detailsvehicletype", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("API Response:", response.data); // ✅ ตรวจสอบ Response

            setVehicleType(response.data);
        } catch (error) {
            console.error("Error fetching VehicleUsageType:", error);
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

    const fetchBranches = async (user) => {
        try {
            const response = await axios.get(
                `http://localhost:3333/api/getbranches/${user.company_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            // console.log("Fetched positions:", response.data); // Check fetched data
            setBranches(response.data);
        } catch (error) {
            console.error("Error fetching job positions:", error);
        }
    };


    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);

            // ✅ Fetch branches only after setting user
            fetchCarType();
            fetchVehicleType();
            fetchVehicleUsageType();
            fetchBranches(parsedUser);
        }
    }, []);


    const [user, setUser] = useState(null);
    useEffect(() => {
        // ดึงข้อมูลผู้ใช้จาก localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData)); // แปลง JSON เป็น Object แล้วเก็บใน state
        }
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }


    const handleFileChange = (e) => {
        setFormdata({ ...formData, file_download: e.target.files[0] });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        // Append all form fields except file
        Object.keys(formData).forEach((key) => {
            if (key !== "file_download") {
                formDataToSend.append(key, formData[key]);
            }
        });

        // Append file if it exists
        if (formData.file_download) {
            formDataToSend.append("file_download", formData.file_download);
        }

        try {
            const response = await axios.post(
                "http://localhost:3333/api/upload",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );

            // Handle successful submission
            setMessage(response.data.message || "Data submitted successfully.");
            setMessageType("success");

        } catch (error) {
            console.error("Upload Error:", error);
            setMessage("Failed to add driver license or submit data.");
            setMessageType("error");
        }
    };


    return (
        <>
            <div className="container">
                {/* <div className="text-center p-3">
                    <p className="fs-4"> เพิ่มข้อมูลรถใหม่ {user.company_id}</p>
                    <hr />
                </div> */}

                <div className="">
                    <div className="">
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
                            <div className="text-center mb-3">
                                <p className="fw-bolder">รายการจดทะเบียน</p>
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="input_reg_date" className="form-label fw-medium">วันที่จดทะเบียน</label>
                                    <input
                                        type="date"
                                        name="reg_date"
                                        className="form-control"
                                        value={formData.reg_date}
                                        onChange={(e) => setFormdata({ ...formData, reg_date: e.target.value })}
                                    />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label htmlFor="input_reg_number" className="form-label fw-medium">เลขทะเบียน</label>
                                    <input
                                        type="text"
                                        name="reg_number"
                                        id="input_reg_number"
                                        className="form-control"
                                        value={formData.reg_number}
                                        onChange={(e) => setFormdata({ ...formData, reg_number: e.target.value })}
                                        placeholder="กรอกเลขทะเบียน" />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label htmlFor="input_province" className="form-label fw-medium">จังหวัด</label>
                                    <input
                                        type="text"
                                        name="province"
                                        id="input_province"
                                        className="form-control"
                                        value={formData.province}
                                        onChange={(e) => setFormdata({ ...formData, province: e.target.value })}
                                        placeholder="กรอกจังหวัด" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-3">
                                    <label htmlFor="inputfuel" className="form-label fw-medium">เชื้อเพลิง</label>
                                    <select
                                        id="input_vehicle_type_id"
                                        className="form-select"
                                        name="vehicle_type_id"
                                        value={formData.fuel}
                                        onChange={(e) => setFormdata({ ...formData, fuel: e.target.value })}
                                    >
                                        <option value="">กรุณาเลือกเชื้อเพลิง</option>
                                        <option value="ไม่ใช้เชื้อเพลิง">ไม่ใช้เชื้อเพลิง</option>
                                        <option value="ไฟฟ้า">ไฟฟ้า</option>
                                        <option value="เบนซิน 95">น้ำมันเบนซิน 95</option>
                                        <option value="แก๊สโซฮอล์ 95 (E10)">น้ำมันแก๊สโซฮอล์ 95 (E10)</option>
                                        <option value="แก๊สโซฮอล์ 91 (E10)">แก๊สโซฮอล์ 91 (E10)</option>
                                        <option value="แก๊สโซฮอล์ E20">แก๊สโซฮอล์ E20</option>
                                        <option value="แก๊สโซฮอล์ E85">แก๊สโซฮอล์ E85 </option>
                                        <option value="พรีเมี่ยมดีเซล">พรีเมี่ยมดีเซล</option>
                                        <option value="ไบโอดีเซล B7">ไบโอดีเซล B7</option>
                                        <option value="ไบโอดีเซล B10">ไบโอดีเซล B10</option>
                                        <option value="ไบโอดีเซล B20">ไบโอดีเซล B20</option>
                                    </select>

                                </div>
                                <div className="col-lg-3">
                                    <label htmlFor="inputinspection_code" className="form-label fw-medium">รหัสตรวจสภาพ</label>
                                    <input
                                        type="text"
                                        name="inspection_code"
                                        id="inputinspection_code"
                                        className="form-control"
                                        value={formData.inspection_code}
                                        onChange={(e) => setFormdata({ ...formData, inspection_code: e.target.value })}
                                        placeholder="รหัสตรวจสภาพ" />
                                </div>
                                <div className="col-lg-3">
                                    <label htmlFor="input_vehicle_type_id" className="form-label fw-medium">ประเภท</label>
                                    <select
                                        id="input_vehicle_type_id"
                                        className="form-select"
                                        name="vehicle_type_id"
                                        value={formData.vehicle_type_id}
                                        onChange={(e) => setFormdata({ ...formData, vehicle_type_id: e.target.value })}
                                    >
                                        <option value="">เลือกประเภทรถ</option>
                                        {isVehicleType.length > 0 ? (
                                            isVehicleType.map((rowVehicleType) => (
                                                <option key={rowVehicleType.vehicle_type_id} value={rowVehicleType.vehicle_type_id}>
                                                    {rowVehicleType.vehicle_type_name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>กำลังโหลด...</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-lg-3">
                                    <label htmlFor="input_usage_type_id" className="form-label fw-medium">ลักษณะ / มาตรฐาน</label>
                                    <select
                                        className="form-select"
                                        id="input_usage_type_id"
                                        name="usage_type_id"
                                        value={formData.usage_type_id}
                                        onChange={(e) => setFormdata({ ...formData, usage_type_id: e.target.value })}
                                    >
                                        <option value="">เลือกประเภทรถ</option>
                                        {isUsageType.length > 0 ? (
                                            isUsageType.map((rowUsageType) => (
                                                <option key={rowUsageType.usage_type_id} value={rowUsageType.usage_type_id}>
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
                                    <label htmlFor="input_car_brand" className="form-label fw-medium">ยี่ห้อรถ</label>
                                    <input
                                        type="text"
                                        name="car_brand"
                                        id="input_car_brand"
                                        className="form-control"
                                        value={formData.car_brand}
                                        onChange={(e) => setFormdata({ ...formData, car_brand: e.target.value })}
                                        placeholder="ยี่ห้อรถ" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_model_no" className="form-label fw-medium">แบบ / รุ่น</label>
                                    <input
                                        type="text"
                                        name="model_no"
                                        id="input_model_no"
                                        className="form-control"
                                        value={formData.model_no}
                                        onChange={(e) => setFormdata({ ...formData, model_no: e.target.value })}
                                        placeholder="" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_color" className="form-label fw-medium">สี</label>
                                    <input
                                        type="text"
                                        name="color"
                                        id="input_color"
                                        className="form-control"
                                        value={formData.color}
                                        onChange={(e) => setFormdata({ ...formData, color: e.target.value })}
                                        placeholder="สี" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_chassis_number" className="form-label fw-medium">เลขตัวถัง</label>
                                    <input
                                        type="text"
                                        name="chassis_number"
                                        id="input_chassis_number"
                                        className="form-control"
                                        value={formData.chassis_number}
                                        onChange={(e) => setFormdata({ ...formData, chassis_number: e.target.value })}
                                        placeholder="ยี่ห้อรถ" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_chassis_number_location" className="form-label fw-medium">อยู่ที่</label>
                                    <input
                                        type="text"
                                        name="chassis_number_location"
                                        id="input_chassis_number_location"
                                        className="form-control"
                                        value={formData.chassis_number_location}
                                        onChange={(e) => setFormdata({ ...formData, chassis_number_location: e.target.value })}
                                        placeholder="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_engine_brand" className="form-label fw-medium">ยี่ห้อเครื่องยนต์</label>
                                    <input
                                        type="text"
                                        name="engine_brand"
                                        id="input_engine_brand"
                                        className="form-control"
                                        value={formData.engine_brand}
                                        onChange={(e) => setFormdata({ ...formData, engine_brand: e.target.value })}
                                        placeholder="ยี่ห้อรถ" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_engine_no " className="form-label fw-medium">เลขเครื่องยนต์</label>
                                    <input
                                        type="text"
                                        name="engine_no "
                                        id="input_engine_no "
                                        className="form-control"
                                        value={formData.engine_no}
                                        onChange={(e) => setFormdata({ ...formData, engine_no: e.target.value })}
                                        placeholder="" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_engine_on_location" className="form-label fw-medium">อยู่ที่</label>
                                    <input
                                        type="text"
                                        name="engine_on_location"
                                        id="input_engine_on_location"
                                        className="form-control"
                                        value={formData.engine_on_location}
                                        onChange={(e) => setFormdata({ ...formData, engine_on_location: e.target.value })}
                                        placeholder=""

                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-2">
                                    <label htmlFor="input_cylinders" className="form-label fw-medium">จำนวนสูบ</label>
                                    <input
                                        type="text"
                                        name="cylinders"
                                        id="input_cylinders"
                                        className="form-control"
                                        value={formData.cylinders}
                                        onChange={(e) => setFormdata({ ...formData, cylinders: e.target.value })}
                                        placeholder="ยี่ห้อรถ"
                                    />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="input_engine_power" className="form-label fw-medium">แรงม้า</label>
                                    <input
                                        type="text"
                                        name="engine_power"
                                        id="input_engine_power"
                                        className="form-control"
                                        value={formData.engine_power}
                                        onChange={(e) => setFormdata({ ...formData, engine_power: e.target.value })}
                                        placeholder="" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="input_veh_weight" className="form-label fw-medium">น้ำหนักรถ</label>
                                    <input
                                        type="text"
                                        name="veh_weight"
                                        id="input_veh_weight"
                                        className="form-control"
                                        value={formData.veh_weight}
                                        onChange={(e) => setFormdata({ ...formData, veh_weight: e.target.value })}
                                        placeholder="" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="input_passenger_count" className="form-label fw-medium">จำนวนผู้โดยสาร</label>
                                    <input
                                        type="text"
                                        name="passenger_count"
                                        id="input_passenger_count"
                                        className="form-control"
                                        value={formData.passenger_count}
                                        onChange={(e) => setFormdata({ ...formData, passenger_count: e.target.value })}
                                        placeholder="" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="input_max_load" className="form-label fw-medium">น้ำหนักบรรทุก(ลงเพลา)</label>
                                    <input
                                        type="text"
                                        name="max_load"
                                        id="input_max_load"
                                        className="form-control"
                                        value={formData.max_load}
                                        onChange={(e) => setFormdata({ ...formData, max_load: e.target.value })}
                                        placeholder="" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="input_gross_weight" className="form-label fw-medium">น้ำหนักรวม</label>
                                    <input
                                        type="text"
                                        name="gross_weight"
                                        id="input_gross_weight"
                                        className="form-control"
                                        value={formData.gross_weight}
                                        onChange={(e) => setFormdata({ ...formData, gross_weight: e.target.value })}
                                        placeholder="" />
                                </div>
                            </div>


                            <hr className="mb-3" />
                            <div className="text-center mb-3">
                                <p className="fw-bolder">เจ้าของรถ</p>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_document_order" className="form-label fw-medium">ลำดับที่ </label>
                                    <input
                                        type="text"
                                        name="document_order"
                                        id="input_document_order"
                                        className="form-control"
                                        value={formData.document_order}
                                        onChange={(e) => setFormdata({ ...formData, document_order: e.target.value })}
                                        placeholder="xxx" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_possession_date" className="form-label fw-medium">วัน เดือน ปี ที่ครอบครอง</label>
                                    <input
                                        type="text"
                                        name="possession_date"
                                        id="input_possession_date"
                                        className="form-control"
                                        value={formData.possession_date}
                                        onChange={(e) => setFormdata({ ...formData, possession_date: e.target.value })}
                                        placeholder="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_operators" className="form-label fw-medium">ผู้ประกอบการขนส่ง </label>
                                    <input
                                        type="text"
                                        name="operators"
                                        id="input_operators"
                                        className="form-control"
                                        value={formData.operators}
                                        onChange={(e) => setFormdata({ ...formData, operators: e.target.value })}
                                        placeholder="xxx" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_reg_doc_number" className="form-label fw-medium">หนังสือสำคัณแสดงการจดทะเบียน</label>
                                    <input
                                        type="text"
                                        name="reg_doc_number"
                                        id="input_reg_doc_number"
                                        className="form-control"
                                        value={formData.reg_doc_number}
                                        onChange={(e) => setFormdata({ ...formData, reg_doc_number: e.target.value })}
                                        placeholder="" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_nation" className="form-label fw-medium">สัญชาติ</label>
                                    <input
                                        type="text"
                                        name="nation"
                                        id="input_nation"
                                        className="form-control"
                                        value={formData.nation}
                                        onChange={(e) => setFormdata({ ...formData, nation: e.target.value })}
                                        placeholder="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_addr" className="form-label fw-medium">ที่อยู่ </label>
                                    <input
                                        type="text"
                                        name="addr"
                                        id="input_addr"
                                        className="form-control"
                                        value={formData.addr}
                                        onChange={(e) => setFormdata({ ...formData, addr: e.target.value })}
                                        placeholder="xxx" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_trans_type" className="form-label fw-medium">ประกอบการขนส่งประเภท</label>
                                    <input
                                        type="text"
                                        name="trans_type"
                                        id="input_trans_type"
                                        className="form-control"
                                        value={formData.trans_type}
                                        onChange={(e) => setFormdata({ ...formData, trans_type: e.target.value })}
                                        placeholder="" />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_license_no" className="form-label fw-medium">ใบอนุญาตเลขที่</label>
                                    <input
                                        type="text"
                                        name="license_no"
                                        id="input_license_no"
                                        className="form-control"
                                        value={formData.license_no}
                                        onChange={(e) => setFormdata({ ...formData, license_no: e.target.value })}
                                        placeholder="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_license_expiry" className="form-label fw-medium">วันสิ้นอายุใบอนุญาต </label>
                                    <input
                                        type="date"
                                        name="license_expiry"
                                        id="input_license_expiry"
                                        className="form-control"
                                        value={formData.license_expiry}
                                        onChange={(e) => setFormdata({ ...formData, license_expiry: e.target.value })}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_rights_to_use" className="form-label fw-medium">มีสิทธิครอบครองและใช้รถโดย</label>
                                    <input
                                        type="text"
                                        name="rights_to_use"
                                        id="input_rights_to_use"
                                        className="form-control"
                                        value={formData.rights_to_use}
                                        onChange={(e) => setFormdata({ ...formData, rights_to_use: e.target.value })}
                                        placeholder=""

                                    />
                                </div>

                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_owner_name" className="form-label fw-medium">ผู้ถือกรรมสิทธิ์ </label>
                                    <input
                                        type="text"
                                        name="owner_name"
                                        id="input_owner_name"
                                        className="form-control"
                                        value={formData.owner_name}
                                        onChange={(e) => setFormdata({ ...formData, owner_name: e.target.value })}
                                        placeholder="xxx" />
                                </div>
                                <div className="col-lg-8">
                                    <label htmlFor="input_address" className="form-label fw-medium">ที่อยู่</label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="input_address"
                                        className="form-control"
                                        value={formData.address}
                                        onChange={(e) => setFormdata({ ...formData, address: e.target.value })}
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <label htmlFor="input_car_type_id" className="form-label fw-medium">ประเภทรถ</label>
                                    <select
                                        className="form-select"
                                        id="input_car_type_id"
                                        name="car_type_id"
                                        value={formData.car_type_id}
                                        onChange={(e) => setFormdata({ ...formData, car_type_id: e.target.value })}
                                    >
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
                                <div className="col-lg-4">
                                    <label htmlFor="input_id_branch" className="form-label fw-medium">สาขา</label>
                                    <select
                                        className="form-select"
                                        id="input_id_branch"
                                        name="id_branch"
                                        value={formData.id_branch}
                                        onChange={(e) => setFormdata({ ...formData, id_branch: e.target.value })}
                                    >
                                        <option value="">สาขา</option>
                                        {branches.length > 0 ? (
                                            branches.map((rowBranches) => (
                                                <option key={rowBranches.id_branch} value={rowBranches.id_branch}>
                                                    {rowBranches.name_branch}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>กำลังโหลด...</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="input_file_download" className="form-label fw-medium">ไฟล์สแกนเอกสารรถ (ถ้ามี) </label>
                                    <input
                                        type="file"
                                        id="input_file_download"
                                        className="form-control"
                                        name="file_download"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                          
                    </div>
                </div>
            </div>
        </>
    );
}

export default VehicleForm;
