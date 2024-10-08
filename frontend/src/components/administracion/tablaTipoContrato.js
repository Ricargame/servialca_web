import React, { useEffect, useRef, useContext, useState } from "react";

import { Mensaje } from "../mensajes";
import { Loader, Dimmer } from "semantic-ui-react";
import moment from "moment";

import axios from "axios";
import useTable from "../useTable";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { ModalTipoContrato } from "./modalTipoContrato";
import { formatMoneda, validaMonto, formatoMonto } from "../../util/varios";

function TablaTipoContratos() {
  var op = require("../../modulos/datos");
  let token = localStorage.getItem("jwtToken");
  const user_id = JSON.parse(localStorage.getItem("user_id"));

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
      label: "Nombre",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Daño Cosas",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Daño Personas",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Fianza Cuantitativa",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Asistencia Legal",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "A.P.O.V.",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Muerte",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Invalidez",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Gastos Medicos",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },

    {
      label: "Grua y Estacionamiento",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Status",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Boconoa",
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

  const codigo = JSON.parse(localStorage.getItem("codigo"));
  const permiso = JSON.parse(localStorage.getItem("permiso"));
  const [operacion, setOperacion] = useState();
  const [IdTipoContrato, setIdTipoContrato] = useState();
  const [nCuenta, setNCuenta] = useState();
  const [total, setTotal] = useState(0.0);
  const [totalp, setTotalp] = useState(0.0);
  const [totalpresu, setTotalpresu] = useState(0.0);
  const [totaltipo, setTotaltipo] = useState(0.0);
  const [presupuesto, setPresupuesto] = useState(0.0);
  const [totalrc, setTotalrc] = useState(0.0);
  const [totalavi, setTotalavi] = useState(0.0);
  const [totalact, setTotalact] = useState(0.0);
  const [totalmenos, setTotalmenos] = useState(0.0);
  const [mostrar, setMostrar] = useState(false);
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

  const selecionarRegistros = async () => {
    let endpoint = op.conexion + "/tipo_contrato/ConsultarTodos";
    console.log(endpoint);
    setActivate(true);

    //setLoading(false);

    await fetch(endpoint, {
      method: "POST",
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
              (x.contrato_id !== null
                ? String(x.contrato_id).includes(target.value)
                : 0) ||
              (x.contrato_nombre !== null
                ? x.contrato_nombre
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

  console.log("estas en menu");

  useEffect(() => {
    selecionarRegistros();
  }, []);

  const regPre = () => {
    setMostrar(true);
    setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
  };

  const gestionarBanco = (op, id) => (e) => {
    e.preventDefault();
    setOperacion(op);
    setMostrar(true);
    setIdTipoContrato(id);
  };
  return (
    <div className="col-md-12 mx-auto p-2">
      <ModalTipoContrato
        operacion={operacion}
        show={mostrar}
        onHideCancela={() => {
          setMostrar(false);
        }}
        IdTipoContrato={IdTipoContrato}
        render={selecionarRegistros}
      />

      <div className="col-12 py-2">
        <div className="col-12 row d-flex justify-content-between py-2 mt-5 mb-3">
          <h2 className=" col-5 text-light">Tipos de Contratos</h2>
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
            className=" col-3 form-control form-control-sm rounded-pill"
            onChange={handleSearch}
            placeholder="Buscar"
          />

          <div className="col-3 d-flex justify-content-end">
            <button
              onClick={gestionarBanco(1, "")}
              className="btn btn-sm btn-primary rounded-circle"
            >
              <i className="fas fa-plus"></i>{" "}
            </button>
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
                    {item.contrato_id}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "left", alignItems: "center" }}
                  >
                    {item.contrato_nombre}
                  </TableCell>

                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.dañoCosas
                      ? formatMoneda(
                          item.dañoCosas
                            .toString()
                            .replace(",", "")
                            .replace(".", ","),
                          ",",
                          ".",
                          2
                        )
                      : "0,00"}
                  </TableCell>

                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.dañoPersonas
                      ? formatMoneda(
                          item.dañoPersonas
                            .toString()
                            .replace(",", "")
                            .replace(".", ","),
                          ",",
                          ".",
                          2
                        )
                      : "0,00"}
                  </TableCell>

                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.fianzaCuanti
                      ? formatMoneda(
                          item.fianzaCuanti
                            .toString()
                            .replace(",", "")
                            .replace(".", ","),
                          ",",
                          ".",
                          2
                        )
                      : "0,00"}
                  </TableCell>

                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.asistenciaLegal
                      ? formatMoneda(
                          item.asistenciaLegal
                            .toString()
                            .replace(",", "")
                            .replace(".", ","),
                          ",",
                          ".",
                          2
                        )
                      : "0,00"}
                  </TableCell>

                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.apov
                      ? formatMoneda(
                          item.apov
                            .toString()
                            .replace(",", "")
                            .replace(".", ","),
                          ",",
                          ".",
                          2
                        )
                      : "0,00"}
                  </TableCell>

                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.muerte
                      ? formatMoneda(
                          item.muerte
                            .toString()
                            .replace(",", "")
                            .replace(".", ","),
                          ",",
                          ".",
                          2
                        )
                      : "0,00"}
                  </TableCell>

                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.invalidez
                      ? formatMoneda(
                          item.invalidez
                            .toString()
                            .replace(",", "")
                            .replace(".", ","),
                          ",",
                          ".",
                          2
                        )
                      : "0,00"}
                  </TableCell>

                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.gastosMedicos
                      ? formatMoneda(
                          item.gastosMedicos
                            .toString()
                            .replace(",", "")
                            .replace(".", ","),
                          ",",
                          ".",
                          2
                        )
                      : "0,00"}
                  </TableCell>

                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.grua
                      ? formatMoneda(
                          item.grua
                            .toString()
                            .replace(",", "")
                            .replace(".", ","),
                          ",",
                          ".",
                          2
                        )
                      : "0,00"}
                  </TableCell>

                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {parseInt(item.contrato_estatus) === 1
                      ? "ACTIVO"
                      : "INACTIVO"}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {parseInt(item.contrato_validacion) === 1
                      ? "Si"
                      : "No"}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{
                      textAlign: "center",
                      alignItems: "center",
                      width: 130,
                    }}
                  >
                    <button
                      onClick={gestionarBanco(2, item.contrato_id)}
                      className="btn btn-sm mx-1 btn-warning rounded-circle"
                    >
                      <i className="fa fa-edit"></i>{" "}
                    </button>
                    <button
                      onClick={gestionarBanco(3, item.contrato_id)}
                      className="btn btn-sm mx-1 btn-danger rounded-circle"
                    >
                      <i className="fa fa-trash"></i>{" "}
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

export default TablaTipoContratos;
