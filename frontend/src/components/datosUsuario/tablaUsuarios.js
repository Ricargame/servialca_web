import React, { useEffect, useContext, useState } from "react";

import { Mensaje } from "../mensajes";
import { MensajeSiNo } from "../mensajes";
import { Loader, Dimmer } from "semantic-ui-react";
import moment from "moment";

import axios from "axios";
import useTable from "../useTable";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { ModalUsuarios } from "./modalUsuarios";

function TablaUsuarios() {
  var op = require("../../modulos/datos");
  let token = localStorage.getItem("jwtToken");
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const [variable, setVariable] = useState();
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
      label: "Usuario",
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
      label: "Cedula",
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
      label: "Dirección",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Correo",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Rol",
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
      label: "Estatus",
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
  const [operacion, setOperacion] = useState(0.0);
  const [totalpresu, setTotalpresu] = useState(0.0);
  const [totaltipo, setTotaltipo] = useState(0.0);
  const [presupuesto, setPresupuesto] = useState(0.0);
  const [totalrc, setTotalrc] = useState(0.0);
  const [totalavi, setTotalavi] = useState(0.0);
  const [totalact, setTotalact] = useState(0.0);
  const [totalmenos, setTotalmenos] = useState(0.0);
  const [mostrar, setMostrar] = useState(false);
  const [idUser, setIdUser] = useState(false);

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

  const quitarLuz = async () => {
    let endpoint = op.conexion + "/Auth/Luz";
    setActivate(true);
    let bodyF = new FormData();
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setMensaje({
          mostrar: true,
          titulo: "Exito.",
          texto: "Usuarios desactivados",
          icono: "exito",
        });
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

  const ponerLuz = async () => {
    let endpoint = op.conexion + "/Auth/ponerLuz";
    setActivate(true);
    let bodyF = new FormData();
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setMensaje({
          mostrar: true,
          titulo: "Exito.",
          texto: "Usuarios desactivados",
          icono: "exito",
        });
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
  const deleteUser = async () => {
    let endpoint = op.conexion + "/Auth/EliminarUsuario";
    setActivate(true);
    let bodyF = new FormData();
    bodyF.append("ID", variable);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setMensaje({
          mostrar: true,
          titulo: "Exito.",
          texto: "Usuario Eliminado",
          icono: "exito",
        });
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
  const cambiarEstatus = async (id, estatus) => {
    var variable;
    if (estatus == 0) {
      variable = 1;
    } else {
      variable = 0;
    }
    let endpoint = op.conexion + "/Auth/ModificarEstatus";
    setActivate(true);
    let bodyF = new FormData();
    bodyF.append("ID", id);
    bodyF.append("Estatus", variable);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setMensaje({
          mostrar: true,
          titulo: "Exito.",
          texto: "Estatus Modificado",
          icono: "exito",
        });
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
  const selecionarRegistros = async () => {
    let endpoint = op.conexion + "/Auth/ConsultarTodos";
    console.log(endpoint);
    setActivate(true);

    //setLoading(false);

    let bodyF = new FormData();

    bodyF.append("ID", user_id);

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

  const resetPassword = async (id) => {
    let endpoint = op.conexion + "/Auth/reset";
    setActivate(true);
    let bodyF = new FormData();
    bodyF.append("ID", id);

    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        console.log(response);
        setMensaje({
          mostrar: true,
          titulo: "Exito.",
          texto: "Contraseña modificada",
          icono: "exito",
        });
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
        if (target.value == "") return items;
        else
          return items.filter((x) => {
            if (
              (x.usuario_id !== null
                ? String(x.usuario_id).includes(target.value)
                : 0) ||
              (x.usuario_usuario !== null
                ? x.usuario_usuario
                    .toLowerCase()
                    .includes(target.value.toLowerCase())
                : "") ||
              (x.usuario_cedula !== null
                ? x.usuario_cedula.includes(target.value)
                : "") ||
              (x.usuario_cedula !== null
                ? x.usuario_cedula.includes(target.value)
                : "") ||
              (x.usuario_telefono !== null
                ? x.usuario_telefono.includes(target.value)
                : "") ||
              (x.usuario_direccion !== null
                ? x.usuario_direccion.includes(target.value)
                : "") ||
              (x.usuario_correo !== null
                ? x.usuario_correo.includes(target.value)
                : "") ||
              (x.roles_nombre !== null
                ? x.roles_nombre.includes(target.value)
                : "") ||
              (x.sucursal_nombre !== null
                ? x.sucursal_nombre.includes(target.value)
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
    deleteUser();
    setMensajesino({ mostrar: false, titulo: "", texto: "", icono: "" });
  };
  useEffect(() => {
    selecionarRegistros();
  }, []);

  const regPre = () => {
    setMostrar(true);
    setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
  };

  const gestionarBanco = (op, id, estatus) => (e) => {
    e.preventDefault();
    if (op == 5) {
      setVariable(id);
      setMensajesino({
        mostrar: true,
        titulo: "¿Seguro que deseas realizar la operación?",
        texto: "Una vez eliminado el usuario desaparecera del sistema",
        icono: "informacion",
      });
    } else if (op === 10) {
      ponerLuz()
    } else if (op == 9) {
      quitarLuz();
    } else if (op == 8) {
      cambiarEstatus(id, estatus);
    } else if (op == 6) {
      resetPassword(id);
    } else {
      setOperacion(op);
      setMostrar(true);
      setIdUser(id);
    }
  };
  return (
    <div className="col-md-12 mx-auto p-2">
      <MensajeSiNo
        mensaje={mensajesino}
        onHideNo={handleCloseNo}
        onHideSi={handleCloseSi}
      />
      <ModalUsuarios
        operacion={operacion}
        show={mostrar}
        onHideCancela={() => {
          setMostrar(false);
        }}
        render={selecionarRegistros}
        id={idUser}
      />
      <div className="col-12 py-2">
        <div className="col-12 row d-flex justify-content-between py-2 mt-5 mb-3">
          <h2 className=" col-5 text-light">Usuarios Del Sistema</h2>
        </div>
      </div>
      <div
        className="col-md-12 bg-light py-2 rounded"
        style={{ margin: "auto" }}
      >
        <div className="row col-md-12 d-flex justify-content-between mb-2">
          <input
            type="text"
            className=" col-md-3 form-control mb-2 form-control-sm rounded-pill"
            onChange={handleSearch}
            placeholder="Buscar"
          />
          <div className="col-md-9 row">
            {/* <div className="col d-flex justify-content-end">
              <button
                onClick={gestionarBanco(9, "", "")}
                className="btn btn-sm btn-primary"
              >
                <i>Desactivar usuarios</i>{" "}
              </button>
            </div>
            <div className="col d-flex justify-content-end">
              <button
                onClick={gestionarBanco(9, "", "")}
                className="btn btn-sm btn-primary"
              >
                <i>Activar usuarios</i>{" "}
              </button>
            </div> */}
            <div className="col d-flex justify-content-end">
              <button
                onClick={gestionarBanco(1, "", "")}
                className="btn btn-sm btn-primary rounded-circle my-auto"
              >
                <i className="fas fa-plus"></i>{" "}
              </button>
            </div>
          </div>
        </div>
        <TblContainer>
          <TblHead />
          <TableBody>
            {records &&
              recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow
                  key={index}
                  style={{
                    padding: "0",
                    backgroundColor:
                      item.usuario_estatus == 0 ? "red" : "inherit",
                  }}
                >
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.usuario_id}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.usuario_usuario}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.usuario_nombre + " " + item.usuario_apellido}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.usuario_cedula}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.usuario_telefono}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.usuario_direccion}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.usuario_correo}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    {item.roles_nombre}
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
                    {item.usuario_estatus == 1 ? "ACTIVO" : "INACTIVO"}
                  </TableCell>
                  <TableCell
                    className="align-baseline"
                    style={{
                      textAlign: "center",
                      alignItems: "center",
                      width: 130,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <button
                          onClick={gestionarBanco(2, item.usuario_id, "")}
                          className="btn btn-sm mx-1 btn-warning rounded-circle"
                        >
                          <i className="fa fa-edit"></i>{" "}
                        </button>
                        <button
                          onClick={gestionarBanco(
                            8,
                            item.usuario_id,
                            item.usuario_estatus
                          )}
                          className="btn btn-sm mx-1 btn-danger rounded-circle"
                        >
                          {item.usuario_estatus == 1 ? (
                            <i className="fa fa-times"></i>
                          ) : (
                            <i
                              className="fa fa-check"
                              style={{ background: "none" }}
                            ></i>
                          )}
                        </button>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button
                          onClick={gestionarBanco(5, item.usuario_id)}
                          className="btn btn-sm mx-1 btn-secondary rounded-circle"
                        >
                          <i className="fa fa-trash"></i>{" "}
                        </button>
                        <button
                          onClick={gestionarBanco(6, item.usuario_id, "")}
                          className="btn btn-sm mx-1 btn-warning rounded-circle"
                        >
                          <i className="fa fa-sync"></i>{" "}
                        </button>
                      </div>
                    </div>
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
          mensaje.texto ==
          "Este Usuario No posee preguntas de seguridad debe registrarlas"
            ? regPre()
            : setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" })
        }
      />
    </div>
  );
}

export default TablaUsuarios;
