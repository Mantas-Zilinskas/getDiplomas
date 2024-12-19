import { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../styles/modalStyles/InfoModalStyle.css"
export function InfoModal({ modalIsOpen, setModalIsOpen, text, closeFunc }) {

    const Close = () => {
        if (closeFunc != undefined) {
            closeFunc();
        }
        setModalIsOpen(false);
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={Close}
                overlayClassName="infoModalOverlay"
                className="infoModalContent">
                <div>
                    <h2>{text}</h2>

                    <br />
                    <br />
                    <button onClick={Close}>Ok</button>
                </div>
            </Modal>
        </>
    );
}

export default InfoModal;