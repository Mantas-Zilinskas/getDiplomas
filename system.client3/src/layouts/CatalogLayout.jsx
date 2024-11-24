import SideBar from '../components/SideBar'
import Header from '../components/Header'

export function CatalogLayout() {

    return (
        <>
            <SideBar name="Catalog" />
            <Header name="Catalog" />
            <div className="content">
                <h1>Im Catalog</h1>
            </div>
        </>
    );
}

export default CatalogLayout;