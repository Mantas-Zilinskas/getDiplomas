import Modal from "react-modal";
import { useState, useContext } from "react";
import {ProductContext} from "../../App"
import { useRef } from "react";
import { getProducts } from "../../api/ProductsApi";
import "../../styles/modalStyles/CreateProductModalStyle.css";

function CreateProductModal({ modalIsOpen, setModalIsOpen, apiMethod, id }) {
    const { products, setProducts } = useContext(ProductContext);
    const [nameError, setNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const priceRegex = /^([1-9][0-9]+|[0-9])(\.[0-9]{2})$/;

    const Close = () => {
        setNameError(false);
        setPriceError(false);
        setModalIsOpen(false);
    }

    const validate = () => {
        setNameError(false);
        setPriceError(false);

        let flag = false;

        if (nameRef.current.value == "") {
            setNameError(true);
            flag = true;
        }
        if (!priceRegex.test(priceRef.current.value)) {
            setPriceError(true);
            flag = true;
        }

        return flag;
    }

    const submit = async () => {

        if (validate()) return;
        await apiMethod(id, nameRef.current.value, Number(priceRef.current.value));
        setNameError(false);
        setPriceError(false);
        Close();
        //if (response.ok) {
        //    getProducts().then((data) => setProducts(data));
        //}
    }

  return (
      <>
          <Modal
              isOpen={modalIsOpen}
              onRequestClose={Close}
              overlayClassName="createProductModalOverlay"
              className="createProductModalContent">
              <h3>Product</h3>
              <div>product/service name:</div>
              { (nameError)?(<div className="error">Must not be empty</div>):(null) }
              <input type="text" className="input" ref={nameRef}></input>
              <br />
              <br />
              <div>product/service price:</div>
              {(priceError) ? (<div className="error">Must be a positive number with<br />two digits after floating point</div>) : (null)}
              <input type="text" className="input" ref={priceRef}></input>
              <br />
              <br />
              <button onClick={submit}>Submit</button>
          </Modal>
      </>
  );
}

export default CreateProductModal;