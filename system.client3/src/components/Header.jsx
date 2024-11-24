import "../styles/HeaderStyle.css"

function Header({name}) {

    return (
        <div className="container">
            <h2>{name}</h2>
        </div>
    );
}

export default Header;