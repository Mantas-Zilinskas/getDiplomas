import React, { useState } from "react";
import "../../styles/modalStyles/CreateReservationModalStyle.css";
import { createReservation } from "../../api/ReservationAPI";

function CreateReservationModal({ isOpen, onClose, reservations, setReservations }) {
    const [formData, setFormData] = useState({
        customerId: "",
        serviceId: "",
        appointmentTime: "",
    });

    const handleSubmit = async () => {
        const newReservation = await createReservation(formData);
        if (newReservation) {
            setReservations([...reservations, newReservation]);
            onClose();
        } else {
            alert("Failed to create a reservation.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <h2>Create Reservation</h2>
                <label>Customer ID:</label>
                <input
                    type="text"
                    value={formData.customerId}
                    onChange={e => setFormData({ ...formData, customerId: e.target.value })}
                />
                <label>Service ID:</label>
                <input
                    type="text"
                    value={formData.serviceId}
                    onChange={e => setFormData({ ...formData, serviceId: e.target.value })}
                />
                <label>Appointment Time:</label>
                <input
                    type="datetime-local"
                    value={formData.appointmentTime}
                    onChange={e => setFormData({ ...formData, appointmentTime: e.target.value })}
                />
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default CreateReservationModal;
