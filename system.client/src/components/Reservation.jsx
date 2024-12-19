import "../styles/ReservationStyle.css";
import { useRef, useState, useContext } from "react";
import { ReservationContext } from "../App"
import CloseIcon from '@mui/icons-material/Close';
import { deleteReservation, updateReservation } from "../api/ReservationApi";
import EditIcon from '@mui/icons-material/Edit';
import CreateReservationModal from "./modals/CreateReservationModal"
import ReservationDetailsModal from "./modals/ReservationDetailsModal";

function Reservation({ id, orderId, customer, phone, setList, list, appointmentTime, guests}) {
    const { reservations, setReservations } = useContext(ReservationContext);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);

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
        let order = inputRef.current.value;
        setList([...list, { customer, phone, id, order }]);
        inputRef.current.value = 0;
    }

    const Check = () => {
        const inputValue = inputRef.current.value;
        if (!isNaN(inputValue) && Number(inputValue) <= 0) {
            inputRef.current.value = 0;
        }
    }

    const openEditModal = () => {
        setEditModalIsOpen(true);
    }                 
    const openDetailsModal = () => {
        setDetailsModalIsOpen(true);
    }

    const apiMethod = async (name, phone, date, guests, orderId) => {
        let object = {
            "bookingTime": "2024-12-19T20:30:52.760Z",
            "appointmentTime": date,
            "employeeId": 0,
            "customerName": name,
            "customerPhoneNumber": phone,
            "numberOfGuests": guests,
            "orderId": orderId
        }
        let response = await updateReservation(id, object);
        if (response.ok) {
            setReservations([...reservations.filter(reservation => reservation.id != id), object]);
        }
    }

    return (
        <>
            <div className="reservationBox">
                <EditIcon className="inline editIcon" onClick={openEditModal} />
                <CloseIcon className="inline-right closeIcon" onClick={deleteItem} />
                <div className="center">Order id: {orderId}</div>
                <button onClick={openDetailsModal}>Order details</button>
                <p>Name: {customer}</p>
                <p>Phone: {phone}</p>
                <p>Reservation Time: {new Date(appointmentTime).toLocaleString()}</p>
                <p>Guests: {guests}</p>
            </div>
            <CreateReservationModal modalIsOpen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen} apiMethod={apiMethod} id={id} />
            <ReservationDetailsModal id={orderId} modalIsOpen={detailsModalIsOpen} setModalIsOpen={setDetailsModalIsOpen} />
        </>
    );
}

export default Reservation;