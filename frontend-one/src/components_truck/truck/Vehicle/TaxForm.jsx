import React from "react";

const TaxForm = ({formData, setFormdata}) => {
    return (
        <>
                                    <div className="mb-3">
                                <div className="">
                                    <p className="fw-bolder">ภาษี</p>
                                </div>
                            </div>

                            <div className="col-lg-4 mb-3">
                            <label htmlFor="input_tax_end" className="form-label fw-medium">วันหมดอายุ</label>
                                    <input
                                        type="date"
                                        name="tax_end"
                                        id="input_tax_end"
                                        className="form-control"
                                        value={formData.tax_end}
                                        onChange={(e) => setFormdata({ ...formData, tax_end: e.target.value })}
                                        placeholder=""
                                    />
                            </div>

                            <div className="mb-3">
                                <p className="fw-bolder">พรบ</p>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-4">
                                <label htmlFor="input_cmi_start" className="form-label fw-medium">วันที่เริ่มต้น</label>
                                    <input
                                        type="date"
                                        name="cmi_start"
                                        id="input_cmi_start"
                                        className="form-control"
                                        value={formData.cmi_start}
                                        onChange={(e) => setFormdata({ ...formData, cmi_start: e.target.value })}
                                        placeholder=""
                                    />
                                </div>
                                <div className="col-lg-4">
                                <label htmlFor="input_cmi_end" className="form-label fw-medium">วันที่หมดอายุ</label>
                                    <input
                                        type="date"
                                        name="cmi_end"
                                        id="input_cmi_end"
                                        className="form-control"
                                        value={formData.cmi_end}
                                        onChange={(e) => setFormdata({ ...formData, cmi_end: e.target.value })}
                                        placeholder=""
                                     />
                                </div>
                            </div>

                            <div className="mb-3">
                                <p className="fw-bolder">ประกันภัยรถ</p>
                            </div>

    
                            <div className="row mb-3">
                                <div className="col-lg-4">
                                <label htmlFor="input_insurance_start" className="form-label fw-medium">วันที่เริ่มต้น</label>
                                    <input
                                        type="date"
                                        name="insurance_start"
                                        id="input_insurance_start"
                                        className="form-control"
                                        value={formData.insurance_start}
                                        onChange={(e) => setFormdata({ ...formData, insurance_start: e.target.value })}
                                        placeholder=""
                                    />
                                </div>
                                <div className="col-lg-4">
                                <label htmlFor="input_insurance_end" className="form-label fw-medium">วันที่หมดอายุ</label>
                                    <input
                                        type="date"
                                        name="insurance_end"
                                        id="input_insurance_end"
                                        className="form-control"
                                        value={formData.insurance_end}
                                        onChange={(e) => setFormdata({ ...formData, insurance_end: e.target.value })}
                                        placeholder=""
                                     />
                                </div>
                                <div className="col-lg-4">
                                <label htmlFor="input_insurance_name" className="form-label fw-medium">บริษัทประกันภัย</label>
                                    <input
                                        type="text"
                                        name="insurance_name"
                                        id="input_insurance_name"
                                        className="form-control"
                                        value={formData.insurance_name}
                                        onChange={(e) => setFormdata({ ...formData, insurance_name: e.target.value })}
                                        placeholder=""
                                     />
                                </div>
                            </div>  
        </>
    )
}


export default TaxForm;