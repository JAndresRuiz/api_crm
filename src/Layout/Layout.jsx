import { Outlet, Link, useLocation } from "react-router-dom";
import "../Styles/Layout.css";

const Layout = () => {

    const location = useLocation();
    const actualURL = location.pathname;

  return (
    <div className="mainContainer">
      <div className="leftContainer">
          <h2 className="leftTitleContainer" >CRM - Clientes</h2>
          <nav className="navContainer">
              <Link to="/clientes" id={`${actualURL === '/clientes' ? 'inLink' : ''}`} >Editar Clientes</Link>
              <Link to="/clientes/nuevo" id={`${actualURL === '/clientes/nuevo' ? 'inLink' : ''}`}>Nuevo Cliente</Link>
          </nav>
      </div>
      <div className="rightContainer">
        <Outlet />
      </div>
    </div>
  );
};

export { Layout };
