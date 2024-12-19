import "../styles/ProductStyle.css";
import { useRef, useState, useContext } from "react";
import {ProductContext} from "../App"
import CloseIcon from '@mui/icons-material/Close';
import { deleteProduct, updateProduct } from "../api/ProductsApi";
import EditIcon from '@mui/icons-material/Edit';
import CreateProductModal from "./modals/CreateProductModal"

function Product({ name, price, id, list, setList}) {
    const { products, setProducts } = useContext(ProductContext);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    const inputRef = useRef();

    const deleteItem = async () => {
        const response = await deleteProduct(id);
        if (!response.ok) {
            alert("something went wrong while trying to delete catalog item");
        } else {
            const newList = products.filter(product => product.id != id )
            setProducts(newList);
        }
    }

    const Submit = () => {
        if (inputRef.current.value == 0) return;
        let amount = inputRef.current.value;
        setList([...list, {name, price, id, amount }]);
        inputRef.current.value = 0;
    }

    const Check = () => {
        const inputValue = inputRef.current.value

        if (!isNaN(inputValue) && Number(inputValue) <= 0) {
            inputRef.current.value = 0;
        }
    }
    const openEditModal = () => {
        setEditModalIsOpen(true);
    }
    const apiMethod = async (id, name, price) => {
        let response = await updateProduct(id, name, price);
        if (response.ok) {
            setProducts([...products.filter(product => product.id != id), { id: id, name: name, price: price, discountId: 0 }]);
        }
    }

    return (
        <>
            <div className="productBox">
                <EditIcon className="inline editIcon" onClick={openEditModal} />
                <CloseIcon className="inline-right closeIcon" onClick={deleteItem} />
                <div className="center">{name}</div>
                <p>Price:  {price} Eur</p>
                <input type="number"
                    defaultValue={0}
                    className="number-input"
                    ref={inputRef}
                    onChange={Check} />
                <button className="right" onClick={Submit}>Add</button>
            </div>
            <CreateProductModal modalIsOpen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen} apiMethod={apiMethod} id={id} />
        </>
    );
}

export default Product;