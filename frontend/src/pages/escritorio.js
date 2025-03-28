import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import axios from "axios";
import Footers from "../pages/foothers";
import AuthRoute from "../util/AuthRoute";
import Inicio2 from "./inicio2";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Mensaje2 } from "../components/mensajes";
import Inicio from "./inicio";
import MenuNuevo from "./menuNuevo";

import logo from "../imagenes/logo1.png";
import moment from "moment";
import TablaContratosRealizados from "../components/administracion/tablaContratosRealizados";
import TablaSursales from "../components/administracion/tablaSucursales";
import TablaTipoContratos from "../components/administracion/tablaTipoContrato";
import TablaUsoVehiculo from "../components/DatosVehiculo/tablaUsoVehiculo";
import TablaClaseVehiculo from "../components/DatosVehiculo/tablaClaseVehiculo";
import TablaTransporte from "../components/DatosVehiculo/tablaTransporte";
import TablaUsuarios from "../components/datosUsuario/tablaUsuarios";
import TablaRoles from "../components/datosUsuario/tablaRoles";
import TablaCertificado from "../components/medico/tablaCertificado";
import TablaClumpeaneros from "../components/cumpleaneros/tablaCumpleaneros";
import GraficosIngresos from "../components/graficas/graficaIngresoEgreso";
import TablaTipoVehiculo from "../components/DatosVehiculo/tablaTipoVehiculo";
import TablaReportes from "../components/reportesPorqueria/reportesGeneral";
import TablaMorosos from "../components/administracion/tablaMorosos";
import TablaTipoVehiculoBocono from "../components/DatosVehiculo/tablaTipoVehiculoBocono";
import TablaLicencia from "../components/licencia/tablaLicencia";
import TablaDocumento from "../components/administracion/tablaDocumento";
import TablaGastos from "../components/gastosPersonales/tablaGastos";
import TablaInventario from "../components/inventario/tablaInventario";
import Panel from "./panel";
import TablaPrecio from "../components/listaPrecios/tablaPrecios";
import TablaLicencias from "../components/administracion/tablaLicencia";
import PageChats from "../components/chat/chats";
import ReportesSemanal from "../components/reportesPorqueria/resportes";
import TablaBitacora from "../components/bitacora/tablaBitacora";
import ReportesAsesor from "../components/reportesPorqueria/reportesAsesor";
import TablaHotel from "../components/hotel/tablaHotel";
import TablaHotelGeneral from "../components/hotel/tablaHotelGeneral";
import Reporte from "../components/reportesPorqueria/resportes";
import ReporteHotel from "../components/hotel/reporteHote";
import TablaBot from "../components/bot/tablaBot";
import TablaNivel from "../components/administracion/tablaNivel";
import zona from "../components/administracion/tablaZona"
import pagos from "../components/administracion/tablaPagos"
import tablaBasico from "../components/DatosVehiculo/tablaBasico"
import tablaRTC from "../components/DatosVehiculo/tablaRTC"
import deudores from "../components/administracion/tablaDeudores"
function MenuImpuestoPP(props) {
  //let token = localStorage.getItem("jwtToken");
  //let op = require("../modulos/datos");
  //const { user, logout } = useContext(AuthContext);
  var op = require("../modulos/datos");
  const pathname = window.location.pathname;
  const [allIglesias, setAllIglesias] = useState([]);
  const sucursal = JSON.parse(localStorage.getItem("sucursal"));
  const username = JSON.parse(localStorage.getItem("username"));

  const [path, setPath] = useState(pathname.substr(1));
  const [mostrar2, setMostrar2] = useState(false);
  const [activate, setActivate] = useState(false);
  const [hamburguesa, setHamburguesa] = useState(
    "hamburger animated fadeInLeft is-closed"
  );
  const [wrapper, setWrapper] = useState("");
  const [overlay, setOverlay] = useState("overlay");
  const [sidebarM, setSidebarM] = useState("oculto");

  const [mensaje, setMensaje] = useState({
    mostrar: false,
    titulo: "",
    texto: "",
  });
  const [titulo, setTitulo] = useState();

  const cambiar = (c) => {
    setPath(c);
    setTitulo(c);
  };

  /*const seleccionaRegistrosIglesias = () => {
  
  
    let campos = '*, trim(codzona) as codzona ';
    let nomtab = "iglesia";
    let orden = "idiglesia";
    let id = codigo ;
    let condi = "codzona = '" + id + "'";
  
  
    let endpoint =
      op.conexion +
      `/api/consulta/selecionarregistrocondi?campos=${campos}&nomtab=${nomtab}&condi=${condi}&orden=${orden}`;
    console.log(endpoint)
  
  
   
    axios.get(endpoint, {
      headers: {
        'x-access-token': `${token}`
      }
    }).then(function (response) {
      if (response.status === 200) {
        setAllIglesias(response.data)
        console.log(response.data)
       setActivate(false);
      }
    }).catch(function (error) {
      setMensaje({mostrar: true, titulo:'Error', texto: error.response.data.message, icono: 'error'});
    })
  };*/
  const idUser = JSON.parse(localStorage.getItem("user_id"));
  let permisos = JSON.parse(localStorage.getItem("permisos"));
  console.log(permisos);
  // permisos = permisos.map((item) =>
  //   item.replace(" ", "").replace(" ", "").replace("de", "").toLowerCase()
  // );

  console.log(permisos);
  console.log(pathname.substring(0, 4));
  {
    /* const menu = user ? (*/
  }

  let el;

  const bloquear2 = () => (e) => {
    console.log("hola");

    /*  setTituloNav(titulo); */
    /*     props.onCambiar(titulo); */
    if ((el = document.getElementById("wrapper"))) {
      el.classList.toggle("");
      /* if ((ele = document.getElementById("menu-toggle"))) {
        ele.classList.toggle("bloquear");
      } */
    }
  };
  const bloquear = (e) => {
    e.preventDefault();

    e.preventDefault();
    if (sidebarM === "oculto") {
      setWrapper("toggled");
      setHamburguesa("hamburger animated fadeInLeft is-open");
      setSidebarM("visto");
    } else {
      setWrapper("");
      setHamburguesa("hamburger animated fadeInLeft is-closed");
      setSidebarM("oculto");
    }
  };

  const selecionarDolar = async (id) => {
    //let endpoint = "https://api.exchangedyn.com/markets/quotes/usdves/bcv";
    let endpoint = op.conexion + "/moneda/ConsultarTodos";
    console.log(endpoint);
    setActivate(true);

    await fetch(endpoint, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);

        // localStorage.setItem(
        //   "dolarbcv",
        //   JSON.stringify(parseFloat(response.sources.BCV.quote))
        // );
        localStorage.setItem(
          "dolarbcv",
          JSON.stringify(parseFloat(response[0].dolar_monto))
        );
        // txtDescripcion.current.value = response.clase_nombre;
        //  setValues(response);
      })
      .catch((error) =>
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto: error.res,
          icono: "informacion",
        })
      );
  };
  useEffect(() => {
    selecionarDolar();
  }, []);

  return (
    <div>
      <div className="d-flex bg-dark" id="wrapper">
        <div id="page-content-wrapper">
          <div className="d-flex justify-content-between">
            {/* <Sidebar onCambiar={cambiar} />*/}
            <div id="sidebar-wrapper">
              <div className="sidebar-heading text-center  bluez-text fs-4 fw-bold text-uppercase border-bottom">
                <div className="row mx-auto">
                  <img className="mx-auto" style={{ width: 190 }} src={logo} />
                </div>
                {/* <h5 className="m-0 second-text text-light mt-3">{sucursal}</h5>
                <h5 className="m-0 second-text text-light">{username}</h5> */}
                <h5 className="m-0 second-text text-light">
                  {moment().format("DD-MM-YYYY")}
                </h5>
              </div>
              <div className="list-group list-group-flush mx-3 mt-4 px-0">
                <a
                  href="/inicio"
                  className="list-group-item list-group-item-action py-2 ripple active rounded"
                  aria-current="true"
                >
                  <i className="fas fa-tachometer-alt fa-fw me-1" />
                  <span>Inicio</span>
                </a>
                <div className="accordion  px-0 border-0" id="accordionExample">
                  {idUser == 57 && (
                    <>
                      <div className="accordion-item px-0">
                        <h2 className="accordion-header" id="heading3">
                          <button
                            className="accordion-button text-light"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse9"
                            aria-expanded="false"
                            aria-controls="collapse9"
                          >
                            <i className="fas fa-hotel fa-fw me-1"></i>
                            <span>Hotel</span>
                          </button>
                        </h2>
                        <div
                          id="collapse9"
                          className="accordion-collapse collapse list-group-item-action"
                          aria-labelledby="heading9"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body py-0 list-group px-0">
                            <a
                              href="/hotel"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i className="fas fa-bed fa-fw me-1"></i>
                              <span>Habitaciones ocupadas</span>
                            </a>
                          </div>
                          <div className="accordion-body py-0 list-group px-0">
                            <a
                              href="/hotelGeneral"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i className="fas fa-bed fa-fw me-1"></i>
                              <span>Lista de ocupantes</span>
                            </a>
                          </div>
                          <div className="accordion-body py-0 list-group px-0">
                            <a
                              href="/hotelReporte"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i className="fas fa-bed fa-fw me-1"></i>
                              <span>Reporte</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {idUser == 57 && (
                    <>
                      <div className="accordion-item px-0">
                        {/* <h2 className="accordion-header" id="heading3">
                          <button
                            className="accordion-button text-light"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse10"
                            aria-expanded="false"
                            aria-controls="collapse10"
                          >
                            <i className="fas fa-robot  fa-fw me-1"></i>
                            <span>Nuevo Reporte</span>
                          </button>
                        </h2> */}
                        <div
                          id="collapse10"
                          className="accordion-collapse collapse list-group-item-action"
                          aria-labelledby="heading9"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body py-0 list-group px-0">
                            <a
                              href="/tablaBot"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i className="fas "></i>
                              <span>Contratos por realizar</span>
                            </a>
                          </div>
                          {/* <div className="accordion-body py-0 list-group px-0">
                            <a
                              href="/ImagenBot"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i className="fas fa-bed fa-fw me-1"></i>
                              <span>Imagen</span>
                            </a>
                          </div> */}
                        </div>
                      </div>
                    </>
                  )}
                  {/* {permisos.includes("contratosrealizados") || permisos.includes("listasucursales") || permisos.includes("tipocontratos") && */}
                  <div className="accordion-item  px-0">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button text-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                      >
                        <i class="fas fa-fw me-1 fa-user-shield"></i>

                        <span>Administración</span>
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse list-group-item-action"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body py-0 list-group px-0">
                        <a
                          href="/contratosrealizados"
                          className="list-group-item list-group-item-action py-2 ripple"
                        >
                          <i className="fas fas-fw me-1 fa-file-signature"></i>
                          <span>Contratos Realizados</span>
                        </a>

                        {permisos &&
                        permisos.length >= 3 &&
                        permisos.substring(0, 1) === "1" ? (
                          <a
                            href="/sucursales"
                            className="list-group-item list-group-item-action py-2 ripple"
                          >
                            <i className="fas fas-fw me-1 fa-map-signs"></i>
                            <span>Lista de Sucursales</span>
                          </a>
                        ) : null}

                        {permisos &&
                          permisos.length >= 3 &&
                          permisos.substring(2, 3) === "1" && (
                            <a
                              href="/tipocontratos"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i className="fas fas-fw me-1 fa-clipboard-list"></i>
                              <span>Tipos de Contratos</span>
                            </a>
                          )}
                          {idUser == 57 && (
                            <a
                              href="/pagos"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i className="fas fas-fw me-1 fa-clipboard-list"></i>
                              <span>Registrar Pago</span>
                            </a>
                          )}
                          {idUser == 57 && (
                            <a
                              href="/deudores"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i className="fas fas-fw me-1 fa-clipboard-list"></i>
                              <span>Lista de Deudores</span>
                            </a>
                          )}
                        {/* {idUser == 57 && (
                            <a
                              href="/zona"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i className="fas fas-fw me-1 fa-clipboard-list"></i>
                              <span>Zonas</span>
                            </a>
                          )} */}
                        {/* {permisos.substring(2, 3) === "1" && (
                          <a
                            href="/morosos"
                            className="list-group-item list-group-item-action py-2 ripple"
                          >
                            <i class="fas fas-fw me-1 fa-hand-holding-usd"></i>
                            <span>Listado de Morosos</span>
                          </a>
                        )} */}
                        {/* {permisos &&
                          permisos.length >= 3 &&
                          permisos.substring(3, 4) === "1" && (
                            <a
                              href="/documento"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i class="fas fas-fw me-1 fa-file-signature"></i>
                              <span>Documentos</span>
                            </a>
                          )} */}

                        {/* <a
                          href="/licencias"
                          className="list-group-item list-group-item-action py-2 ripple"
                        >
                          <i class="fas fas-fw me-1 fa-clipboard-list"></i>
                          <span>Licencias</span>
                        </a> */}
                        {/* {permisos &&
                          permisos.length >= 3 &&
                          permisos.substring(4, 5) === "1" && (
                            <a
                              href="/chats"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i class="fab fa-rocketchat fas-fw me-1"></i>
                              <span>Chats</span>
                            </a>
                          )} */}
                      </div>
                    </div>
                  </div>
                  {/* } */}
                  {typeof permisos === "string" &&
                  permisos.length >= 7 && // Verifica que permisos sea una cadena y tenga al menos longitud 7
                  (permisos.substring(5, 6) === "1" ||
                    permisos.substring(6, 7) === "1" ||
                    permisos.substring(7, 8) === "1" ||
                    permisos.substring(8, 9) === "1") ? (
                    <div className="accordion-item px-0">
                      <h2 className="accordion-header" id="heading2">
                        <button
                          className="accordion-button text-light"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse2"
                          aria-expanded="false"
                          aria-controls="collapse2"
                        >
                          <i class="fas fa-car fa-fw me-1"></i>
                          <span>Datos del Vehiculo</span>
                        </button>
                      </h2>
                      <div
                        id="collapse2"
                        className="accordion-collapse collapse list-group-item-action"
                        aria-labelledby="heading2"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body py-0 list-group px-0">
                          {permisos.substring(5, 6) === "1" && (
                            <a
                              href="/usovehiculo"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i class="fas fas-fw me-1 fa-file-contract"></i>
                              <span>Uso del Vehiculo</span>
                            </a>
                          )}

                          {permisos.substring(6, 7) === "1" && (
                            <a
                              href="/clasevehiculo"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i class="fas fas-fw me-1 fa-taxi"></i>
                              <span>Clases de Vehiculos</span>
                            </a>
                          )}

                          {permisos.substring(7, 8) === "1" && (
                            <a
                              href="/tipovehiculo"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i class="fas fas-fw me-1 fa-caravan"></i>
                              <span>Tipos de Vehiculos</span>
                            </a>
                          )}
                          {idUser == 57 && (
                            <a
                              href="/basico"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i class="fas fas-fw me-1 fa-caravan"></i>
                              <span>Precio de Basico</span>
                            </a>
                          )}
                          {idUser == 57 &&(
                            <a
                              href="/trc"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i class="fas fas-fw me-1 fa-caravan"></i>
                              <span>Precio de TRC</span>
                            </a>
                          )}
                          {/* {permisos.substring(8, 9) === "1" && (
                            <a
                              href="/tipovehiculobocono"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i class="fas fas-fw me-1 fa-shuttle-van"></i>
                              <span>Tipos de Vehiculos Bocono</span>
                            </a>
                          )} */}

                          {/* {permisos.substring(9, 10) === "1" && (
                            <a
                              href="/transporte"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i class="fas fas-fw me-1 fa-bus"></i>
                              <span>Lineas de Transporte</span>
                            </a>
                          )} */}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {idUser == 57 && ( // Verifica si tiene permisos de usuario o roles
                    <div className="accordion-item px-0">
                      <h2 className="accordion-header" id="heading3">
                        <button
                          className="accordion-button text-light"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse3"
                          aria-expanded="false"
                          aria-controls="collapse3"
                        >
                          <i class="fas fa-fw me-1 fa-server"></i>
                          <span>Datos de Usuario</span>
                        </button>
                      </h2>
                      <div
                        id="collapse3"
                        className="accordion-collapse collapse list-group-item-action"
                        aria-labelledby="heading3"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body py-0 list-group px-0">
                          {permisos.substring(10, 11) === "1" && (
                            <a
                              href="/usuarios"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i class="fas fa-users fs-fw me-1"></i>
                              <span>Usuarios</span>
                            </a>
                          )}

                          {permisos.substring(11, 12) === "1" && (
                            <a
                              href="/roles"
                              className="list-group-item list-group-item-action py-2 ripple"
                            >
                              <i class="fas fa-user-tag fs-fw me-1"></i>
                              <span>Roles</span>
                            </a>
                          )}

                          {/* Otro contenido relacionado con datos de usuario, si es necesario */}
                        </div>
                      </div>
                    </div>
                  )}
                  {typeof permisos === "string" &&
                  permisos.length >= 7 && // Verifica que permisos sea una cadena y tenga al menos longitud 7
                  (permisos.substring(12, 13) === "1" ||
                    permisos.substring(13, 14) === "1" ||
                    permisos.substring(14, 15) === "1" ||
                    permisos.substring(15, 16) === "1") ? (
                    <div className="accordion-item  px-0">
                      <h2 className="accordion-header" id="heading4">
                        <button
                          className="accordion-button text-light"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse4"
                          aria-expanded="false"
                          aria-controls="collapse4"
                        >
                          <i class="far fa-chart-bar fa-fw me-1"></i>

                          <span>Graficas</span>
                        </button>
                      </h2>
                      <div
                        id="collapse4"
                        className="accordion-collapse collapse list-group-item-action"
                        aria-labelledby="heading4"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body py-0 list-group px-0">
                          <a
                            href="/graficasingegre"
                            className="list-group-item list-group-item-action py-2 ripple"
                          >
                            <i class="fas fa-money-check-alt fa-fw me-1"></i>
                            <span>Grafica</span>
                          </a>
                          <a
                            href="/gastosPersonales"
                            className="list-group-item list-group-item-action py-2 ripple"
                          >
                            <i class="fas fa-money-check-alt fa-fw me-1"></i>
                            <span>Gastos personales</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                {permisos &&
                  permisos.length >= 3 &&
                  permisos.substring(16, 17) === "1" && (
                    <a
                      href="/certificadomedico"
                      className=" list-group-item list-group-item-action text-light bg-transparent py-2 px-3"
                    >
                      <i class="fas fa-prescription-bottle-alt fa-fw me-1"></i>

                      <span>Certificado Medico</span>
                    </a>
                  )}
                {permisos &&
                  permisos.length >= 3 &&
                  permisos.substring(17, 18) === "1" && (
                    <a
                      href="/reporteSemanal"
                      className=" list-group-item list-group-item-action text-light bg-transparent py-2 px-3"
                    >
                      <i className="fas fa-fw me-1 fa-print " />
                      <span>Reporte de Usuarios</span>
                    </a>
                  )}
                {permisos &&
                  permisos.length >= 3 &&
                  permisos.substring(18, 19) === "1" && (
                    <a
                      href="/reportesGeneral"
                      className=" list-group-item list-group-item-action text-light bg-transparent py-2 px-3"
                    >
                      <i className="fas fa-fw me-1 fa-print " />
                      <span>Reportes</span>
                    </a>
                  )}
                {permisos &&
                  permisos.length >= 3 &&
                  permisos.substring(19, 20) === "1" && (
                    <a
                      href="/licencia"
                      className=" list-group-item list-group-item-action text-light bg-transparent py-2 px-3"
                    >
                      <i class="fas fa-id-card fa-fw me-1"></i>

                      <span>Licencias</span>
                    </a>
                  )}

                <a
                  href="/cumpleaneros"
                  className=" list-group-item list-group-item-action text-light bg-transparent py-2 px-3"
                >
                  <i class="fas fa-birthday-cake  fa-fw me-1 "></i>

                  <span>Cumpleañeros</span>
                </a>
                {/* {permisos &&
                  permisos.length >= 3 &&
                  permisos.substring(19, 20) === "1" && (
                    <a
                      href="/panel"
                      className=" list-group-item list-group-item-action text-light bg-transparent py-2 px-3"
                    >
                      <i class="fas fa-fw me-1 fa-solar-panel"></i>

                      <span>Imagen</span>
                    </a>
                  )} */}
                <a
                  href="/listaPrecios"
                  className=" list-group-item list-group-item-action text-light bg-transparent py-2 px-3"
                >
                  <i class="fas fa-file-invoice-dollar fa-fw me-1"></i>

                  <span>Lista de precios</span>
                </a>
                {/* {permisos &&
                  permisos.length >= 3 &&
                  permisos.substring(20, 21) === "1" && (
                    <a
                      href="/bitacora"
                      className=" list-group-item list-group-item-action text-light bg-transparent py-2 px-3"
                    >
                      <i class="fas fa-file-invoice-dollar fa-fw me-1"></i>

                      <span>Bitacora</span>
                    </a>
                  )} */}
                {/* {permisos &&
                  permisos.length >= 3 &&
                  permisos.substring(21, 22) === "1" && (
                    <a
                      href="/reporteAsesor"
                      className=" list-group-item list-group-item-action text-light bg-transparent py-2 px-3"
                    >
                      <i className="fas fa-fw me-1 fa-print " />
                      <span>Reporte asesor</span>
                    </a>
                  )} */}
                {idUser != 57 && (
                  <a
                    href="/reporte"
                    className=" list-group-item list-group-item-action text-light bg-transparent py-2 px-3"
                  >
                    <i className="fas fa-fw me-1 fa-print " />
                    <span>Reportes</span>
                  </a>
                )}
                {/* {idUser == 57 && (
                  <a
                    href="/inventario"
                    className=" list-group-item list-group-item-action text-light bg-transparent py-2 px-3"
                  >
                    <i className="fas fa-fw me-1 fa-box" />
                    <span>Inventario</span>
                  </a>
                )}
                {idUser == 57 && (
                  <a
                    href="/documento"
                    className=" list-group-item list-group-item-action text-light bg-transparent py-2 px-3"
                  >
                    <i class="fas fas-fw me-1 fa-file-signature"></i>
                    <span>Documento</span>
                  </a>
                )} */}
                <a
                  href="/"
                  className="list-group-item list-group-item-action py-2 ripple"
                >
                  <i className="fas fa-power-off fa-fw me-1" />
                  <span>Salir</span>
                </a>
              </div>
            </div>
            <div className="w-100 h-100" id="scrol">
              <section>
                <Header onCambiar={cambiar} />
              </section>

              <AuthRoute exact path="/tablaBot" component={TablaBot} />
              <AuthRoute exact path="/hotelReporte" component={ReporteHotel} />
              <AuthRoute exact path="/reporte" component={Reporte} />
              <AuthRoute exact path="/hotel" component={TablaHotel} />
              <AuthRoute
                exact
                path="/hotelGeneral"
                component={TablaHotelGeneral}
              />
              <AuthRoute exact path="/inicio" component={Inicio2} />
              <AuthRoute
                exact
                path="/contratosrealizados"
                component={TablaContratosRealizados}
              />
              <AuthRoute exact path="/sucursales" component={TablaSursales} />
              <AuthRoute
                exact
                path="/tipocontratos"
                component={TablaTipoContratos}
              />
              <AuthRoute
                exact
                path="/zona"
                component={zona}
              />
              <AuthRoute
                exact
                path="/pagos"
                component={pagos}
              />
              <AuthRoute
                exact
                path="/deudores"
                component={deudores}
              />
              <AuthRoute
                exact
                path="/usovehiculo"
                component={TablaUsoVehiculo}
              />
              <AuthRoute
                exact
                path="/clasevehiculo"
                component={TablaClaseVehiculo}
              />
              <AuthRoute exact path="/transporte" component={TablaTransporte} />
              <AuthRoute exact path="/usuarios" component={TablaUsuarios} />
              <AuthRoute exact path="/roles" component={TablaRoles} />
              <AuthRoute
                exact
                path="/certificadomedico"
                component={TablaCertificado}
              />
              <AuthRoute
                exact
                path="/cumpleaneros"
                component={TablaClumpeaneros}
              />
              <AuthRoute
                exact
                path="/graficasingegre"
                component={GraficosIngresos}
              />
              <AuthRoute
                exact
                path="/tipovehiculo"
                component={TablaTipoVehiculo}
              />
              <AuthRoute
                exact
                path="/nivel"
                component={TablaNivel}
              />
              <AuthRoute 
                exact
                path="/basico"
                component={tablaBasico}
              />
              <AuthRoute 
                exact
                path="/trc"
                component={tablaRTC}
              />
              <AuthRoute
                exact
                path="/tipovehiculobocono"
                component={TablaTipoVehiculoBocono}
              />
              <AuthRoute exact path="/licencia" component={TablaLicencia} />
              <AuthRoute
                exact
                path="/reportesGeneral"
                component={TablaReportes}
              />
              <AuthRoute exact path="/bitacora" component={TablaBitacora} />
              <AuthRoute exact path="/morosos" component={TablaMorosos} />
              <AuthRoute exact path="/documento" component={TablaDocumento} />
              <AuthRoute exact path="/panel" component={Panel} />
              <AuthRoute exact path="/listaPrecios" component={TablaPrecio} />
              <AuthRoute exact path="/licencias" component={TablaLicencias} />
              <AuthRoute exact path="/chats" component={PageChats} />
              <AuthRoute
                exact
                path="/reporteAsesor"
                component={ReportesAsesor}
              />
              <AuthRoute
                exact
                path="/reporteSemanal"
                component={ReportesSemanal}
              />

              <AuthRoute
                exact
                path="/gastosPersonales"
                component={TablaGastos}
              />
              <AuthRoute
                exact
                path="/inventario"
                component={TablaInventario}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MenuImpuestoPP;
