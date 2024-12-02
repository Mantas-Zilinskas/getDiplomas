import "../styles/HeaderStyle.css"

function Header({name}) {

    return (
        <div className="headers">
            <h2>{name}</h2>
        </div>
    );
}

export default Header;