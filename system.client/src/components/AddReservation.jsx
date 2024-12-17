import React, { useState } from "react";
import CreateReservationModal from "./modals/CreateReservationModal";

function AddReservation({ reservations, setReservations }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>Add Reservation</button>
            <CreateReservationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                reservations={reservations}
                setReservations={setReservations}
            />
        </>
    );
}

export default AddReservation;
