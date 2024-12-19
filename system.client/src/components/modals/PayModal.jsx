import { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import "../../styles/modalStyles/PayModalStyle.css";
import { payOrder } from "../../api/OrderApi";
function PayModal({modalIsOpen, setModalIsOpen, id, setPaid, paid, price}) {

    const paymentRegex = /^([1-9][0-9]+|[0-9])(\.[0-9]{2})$/;

    const paymentRef = useRef(null);

    const Close = () => {
        setModalIsOpen(false);
    }

    const convertToCents = (price) => {
        let priceStr = price.toString();
        console.log(priceStr)
        console.log(/\.[0-9]$/.test(priceStr))
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

    const validate = () => {
        if (!paymentRegex.test(paymentRef.current.value)) {
            alert("Must be a positive number with two digits after floating point");
            return false;
        }
        return true;
    }

    const pay = async () => {
        if (!validate())
            return 

        let payment = Number(paymentRef.current.value)
        
        if (convertToCents(price) < (convertToCents(payment) + convertToCents(paid))) {
            alert("Can not make a payment exceeding the order price");
            return
        }
        
        let response = await payOrder(id, payment);
        if (response.ok) {
            setPaid((convertToCents(payment) + convertToCents(paid))/100);
            setModalIsOpen(false);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={Close}
                overlayClassName="payModalOverlay"
                className="payModalContent">
                <div>
                    <div>Please enter credit card number:</div>
                    <input className="input" />
                    <div>Please enter amount to pay:</div>
                    <input className="input" ref={paymentRef} />
                    <br />
                    <br />
                    <button onClick={pay}>Pay</button>
                </div>
            </Modal>
        </>
    );
}

export default PayModal;