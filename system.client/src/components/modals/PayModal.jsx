import { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../styles/modalStyles/PayModalStyle.css"
function PayModal({modalIsOpen, setModalIsOpen}) {

    const Close = () => {
        setModalIsOpen(false);
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
                    <br />
                    <br />
                    <button>Pay</button>
                </div>
            </Modal>
        </>
    );
}

export default PayModal;