import { useState, useContext } from "react";
import CreateReservationModal from "./modals/CreateReservationModal";
import { createReservation, getReservations } from "../api/ReservationApi";
import "../styles/AddProductStyle.css"
import { ReservationContext } from "../App"

function AddReservation() {
    const { reservations, setReservations } = useContext(ReservationContext);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const addReservation = async (id, name, price) => {
        let response = await createReservation(name, price);
        if (response.ok) {
            getReservations().then((data) => setReservations(data));
        }
    }

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
