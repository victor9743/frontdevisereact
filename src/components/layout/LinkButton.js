import { Link } from "react-router-dom";

function LinkButton({rota, texto, classe}) {
    let classeButton = `btn btn-${classe}`;
    return (
        <Link className={classeButton} to={rota}>{texto}</Link>
    )
}

export default LinkButton;