import { useEffect, useState, useContext } from 'react';
import { ReservationContext } from "../App"
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { getReservations } from "../api/ReservationAPI";
import Reservation from "../components/Reservation";
import "../styles/ReservationStyle.css";
import '../styles/LayoutStyle.css'
import AddReservation from '../components/AddReservation';

export function ReservationLayout() {
    const { reservations, setReservations } = useContext(ReservationContext);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getReservations()
            .then(data => {
                setReservations(data);
                setIsLoaded(true);
            })
            .catch(error => {
                console.error("Error fetching reservations:", error);
                setIsLoaded(true);
            });
    }, []);

    return (
        <>
            <SideBar name="Reservations" />
            <Header name="Reservations" />
            <div className="reservationContent">
                <h1>Reservations</h1>
                {isLoaded ? (
                    Array.isArray(reservations) && reservations.length > 0 ? (
                        reservations.map(reservation => (
                            <Reservation
                                key={reservation.id}// Use `orderId` as the unique key
                                id={reservation.id}
                                orderId={ reservation.orderId}
                                customer={reservation.customerName}
                                phone={reservation.customerPhoneNumber}
                                bookingTime={reservation.bookingTime}
                                appointmentTime={reservation.appointmentTime}
                                guests={reservation.numberOfGuests}
                                employee={reservation.employeeId}
                            />
                        ))
                    ) : (
                        <h2>No reservations found</h2>

                    )
                ) : (
                    <h2>Loading reservations...</h2>
                )}
                {isLoaded
                    ?
                    <AddReservation />
                    : (null)}
            </div>
        </>
    );
}

export default ReservationLayout;