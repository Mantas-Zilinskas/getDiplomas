import SideBar from '../components/SideBar'
import Header from '../components/Header'
import '../styles/LayoutStyle.css'

export function OrderLayout() {

    return (
        <>
            <SideBar name="Orders"/>
            <Header name="Orders" />
            <div className="content">
                <h1>Im Order</h1>
            </div>
        </>
    );
}

export default OrderLayout;