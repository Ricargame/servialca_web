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

export const ModalUsuarios = (props) => {
  /*  variables de estados */

  let op = require("../../modulos/datos");
  let token = localStorage.getItem("jwtToken");

  const txtEdad = useRef();
  const txtUsuario = useRef();
  const txtApellido = useRef();
  const txtNombre = useRef();
  const txtTipoSangre = useRef();
  const txtCedula = useRef();
  const txtPass = useRef();
  const cmbPago = useRef();
  const cmbNacionalidad = useRef();

  const txtDatosPastor = useRef();
  const txtReferencia = useRef();
  const txtBs = useRef();
  const txtDolar = useRef();
  const txtFechaNaci = useRef();
  const txtDireccion = useRef();
  const cmbTelefono = useRef();
  const txtTelefono = useRef();
  const txtCorreo = useRef();
  const txtRol = useRef();
  const txtSucursal = useRef();

  const check = useRef();
  const check1 = useRef();
  const check2 = useRef();
  const check3 = useRef();
  const check4 = useRef();
  const check5 = useRef();
  const check6 = useRef();
  const check7 = useRef();
  const check8 = useRef();
  const check9 = useRef();
  const check10 = useRef();
  const check11 = useRef();
  const check12 = useRef();
  const check13 = useRef();
  const check14 = useRef();
  const check15 = useRef();
  const check16 = useRef();
  const check17 = useRef();
  const check18 = useRef();
  const check19 = useRef();
  const check20 = useRef();

  const [sucursales, setSucursales] = useState();
  const [roles, setRoles] = useState();

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
  const actualizarCertificado = async () => {
    let endpoint;
    let bodyF = new FormData();
    if (operacion === 1) {
      endpoint = op.conexion + "/Auth/registrar";
      bodyF.append("Clave", txtCedula.current.value);
    } else if (operacion === 2) {
      endpoint = op.conexion + "/Auth/actualizar";
    } else if (operacion === 3) {
      endpoint = op.conexion + "/Auth/eliminar";
    }

    console.log(endpoint);
    setActivate(true);
    
    let chk = check.current.checked ? "1" : "0";
    let chk1 = check1.current.checked ? "1" : "0";
    let chk2 = check2.current.checked ? "1" : "0";
    let chk3 = check3.current.checked ? "1" : "0";
    let chk4 = check4.current.checked ? "1" : "0";
    let chk5 = check5.current.checked ? "1" : "0";
    let chk6 = check6.current.checked ? "1" : "0";
    let chk7 = check7.current.checked ? "1" : "0";
    let chk8 = check8.current.checked ? "1" : "0";
    let chk9 = check9.current.checked ? "1" : "0";
    let chk10 = check10.current.checked ? "1" : "0";
    let chk11 = check11.current.checked ? "1" : "0";
    let chk12 = check12.current.checked ? "1" : "0";
    let chk13 = check13.current.checked ? "1" : "0";
    let chk14 = check14.current.checked ? "1" : "0";
    let chk15 = check15.current.checked ? "1" : "0";
    let chk16 = check16.current.checked ? "1" : "0";
    let chk17 = check17.current.checked ? "1" : "0";
    let chk18 = check18.current.checked ? "1" : "0";
    let chk19 = check19.current.checked ? "1" : "0";
    let chk20 = check20.current.checked ? "1" : "0";
    let permiso =
      chk +
      chk1 +
      chk2 +
      chk3 +
      chk4 +
      chk5 +
      chk6 +
      chk7 +
      chk8 +
      chk9 +
      chk10 +
      chk11 +
      chk12 +
      chk13 +
      chk14 +
      chk15 +
      chk16 +
      chk17 +
      chk18 +
      chk19 + 
      chk20;

    //setLoading(false);

    bodyF.append("ID", props.id);

    bodyF.append("Usuario", txtUsuario.current.value);
    bodyF.append("Nombre", txtNombre.current.value);
    bodyF.append("Apellido", txtApellido.current.value);
    bodyF.append(
      "Cedula",
      cmbNacionalidad.current.value + txtCedula.current.value
    );
    bodyF.append(
      "Telefono",
      cmbTelefono.current.value + txtTelefono.current.value
    );
    bodyF.append("Direccion", txtDireccion.current.value);
    bodyF.append("Correo", txtCorreo.current.value);
    bodyF.append("Rol", txtRol.current.value);
    bodyF.append("Sucursal", txtSucursal.current.value);
    bodyF.append("Permiso", permiso);
    bodyF.append("token", token);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        console.log(response);
        console.log(permiso);

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

  const seleccionarCliente = (nombre, apellido, cedula) => {
    console.log(nombre, apellido, cedula);
    txtCedula.current.value = cedula;
    txtDireccion.current.value = apellido;
    txtNombre.current.value = nombre;
    setMostrar(false);
  };

  const cerrarModal = () => {
    setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
    props.render();
    props.onHideCancela();
  };

  const selecionarUsuario = async (id) => {
    let endpoint = op.conexion + "/Auth/ConsultarUno?ID=" + id;
    console.log(endpoint);
    setActivate(true);

    //setLoading(false);

    console.log(id);
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

        txtUsuario.current.value = response.usuario_usuario;
        

        txtNombre.current.value = response.usuario_nombre;
        txtApellido.current.value = response.usuario_apellido;
        cmbNacionalidad.current.value = response.usuario_cedula.substring(0, 2);
        txtCedula.current.value = response.usuario_cedula.substring(
          2,
          response.usuario_cedula.length
        );
        cmbTelefono.current.value = response.usuario_telefono.substring(0, 5);
        txtTelefono.current.value = response.usuario_cedula.substring(
          5,
          response.usuario_telefono.length
        );
        txtDireccion.current.value = response.usuario_direccion;
        txtCorreo.current.value = response.usuario_correo;
        txtRol.current.value = response.roles_id;
        txtSucursal.current.value = response.sucursal_id;

        check.current.checked = response.permisos
          ? response.permisos.substring(0, 1) === "1"
            ? true
            : false
          : false;
        check1.current.checked = response.permisos
          ? response.permisos.substring(1, 2) === "1"
            ? true
            : false
          : false;
        check2.current.checked = response.permisos
          ? response.permisos.substring(2, 3) === "1"
            ? true
            : false
          : false;
        check3.current.checked = response.permisos
          ? response.permisos.substring(3, 4) === "1"
            ? true
            : false
          : false;
        check4.current.checked = response.permisos
          ? response.permisos.substring(4, 5) === "1"
            ? true
            : false
          : false;
        check5.current.checked = response.permisos
          ? response.permisos.substring(5, 6) === "1"
            ? true
            : false
          : false;
        check6.current.checked = response.permisos
          ? response.permisos.substring(6, 7) === "1"
            ? true
            : false
          : false;
        check7.current.checked = response.permisos
          ? response.permisos.substring(7, 8) === "1"
            ? true
            : false
          : false;
        check8.current.checked = response.permisos
          ? response.permisos.substring(8, 9) === "1"
            ? true
            : false
          : false;
        check9.current.checked = response.permisos
          ? response.permisos.substring(9, 10) === "1"
            ? true
            : false
          : false;
        check10.current.checked = response.permisos
          ? response.permisos.substring(10, 11) === "1"
            ? true
            : false
          : false;
        check11.current.checked = response.permisos
          ? response.permisos.substring(11, 12) === "1"
            ? true
            : false
          : false;
        check12.current.checked = response.permisos
          ? response.permisos.substring(12, 13) === "1"
            ? true
            : false
          : false;
        check13.current.checked = response.permisos
          ? response.permisos.substring(13, 14) === "1"
            ? true
            : false
          : false;
        check14.current.checked = response.permisos
          ? response.permisos.substring(14, 15) === "1"
            ? true
            : false
          : false;
        check15.current.checked = response.permisos
          ? response.permisos.substring(15, 16) === "1"
            ? true
            : false
          : false;
        check16.current.checked = response.permisos
          ? response.permisos.substring(16, 17) === "1"
            ? true
            : false
          : false;
        check17.current.checked = response.permisos
          ? response.permisos.substring(17, 18) === "1"
            ? true
            : false
          : false;
        check18.current.checked = response.permisos
          ? response.permisos.substring(18, 19) === "1"
            ? true
            : false
          : false;
        check19.current.checked = response.permisos
          ? response.permisos.substring(19, 20) === "1"
            ? true
            : false
          : false;
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

  const selecionarSucursales = async () => {
    let endpoint = op.conexion + "/sucursal/ConsultarTodos";
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
        setSucursales(response);
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

  const selecionarRoles = async () => {
    let endpoint = op.conexion + "/roles/ConsultarTodos";
    console.log(endpoint);
    setActivate(true);

    //setLoading(false);

    let bodyF = new FormData();

    //bodyF.append("ID", user_id)

    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        console.log(response);
        setRoles(response);
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
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      onShow={() => {
        selecionarSucursales();
        selecionarRoles();
        setOperacion(props.operacion);
        setActivate(false);

        if (props.operacion !== 1) {
          console.log(props.id, operacion);
          selecionarUsuario(props.id);
        }
      }}
    >
      <Modal.Header className="bg-danger">
        <Modal.Title style={{ color: "#fff" }}>
          {operacion === 1
            ? "Registrar Usuarios Del Sistema"
            : operacion === 2
            ? "Editar Usuarios Del Sistema"
            : "Eliminar Usuarios Del Sistema"}
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
          <div class=" mb-1 col-md-4">
            <div class="input-group input-group-sm">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Usuario:
              </span>
              <input
                maxLength={12}
                type="text"
                class="form-control"
                ref={txtUsuario}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                name="user"
                onBlur={validarInput}
                onChange={(e) =>
                  (e.target.value = e.target.value.toUpperCase())
                }
              />
            </div>
            <div id="user" class="form-text hidden">
              Debe ingresar login de usuario
            </div>
          </div>
          {/* <div class=" mb-1 col-md-4">
            <div class="input-group input-group-sm">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Contraseña:
              </span>
              <input
                maxLength={12}
                type="text"
                class="form-control"
                ref={txtPass}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                name="passs"
                onBlur={validarInput}
                onChange={(e) =>
                  (e.target.value = e.target.value.toUpperCase())
                }
              />
            </div>
            <div id="passs" class="form-text hidden">
              Debe ingresar contraseña de usuario
            </div>
          </div> */}
          <div class=" mb-1 col-md-6">
            <div class="input-group input-group-sm">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Nombre:
              </span>
              <input
                maxLength={25}
                type="text"
                className="form-control"
                ref={txtNombre}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                name="nom"
                onBlur={validarInput}
                onChange={(e) => {
                  e.target.value = e.target.value.toUpperCase();
                  //validaSoloLetras();
                }}
              />
            </div>
            <div id="nom" class="form-text hidden">
              Debe ingresar nombre del usuario
            </div>
          </div>
          <div class=" mb-1 col-md-6">
            <div class="input-group input-group-sm">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Apellido:
              </span>
              <input
                maxLength={25}
                type="text"
                class="form-control"
                ref={txtApellido}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                name="ape"
                onBlur={validarInput}
                onChange={validaSoloLetras}
              />
            </div>
            <div id="ape" class="form-text hidden">
              Debe ingresar nombre del usuario
            </div>
          </div>
          <div class=" mb-1 col-md-4">
            <div class="input-group input-group-sm">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Cedula:
              </span>
              <select
                class="form-select col-md-3"
                ref={cmbNacionalidad}
                aria-label="Default select example"
              >
                <option value="V-">V-</option>
                <option value="E-">E-</option>
                <option value="J-">J-</option>
                <option value="G-">G-</option>
              </select>
              <input
                maxLength={9}
                type="text"
                class="form-control"
                ref={txtCedula}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                name="ced"
                onBlur={validarInput}
                onChange={validaSoloNumero}
              />
            </div>
            <div id="ced" class="form-text hidden">
              Debe ingresar la cedula del usuario
            </div>
          </div>
          <div class=" mb-1 col-md-4">
            <div class="input-group input-group-sm">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Telefono:
              </span>
              <select
                class="form-select col-md-4"
                ref={cmbTelefono}
                aria-label="Default select example"
              >
                <option value="0414-">0414-</option>
                <option value="0424-">0424-</option>
                <option value="0416-">0416-</option>
                <option value="0426-">0426-</option>
                <option value="0412-">0412-</option>
              </select>
              <input
                maxLength={8}
                type="text"
                class="form-control"
                ref={txtTelefono}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                name="tlf"
                onBlur={validarInput}
                onChange={validaSoloNumero}
              />
            </div>
            <div id="tlf" class="form-text hidden">
              Debe ingresar el telefono del usuario
            </div>
          </div>
          <div class=" mb-1 col-md-4">
            <div class="input-group input-group-sm">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Dirección:
              </span>
              <input
                maxLength={30}
                type="text"
                class="form-control"
                ref={txtDireccion}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                name="dir"
                onBlur={validarInput}
                onChange={(e) =>
                  (e.target.value = e.target.value.toUpperCase())
                }
              />
            </div>
            <div id="dir" class="form-text hidden">
              Debe ingresar la dirección del usuario
            </div>
          </div>
          <div class=" mb-1 col-md-4">
            <div class="input-group input-group-sm">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Correo:
              </span>
              <input
                maxLength={25}
                type="text"
                class="form-control"
                ref={txtCorreo}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                name="email"
                onBlur={validarInput}
                onChange={(e) =>
                  (e.target.value = e.target.value.toUpperCase())
                }
              />
            </div>
            <div id="email" class="form-text hidden">
              Debe ingresar el correo del usuario
            </div>
          </div>
          <div class=" mb-1 col-md-4">
            <div class="input-group input-group-sm">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Rol:
              </span>

              <select
                class="form-select"
                ref={txtRol}
                aria-label="Default select example"
              >
                {roles &&
                  roles.map((item, index) => (
                    <option key={index} value={item.roles_id}>
                      {" "}
                      {item.roles_nombre}{" "}
                    </option>
                  ))}
              </select>
            </div>
            <div id="email" class="form-text hidden">
              Debe ingresar el correo del usuario
            </div>
          </div>
          <div class=" mb-1 col-md-4">
            <div class="input-group input-group-sm">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Sucursal:
              </span>

              <select
                class="form-select"
                ref={txtSucursal}
                aria-label="Default select example"
              >
                {sucursales &&
                  sucursales.map((item, index) => (
                    <option key={index} value={item.sucursal_id}>
                      {" "}
                      {item.sucursal_nombre}{" "}
                    </option>
                  ))}
              </select>
            </div>
            <div id="email" class="form-text hidden">
              Debe ingresar el correo del usuario
            </div>
          </div>
          <div class="row mx-auto col-md-12">
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input "
                ref={check}
                type="checkbox"
                value="Contratos realizados"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Sucursales</label>
            </div>
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check1}
                type="checkbox"
                value="Contratos Realizados"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Tipos de Contratos</label>
            </div>
            {<div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check2}
                type="checkbox"
                value="Lista de sucursales"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Documentos</label>
            </div>}
            {<div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check3}
                type="checkbox"
                value="Tipo de contratos"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Chats</label>
            </div>}
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check4}
                type="checkbox"
                value="Uso de vehiculo"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Uso del Vehiculo</label>
            </div>
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check5}
                type="checkbox"
                value="Clase de vehiculo"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Clase De Vehiculo</label>
            </div>
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check6}
                type="checkbox"
                value="Tipo de Vehiculo"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Tipo De Vehiculo</label>
            </div>
            {<div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check7}
                type="checkbox"
                value="Linea de transporte"
                id="flexCheckDefault"
              />
              <label class="form-check-label"></label>
            </div>}
            {<div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check8}
                type="checkbox"
                value="Usuarios"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Lineas de Transporte</label>
            </div>}
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check9}
                type="checkbox"
                value="Roles"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Usuarios</label>
            </div>
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check10}
                type="checkbox"
                value="Roles"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Roles</label>
            </div>
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check11}
                type="checkbox"
                value="Roles"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Grafica</label>
            </div>
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check12}
                type="checkbox"
                value="Roles"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Gastos personales</label>
            </div>
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check16}
                type="checkbox"
                value="Roles"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Certificado Medico</label>
            </div>
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check13}
                type="checkbox"
                value="Roles"
                id="flexCheckDefault"
              />
              <label class="form-check-label">
                Reporte de usuarios
              </label>
            </div>
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check15}
                type="checkbox"
                value="Roles"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Reportes</label>
            </div>
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check14}
                type="checkbox"
                value="Roles"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Licencias</label>
            </div>
            {<div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check17}
                type="checkbox"
                value="Roles"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Imagen</label>
            </div>}
            {<div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check18}
                type="checkbox"
                value="Roles"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Bitacora</label>
            </div>}
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check19}
                type="checkbox"
                value="Asesor"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Asesor</label>
            </div>
            <div class="form-check col-md-4 mx-auto pl-5 mb-1">
              <input
                class="form-check-input"
                ref={check20}
                type="checkbox"
                value="Asesor"
                id="flexCheckDefault"
              />
              <label class="form-check-label">Tipo de Contrato TRC</label>
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
