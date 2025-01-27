import React from "react";

const FinanceForm = (isFinance, setFinance) => {
    return (
        <>
            <div className="mb-3">
                <p className="fw-bolder">
                    สินเชื่อ
                </p>
            </div>

            <div className="col-lg-4 mb-3">
                <label htmlFor="input_address" className="form-label fw-medium">บริษัท</label>
                <input
                    type="text"
                    name="address"
                    id="input_address"
                    className="form-control"
                    // value={formData.address}
                    // onChange={(e) => setFormdata({ ...formData, address: e.target.value })}
                    placeholder=""
                />
            </div>

            <div className="row mb-3">
                <div className="col-lg-4 mb-3">
                    <label htmlFor="input_address" className="form-label fw-medium">จำนวนเต็ม</label>
                    <input
                        type="text"
                        name="address"
                        id="input_address"
                        className="form-control"
                        // value={formData.address}
                        // onChange={(e) => setFormdata({ ...formData, address: e.target.value })}
                        placeholder=""
                    />
                </div>
                <div className="col-lg-4 mb-3">
                    <label htmlFor="input_address" className="form-label fw-medium">ดอกเบี่ย %</label>
                    <input
                        type="text"
                        name="address"
                        id="input_address"
                        className="form-control"
                        // value={formData.address}
                        // onChange={(e) => setFormdata({ ...formData, address: e.target.value })}
                        placeholder=""
                    />
                </div>
                <div className="col-lg-4 mb-3">
                    <label htmlFor="input_address" className="form-label fw-medium">รายเดือน</label>
                    <input
                        type="text"
                        name="address"
                        id="input_address"
                        className="form-control"
                        // value={formData.address}
                        // onChange={(e) => setFormdata({ ...formData, address: e.target.value })}
                        placeholder=""
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-lg-4 mb-3">
                    <label htmlFor="input_address" className="form-label fw-medium">วันที่เริ่มต้น</label>
                    <input
                        type="date"
                        name="address"
                        id="input_address"
                        className="form-control"
                        // value={formData.address}
                        // onChange={(e) => setFormdata({ ...formData, address: e.target.value })}
                        placeholder=""
                    />
                </div>
                <div className="col-lg-4 mb-3">
                    <label htmlFor="input_address" className="form-label fw-medium">วันที่สิ้นสุด</label>
                    <input
                        type="date"
                        name="address"
                        id="input_address"
                        className="form-control"
                        // value={formData.address}
                        // onChange={(e) => setFormdata({ ...formData, address: e.target.value })}
                        placeholder=""
                    />
                </div>
            </div>

            <div className="col-lg-8 mb-3">
                <label htmlFor="input_address" className="form-label fw-medium">เอกสารเพิ่มเติม (ถ้ามี)</label>
                <input
                    type="file"
                    name="address"
                    id="input_address"
                    className="form-control"
                    // value={formData.address}
                    // onChange={(e) => setFormdata({ ...formData, address: e.target.value })}
                    placeholder=""
                />
            </div>


        </>
    )
}

export default FinanceForm;