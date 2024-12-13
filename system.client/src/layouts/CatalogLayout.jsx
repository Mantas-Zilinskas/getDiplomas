import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Product from '../components/Product'
import {useEffect, useState} from 'react'
import { getProducts } from '../api/ProductsApi'
import OrderCreationSidePanel from '../components/OrderCreationSidePanel'
import AddProduct from '../components/AddProduct'

export function CatalogLayout() {
    const [products, setProducts] = useState(null)
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        let response = getProducts().then((data) => setProducts(data));
    }, []);

    return (
        <>
            <SideBar name="Catalog" />
            <Header name="Catalog" />
            <OrderCreationSidePanel items={orderItems} setItems={setOrderItems} />
            <div className="catalogContent">
                <h1>Im Catalog</h1>
                {products != null
                ?
                    products.map((product) => (
                        <Product
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            list={orderItems}
                            setList={setOrderItems}
                            products={products}
                            setProducts={setProducts}/>))
                :
                    (<h2>Loading Please wait</h2>)}
                {products != null
                ?
                    <AddProduct products={products} setProducts={setProducts} />
                :(null)}
            </div>
        </>
    );
}

export default CatalogLayout;