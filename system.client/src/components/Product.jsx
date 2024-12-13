import "../styles/ProductStyle.css";
import React, { useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { deleteProduct } from "../api/ProductsApi";

function Product({name, price, id, list, setList, products, setProducts}) {

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

    return (
        <>
            <div className="productBox">
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
        </>
    );
}

export default Product;