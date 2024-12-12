import "../styles/AddProductStyle.css"
import CreateProductModal from "./modals/CreateProductModal";
import "../styles/modalStyles/CreateProductModalStyle.css";
import { useState } from "react";

function AddProduct() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    }

    return (
        <>
            <div className="addProductBox" onClick={ openModal}>
                + Add Product
            </div>
            <CreateProductModal modalIsOpen={modalIsOpen} setModalIsOpen={ setModalIsOpen} />
        </>
    );
}

export default AddProduct;