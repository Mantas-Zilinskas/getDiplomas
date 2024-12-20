import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Product from '../components/Product'
import {useEffect, useState, useContext} from 'react'
import { getProducts } from '../api/ProductsApi'
import OrderCreationSidePanel from '../components/OrderCreationSidePanel'
import AddProduct from '../components/AddProduct'
import {ProductContext} from '../App'

export function CatalogLayout() {
    const { products, setProducts } = useContext(ProductContext);
    const [orderItems, setOrderItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getProducts().then((data) => setProducts(data)).then(()=>setIsLoaded(true));
    }, []);

    return (
        <>
            <SideBar name="Catalog" />
            <Header name="Catalog" />
            <OrderCreationSidePanel items={orderItems} setItems={setOrderItems} />
            <div className="catalogContent">
                <h1>Im Catalog</h1>
                {isLoaded
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
                {isLoaded
                ?
                    <AddProduct/>
                :(null)}
            </div>
        </>
    );
}

export default CatalogLayout;