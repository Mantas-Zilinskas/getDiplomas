import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Order from '../components/Order'
import '../styles/LayoutStyle.css'
import { OrderContext } from '../App'
import { useEffect, useState, useContext } from 'react'
import { getUnpaidOrders } from '../api/OrderApi'

export function OrderLayout() {
    const { orders, setOrders } = useContext(OrderContext);


    useEffect(() => {
        getUnpaidOrders().then(result => setOrders(result)); 
    },[]);

    return (
        <>
            <SideBar name="Orders"/>
            <Header name="Orders" />
            <div className="orderContent">
                <div className="content">
                    <h1>Im Order</h1>
                </div>
                {orders != null
                    ?
                    orders.map((order) => (
                        <Order
                            key={order.id}
                            id={order.id}
                            products={order.products}
                            payments={order.payments}/>
                    ))
                    :
                    (<h2>Loading Please wait</h2>)}
            </div>
        </>
    );
}

export default OrderLayout;