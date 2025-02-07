import React from "react";
import ReactModal from "react-modal";

const Modal_Company_Edit =  ({isOpen, onClose, dataCompany}) => {
    if (!dataCompany) return null;
    return (
        <>
        <ReactModal
         isOpen={isOpen}
         onRequestClose={onClose}
         ariaHideApp={false}
         contentLabel="modal_jobposition"
         style={{
           content: {
             width: "90%",
             maxWidth: "600px",
             maxHeight: "80vh",
             margin: "auto",
             padding: "20px",
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
            {dataCompany.company_id}
        </ReactModal>
        
        </>
    )
}

export default Modal_Company_Edit;