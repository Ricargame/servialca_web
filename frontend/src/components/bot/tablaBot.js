import React, { useEffect, useContext, useState, useRef } from "react";
import { formatMoneda, validaMonto, formatoMonto } from "../../util/varios";
import { Mensaje } from "../mensajes";
import { MensajeSiNo } from "../mensajes";
import { Loader, Dimmer } from "semantic-ui-react";
import moment from "moment";

import axios from "axios";
import useTable from "../useTable";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { ModalConsultarBot } from "./ModalConstularBot";
import { ModalImagenBot } from "./modalImagenBot";

// Ahora puedes llamar a la función iniciarBot() en este archivo

function TablaBot() {
  var op = require("../../modulos/datos");
  let token = localStorage.getItem("jwtToken");
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const [variable, setVariable] = useState();
  const [estatus, setEstatus] = useState();
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
      label: "Cédula",
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
      label: "Télefono",
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
      label: "Hora",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Monto en $",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Referencia",
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
  const [idUso, setIdUso] = useState();
  const [operacion, setOperacion] = useState();
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
  const [mostrar3, setMostrar3] = useState(false);
  const [idCliente, setIdCliente] = useState(0);
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
    let endpoint = op.conexion + "/bot/ConsultarTodos";
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

  const changeEstatus = async (estatus) => {
    let endpoint = op.conexion + "/bot/status";
    setActivate(true);
    let bodyF = new FormData();
    bodyF.append("ID", variable);
    bodyF.append("Estatus", estatus);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        console.log(response);
      })
      .catch((error) =>
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto: error.res,
          icono: "informacion",
        })
      );
    selecionarRegistros();
  };

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

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) => {
            if (
              (x.cliente_cedula !== null
                ? String(x.cliente_cedula).includes(target.value)
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
              (x.cliente_apellido !== null
                ? x.cliente_apellido
                    .toLowerCase()
                    .includes(target.value.toLowerCase())
                : "") ||
              (x.nota_referencia !== null
                ? x.nota_referencia
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
  const [mensajesino, setMensajesino] = useState({
    mostrar: false,
    titulo: "",
    texto: "",
    icono: "",
  });

  const handleCloseNo = () => {
    setMensajesino({ mostrar: false, titulo: "", texto: "", icono: "" });
  };
  const handleCloseSi = () => {
    changeEstatus(estatus);
    setMensajesino({ mostrar: false, titulo: "", texto: "", icono: "" });
  };

  useEffect(() => {
    selecionarRegistros();
  }, []);

  const regPre = () => {
    setMostrar(true);
    setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
  };

  const activar = async () => {
    let endpoint = op.conexion + "/bot/botActivar";
    setActivate(true);
    await fetch(endpoint, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        console.log(response);
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

  const gestionarBanco = (op, id, estatus) => (e) => {
    e.preventDefault();
    if (op == 1) {
      //setMostrar(true);
      activar();
    }
    if (op == 2) {
      setVariable(id);
      setEstatus(estatus);
      setMensajesino({
        mostrar: true,
        titulo: "¿Seguro que desea aprobar este RCV ?",
        texto: "Una vez aceptado no hay vuelta atras",
        icono: "informacion",
      });
    }
    if (op == 3) {
      setVariable(id);
      setEstatus(estatus);
      setMensajesino({
        mostrar: true,
        titulo: "¿Seguro que desea rechazar este RCV ?",
        texto: "Una vez aceptado no hay vuelta atras",
        icono: "informacion",
      });
    }
    if (op == 4) {
      setMostrar3(true);
      setIdCliente(id);
    }
  };
  return (
    <div className="col-md-12 mx-auto p-2">
      <ModalImagenBot
        show={mostrar}
        onHideCancela={() => {
          setMostrar(false);
        }}
      />
      <ModalConsultarBot
        show={mostrar3}
        onHideCancela={() => {
          setMostrar3(false);
        }}
        idCliente={idCliente}
      />
      <MensajeSiNo
        mensaje={mensajesino}
        onHideNo={handleCloseNo}
        onHideSi={handleCloseSi}
      />
      <div className="col-12 py-2">
        <div className="col-12 row d-flex justify-content-between py-2 mt-5 mb-3">
          <h2 className=" col-5 text-light">
            Lista de contratos por confirmar
          </h2>
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

          {
            <div className="col-3 d-flex justify-content-end">
              <button
                onClick={gestionarBanco(1, "", "")}
                className="btn btn-sm btn-primary rounded-circle"
              >
                <i className="fas fa-plus"></i>{" "}
              </button>
            </div>
          }
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
                    {item.bot_id}
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
                    {item.cliente_nombre}
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
                    {item.cliente_telefono}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {moment(item.nota_fecha).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.nota_hora}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.nota_monto + "$"}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.nota_referencia}
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
                      onClick={gestionarBanco(2, item.bot_id, 1)}
                      className="btn btn-sm mx-1 btn-green rounded-circle"
                    >
                      <i className="fa fa-check"></i>{" "}
                    </button>
                    <button
                      onClick={gestionarBanco(3, item.bot_id, 2)}
                      className="btn btn-sm mx-1 btn-green rounded-circle"
                    >
                      <i className="fa fa-times"></i>{" "}
                    </button>
                    <button
                      onClick={gestionarBanco(4, item.bot_id, 2)}
                      className="btn btn-sm mx-1 btn-green rounded-circle"
                    >
                      <i className="fa fa-eye"></i>{" "}
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

export default TablaBot;
