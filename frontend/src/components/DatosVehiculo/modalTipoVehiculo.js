import React, { useRef, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
/* import { Mensaje, MensajeSiNo } from "../mensajes"; */
import { Loader, Dimmer, Label } from "semantic-ui-react";
import {
  TableBody,
  TableRow,
  TableCell,
  InputAdornment,
} from "@material-ui/core";

import {
  validaSoloNumero,
  formatMoneda,
  validaMonto,
  formatoMonto,
  validaNumeroTelefono,
  validaEmail,
  validaSoloLetras,
} from "../../util/varios";

import axios from "axios";
import moment from "moment";
import { Mensaje } from "../mensajes";
import CatalogoClientes from "../../catalogos/catalogoClientes";
import useTable from "../useTable";
import CatalogoTiposContratos from "../../catalogos/catalogoTiposContratos";

export const ModalTipoVehiculo = (props) => {
  const headCells = [
    {
      id: "ced",
      color: "rgba(5, 81, 130, 1)",
      label: "Codigo",
      textAlign: "center",
    },
    {
      id: "ced",
      color: "rgba(5, 81, 130, 1)",
      label: "Descripción",
      textAlign: "center",
    },
    {
      id: "ced",
      color: "rgba(5, 81, 130, 1)",
      label: "Sucursal",
      textAlign: "center",
    },
    {
      id: "ape",
      color: "rgba(5, 81, 130, 1)",
      label: "Opcion",
      textAlign: "center",
    },
  ];
  

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
              (x.nombre !== null
                ? x.nombre.toLowerCase().includes(target.value.toLowerCase())
                : "") ||
              (x.cuentabancaria !== null
                ? x.cuentabancaria.includes(target.value)
                : "")
            ) {
              return x;
            }
          });
      },
    });
  };

  /*  variables de estados */

  let op = require("../../modulos/datos");
  let token = localStorage.getItem("jwtToken");
  const dolarbcv = JSON.parse(localStorage.getItem("dolarbcv"));
  let permisos = JSON.parse(localStorage.getItem("permisos"));
  const user = JSON.parse(localStorage.getItem("username"));
  const suc = JSON.parse(localStorage.getItem("sucursal"));

  const txtEdad = useRef();
  const txtNombre = useRef();
  const txtTipoSangre = useRef();
  const txtCedula = useRef();
  const cmbLentes = useRef();
  const cmbPago = useRef();
  const cmbNacionalidad = useRef();
  const txtDatosPastor = useRef();
  const txtReferencia = useRef();
  const txtBs = useRef();
  const txtDolar = useRef();

  const txtFechaNaci = useRef();
  const txtDescripcion = useRef();
  const [records, setRecords] = useState([]);
  const [idTipo, setIdTipo] = useState();
  const [tipoContrato, setTipoContrato] = useState([]);
  const [nivel, setNivel] = useState([]);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [values, setValues] = useState({
    ced: "",
    nombre: "",
    apellido: "",
    fecha_nac: "",
    bas_agua: 1,

    status: 1,
    bas_espirit: 1,
    cod_iglesia: "",
    sexo: "M",
    fecha_baus: "",
    nacionalidad: "V",
    direccion: "",
    telefono: "",
  });

  const btnCancela = useRef();
  const [mensaje, setMensaje] = useState({
    mostrar: false,
    titulo: "",
    texto: "",
    icono: "",
  });

  const btnAcepta = useRef();

  const [activate, setActivate] = useState(false);
  const [mostrar, setMostrar] = useState(false);

  const [operacion, setOperacion] = useState(0);

  /*********************************************** FUNCINES DE VALIDACION***********************************************************/

  const handleInputNumChange = (event) => {
    event.preventDefault();
    validaSoloNumero(event);
    var valido;
    if (event.which === 13 || typeof event.which === "undefined") {
      setValues({ ...values, [event.target.name]: event.target.value });
    } else if (event.which === 46) {
      return false;
    } else if (event.which >= 48 && event.which <= 57) {
      return true;
    } else if (event.which === 8 || event.which === 0 || event.which === 44) {
      return true;
    } else return false; //alert(e.which);
  };

  const { TblContainer, TblHead, recordsAfterPagingAndSorting, TblPagination } =
    useTable(records, headCells, filterFn);
  const buscarNivel = async () => {
    let endpoint = op.conexion + "/nivel/ConsultarTodos";
    setActivate(true);
    await fetch(endpoint, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setNivel(response);
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
  const selecionarTipoContrato = async () => {
    let endpoint = op.conexion + "/tipo_contrato/ConsultarTodos";
    setActivate(true);
    const permiso = permisos[permisos.length - 1];
    let bodyF = new FormData();
    // bodyF.append("ID", user_id)
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        if (permiso.length > 19) {
          if (permiso[20] == 1) {
            const validatedContract = response.filter(
              (contract) => contract.contrato_validacion == "1"
            );
            setTipoContrato(validatedContract);
          }
        }
        const validatedContract = response.filter(
          (contract) => contract.contrato_validacion == "0"
        );
        setTipoContrato(validatedContract);
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
  const salir = () => {
    setRecords([]);
    props.onHideCancela();
    setValues({
      ced: "",
      nombre: "",
      apellido: "",
      fecha_nac: "",
      bas_agua: 1,

      status: 1,
      bas_espirit: 1,
      cod_iglesia: "",
      sexo: "M",
      fecha_baus: "",
      nacionalidad: "V",
      direccion: "",
      telefono: "",
      celular: "",
      estadocivil: 0,
      correo: "",
      tiposangre: "",
    });
  };

  const actualizarTiposContratos = async (id) => {
    let endpoint = op.conexion + "/tipo_vehiculo/precio";
    let bodyF = new FormData();
    setActivate(true);
    for (let i = 0; i < records.length; i++) {
      bodyF.append("ID", id);
      bodyF.append("precio", txtDolar.current.value);
      bodyF.append("idContrato", records[i].contrato_id);
      bodyF.append("Sucursal", idsucursal);

      bodyF.append("token", token);
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
    }
    setMensaje({
      mostrar: true,
      titulo: "Exito.",
      texto: "Operacion Exitosa",
      icono: "exito",
    });
  };

  const actualizarCertificado = async () => {
    let endpoint;
    let bodyF = new FormData();
    setActivate(true);
    if (operacion === 1) {
      endpoint = op.conexion + "/tipo_vehiculo/newTipeVehiculo";
    }

    // if (operacion === 2) {
    //   endpoint = op.conexion + "/tipo_vehiculo/actualizar";
    //   bodyF.append("ID", values.tipoVehiculo_id);
    // }

    bodyF.append("tipoVehiculo_nombre", txtDescripcion.current.value);
    bodyF.append("Sucursal", idsucursal);

    bodyF.append("token", token);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        console.log(response);
        console.log("aqui");
        if (operacion === 1) {
          if (records.length > 0) {
            actualizarTiposContratos(response.id);
          } else {
            setMensaje({
              mostrar: true,
              titulo: "Exito.",
              texto: "Operacion Exitosa",
              icono: "exito",
            });
          }
        } else {
          setMensaje({
            mostrar: true,
            titulo: "Exito.",
            texto: "Operacion Exitosa",
            icono: "exito",
          });
        }
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

  const onChangeValidar = () => {
    let sigue = true;
    let minimo = 0;
    let calculo = 0;

    /*  else if( && operacion === 1){
          setMensaje({
              mostrar: true,
              titulo: "Notificación",
              texto: "Ya existe un usuario con este n° de cedula",
              icono: "informacion",
            });
            sigue = false;
            txtCedula.current.focus()
  
      } */

    if (sigue) {
      actualizarCertificado();
    }
  };

  const blanquear = () => {
    setRecords([]);
    setValues({
      ced: "",
      nombre: "",
      apellido: "",
      fecha_nac: "",
      bas_agua: 1,

      status: 1,
      bas_espirit: 1,
      cod_iglesia: "",
      sexo: "M",
      fecha_baus: "",
      nacionalidad: "V",
      direccion: "",
      telefono: "",
      celular: "",
      estadocivil: 0,
      correo: "",
      tiposangre: "",
    });
  };

  const check = (e) => {
    var textV = "which" in e ? e.which : e.keyCode,
      char = String.fromCharCode(textV),
      regex = /[a-z]/gi;
    if (!regex.test(char)) e.preventDefault();
    return false;
  };
  const seleccionarCliente = (nombre, apellido, cedula) => {
    console.log(nombre, apellido, cedula);
    txtCedula.current.value = cedula;
    txtDescripcion.current.value = apellido;
    txtNombre.current.value = nombre;
    setMostrar(false);
  };

  const cerrarModal = () => {
    setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
    props.render();
    props.onHideCancela();
  };

  function soloLetras(event) {
    if (
      (event.keyCode != 32 && event.keyCode < 65) ||
      (event.keyCode > 90 && event.keyCode < 97) ||
      event.keyCode > 122
    )
      event.returnValue = false;
  }

  const handleInputMontoChange = (event) => {
    validaMonto(event);
    if (event.which === 13 || typeof event.which === "undefined") {
      if (event.target.name === "dolar") {
        let bs = parseFloat(dolarbcv);
        let total = parseFloat(event.target.value) * bs;
        txtBs.current.value = formatMoneda(
          total.toString().replace(",", "").replace(".", ","),
          ",",
          ".",
          2
        );
      }
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

  const idsucursal = JSON.parse(localStorage.getItem("idsucursal"));

  const selecionarRegistros = async (id) => {
    let endpoint =
      op.conexion +
      "/tipo_vehiculo/ConsultarTipoVehiculo?ID=" +
      id +
      "&sucursal=" +
      idsucursal;
    setMostrar(false);
    setActivate(true);

    //setLoading(false);

    await fetch(endpoint, {
      method: "POST",
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

  useEffect(() => {}, []);

  const selecionarTipo = async (id) => {
    let endpoint = op.conexion + "/tipo_vehiculo/ConsultarUno?ID=" + id;
    console.log(endpoint);
    setActivate(true);

    //setLoading(false);

    let bodyF = new FormData();

    // bodyF.append("Nombre", txtDescripcion.current.value)

    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);

        let $ = response.tipoVehiculo_precio
          ? parseFloat(response.tipoVehiculo_precio)
          : 0;
        let bs = parseFloat(dolarbcv);
        let totalbs = $ * bs;
        setIdTipo(response);
        txtDescripcion.current.value = response.tipoVehiculo_nombre;
        setValues(response);
        selecionarRegistros(response.tipoVehiculo_id);
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

  const agregarTipoContrato = (values) => {
    let sigue = true;

    for (let i = 0; i < records.length; i++) {
      if (records.length > 0 && values.contrato_id === records[i].contrato_id) {
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto: "El contrato ya esta agregado.",
          icono: "informacion",
        });
        sigue = false;
      }
    }
    if (sigue) {
      records.push(values);
    }

    setMostrar(false);
    console.log(values);
  };
  const gestinarTipo = () => {
    setMostrar(true);
  };
  const elimminarrTipo = (id) => async (e) => {
    e.preventDefault();

    let endpoint = op.conexion + "/tipo_vehiculo/EliminarPrecio";
    setActivate(true);
    let bodyF = new FormData();
    bodyF.append("ID_precio", id);
    bodyF.append("Estatus", "0");
    bodyF.append("token", token);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setMensaje({
          mostrar: true,
          titulo: "Notficación.",
          texto: "Estatus Modificado",
          icono: "exito",
        });
        console.log(response);
        let id = idTipo.tipoVehiculo_id;
        selecionarRegistros(id);
      })
      .catch((error) =>
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto: error.res,
          icono: "informacion",
        })
      );

    // setRecords(array);
  };

  const validarInput = (e) => {
    console.log(e.target.name);
    let item = document.getElementById(e.target.name);
    if (
      !e.target.value ||
      (e.target.name === "ced" && e.target.value.length < 8)
    ) {
      console.log("1");
      item.className -= " form-text fw-bold hidden ";
      item.className += " form-text fw-bold visible ";
    } else {
      console.log("2");

      item.className -= " form-text fw-bold visible ";
      item.className += " form-text fw-bold hidden ";
    }
  };

  return (
    <Modal
      {...props}
      style={{ background: "rgb(28, 27, 23)" }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      onShow={() => {
        buscarNivel();
        setOperacion(props.operacion);
        selecionarTipoContrato();
        if (props.operacion !== 1) {
          selecionarTipo(props.idTipoVehiculo);
        }
      }}
    >
      <Modal.Header className="bg-danger">
        <Modal.Title style={{ color: "#fff" }}>
          {operacion === 1
            ? "Registrar Tipo de Vehiculo"
            : operacion === 2
            ? "Editar Tipo de Vehiculo"
            : "Eliminar Tipo de Vehiculo"}
        </Modal.Title>
        <button
          ref={btnCancela}
          className="btn"
          style={{ border: 0, margin: 0, padding: 0, color: "#ffffff" }}
          onClick={salir}
        >
          <i className="far fa-window-close"></i>
        </button>
      </Modal.Header>
      <Modal.Body style={{ color: "rgb(106, 115, 123)" }}>
        <Dimmer active={activate} inverted>
          <Loader inverted>cargando...</Loader>
        </Dimmer>
        <CatalogoTiposContratos
          show={mostrar}
          operacion={operacion}
          render={selecionarRegistros}
          idTipo={idTipo}
          onHideCancela={() => {
            setMostrar(false);
          }}
          onHideCatalogo={agregarTipoContrato}
        />

        <Mensaje
          mensaje={mensaje}
          onHide={() => {
            mensaje.titulo === "Exito."
              ? cerrarModal()
              : setMensaje({
                  mostrar: false,
                  titulo: "",
                  texto: "",
                  icono: "",
                });
          }}
        />

        <div className="col-md-12 row mx-auto">
          <div class="mb-1 col-md-12">
            <div class="input-group input-group-sm">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Nombre:
              </span>
              <input
                maxLength={50}
                type="text"
                disabled={
                  operacion === 1 ? false : operacion === 2 ? false : true
                }
                class="form-control"
                ref={txtDescripcion}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                name="nom"
                onBlur={validarInput}
                onChange={(e) =>
                  (e.target.value = e.target.value.toUpperCase())
                }
              />
            </div>
          </div>
          {/* <div className="mb-1 col-md-12">
            {nivel && Array.isArray(nivel) && nivel.length > 0 && (
              <Autocomplete
                value={
                  nivel.find(
                    (n) => n.nivel_id === valorSeleccionado.nivel_id
                  ) || null
                } // Para que el Autocomplete muestre el valor correcto
                onChange={(event, newValue) => {
                  if (newValue) {
                    setValorSeleccionado({
                      ...valorSeleccionado,

                      nivel_id: newValue.nivel_id,

                      monto: newValue.nivel_monto, // Actualiza el monto directamente aquí
                    });
                  }
                }}
                options={nivel}
                sx={{ width: "100%" }}
                size="small"
                getOptionLabel={(option) => option.nivel_id}
                renderInput={(params) => (
                  <TextField {...params} label="Nivel" variant="outlined" />
                )}
              />
            )}
          </div>
          <div class=" mb-1 col-md-12">
            {tipoContrato &&
              Array.isArray(tipoContrato) &&
              tipoContrato.length > 0 && (
                <Autocomplete
                  value={valorSeleccionado}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setValorSeleccionado({
                        ...valorSeleccionado,
                        contrato_nombre: newValue.contrato_nombre,
                      });
                    }
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
          </div>
          <div className="mb-1 col-md-12">
            <div className="input-group input-group-sm">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Precio $:
              </span>

              <input
                maxLength={50}
                type="text"
                readOnly // Cambia a 'disabled' si no quieres que sea editable
                className="form-control"
                value={valorSeleccionado.monto} // Muestra el monto actualizado
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                name="nom"
              />
            </div>
          </div> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-sm btn-success rounded-pill "
          disabled={props.operacion === 4 ? true : false}
          onClick={onChangeValidar}
        >
          <i className="fas fa-check-circle"> Aceptar</i>
        </button>
        <button
          ref={btnCancela}
          onClick={salir}
          className="btn btn-sm btn-danger rounded-pill "
        >
          <i className="fas fa-window-close"> Salir</i>
        </button>
      </Modal.Footer>
    </Modal>
  );
};
