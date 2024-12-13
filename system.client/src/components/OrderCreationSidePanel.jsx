import "../styles/OrderCreationSidePanelStyle.css"
import React, { useEffect, useState } from "react";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { createOrder } from '../api/OrderApi'
import CloseIcon from '@mui/icons-material/Close';

function OrderCreationSidePanel({ items, setItems}) {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let c = 0
        for (let i = 0; i < items.length; ++i) {
            c += items 
        }
        setTotal(items.reduce((sum, item) => sum + (item.price * 100 * item.amount), 0));
    }, [items]);

    const removeItem = (id, amount) => {
        setItems(items.filter((product) => !(product.amount == amount && product.id == id)));
    }

    const handleSubmit = () => {
        if (items.length == 0) return

        let order = {
            UserId: 0,
            Products: items.map(({ id, amount }) => ({ProductId:id, Quantity:amount})),
            Tip: 0,
            DiscountId: 0,
            ReservationId: 0,
        }
        createOrder(order);

        setTotal(0);
        setItems([]);
        return;
    }

    return (
        <>
            <div className="orderCreationContainer">
                <h2>Order Details</h2>
                {items.map((product, index) => (
                <div>
                    <div>{product.name}</div>
                    <div className="itemDetails">
                        <div className="inline">x{product.amount}</div>
                            <CloseIcon className="inline-right closeIcon" onClick={() => { removeItem(product.id, product.amount) }} />
                        <div className="inline-right">{product.price} eur</div>
                    </div>
                    <hr/>
                </div>))}
                <div className="totalWindow">
                    Total: {total/100} eur
                    <button onClick={handleSubmit}>Create Order</button>
                </div>
            </div>
        </>
    );
}

export default OrderCreationSidePanel;