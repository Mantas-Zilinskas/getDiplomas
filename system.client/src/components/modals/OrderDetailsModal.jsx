import { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../styles/modalStyles/OrderDetailsModalStyle.css"
function OrderDetailsModal({ modalIsOpen, setModalIsOpen, id, products}) {

    const Close = () => {
        setModalIsOpen(false);
    }

    useEffect(() => {
        console.log("aaa");
    }, []);

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
                            <div className="inline-right">{product.quantity * product.price} eur</div>
                        </div>
                    ))}
                    <hr />
                    <div>
                        <div className="inline">Total:</div>
                        <div className="inline-right">{(products.reduce((sum, product) => sum + (product.price * 100 * product.quantity), 0)) / 100} eur</div>
                    </div>
                    <div>
                        <button className="inline marginTop">Delete</button>
                        <button className="inline-right marginTop">Edit</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default OrderDetailsModal;