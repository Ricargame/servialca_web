import React, { useEffect, useContext, useState, useRef } from "react";
import { AuthContext } from "../context/auth";

import useTableScroll from "../components/useTableScroll2";

import { Mensaje } from "../components/mensajes";
import { Loader, Dimmer } from "semantic-ui-react";
import moment from "moment";
/*import logo from "../../public/mdb/img/mdb-favicon.ico";
 */ import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import useTable from "../components/useTable";
import { TableBody, TableRow, TableCell, Checkbox } from "@material-ui/core";

import { ModalCertificadoMedico } from "../components/administracion/modalCertificado";
import { ModalRcv } from "../components/administracion/modalRcv";
import { ModalImprimir } from "../components/administracion/modalImprimir";
import { ModalLicencia } from "../components/administracion/modalLicencia";
import { ModalConsultarPoliza } from "../components/administracion/modalConsultarPoliza";
import { ModalRenovarPoliza } from "../components/administracion/modalRenovar";
import { formatMoneda, validaMonto, formatoMonto } from "../util/varios";
import { GestionarPreguntas } from "../components/configuracion/preguntasSeguridad";

function Inicio2() {
  var op = require("../modulos/datos");
  let token = localStorage.getItem("jwtToken");
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const Desde = useRef();
  const Hasta = useRef();
  const [activate, setActivate] = useState(false);
  const [mensaje, setMensaje] = useState({
    mostrar: false,
    titulo: "",
    texto: "",
    icono: "",
  });

  const headCells = [
    {
      label: "N° Contrato",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Fecha Vencimiento",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "C.I/R.I.F.",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Benefeciario",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },

    {
      label: "Telefono",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Placa",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Acesor",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Sucursal",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },

    {
      label: "Opciones",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
  ];

  const BCV = JSON.parse(localStorage.getItem("dolarbcv"));
  const txtDolar = useRef();
  const txtBs = useRef();
  const dolar = useRef();
  const contrato = useRef();
  const calcular = () => {
    const cantidadDolares = parseFloat(txtDolar.current.value);
    const precio = parseFloat(dolar.current.value);
    if (!isNaN(cantidadDolares) && !isNaN(precio)) {
      const total = cantidadDolares * precio;
      txtBs.current.value = total.toFixed(2).replace(".", ",");
    } else {
      txtBs.current.value = "0,00";
    }
  };
  const calcular2 = () => {
    const cantidadBsStr = txtBs.current.value.replace(",", "."); // Reemplaza la coma por punto
    const cantidadBs = parseFloat(cantidadBsStr);
    const precioDolar = parseFloat(dolar.current.value);

    if (!isNaN(cantidadBs) && !isNaN(precioDolar) && precioDolar !== 0) {
      const totalDolares = cantidadBs / precioDolar;
      txtDolar.current.value = totalDolares.toFixed(2).replace(".", ",");
    } else {
      txtDolar.current.value = "0,00";
    }
  };

  const handleInputMontoChange = (event) => {
    validaMonto(event);
    if (event.which === 13 || typeof event.which === "undefined") {
      if (
        event.target.value === "" ||
        parseFloat(
          event.target.value.trim().replace(".", "").replace(",", ".")
        ) === 0.0
      ) {
        event.target.value = "0,00";
      }
      event.target.value = formatoMonto(event.target.value);
      let char1 = event.target.value.substring(0, 1);
      let char2 = event.target.value.substring(1, 2);
      if (char1 === "0" && char2 !== ",") {
        event.target.value = event.target.value.substring(
          1,
          event.target.value.legth
        );
      }
    } else if (event.which === 46) {
      return false;
    } else if (event.which >= 48 && event.which <= 57) {
      return true;
    } else if (event.which === 8 || event.which === 0 || event.which === 44) {
      return true;
    } else return false;
  };

  const { user } = useContext(AuthContext);
  let permisos = JSON.parse(localStorage.getItem("permisos"));

  const [poliza, setPoliza] = useState();

  const [operacion, setOperacion] = useState();
  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(false);
  const [mostrar3, setMostrar3] = useState(false);
  const [mostrar4, setMostrar4] = useState(false);
  const [mostrar5, setMostrar5] = useState(false);
  const [mostrar6, setMostrar6] = useState(false);
  const [mostrar7, setMostrar7] = useState(false);
  const [opPreguntas, setOpPreguntas] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [idCliente, setIdCliente] = useState();

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [records, setRecords] = useState([
    {
      idproducto: "",
      codigo: "",
      cantidad: "",
      producto: "",
      precio: "",
      iva: "",
      motoiva: "",
      descuento: "",
      total: "",
    },
  ]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes ",
    "Sabado",
    "Domingo",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Miembros",
        data: [12, 4, 34, 54, 7, 12, 78],
        backgroundColor: "rgb(149, 187, 227)",
      },
    ],
  };
  const { TblContainer, TblHead, recordsAfterPagingAndSorting, TblPagination } =
    useTable(records, headCells, filterFn);
  const guardaPrecioDolar = async () => {
    let endpoint = op.conexion + "/moneda/guardar";
    setActivate(true);
    let bodyF = new FormData();
    bodyF.append("Precio", dolar.current.value);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto: "Precio del Dolar Actualizado",
          icono: "Success",
        })
      })
      .catch((error) =>
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto: error.res,
          icono: "informacion",
        })
      );
  }
  const buscarPrecio = async () => {
    let endpoint = op.conexion + "/moneda/ConsultarTodos";
    setActivate(true);
    await fetch(endpoint, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        dolar.current.value = response[0].dolar_monto
      })
      .catch((error) =>
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto: error.res,
          icono: "informacion",
        })
      );
  }
  const eliminarRcv = async () => {
    let endpoint = op.conexion + "/ladilla/eliminarRCv?id=" + contrato.current.value;
    setActivate(true);
    await fetch(endpoint, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto: "RCV Eliminado",
          icono: "informacion",
        })
      })
      .catch((error) =>
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto: error.res,
          icono: "informacion",
        })
      );
  }
  const selecionarRegistros = async () => {
    let endpoint = op.conexion + "/poliza/ConsultarVencer";
    console.log(endpoint);
    setActivate(true);

    //setLoading(false);

    let bodyF = new FormData();

    bodyF.append("ID", user_id);
    bodyF.append("Desde", Desde.current.value);
    bodyF.append("Hasta", Hasta.current.value);

    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setRecords(response);
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

  const clientVip = async (id) => {
    let endpoint = op.conexion + "/poliza/ConsultarVencer";
    console.log(endpoint);
    setActivate(true);

    //setLoading(false);

    let bodyF = new FormData();

    bodyF.append("ID", user_id);
    bodyF.append("Desde", Desde.current.value);
    bodyF.append("Hasta", Hasta.current.value);

    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        console.log(response);
        setRecords(response);
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

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) => {
            if (
              (x.cliente_cedula !== null
                ? x.cliente_cedula.toLowerCase().includes(target.value)
                : 0) ||
              (x.cliente_nombre !== null
                ? x.cliente_nombre
                    .toLowerCase()
                    .includes(target.value.toLowerCase())
                : "") ||
              (x.cliente_apellido !== null
                ? x.cliente_apellido
                    .toLowerCase()
                    .includes(target.value.toLowerCase())
                : "") ||
              (x.cliente_telefono !== null
                ? x.cliente_telefono.includes(target.value)
                : "") ||
              (x.vehiculo_placa !== null
                ? x.vehiculo_placa.toLowerCase().includes(target.value)
                : "") ||
              (x.usuario_nombre !== null
                ? x.usuario_nombre.toLowerCase().includes(target.value)
                : "") ||
              (x.poliza_id !== null
                ? String(x.poliza_id).includes(target.value)
                : "") ||
              (x.sucursal_nombre !== null
                ? x.sucursal_nombre.toLowerCase().includes(target.value)
                : "")
            ) {
              return x;
            }
          });
      },
    });
  };

  useEffect(() => {
    // Obtener la fecha actual
    const fechaActual = new Date();
    // Obtener la fecha actual + 30 días
    const fechaDesde = new Date(fechaActual);
    fechaDesde.setDate(fechaDesde.getDate() + 30);
    // Formatear las fechas en formato "YYYY-MM-DD"
    const fechaActualFormateada = fechaActual.toISOString().split("T")[0];
    const fechaDesdeFormateada = fechaDesde.toISOString().split("T")[0];
    // Asignar las fechas a los campos de entrada
    Desde.current.value = fechaActualFormateada;
    Hasta.current.value = fechaDesdeFormateada;
    selecionarRegistros();
    cantidadContrato();
    buscarPrecio();
  }, []);

  const regPre = () => {
    setMostrar(true);
    setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
  };
  const changeVip = async (id) => {
    let endpoint = op.conexion + "/ladilla/update";
    setActivate(true);

    let bodyF = new FormData();
    bodyF.append("id", id);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    });
    selecionarRegistros();
  };
  const gestionarBanco = (op, id) => (e) => {
    e.preventDefault();
    setIdCliente(id);
    setOperacion(op);
    if (op === 1) {
      setMostrar5(true);
    }
    if (op === 2) {
      setMostrar2(true);
      setIdCliente(id);
      setPoliza(id);
    }
    if (op === 3) {
      setMostrar2(true);
      setIdCliente(id);
      setPoliza(id);
    } else if (op === 6) {
      changeVip(id);
    }
  };
  const gestionarRcv = (opcion) => (e) => {
    e.preventDefault();
    console.log(opcion);

    if (opcion === 2) {
      setMostrar(true);
    } else if (opcion === 1) {
      setOperacion(1);
      setMostrar2(true);
    } else {
      setMostrar4(true);
    }
  };

  const imprimirCertificado = (id) => {
    setIdCliente(id);
    console.log(id);
    setMostrar2(false);
    setMostrar3(true);
  };

  const datisPersona = async () => {
    let endpoint = op.conexion + "/Auth/get_preguntas_from_user";
    console.log(endpoint);
    setActivate(true);

    //setLoading(false);
    let username = JSON.parse(localStorage.getItem("username"));

    let bodyF = new FormData();

    bodyF.append("Usuario", username.toUpperCase().toString());

    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response.res);
        if (response.res === "No hay registros disponibles") {
          setMostrar7(true);
          setOpPreguntas(1);
        }
        setActivate(false);
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

  const cantidadContrato = async () => {
    let endpoint = op.conexion + "/ladilla/cantidad";
    setActivate(true);
    await fetch(endpoint, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setCantidad(response.max_poliza_id);
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
  const imrpimirServicio = async (e) => {
    e.preventDefault();
    window.open(`${op.conexion}/reporte/reporteServicio?ID=${user_id}`);
  }
  return (
    <div className="col-md-12 mx-auto p-2">
      <GestionarPreguntas
        operacion={1}
        show={mostrar7}
        llamado={opPreguntas}
        onHideCancela={() => {
          setMostrar7(false);
        }}
      />

      <ModalCertificadoMedico
        //es show sirve para abrir el modal con setVariable cambias el valor de la variable de estado estado true abre el modal false lo cierra
        show={mostrar}
        onHideCancela={() => {
          setMostrar(false);
        }}
      />

      <ModalRcv
        operacion={operacion}
        show={mostrar2}
        onHideCancela={() => {
          setMostrar2(false);
        }}
        onHideCancela2={imprimirCertificado}
        idCliente={idCliente}
        poliza={poliza}
      />

      <ModalImprimir
        show={mostrar3}
        onHideCancela={() => {
          setMostrar3(false);
        }}
        idCliente={idCliente}
      />
      <ModalConsultarPoliza
        show={mostrar5}
        onHideCancela={() => {
          setMostrar5(false);
        }}
        idCliente={idCliente}
      />
      <ModalRenovarPoliza
        show={mostrar6}
        onHideCancela={() => {
          setMostrar6(false);
        }}
        idCliente={idCliente}
      />

      <ModalLicencia
        show={mostrar4}
        onHideCancela={() => {
          setMostrar4(false);
        }}
        idCliente={idCliente}
      />
      {<div className="col-12">
        {user_id == 57 && (
          <div className="col-12 row d-flex justify-content-end py-2 mt-5 mb-3">
            <div className="input-group input-group-sm col-md-2 my-auto">
              <span
                className="input-group-text bg-transparent border-0 fw-bold text-light"
                id="inputGroup-sizing-sm"
              >
                Precio del $:
              </span>

              <input
                type="text"
                className="form-control bg-transparent text-light text-right"
                ref={dolar}
                aria-label="Sizing example input"
                placeholder="BS"
                aria-describedby="inputGroup-sizing-sm"
              />

              <button onClick={guardaPrecioDolar}>
                Guardar
              </button>
            </div>
          </div>
        )}
      </div>}
      <div className="col-12">
        <div className="col-12 row d-flex justify-content-between py-2 mt-5 mb-3">
          <h2 className=" col-3 text-light">RCV QUE ESTAN POR VENCER</h2>
          {user_id == 57 && (
            <h2 className="col-3 text-light">
            Cantidad de contratos:{" "}
            <span style={{ color: "red" }}>{cantidad}</span>
            </h2>
          )}
          {user_id == 57 && (
            <div class="input-group input-group-sm col-md-2 my-auto">
            <span
                class="input-group-text bg-transparent border-0 fw-bold text-light"
                id="inputGroup-sizing-sm"
              >
                N de Contrato
              </span>
              <input
                type="text"
                class="form-control bg-transparent text-light text-right"
                ref={contrato}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
              <button
                className="col-md-4 mb-2 form-control"
                onClick={eliminarRcv}
              >Eliminar</button>
          </div>
          )}
          <div class="input-group input-group-sm col-md-4 my-auto">
            <span
              class="input-group-text bg-transparent border-0 fw-bold text-light"
              id="inputGroup-sizing-sm"
            >
              Calcular $:
            </span>
            <input
              type="text"
              class="form-control bg-transparent text-light text-right"
              onChange={calcular}
              ref={txtDolar}
              aria-label="Sizing example input"
              placeholder="$"
              aria-describedby="inputGroup-sizing-sm"
            />
            <span
              class="input-group-text bg-transparent border-0 fw-bold text-light"
              id="inputGroup-sizing-sm"
            >
              Calcular BS:
            </span>
            <input
              type="text"
              class="form-control bg-transparent text-light text-right"
              ref={txtBs}
              onChange={calcular2}
              aria-label="Sizing example input"
              placeholder="BS"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
      </div>
      <div
        className="col-md-12 bg-light py-2 rounded"
        style={{ margin: "auto" }}
      >
        <div className="row col-12 d-flex justify-content-between mb-2">
          <input
            type="text"
            className=" col-md-3 mb-2 form-control form-control-sm rounded-pill"
            onChange={handleSearch}
            placeholder="Buscar"
          />

          <input
            type="date"
            ref={Desde}
            className="col-md-2 mb-2 form-control"
          />
          <input
            type="date"
            ref={Hasta}
            className="col-md-2 mb-2 form-control"
          />
          <button
            className="col-md-2 mb-2 form-control"
            onClick={selecionarRegistros}
          >
            Buscar
          </button>
          <div className="col-md-6 offset-md-3 d-flex justify-content-center">
            {/* {permisos &&
              permisos.length >= 3 &&
              permisos.toString().substring(19, 20) === "1" && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm mx-2 my-2"
                  onClick={gestionarRcv(3)}
                >
                  <i className="fa fa-plus"></i> Licencia
                </button>
              )} */}

            {/* {permisos &&
              permisos.length >= 3 &&
              permisos.toString().substring(16, 17) === "1" && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm mx-2 my-2"
                  onClick={gestionarRcv(2)}
                >
                  <i className="fa fa-plus"></i> Certificado Médico
                </button>
              )} */}

            <button
              type="button"
              className="btn btn-primary btn-sm mx-2 my-2"
              onClick={gestionarRcv(1)}
            >
              <i className="fa fa-plus"></i> Crear RCV
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm mx-2 my-2"
              onClick={imrpimirServicio}
            >
              <i className="fa fa-plus"></i> Imprimir Contrato De Servicio
            </button>
          </div>
        </div>
        <TblContainer>
          <TblHead />
          <TableBody>
            {records && records.length > 0 && records != [] &&
              recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow
                  key={index}
                  style={{
                    padding: "0",
                    backgroundColor:
                      item.vip == 1
                        ? "red"
                        : item.vip == 2
                        ? "green"
                        : "inherit",
                  }}
                >
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.poliza_id}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {moment(item.poliza_fechaVencimiento).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.cliente_cedula}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.cliente_nombre + " " + item.cliente_apellido}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.cliente_telefono}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.vehiculo_placa}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.usuario_nombre}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.sucursal_nombre}
                  </TableCell>

                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    <button
                      onClick={gestionarBanco(1, item.poliza_id)}
                      className="btn btn-sm mx-3 btn-info rounded-circle"
                    >
                      <i className="fas fa-eye"></i>{" "}
                    </button>
                    {user_id == 57 && (
                      <button
                        onClick={gestionarBanco(2, item.poliza_id)}
                        className="btn btn-sm mx-1 btn-warning rounded-circle"
                      >
                        <i className="fa fa-edit"></i>{" "}
                      </button>
                    )}

                    <button
                      onClick={gestionarBanco(3, item.poliza_id)}
                      className="btn btn-sm mx-1 btn-danger rounded-circle"
                    >
                      {" "}
                      <i className="fa fa-sync"></i>{" "}
                    </button>
                    <button
                      onClick={gestionarBanco(6, item.poliza_id)}
                      className={`btn btn-sm mx-1 ${
                        item.vip == 1
                          ? "btn-danger"
                          : item.vip == 2
                          ? "btn-success"
                          : "btn-warning"
                      } rounded-circle`}
                    ></button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </div>

      <Dimmer active={activate} inverted>
        <Loader inverted>cargando...</Loader>
      </Dimmer>
      <Mensaje
        mensaje={mensaje}
        onHide={() =>
          mensaje.texto ===
          "Este Usuario No posee preguntas de seguridad debe registrarlas"
            ? regPre()
            : setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" })
        }
      />
    </div>
  );
}

export default Inicio2;
const formatDate = (dateString) => {
  // Usa moment.js para formatear la fecha
  return moment(dateString).format("DD-MM-YYYY"); // Formato "día-mes-año"
};
