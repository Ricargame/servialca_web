import React, { useState, useEffect, useContext } from "react";
import { ModalConfigurarUsuarios } from "./configuracion/configurarUsuario";
import { GestionarPreguntas } from "./configuracion/preguntasSeguridad";

function Header(props) {
  //  const { user, logout } = useContext(AuthContext);
  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(false);

  const [mostrarClave, setMostrarClave] = useState(false);

  //const [fechaSistema, setFechaSistema] = useState(
  //  JSON.parse(localStorage.getItem("fechasistema"))
  // );

  // const [usuario, setUsuario] = useState(
  //  JSON.parse(localStorage.getItem("login"))
  //);

  let el;
  function menuclick() {
    /*   props.onCambiar("inicio"); */
    if ((el = document.getElementById("wrapper"))) {
      el.classList.toggle("toggled");
    }
  }

  return (
    <nav
      className="col-md-12 navbar2 navbar-expand-lg d-flex align-items-center navbar-light bg-light d-flex justify-content-between"
      style={{ height: "70px" }}
    >
      <div className="mx-2 ">
        <a
          onClick={menuclick}
          className="img-fluid logo-nav text-light"
          style={{ height: "50px", width: "180px" }}
          type="button"
        >
          <i
            className="fas fa-bars fa-2x"
            style={{ marginTop: "10px", marginLeft: "10px" }}
          ></i>
        </a>
      </div>

      {/* <div className="col-5 d-flex justify-content-end ">
        <div class=" dropstart">
          <button
            type="button"
            class="btn btn-secondary rounded-circle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fas fa-user-cog"></i>
          </button>
          <ul class="dropdown-menu">
            <li>
              <a
                class="dropdown-item"
                type="button"
                onClick={() => {
                  setMostrar2(true);
                }}
              >
                Preguntas de Seguridad
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                type="button"
                onClick={() => {
                  setMostrar(true);
                }}
              >
                Configuracion de Ususario
              </a>
            </li>
          </ul>
        </div>

      </div> */}

      <GestionarPreguntas
        show={mostrar2}
        llamado={2}
        onHideCancela={() => {
          setMostrar2(false);
        }}
      />

      <ModalConfigurarUsuarios
        show={mostrar}
        onHideCancela={() => {
          setMostrar(false);
        }}
      />
    </nav>
  );
}

export default Header;
