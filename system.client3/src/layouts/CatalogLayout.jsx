import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Product from '../components/Product'
import {useEffect, useState} from 'React'
import { getProducts } from '../api/ProductsApi'
import OrderCreationSidePanel from '../components/OrderCreationSidePanel'

export function CatalogLayout() {
    const [products, setProducts] = useState(null)
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        getProducts().then((data)=>setProducts(data));
    }, []);

    return (
        <>
            <SideBar name="Catalog" />
            <Header name="Catalog" />
            <OrderCreationSidePanel items={orderItems} setItems={setOrderItems} />
            <div className="content">
                <h1>Im Catalog</h1>
                {products != null
                ?
                    products.map((product) => (
                        <Product
                            key={product.Id}
                            id={product.Id}
                            name={product.Name}
                            price={product.Price}
                            list={orderItems}
                            setList={setOrderItems} />))
                :
                    (<h2>Loading Please wait</h2>)}

                <button onClick={()=> console.log(products)}>check</button>

            </div>
        </>
    );
}

export default CatalogLayout;