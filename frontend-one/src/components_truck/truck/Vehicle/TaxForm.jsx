import React from "react";

const TaxForm = (formData, setFormdata) => {
    return (
        <>
                                    <div className="mb-3">
                                <div className="">
                                    <p className="fw-bolder">ภาษี</p>
                                </div>
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

                            <div className="mb-3">
                                <p className="fw-bolder">พรบ</p>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
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
                                <div className="col-lg-4">
                                <label htmlFor="input_address" className="form-label fw-medium">วันที่หมดอายุ</label>
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

                            <div className="mb-3">
                                <p className="fw-bolder">ประกันภัยรถ</p>
                            </div>

    
                            <div className="row mb-3">
                                <div className="col-lg-4">
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
                                <div className="col-lg-4">
                                <label htmlFor="input_address" className="form-label fw-medium">วันที่หมดอายุ</label>
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
                                <div className="col-lg-4">
                                <label htmlFor="input_address" className="form-label fw-medium">บริษัทประกันภัย</label>
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
        </>
    )
}


export default TaxForm;