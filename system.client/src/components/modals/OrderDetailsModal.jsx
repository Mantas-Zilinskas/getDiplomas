import { useEffect, useState, useContext } from "react";
import { OrderContext } from '../../App'
import Modal from "react-modal";
import "../../styles/modalStyles/OrderDetailsModalStyle.css"
import { deleteOrder } from "../../api/OrderApi";
import { useNavigate } from "react-router-dom";
function OrderDetailsModal({ modalIsOpen, setModalIsOpen, id, products, paid}) {

    const navigate = useNavigate();
    const { orders, setOrders } = useContext(OrderContext);

    const Close = () => {
        setModalIsOpen(false);
    }

    const cancelOrder = async () => {
        let response = await deleteOrder(id);
        if (response.ok) {
            setOrders(orders.filter(order => order.id != id));
            setModalIsOpen(false);
        }
    }

    const calculateTotal = (products) => {
        let total = (products.reduce((sum, product) => {
            let priceStr = product.price.toString();
            if (/\.$/.test(priceStr)) {
                priceStr += "00";
            } else if (/\.[0-9]$/.test(priceStr)) {
                priceStr += "0";
            } else if (!/\./.test(priceStr)) {
                priceStr += ".00";
            }

            priceStr = priceStr.replace(/\./, '');
            return parseInt(priceStr) * product.quantity + sum;
        }, 0)) / 100;

        return total;
    }

    const calculateOne = (product) => {

        let priceStr = product.price.toString();
        if (/\.$/.test(priceStr)) {
            priceStr += "00";
        } else if (/\.[0-9]$/.test(priceStr)) {
            priceStr += "0";
        } else if (!/\./.test(priceStr)) {
            priceStr += ".00";
        }

        priceStr = priceStr.replace(/\./, '');

        return product.quantity * parseInt(priceStr) / 100;
    }

    const editOrder = () => {
        navigate("/EditOrder", { state: {orderId:id}})
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={Close}
                overlayClassName="OrderDetailsModalOverlay"
                className="OrderDetailsModalContent">
                <div>
                    <div>id: {id}</div>
                    <hr />
                    {products.map((product, index) => (
                        <div key={index}>
                            <div className="inline">{product.quantity} - {product.name}</div>
                            <div className="inline-right">{calculateOne(product)} eur</div>
                        </div>
                    ))}
                    <hr />
                    <div>
                        <div className="inline">Total:</div>
                        <div className="inline-right">{calculateTotal(products)} eur</div>
                    </div>
                    <div>
                        <div className="inline">Paid:</div>
                        <div className="inline-right">{paid} eur</div>
                    </div>
                    
                    {(paid == 0) ?(
                        <div>
                            <button className="inline marginTop" onClick={cancelOrder}>Cancel Order</button>
                            <button className="inline-right marginTop" onClick={editOrder}>Edit</button>
                        </div>
                    ):(null)}
                    
                </div>
            </Modal>
        </>
    );
}

export default OrderDetailsModal;