import { useEffect, useState } from "react";
import "../styles/OrderStyle.css";
import PayModal from "./modals/PayModal";
import OrderDetailsModal from "./modals/OrderDetailsModal";

function Order({id, products, payments}) {
    const [items, setItems] = useState([]);
    const [payModalOpen, setPayModalOpen] = useState(false);
    const [orderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);
    const [paid, setPaid] = useState(0);

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

        if (payments != []) {
            setPaid(payments.reduce((sum, payment) => {
                return convertToCents(payment.amount) + sum;
            }, 0) / 100);
        }
    }, []);

    const convertToCents = (price) => {
        let priceStr = price.toString();
        if (/\.$/.test(priceStr)) {
            priceStr += "00";
        } else if (/\.[0-9]$/.test(priceStr)) {
            priceStr += "0";
        } else if (!/\./.test(priceStr)) {
            priceStr += ".00";
        }

        priceStr = priceStr.replace(/\./, '');
        return parseInt(priceStr);
    }

    const calculateTotal = (products) =>{
        let total = (products.reduce((sum, product) => {
            return convertToCents(product.price) * product.quantity + sum;
        }, 0)) / 100;

        return total;
    }

    const calculateOne = (product) => {
        return product.quantity * convertToCents(product.price) / 100;
    }

    return (
        <>
            <div className="orderBox">
                <div>id: {id}</div>
                <hr/>
                {items.map((product, index) => (
                    <div key={index}>
                        <div className="inline">{product.quantity} - {product.name}</div>
                        <div className="inline-right">{calculateOne(product)} eur</div>      
                    </div>
                ))}
                {(products.length > 3) ? (<div>+ {products.length - 3} more</div>):null}
                <hr />
                <div> 
                    <div className="inline">Total:</div>
                    <div className="inline-right">{calculateTotal(products)} eur</div>
                </div>
                <div>
                    <div className="inline">Paid:</div>
                    <div className="inline-right">{paid} eur</div>
                </div> 
                <br />
                <div>
                    <button className="inline" onClick={openOrderDetailsModal}>Details</button>
                    <button className="inline-right" onClick={openPayModal}>Pay</button>
                </div>
            </div>
            <PayModal modalIsOpen={payModalOpen} setModalIsOpen={setPayModalOpen} id={id} setPaid={setPaid} paid={paid} price={calculateTotal(products)} />
            <OrderDetailsModal modalIsOpen={orderDetailsModalOpen} setModalIsOpen={setOrderDetailsModalOpen} id={id} products={products} paid={paid} />
        </>
    );
}

export default Order;