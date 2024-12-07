import "../styles/ProductStyle.css";
import React, { useRef } from "react";

function Product({name, price, id, list, setList}) {

    const inputRef = useRef();

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
            <div className="main-box">
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