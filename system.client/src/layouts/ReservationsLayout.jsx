import React, { useState, useEffect } from "react";
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import { fetchReservations } from "../api/ReservationAPI";
import Reservation from "../components/Reservation";
import AddReservation from "../components/AddReservation";
import "../styles/ReservationStyle.css";

export function ReservationLayout() {
    const [reservations, setReservations] = useState(null);

    useEffect(() => {
        fetchReservations().then(data => setReservations(data));
    }, []);

    return (
        <>
        <SideBar name="Reservations" />
        <Header name="Reservations" />
        <div className="reservationLayout">
            <h1>Reservations</h1>
            {reservations ? (
                reservations.map(reservation => (
                    <Reservation
                        key={reservation.id}
                        id={reservation.id}
                        customer={reservation.customer}
                        service={reservation.service}
                        bookingTime={reservation.bookingTime}
                        reservations={reservations}
                        setReservations={setReservations}
                    />
                ))
            ) : (
                <h2>Loading reservations...</h2>
            )}
            <AddReservation reservations={reservations} setReservations={setReservations} />
            </div>
        </>
    );
}

export default ReservationLayout;
