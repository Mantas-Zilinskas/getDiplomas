import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Order from '../components/Order'
import '../styles/LayoutStyle.css'
import { useEffect, useState } from 'react'
import { getUnpaidOrders } from '../api/OrderApi'

export function OrderLayout() {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        getUnpaidOrders().then(result => setOrders(result)); 
    },[]);

    let obj = { name: 'alus', quantity: 2, price: 1.99 };

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
                            products={order.products} />
                    ))
                    :
                    (<h2>Loading Please wait</h2>)}
                {/*<Order id={1} products={[{ name: 'alus', quantity: 1, price: 1.99 }, { name: 'alus', quantity: 2, price: 1.99 }, { name: 'alus', quantity: 3, price: 1.99 }, { name: 'alus', quantity: 1, price: 1.99 }, { name: 'alus', quantity: 2, price: 1.99 }, { name: 'alus', quantity: 3, price: 1.99 }]} />*/}
                {/*<Order id={1} products={[{ name: 'alus', quantity: 1, price: 1.99 }, { name: 'alus', quantity: 2, price: 1.99 }]} />*/}
                {/*<Order id={2} products={[{ name: 'agurkas', quantity: 4, price: 1.99 }, { name: 'maistas', quantity: 5, price: 1.99 }, { name: 'sidras', quantity: 6, price: 1.99 }, { name: 'sidras', quantity: 6, price: 1.99 }]} />*/}
                {/*<Order id={3} products={[{ name: 'agurkas', quantity: 7, price: 1.99 }, { name: 'maistas', quantity: 8, price: 1.99 }, { name: 'sidras', quantity: 9, price: 1.99 }]} />*/}
                {/*<Order id={4} products={[obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj]} />*/}
                {/*<Order id={5} price={6.90} />*/}
            </div>
        </>
    );
}

export default OrderLayout;