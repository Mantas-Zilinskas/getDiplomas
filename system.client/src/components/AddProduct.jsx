import "../styles/AddProductStyle.css"
import CreateProductModal from "./modals/CreateProductModal";
import "../styles/modalStyles/CreateProductModalStyle.css";
import { useState } from "react";
import {createProduct} from "../api/ProductsApi"


function AddProduct({products, setProducts}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const addProduct = async (id, name, price) => {
        return await createProduct(name, price);
    }

    return (
        <>
            <div className="addProductBox" onClick={ openModal}>
                + Add Product
            </div>
            <CreateProductModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                apiMethod={addProduct}
                id={0}
                products={products}
                setProducts={setProducts} />
        </>
    );
}

export default AddProduct;