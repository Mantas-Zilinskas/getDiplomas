import "../styles/OrderCreationSidePanelStyle.css"
import React, { useEffect, useState } from "react";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { useNavigate } from 'react-router-dom';

function OrderCreationSidePanel({ items, setItems}) {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let c = 0
        for (let i = 0; i < items.length; ++i) {
            c += items 
        }
        setTotal(items.reduce((sum, item) => sum + (item.price * 100 * item.amount), 0));
    }, [items]);

    const HandleSubmit = () => {
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
                        <div className="inline-right">{product.price} eur</div>
                    </div>
                    <hr/>
                </div>))}
                <div className="totalWindow">
                    Total: {total/100} eur
                    <button onClick={HandleSubmit}>Create Order</button>
                </div>
            </div>
        </>
    );
}

export default OrderCreationSidePanel;