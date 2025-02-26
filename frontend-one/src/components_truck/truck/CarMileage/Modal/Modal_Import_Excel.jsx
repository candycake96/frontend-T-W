import React from "react";
import ReactModal from "react-modal";

const Modal_Import_Excel = ({isOpen, onClose}) => {
    return (
        <>
        <ReactModal
         isOpen={isOpen}
         onRequestClose={onClose}
         ariaHideApp={false}
         contentLabel="Employee Details"
         style={{
             content: {
                 width: "90%",
                 maxWidth: "700px",
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
test
        </ReactModal>
        </>
    )
}

export default Modal_Import_Excel;