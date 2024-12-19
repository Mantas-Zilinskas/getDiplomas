import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Product from '../components/Product'
import { useEffect, useState, useContext } from 'react'
import { getProducts } from '../api/ProductsApi'
import OrderEditingSidePanel from '../components/OrderEditingSidePanel'
import { useLocation } from "react-router-dom";
import AddProduct from '../components/AddProduct'
import { ProductContext } from '../App'

export function EditOrderLayout() {
    const location = useLocation();
    const { orderId } = location.state || {};
    const { products, setProducts } = useContext(ProductContext);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        getProducts().then((data) => setProducts(data));
    }, []);

    return (
        <>
            <SideBar name="Catalog" />
            <Header name="Edit Order" />
            <OrderEditingSidePanel items={orderItems} setItems={setOrderItems} orderId={orderId}/>
            <div className="catalogContent">
                <h1>Im Order Editing Catalog</h1>
                {products != null
                    ?
                    products.map((product) => (
                        <Product
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            list={orderItems}
                            setList={setOrderItems} />
                    ))
                    :
                    (<h2>Loading Please wait</h2>)}
                {products != null
                    ?
                    <AddProduct />
                    : (null)}
            </div>
        </>
    );
}

export default EditOrderLayout;