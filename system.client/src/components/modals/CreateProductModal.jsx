import Modal from "react-modal";
import { useState } from "react";
import { useRef } from "react";
import { getProducts } from "../../api/ProductsApi";
import "../../styles/modalStyles/CreateProductModalStyle.css";

function CreateProductModal({ modalIsOpen, setModalIsOpen, products, setProducts, apiMethod, id}) {
    const [nameError, setNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const priceRegex = /^([1-9][0-9]+|[0-9])(\.|\.[0-9]{1,2})?$/;

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
        const response = await apiMethod(id, nameRef.current.value, Number(priceRef.current.value));
        setNameError(false);
        setPriceError(false);

        if (!response.ok) {
            allert("Something went wrong while creating new catalog item.");
        } else {
            getProducts().then((data) => setProducts(data));
        }
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
              {(priceError) ? (<div className="error">Must be a positive number with<br />up to two digits after floating point</div>) : (null)}
              <input type="text" className="input" ref={priceRef}></input>
              <br />
              <br />
              <button onClick={submit}>Submit</button>
          </Modal>
      </>
  );
}

export default CreateProductModal;