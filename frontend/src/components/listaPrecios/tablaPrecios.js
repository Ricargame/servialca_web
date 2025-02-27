import React, { useEffect, useRef, useContext, useState } from "react";

import { Mensaje } from "../mensajes";
import { Loader, Dimmer } from "semantic-ui-react";
import moment from "moment";

import axios from "axios";
import useTable from "../useTable";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { formatMoneda, validaMonto, formatoMonto } from "../../util/varios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ModalTipoVehiculo } from "../DatosVehiculo/modalTipoVehiculo";

function TablaPrecio() {
  var op = require("../../modulos/datos");
  let token = localStorage.getItem("jwtToken");
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const idsucursal = JSON.parse(localStorage.getItem("idsucursal"));
  const suc = JSON.parse(localStorage.getItem("sucursal"));
  const user = JSON.parse(localStorage.getItem("username"));
  const [activate, setActivate] = useState(false);
  const [idTipoVehiculo, setIdTipoVehiculo] = useState(0.0);
  const [valorSeleccionado, setValorSeleccionado] = useState({
    contrato_nombre: "",
    estado_nombre: "Portuguesa",
    usuario_usuario: user.toString(),
    sucursal_nombre: suc.toString(),
    transporte_nombre: "",
    usoVehiculo_nombre: "",
    clase_nombre: "",
    tipoVehiculo_nombre: "",
  });

  const [mensaje, setMensaje] = useState({
    mostrar: false,
    titulo: "",
    texto: "",
    icono: "",
  });

  const headCells = [
    {
      label: "Codigo",
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
      label: "Contrato",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Precio $",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Precio Bs",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    // {
    //   label: "Opciones",
    //   textAlign: "center",
    //   backgroundColor: "#e70101bf",
    //   color: "white",
    // },
  ];

  const codigo = JSON.parse(localStorage.getItem("codigo"));
  const permiso = JSON.parse(localStorage.getItem("permiso"));
  const [idSucursal, setIdSucursal] = useState(0.0);
  const [operacion, setOperacion] = useState(0.0);
  const [mostrar, setMostrar] = useState(false);
  const [tipoContrato, setTipoContrato] = useState([]);
  const price = useRef();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [nivelSeleccionado, setNivelSeleccionado] = useState("1");

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

  var BCV = JSON.parse(localStorage.getItem("dolarbcv"));
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

  const imprimir = (id, desde, hasta) => (e) => {
    e.preventDefault();
    window.open(
      `${op.conexion}/reporte/reporteIngresoEgreso?Nombre=${id}&Desde=${desde}&Hasta=${hasta}`
    );
  };
  const guarcarPercio = async () => {
    let endpoint = op.conexion + "/tipo_vehiculo/saveNewPrecio";
    let bodyF = new FormData();
    bodyF.append("idContrato", valorSeleccionado ? valorSeleccionado.contrato_id : null)
    bodyF.append("Nivel", nivelSeleccionado);
    bodyF.append("precio", price.current.value);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        selecionarRegistros()
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
  const selecionarRegistros = async (contrato) => {
    let a = 1
    if (contrato) {
     a = contrato.contrato_id
    }
    let endpoint =
      op.conexion + "/tipo_vehiculo/ConsultarTodos?Sucursal=" + idsucursal;
    setActivate(true);
    let bodyF = new FormData();
    bodyF.append('idContrato', a)
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

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) => {
            if (
              (x.tipoVehiculo_id !== null
                ? String(x.tipoVehiculo_id).includes(target.value)
                : 0) ||
              (x.tipoVehiculo_nombre !== null
                ? x.tipoVehiculo_nombre
                    .toLowerCase()
                    .includes(target.value.toLowerCase())
                : "") ||
              (x.precio_monto != null
                ? x.precio_monto
                    .toLowerCase()
                    .includes(target.value.toLowerCase())
                : "")
            ) {
              return x;
            }
          });
      },
    });
  };
  function descargarTipo() {
    window.open(
      `${op.conexion}/reporte/reporteTipoVehiculo?contrato=1`
    );
  }
  const selecionarTipoContrato = async () => {
    let endpoint = op.conexion + "/tipo_contrato/ConsultarTodos";
    setActivate(true);
    let bodyF = new FormData();
    // bodyF.append("Contrato", valorSeleccionado.id)
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setTipoContrato(response);
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
    selecionarTipoContrato();
    selecionarRegistros();
  }, []);

  const regPre = () => {
    setMostrar(true);
    setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
  };

  const gestionarBanco = (op, id) => (e) => {
    e.preventDefault();
    setMostrar(true);
    setOperacion(op);
    setIdTipoVehiculo(id);
  };
  return (
    <div className="col-md-12 mx-auto p-2">
      <ModalTipoVehiculo
        operacion={operacion}
        show={mostrar}
        onHideCancela={() => {
          setMostrar(false);
        }}
        idTipoVehiculo={idTipoVehiculo}
        render={selecionarRegistros}
      />
      <div className="col-12 py-2">
        <div className="col-12 row d-flex justify-content-between py-2 mt-5 mb-3">
          <h2 className=" col-5 text-light">Lista De Precios</h2>
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
              className="col-3 form-control form-control-sm rounded-pill"
              onChange={handleSearch}
              placeholder="Buscar"
            />
            <div className="col-3 d-flex justify-content-end">
            <button
              onClick={descargarTipo}
              className="btn btn-sm btn-primary"
            >
              Imprimir
              </button>
            </div>
            {/* <select
              onChange={(e) => {
                setNivelSeleccionado(e.target.value);
                selecionarRegistros(valorSeleccionado, e.target.value); // Llama a la función con el nivel actualizado
              }}
              className="col-1 form-control form-control-sm"
            >
              <option value="1">Nivel 1</option>
              <option value="2">Nivel 2</option>
              <option value="3">Nivel 3</option>
            </select>
            {tipoContrato &&
              Array.isArray(tipoContrato) &&
              tipoContrato.length > 0 && (
                <Autocomplete
                  className="col-2"
                  value={valorSeleccionado}
                  onChange={(event, newValue) => {
                    setValorSeleccionado(newValue);
                    selecionarRegistros(newValue, nivelSeleccionado);
                  }}
                  options={tipoContrato}
                  sx={{ width: "100%" }}
                  size="small"
                  getOptionLabel={(option) => option.contrato_nombre}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo de Contrato"
                      variant="outlined"
                    />
                  )}
                />
              )}
            <input
              type="number"
              className="col-1 form-control form-control-sm"
              ref={price}
              placeholder="Precio"
            />
            <button
              onClick={guarcarPercio}
              className="col-1 form-control form-control-sm"
            >
              Guardar
            </button> */}
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
                    {item.tipoVehiculo_id}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.tipoVehiculo_nombre}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.contrato_nombre}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.tipoVehiculo_precio + " $"}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {(item.tipoVehiculo_precio * BCV).toFixed(2)}
                  </TableCell>
                  {/* <TableCell
                    className="align-baseline"
                    style={{
                      textAlign: "center",
                      alignItems: "center",
                      width: 130,
                    }}
                  >
                    <button
                      onClick={gestionarBanco(2, item.tipoVehiculo_id, "")}
                      className="btn btn-sm mx-1 btn-warning rounded-circle"
                    >
                      <i className="fa fa-edit"></i>{" "}
                    </button>
                  </TableCell> */}
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

export default TablaPrecio;
