import axios from "axios";
import React, {useState} from "react";
import ReactModal from "react-modal";

const Modal_Jobposition_Add = ({isOpen, onClose}) => {
    const [jobposition, setJobposition] = useState(""); // รับส่งข้อมูลจาก input
    const [messageType, setMessageType] = useState(""); // 'success' or 'error'
    const [message, setMessage] = useState("");

    const createSubmit = async (e) => {
        e.preventDefault();
    
        // Validation
        if (!jobposition) {
          setMessage("Job position is required.");
          setMessageType("error");
          return;
        }
    
        try {
          const response = await axios.post(
            "http://localhost:7071/api/jobposition_add",
            { position_name: jobposition }, // sending job position
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          setMessage("Job position added successfully!");
          setMessageType("success");
          setJobposition(""); // Clear the input field after success
        } catch (error) {
          console.error("Error:", error);
          setMessage(error.response?.data?.message || "Something went wrong");
          setMessageType("error");
        }
      };

    return (
        <ReactModal 
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            contentLabel="modal_jobposition"
            style={{
              content: {
                width: "90%",
                maxWidth: "600px",
                maxHeight: "30vh",
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
            <div className="">
                {message && (
                  <div
                    className={`alert ${
                      messageType === "success" ? "alert-success" : "alert-danger"
                    }`}
                  >
                    {message}
                  </div>
                )}
            </div>
            <form onSubmit={createSubmit}>
                <div className="mb-3">
                  <label htmlFor="jobposition" className="form-label">
                    ชื่อตำแหน่ง
                  </label>
                  <input
                    type="text"
                    placeholder="ตำแหน่งพนักงาน"
                    className="form-control"
                    value={jobposition}
                    onChange={(e) => setJobposition(e.target.value)} // Use onChange to capture input value
                  />
                  <div className="mb-3 p-3 text-center">
                    <button type="submit" className="btn btn-success">
                      เพิ่มข้อมูล
                    </button>
                  </div>
                </div>
            </form>
        </ReactModal>
    );
};

export default Modal_Jobposition_Add;
