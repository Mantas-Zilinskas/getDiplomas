import { useEffect, useState } from "react";
import { OrderContext } from '../../App'
import Modal from "react-modal";
import "../../styles/modalStyles/OrderDetailsModalStyle.css"
import {getOrder} from "../../api/OrderApi"
function ReservationDetailsModal({ modalIsOpen, setModalIsOpen, id}) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        getOrder(id).then((data) => {

            if (data.products != undefined) {
                setProducts(data.products);
            }
        });
    }, [])

    const Close = () => {
        setModalIsOpen(false);
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
                </div>
            </Modal>
        </>
    );
}

export default ReservationDetailsModal;