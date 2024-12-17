import "../styles/ReservationStyle.css";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { deleteReservation } from "../api/ReservationApi";

function Reservation({ id, customer, service, bookingTime, reservations, setReservations }) {
    const inputRef = useRef();

    const deleteItem = async () => {
        const response = await deleteReservation(id);
        if (!response.ok) {
            alert("Something went wrong while trying to delete the reservation.");
        } else {
            const newList = reservations.filter(reservation => reservation.id !== id);
            setReservations(newList);
        }
    };

    const Submit = () => {
        if (inputRef.current.value === 0 || inputRef.current.value === "") return;
        let quantity = inputRef.current.value;
        alert(`Adding ${quantity} of this reservation to your list.`);
        inputRef.current.value = 0;
    };

    const Check = () => {
        const inputValue = inputRef.current.value;
        if (!isNaN(inputValue) && Number(inputValue) <= 0) {
            inputRef.current.value = 0;
        }
    };

    return (
        <div className="reservationBox">
            <CloseIcon className="closeIcon" onClick={deleteItem} />
            <div className="center">{customer.name}</div>
            <p>Service: {service.name}</p>
            <p>Booking Time: {new Date(bookingTime).toLocaleString()}</p>
            <input
                type="number"
                defaultValue={0}
                className="number-input"
                ref={inputRef}
                onChange={Check}
            />
            <button className="right" onClick={Submit}>Add</button>
        </div>
    );
}

export default Reservation;