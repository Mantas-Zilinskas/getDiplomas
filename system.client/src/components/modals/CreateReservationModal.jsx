import Modal from "react-modal";
import { useState, useContext } from "react";
import { ReservationContext } from "../../App"
import { useRef } from "react";
import "../../styles/modalStyles/CreateReservationModalStyle.css";
import { createReservation } from "../../api/ReservationAPI";

function CreateReservationModal({ modalIsOpen, setModalIsOpen, apiMethod, id }) {
    const [nameError, setNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [guestsError, setGuestsError] = useState(false);

    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const dateRef = useRef(null);
    const guestsRef = useRef(null);

    const phoneRegex = /^[+]?[\d\s()-]+$/;
    const guestsRegex = /^[1-9][0-9]*$/;

    const close = () => {
        setNameError(false);
        setPhoneError(false);
        setDateError(false);
        setGuestsError(false);
        setModalIsOpen(false);
    };

    const validate = () => {
        setNameError(false);
        setPhoneError(false);
        setDateError(false);
        setGuestsError(false);

        let hasError = false;

        if (!nameRef.current.value.trim()) {
            setNameError(true);
            hasError = true;
        }
        if (!phoneRegex.test(phoneRef.current.value)) {
            setPhoneError(true);
            hasError = true;
        }
        if (!dateRef.current.value) {
            setDateError(true);
            hasError = true;
        }
        if (!guestsRegex.test(guestsRef.current.value)) {
            setGuestsError(true);
            hasError = true;
        }

        return hasError;
    };

    const submit = async () => {
        if (validate()) return;

        await apiMethod(
            nameRef.current.value.trim(),
            phoneRef.current.value.trim(),
            dateRef.current.value,
            Number(guestsRef.current.value)
        );

        close();
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={close}
            overlayClassName="createReservationModalOverlay"
            className="createReservationModalContent"
        >
            <h3>Create Reservation</h3>

            <div>
                <label>Customer Name:</label>
                {nameError && <div className="error">Must not be empty</div>}
                <input type="text" ref={nameRef} className="input" />
            </div>

            <div>
                <label>Customer Phone:</label>
                {phoneError && <div className="error">Invalid phone number</div>}
                <input type="text" ref={phoneRef} className="input" />
            </div>

            <div>
                <label>Appointment Date:</label>
                {dateError && <div className="error">Must select a date</div>}
                <input type="datetime-local" ref={dateRef} className="input" />
            </div>

            <div>
                <label>Number of Guests:</label>
                {guestsError && <div className="error">Must be a positive number</div>}
                <input type="number" ref={guestsRef} className="input" />
            </div>

            <button onClick={submit}>Submit</button>
        </Modal>
    );
}

export default CreateReservationModal;
