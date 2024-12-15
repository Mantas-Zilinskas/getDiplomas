import "../styles/OrderCreationSidePanelStyle.css"
import React, { useEffect, useState } from "react";
import { createOrder } from '../api/OrderApi'
import CloseIcon from '@mui/icons-material/Close';
import InfoModal from "./modals/InfoModal"


function OrderCreationSidePanel({ items, setItems}) {

    const [total, setTotal] = useState(0);
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

    const calculateTotal = (products) => {
        let total = (products.reduce((sum, product) => {
            let priceStr = product.price.toString();
            if (/\.$/.test(priceStr)) {
                priceStr += "00";
            } else if (/\.[0 - 9]$ /.test(priceStr)) {
                priceStr += "0";
            } else if (!/\./.test(priceStr)) {
                priceStr += ".00";
            }

            priceStr = priceStr.replace(/\./, '');
            return parseInt(priceStr) * product.amount + sum;
        }, 0)) / 100;

        return total;
    }

    useEffect(() => {
        let c = 0
        for (let i = 0; i < items.length; ++i) {
            c += items 
        }
        setTotal(calculateTotal(items));
    }, [items]);

    const removeItem = (id, amount) => {
        setItems(items.filter((product) => !(product.amount == amount && product.id == id)));
    }

    const handleSubmit = async () => {
        if (items.length == 0) return

        let order = {
            UserId: 0,
            Products: items.map(({ id, amount }) => ({ProductId:id, Quantity:amount})),
            Tip: 0,
            DiscountId: 0,
            ReservationId: 0,
        }
        let response = await createOrder(order);
        if (response.ok) {
            setInfoModalIsOpen(true);
        }

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
                    Total: {total} eur
                    <button onClick={handleSubmit}>Create Order</button>
                </div>
            </div>
            <InfoModal modalIsOpen={infoModalIsOpen} setModalIsOpen={setInfoModalIsOpen} text={"Order created successfully"} />
        </>
    );
}

export default OrderCreationSidePanel;