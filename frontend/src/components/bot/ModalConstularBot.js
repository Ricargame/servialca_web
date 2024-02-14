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

export const ModalConsultarBot = (props) => {
  /*  variables de estados */

  let op = require("../../modulos/datos");
  let token = localStorage.getItem("jwtToken");

  const txtNContrato = useRef();
  const txtNombre = useRef();
  const txtTipoContrato = useRef();
  const txtCedula = useRef();
  const txtFechaEmision = useRef();
  const txtFechaVencimiento = useRef();
  const cmbNacionalidad = useRef();

  const cmbTelefono = useRef();
  const txtTelefono = useRef();
  const txtDireccion = useRef();
  const txtCorreo = useRef();

  const txtFechaNaci = useRef();
  const txtDescripcion = useRef();

  const txtPlaca = useRef();
  const txtPuestos = useRef();
  const txtUso = useRef();
  const txtAnio = useRef();
  const txtSerMotor = useRef();
  const txtClase = useRef();
  const txtColor = useRef();
  const txtSerCarroceria = useRef();
  const txtTipoVehiculo = useRef();
  const txtModelo = useRef();
  const txtMarca = useRef();
  const txtPeso = useRef();
  const txtCapTone = useRef();
  const txtReferencia = useRef();
  const txtDolar = useRef();
  const txtBolivar = useRef();
  const txtFecha = useRef();
  const txtHora = useRef();
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
    blanquear();
  };

  const blanquear = () => {
    txtNombre.current.value = "";
    txtCedula.current.value = "";
    txtTelefono.current.value = "";
    txtCorreo.current.value = "";
    txtFechaNaci.current.value = "";
    txtPlaca.current.value = "";
    txtPuestos.current.value = "";
    txtAnio.current.value = "";
    txtSerMotor.current.value = "";
    txtSerCarroceria.current.value = "";
    txtModelo.current.value = " ";
    txtMarca.current.value = "";
    txtTipoVehiculo.current.value = "";
    txtColor.current.value = "";
    txtClase.current.value = "";
    txtUso.current.value = "";
    txtReferencia.current.value = "";
    txtDolar.current.value = "";
    txtFecha.current.value = "";
    txtHora.current.value = "";
  };

  const cerrarModal = () => {
    setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
    props.onHideCancela();
  };

  const selecionarRegistros = async (id) => {
    let endpoint = op.conexion + "/bot/ConsultarUno";
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
        txtNombre.current.value =
          response[0].cliente_nombre + response[0].cliente_apellido;
        txtCedula.current.value = response[0].cliente_cedula;
        txtTelefono.current.value = response[0].cliente_telefono;
        txtDireccion.current.value = response[0].cliente_direccion;
        txtCorreo.current.value = response[0].cliente_correo;
        txtFechaNaci.current.value = response[0].cliente_fechaNacimiento;
        txtPlaca.current.value = response[0].vehiculo_placa;
        txtPuestos.current.value = response[0].vehiculo_puesto;
        txtAnio.current.value = response[0].vehiculo_año;
        txtSerMotor.current.value = response[0].vehiculo_serialMotor;
        txtSerCarroceria.current.value = response[0].vehiculo_serialCarroceria;
        txtModelo.current.value = response[0].modelo_nombre;
        txtMarca.current.value = response[0].marca_nombre;
        txtTipoVehiculo.current.value = response[0].tipoVehiculo_nombre;
        txtColor.current.value = response[0].color_nombre;
        txtClase.current.value = response[0].clase_nombre;
        txtUso.current.value = response[0].usoVehiculo_nombre;
        txtReferencia.current.value = response[0].nota_referencia;
        txtDolar.current.value = response[0].nota_monto + " $";
        txtFecha.current.value = formatDate(response[0].nota_fecha);
        txtHora.current.value = response[0].nota_hora.slice(0, 5);
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

  return (
    <Modal
      {...props}
      style={{ background: "rgb(28, 27, 23)" }}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      onShow={() => {
        setOperacion(props.operacion);

        selecionarRegistros(props.idCliente);
      }}
    >
      <Modal.Header className="bg-danger">
        <Modal.Title style={{ color: "#fff" }}>Consultar Datos </Modal.Title>
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
        <fieldset class="border rounded-3 p-3 row mx-auto border rounded mb-2">
          <legend
            class="float-none w-auto px-3 fw-bold"
            style={{ fontSize: 15 }}
          >
            Forma De Pago
          </legend>
          <div class="input-group input-group-sm mb-2">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Fecha:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtFecha}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div class="input-group input-group-sm mb-2">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Hora:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtHora}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div class="input-group input-group-sm mb-2">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Referencia:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtReferencia}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div class="input-group input-group-sm mb-2">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Cantidad $:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtDolar}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          {/* <div class="input-group input-group-sm mb-2">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Cantidad Bs:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtBolivar}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div> */}
        </fieldset>
        <fieldset class="border rounded-3 p-3 row mx-auto border rounded mb-2">
          <legend
            class="float-none w-auto px-3 fw-bold"
            style={{ fontSize: 15 }}
          >
            Datos Del Cliente
          </legend>
          <div class="input-group input-group-sm mb-2 col-md-5">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Nombre:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtNombre}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div className="col-md-1"></div>
          <div class="input-group input-group-sm mb-2 ">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Cédula:
            </span>

            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtCedula}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div class="input-group input-group-sm mb-2 ">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Telefono:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtTelefono}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div class="input-group input-group-sm mb-2">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Dirección:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtDireccion}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>

          <div class="input-group input-group-sm mb-2">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Correo:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtCorreo}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div class="input-group input-group-sm mb-2 ">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Fecha De Nacimiento:
            </span>
            <input
              type="date"
              class="form-control bg-transparent border-0"
              ref={txtFechaNaci}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
        </fieldset>
        <fieldset class="border rounded-3 p-3 row mx-auto border rounded mb-2">
          <legend
            class="float-none w-auto px-3 fw-bold"
            style={{ fontSize: 15 }}
          >
            Datos Del Vehiculo
          </legend>
          <div class="input-group input-group-sm mb-2">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Placa:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtPlaca}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div class="input-group input-group-sm mb-2">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Puestos:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtPuestos}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div class="input-group input-group-sm mb-2 ">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Uso Del Vehiculo:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtUso}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>

          <div class="input-group input-group-sm mb-2">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Año:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtAnio}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>

          <div class="input-group input-group-sm mb-2 ">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Ser. Motor:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtSerMotor}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div class="input-group input-group-sm mb-2 ">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Clase Del Vehiculo:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtClase}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div class="input-group input-group-sm mb-2">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Color:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtColor}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div class="input-group input-group-sm mb-2 ">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Ser. Carroceria:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtSerCarroceria}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div class="input-group input-group-sm mb-2 ">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Tipo De Vehiculo:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtTipoVehiculo}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div class="input-group input-group-sm mb-2 ">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Modelo:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtModelo}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
          <div class="input-group input-group-sm mb-2 ">
            <span
              class="input-group-text bg-transparent border-0"
              id="inputGroup-sizing-sm"
            >
              Marca:
            </span>
            <input
              type="text"
              class="form-control bg-transparent border-0 "
              ref={txtMarca}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              disabled
            />
          </div>
        </fieldset>

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
      </Modal.Body>
      <Modal.Footer>
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
const formatDate = (dateString) => {
  // Usa moment.js para formatear la fecha
  return moment(dateString).format("DD/MM/YYYY"); // Formato "día-mes-año"
};
