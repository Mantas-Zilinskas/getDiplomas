import "../styles/AddProductStyle.css"
import CreateProductModal from "./modals/CreateProductModal";
import "../styles/modalStyles/CreateProductModalStyle.css";
import { useState, useContext} from "react";
import { createProduct, getProducts} from "../api/ProductsApi"
import {ProductContext} from "../App"


function AddProduct() {
    const { products, setProducts } = useContext(ProductContext);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const addProduct = async (id, name, price) => {
        let response = await createProduct(name, price);
        if (response.ok) {
            getProducts().then((data) => setProducts(data));
        }
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
            />
        </>
    );
}

export default AddProduct;