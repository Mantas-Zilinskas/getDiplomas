import SideBar from '../components/SideBar'
import Header from '../components/Header'

export function TaxesLayout() {

    return (
        <>
            <SideBar name="Taxes" />
            <Header name="Taxes" />
            <div className="content">
                <h1>Im Taxes</h1>
            </div>
        </>
    );
}

export default TaxesLayout