import SideBar from '../components/SideBar'
import Header from '../components/Header'

export function ReservationsLayout() {

    return (
        <>
            <SideBar name="Reservations" />
            <Header name="Reservations" />
            <div className="content">
                <h1>Im Reservation</h1>
            </div>
        </>
    );
}

export default ReservationsLayout;