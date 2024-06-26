import React, { useEffect, useRef, useContext, useState } from "react";

import { Mensaje } from "../mensajes";
import { Loader, Dimmer } from "semantic-ui-react";
import moment from "moment";

import axios from "axios";
import useTable from "../useTable";
import { TableBody, TableRow, TableCell } from "@material-ui/core";

import { formatMoneda, validaMonto, formatoMonto } from "../../util/varios";
import { ModalHotel } from "./modalHotel";
import { ModalNota } from "./modalNota";
import { ModalConsultaHotel } from "./modalConsultaHotel";
function TablaHotelGeneral(props) {
  var op = require("../../modulos/datos");
  let token = localStorage.getItem("jwtToken");
  const Desde = useRef();
  const Hasta = useRef();
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const [idLicencia, setIdLicencia] = useState();
  const [activate, setActivate] = useState(false);
  const [mensaje, setMensaje] = useState({
    mostrar: false,
    titulo: "",
    texto: "",
    icono: "",
  });

  console.log(user_id);
  const headCells = [
    {
      label: "Codigo",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "N° de habitación",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Nombre",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Apellido",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Cédula",
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
      label: "Fecha",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Hora de entrada",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Hora de salida",
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

  const codigo = JSON.parse(localStorage.getItem("codigo"));
  const permiso = JSON.parse(localStorage.getItem("permiso"));
  const [cuentas, setCuentas] = useState();
  const [montoCuenta, setMontoCuenta] = useState();
  const [nCuenta, setNCuenta] = useState();
  const [total, setTotal] = useState(0.0);
  const [totalp, setTotalp] = useState(0.0);
  const [totalpresu, setTotalpresu] = useState(0.0);
  const [totaltipo, setTotaltipo] = useState(0.0);
  const [presupuesto, setPresupuesto] = useState(0.0);
  const [totalrc, setTotalrc] = useState(0.0);
  const [totalavi, setTotalavi] = useState(0.0);
  const [operacion, setOperacion] = useState(0.0);
  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(false);
  const [mostrar3, setMostrar3] = useState(false);
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

  const BCV = JSON.parse(localStorage.getItem("dolarbcv"));
  const txtDolar = useRef();
  const txtBs = useRef();

  const calcular = () => {
    const cantidadDolares = parseFloat(txtDolar.current.value);
    const precio = parseFloat(BCV);

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
    const precioDolar = parseFloat(BCV);

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

  const selecionarRegistros = async () => {
    let endpoint = op.conexion + "/hotel/ConsultarTodos";
    console.log(endpoint);
    setActivate(true);

    //setLoading(false);
    let bodyF = new FormData();
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

  console.log("estas en menu");

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
  }, []);

  const regPre = () => {
    setMostrar(true);
    setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
  };

  const gestionarBanco = (op, id) => (e) => {
    e.preventDefault();
    if (op == 1) {
      setMostrar(true);
    }
    if (op == 2) {
      setMostrar2(true);
    }

    if (op == 3) {
      setIdLicencia(id);
      setMostrar3(true);
    }

    setOperacion(op);
    setIdLicencia(id);
  };
  return (
    <div className="col-md-12 mx-auto p-2">
      <ModalHotel
        operacion={operacion}
        show={mostrar}
        idLicencia={idLicencia}
        onHideCancela={() => {
          setMostrar(false);
        }}
      />
      <ModalNota
        operacion={operacion}
        show={mostrar2}
        idLicencia={idLicencia}
        onHideCancela={() => {
          setMostrar2(false);
        }}
      />
      <ModalConsultaHotel
        operacion={operacion}
        show={mostrar3}
        idLicencia={idLicencia}
        onHideCancela={() => {
          setMostrar3(false);
        }}
      />
      <div className="col-12 py-2">
        <div className="col-12 row d-flex justify-content-between py-2 mt-5 mb-3">
          <h2 className=" col-5 text-light">Lista de ocupantes general</h2>
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
          <div className="row col-12 d-flex justify-content-between mb-2">
            <input
              type="text"
              className=" col-3 form-control form-control-sm rounded-pill"
              //onChange={handleSearch}
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
            <div className="col-md-6 offset-md-3 d-flex justify-content-center"></div>
          </div>
        </div>
        <TblContainer>
          <TblHead />
          <TableBody>
            {records &&
              recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow key={index} style={{ padding: "0" }}>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.id_hospedaje}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {"N°" + item.num_habicacion_hospedaje}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.cliente_nombre}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.cliente_apellido}
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
                    {item.vehiculo_placa}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {formatDate(item.fecha_llegada_hospedaje)}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.hora_llegada_hospedaje}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.hora_salida_hospedaje}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={gestionarBanco(0, item.id_hospedaje)}
                      className="btn btn-sm mx-2 btn-warning rounded-circle"
                    >
                      <i className="fa fa-edit"></i>{" "}
                    </button>
                    <button
                      onClick={gestionarBanco(2, item.id_hospedaje)}
                      className="btn btn-sm mx-2 btn-info rounded-circle"
                    >
                      <i className="fas fa-file-alt"></i>{" "}
                      {/* Cambiado a un ícono de documento */}
                    </button>
                    <button
                      onClick={gestionarBanco(3, item.id_hospedaje)}
                      className="btn btn-sm mx-2 btn-info rounded-circle"
                    >
                      <i className="fas fa-eye"></i>{" "}
                      {/* Cambiado a un ícono de un ojo */}
                    </button>
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

export default TablaHotelGeneral;
const formatDate = (dateString) => {
  // Usa moment.js para formatear la fecha
  return moment(dateString).format("DD-MM-YYYY"); // Formato "día-mes-año"
};
