import { useEffect, useState } from "react";
import "../styles/OrderStyle.css";
import PayModal from "./modals/PayModal";
import OrderDetailsModal from "./modals/OrderDetailsModal";

function Order({id, products}) {
    const [items, setItems] = useState([]);
    const [payModalOpen, setPayModalOpen] = useState(false);
    const [orderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);

    const openPayModal = () => {
        setPayModalOpen(true);
    }

    const openOrderDetailsModal = () => {
        setOrderDetailsModalOpen(true);
    }

    useEffect(() => {
        if (products.length > 3) {
            setItems([products[0], products[1], products[2]]);
        } else {
            setItems(products)
        }
    }, []);


    return (
        <>
            <div className="orderBox">
                <div>id: {id}</div>
                <hr/>
                {items.map((product, index) => (
                    <div key={index}>
                        <div className="inline">{product.quantity} - {product.name}</div>
                        <div className="inline-right">{product.quantity * product.price} eur</div>      
                    </div>
                ))}
                {(products.length > 3) ? (<div>+ {products.length - 3} more</div>):null}
                <hr />
                <div> 
                    <div className="inline">Total:</div>
                    <div className="inline-right">{(products.reduce((sum, product) => sum + (product.price * 100 * product.quantity), 0))/100} eur</div>
                </div>
                <br />
                <div>
                    <button className="inline" onClick={openOrderDetailsModal}>Details</button>
                    <button className="inline-right" onClick={openPayModal}>Pay</button>
                </div>
            </div>
            <PayModal modalIsOpen={payModalOpen} setModalIsOpen={setPayModalOpen} />
            <OrderDetailsModal modalIsOpen={orderDetailsModalOpen} setModalIsOpen={setOrderDetailsModalOpen} id={id} products={products} />
        </>
    );
}

export default Order;