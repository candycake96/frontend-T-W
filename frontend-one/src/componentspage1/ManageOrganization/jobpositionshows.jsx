import axios from "axios";
import React, { useState, useEffect } from "react";
import JobpositionDelete from "./jobpositiondelete";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { apiUrl } from "../../config/apiConfig";

const JobPositionShows = ({ onPositionAdded, CompanyID }) => {
  const [showjobposition, setShowjobposition] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const fetchJobposition = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/getpositions/${CompanyID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setShowjobposition(response.data);
    } catch (error) {
      console.error("Error fetching job positions:", error);
    }
  };

  // Fetch job positions when component mounts or when CompanyID or onPositionAdded changes
  useEffect(() => {
    fetchJobposition();
  }, [CompanyID, onPositionAdded]);

  const handleDeleteSuccess = (id) => {
    setShowjobposition((prevPositions) =>
      prevPositions.filter((jobPosition) => jobPosition.id !== id)
    );
  };

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true); // Open modal
  };

  const handleSaveEditJobpositioon = async (e) => {
    e.preventDefault();
    if (selectedJob) {
      try {
        const response = await axios.put(
          `${apiUrl}/api/positions_update_data/${selectedJob.id_position}`,
          { name_position: selectedJob.name_position },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setMessage(response.data.message);
        setMessageType("success");
        fetchJobposition(); // Refresh the position list
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error details:", error.response ? error.response.data : error.message);
        setMessage("Failed to update the job position.");
        setMessageType("error");
      }
    }
  };
  

  return (
    <div>
      <div>
        <table className="table table-responsive">
          <tbody>
            {showjobposition.map((ShowsJobPosition, index) => (
              <tr key={index}>
                <td className="col-1">{index + 1}</td>
                <td className="col-9">{ShowsJobPosition.name_position}</td>
                <td className="col-1">
                  <JobpositionDelete
                    id={ShowsJobPosition.id_position}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                  <button
                    className="p-0 me-2 btn-animated"
                    onClick={() => handleEditClick(ShowsJobPosition)}
                    aria-label="Edit Job Position"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <dialog id="my_modal_4" className="modal" open>
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg mb-3 text-center">Edit Job Position</h3>
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
              <form onSubmit={handleSaveEditJobpositioon}>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={selectedJob ? selectedJob.name_position : ""}
                  onChange={(e) =>
                    setSelectedJob((prev) => ({
                      ...prev,
                      name_position: e.target.value,
                    }))
                  }
                />
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    บันทึก
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setIsModalOpen(false)} // Close modal
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default JobPositionShows;
