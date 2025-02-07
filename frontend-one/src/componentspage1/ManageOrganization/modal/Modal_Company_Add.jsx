import React from "react";
import ReactModal from "react-modal";

const Modal_Company_add = ({ isOpen, onClose }) => {
    return (
        <>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={onClose}
                ariaHideApp={false} // You can also disable if needed
                contentLabel="Employee Details"
                style={{
                    content: {
                        width: "90%",
                        maxWidth: "600px",
                        maxHeight: "80vh",
                        margin: "auto",
                        padding: "0",
                        border: "none",
                        borderRadius: "0.5rem",
                        overflowY: "auto",
                    },
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                }}
            >
                <div className="p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="fw-bolder mx-auto">เพิ่มข้อมูลองค์กรใหม่</p>
                        <button onClick={onClose} className="btn-close"></button>
                    </div>

                    <div className="col-lg-12 mb-3">
                        <label htmlFor="input_note" className="form-label fw-medium">
                        ชื่อองค์กร
                        </label>
                        <input
                            name="note"
                            type="text"
                            id="input_note"
                            className="form-control"
                            placeholder=""
                            rows="4" // กำหนดความสูงของกล่อง
                            // value={dataRelation.notes}
                            // onChange={(e) => setDataRelation({ ...dataRelation, notes: e.target.value })}
                        />
                    </div>

                    <div className="col-lg-12 mb-3">
                        <label htmlFor="input_note" className="form-label fw-medium">
                            ที่อยู่ (ถ้ามี)
                        </label>
                        <textarea
                            name="note"
                            id="input_note"
                            className="form-control"
                            placeholder=""
                            rows="4" // กำหนดความสูงของกล่อง
                            // value={dataRelation.notes}
                            // onChange={(e) => setDataRelation({ ...dataRelation, notes: e.target.value })}
                        />
                    </div>


                    <div className="col-lg-12 mb-3">
                        <label htmlFor="input_note" className="form-label fw-medium">
                        รูปโลโก้บริษัท
                        </label>
                        <input
                            name="note"
                            type="file"
                            id="input_note"
                            className="form-control"
                            placeholder=""
                            rows="4" // กำหนดความสูงของกล่อง
                            // value={dataRelation.notes}
                            // onChange={(e) => setDataRelation({ ...dataRelation, notes: e.target.value })}
                        />
                    </div>

                    <div className="text-center "> <button className="btn Teal-button ">บันทึก</button> </div>

                </div>

            </ReactModal>

        </>
    )
}

export default Modal_Company_add;