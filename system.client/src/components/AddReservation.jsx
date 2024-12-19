import { useState, useContext } from "react";
import CreateReservationModal from "./modals/CreateReservationModal";
import { createReservation, getReservations } from "../api/ReservationApi";
import "../styles/AddReservationStyle.css"
import { ReservationContext } from "../App"

function AddReservation() {
    const { setReservations } = useContext(ReservationContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const addReservation = async (customer, phone, appointmentTime, guests) => {
        try {
            const response = await createReservation(customer, phone, appointmentTime, guests);
            if (response.ok) {
                const data = await getReservations();
                setReservations(data);
            }
        } catch (error) {
            console.error("Failed to add reservation:", error);
        }
    };

    return (
        <>
            <div className="addReservationBox" onClick={openModal}>
                + Add Reservation
            </div>
            <CreateReservationModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                apiMethod={addReservation}
                id={0}
            />
        </>
    );
}

export default AddReservation;