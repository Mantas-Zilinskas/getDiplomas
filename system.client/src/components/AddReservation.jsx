import { useState, useContext } from "react";
import CreateReservationModal from "./modals/CreateReservationModal";
import { createReservation, getReservations } from "../api/ReservationApi";
import "../styles/AddReservationStyle.css"
import { ReservationContext } from "../App"

function AddReservation() {
    const { reservations, setReservations } = useContext(ReservationContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const addReservation = async (customer, phone, appointmentTime, guests, orderId) => {
        let object = {
            "bookingTime": "2024-12-19T20:30:52.760Z",
            "appointmentTime": appointmentTime,
            "employeeId": 0,
            "customerName": customer,
            "customerPhoneNumber": phone,
            "numberOfGuests": guests,
            "orderId": orderId

        }

        try {
            const response = await createReservation(object);
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