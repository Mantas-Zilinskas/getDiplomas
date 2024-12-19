import Modal from "react-modal";
import { useState, useContext } from "react";
import { ReservationContext } from "../../App"
import { useRef } from "react";
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
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={Close}
                overlayClassName="createReservationModalOverlay"
                className="createReservationModalContent">
                <h3>Reservation</h3>
                <div>reservation/service name:</div>
                {(nameError) ? (<div className="error">Must not be empty</div>) : (null)}
                <input type="text" className="input" ref={nameRef}></input>
                <br />
                <br />
                <div>reservation/service price:</div>
                {(priceError) ? (<div className="error">Must be a positive number with<br />two digits after floating point</div>) : (null)}
                <input type="text" className="input" ref={priceRef}></input>
                <br />
                <br />
                <button onClick={submit}>Submit</button>
            </Modal>
        </>
    );
}

export default CreateReservationModal;
