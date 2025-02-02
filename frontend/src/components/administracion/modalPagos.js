import React, { useRef, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
/* import { Mensaje, MensajeSiNo } from "../mensajes"; */
import { Loader, Dimmer, Label } from "semantic-ui-react";
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
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useForkRef } from "@material-ui/core";
export const ModalPagos = (props) => {
  /*  variables de estados */

  let op = require("../../modulos/datos");
  let token = localStorage.getItem("jwtToken");
  const idUsuario = useRef();
  const montoDolar = useRef();
  const referencia = useRef();
  const txtNombre = useRef();
  const [acesor, setAcesor] = useState()
  const txtCedula = useRef();
  let permisos = JSON.parse(localStorage.getItem("permisos"));
  const txtDescripcion = useRef();
  const idPrecio = useRef();
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
    celular: "",
    estadocivil: 0,
    correo: "",
    tiposangre: "",
  });
  const [valorSeleccionado, setValorSeleccionado] = useState({
    contrato_nombre: "",
    estado_nombre: "Portuguesa",
    usuario_usuario: "",
    sucursal_nombre: "",
    transporte_nombre: "",
    usoVehiculo_nombre: "",
    clase_nombre: "",
    tipoVehiculo_nombre: "",
    contrato_id: '',
    tipo_id: '',
    monto: "",
    usuario_id: ''
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

  const salir = () => {
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
  const idsucursal = JSON.parse(localStorage.getItem("idsucursal"));
  const selecionarAcesor = async () => {
    let endpoint = op.conexion + "/ladilla/ConsultarTodos";
    setActivate(true);

    //setLoading(false);

    let bodyF = new FormData();

    // bodyF.append("ID", user_id)

    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setAcesor(response);
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

  const selecionarRegistros = async () => {
    setMostrar(false);
    let endpoint =
      op.conexion + "/tipo_vehiculo/ConsultarTodos?Sucursal=" + idsucursal;
    setActivate(true);


    await fetch(endpoint, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((response) => {
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
  const actualizarCertificado = async () => {
    let endpoint;
    setActivate(true);
    let bodyF = new FormData();
    if (operacion === 1) {
      endpoint = op.conexion + "/pagos/registrar";
      bodyF.append("usuario", valorSeleccionado.idUsuario);
      bodyF.append("monto", montoDolar.current.value);
      bodyF.append("referencia", referencia.current.value);
    } else if (operacion === 2) {
      endpoint = op.conexion + "/pagos/Editar";
      bodyF.append("usuario", valorSeleccionado.idUsuario);
      bodyF.append("monto", montoDolar.current.value);
      bodyF.append("referencia", referencia.current.value);
      bodyF.append("id", idPrecio.current.value);
    } else {
      endpoint = op.conexion + "/pagos/eliminar";
      bodyF.append("usuario", valorSeleccionado.idUsuario);
      bodyF.append("monto", montoDolar.current.value);
      bodyF.append("referencia", referencia.current.value);
      bodyF.append("id", idPrecio.current.value);
    }
    bodyF.append("Token", token);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        console.log(response);

        if (response.code == 400) {
          setMensaje({
            mostrar: true,
            titulo: "Error.",
            texto: response.res,
            icono: "error",
          });
        } else {
          setMensaje({
            mostrar: true,
            titulo: "Exito.",
            texto: response.res,
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

  const handleChange = (maxValue) => (e) => {
    const inputValue = e.target.value;
    // Verificar si la longitud del valor ingresado supera el valor máximo
    if (isNaN(inputValue)) {
      if (inputValue.length > maxValue && e.key !== "Backspace") {
        e.preventDefault(); // Evitar que se escriba el valor excedente
      }
    } else {
      if (
        inputValue.length >= maxValue &&
        e.key !== "Backspace" &&
        e.key !== " "
      ) {
        e.preventDefault(); // Evitar que se escriba el valor excedente
      }
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

  const selecionarRol = async (id) => {
    let endpoint = op.conexion + "/pagos/ConsultarUno";
    setActivate(true);
    let bodyF = new FormData();

    bodyF.append("id", id)
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        idPrecio.current.value = response[0].pagos_id;
        montoDolar.current.value =  response[0].pagos_monto_bs
        referencia.current.value =  response[0].pagos_referencia
        setValorSeleccionado({
          idUsuario: response[0].usuario_id,
          usuario_usuario: response[0].usuario_usuario
        })
        setValues(response[0]);
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
        setOperacion(props.operacion);
        selecionarAcesor();
        if (props.operacion !== 1) {
          selecionarRol(props.idzona);
        }
      }}
    >
      <Modal.Header className="bg-danger">
        <Modal.Title style={{ color: "#fff" }}>
          {operacion === 1
            ? "Registrar Pago"
            : operacion === 2
              ? "Editar Pago"
              : "Eliminar Pago"}
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
        <CatalogoClientes
          show={mostrar}
          onHideCancela={() => {
            setMostrar(false);
          }}
          onHideCatalogo={seleccionarCliente}
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
          <div className="mb-1 col-md-12">
            <div className="row">
              <div className="mb-3 col-md-6"> {/* Cambia col-md-16 a col-md-6 para que ocupen la mitad */}
                <div className="input-group input-group-sm">
                  <input type="hidden" ref={idPrecio} />
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    Monto Bs:
                  </span>
                  <input
                    maxLength={50}
                    type="text"
                    ref={montoDolar}
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    name="nom"
                  />
                </div>
              </div>
              <div className="mb-3 col-md-6"> {/* Cambia col-md-16 a col-md-6 para que ocupen la mitad */}
                <div className="input-group input-group-sm">
                  <input type="hidden" ref={idPrecio} />
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    Referencia:
                  </span>
                  <input
                    maxLength={50}
                    type="text"
                    ref={referencia}
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    name="nom"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-md-12">
                {acesor && Array.isArray(acesor) && acesor.length > 0 && (
                  <Autocomplete
                    value={valorSeleccionado}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setValorSeleccionado({
                          ...valorSeleccionado,
                          usuario_usuario: newValue.usuario_usuario,
                          idUsuario: newValue.usuario_id
                        });
                      }
                    }}
                    options={acesor}
                    sx={{ width: "100%" }}
                    size="small"
                    getOptionLabel={(option) => option.usuario_usuario}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Acesor"
                        variant="outlined"
                      />
                    )}
                  />
                )}
              </div>
            </div>
          </div>
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

