import React from "react";

const FinanceForm = () => {
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
                            <label htmlFor="input_address" className="form-label fw-medium">วันหมดอายุ</label>
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
                            <label htmlFor="input_address" className="form-label fw-medium">วันหมดอายุ</label>
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
                            <label htmlFor="input_address" className="form-label fw-medium">วันหมดอายุ</label>
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