import React, { useRef, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
/* import { Mensaje, MensajeSiNo } from "../mensajes"; */
import { Loader, Dimmer } from "semantic-ui-react";
import {
  validaSoloNumero,
  formatMoneda,
  validaMonto,
  formatoMonto,
  validaNumeroTelefono,
  validaEmail,
  validaSoloLetras,
} from "../../util/varios";
import "react-bootstrap-typeahead/css/Typeahead.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import moment from "moment";
import { Mensaje } from "../mensajes";
import CatalogoClientes from "../../catalogos/catalogoClientes";
import CatalogoTipoContrato from "../../catalogos/catalagoTipoContrato";
import CatalogoAcesor from "../../catalogos/catalogoAcesor";
import CatalogoSucursal from "../../catalogos/catalagoSucursal";
import CatalogoTransporte from "../../catalogos/catalagoTransporte";
import CatalogoUso from "../../catalogos/catalogoUso";
import CatalogoClase from "../../catalogos/catalogoClase";
import CatalogoTipo from "../../catalogos/catalagoTipoVehiculo";
import CatalogoTitular from "../../catalogos/catalogoTitular";
import CatalogoVehiculo from "../../catalogos/catalogoVehiculo";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { Typeahead } from "react-bootstrap-typeahead";
export const ModalRcv = (props) => {
  /*  variables de estados */
  let disabledButton = false;
  let op = require("../../modulos/datos");
  let token = localStorage.getItem("jwtToken");
  const fechasistema = JSON.parse(localStorage.getItem("fechasistema"));
  const dolarbcv = JSON.parse(localStorage.getItem("dolarbcv"));
  const user = JSON.parse(localStorage.getItem("username"));
  const idUser = JSON.parse(localStorage.getItem("user_id"));
  const suc = JSON.parse(localStorage.getItem("sucursal"));
  const idsucursal = JSON.parse(localStorage.getItem("idsucursal"));
  const [value, setValue] = useState("");
  const [variable, setVariable] = useState(false);
  let permisos = JSON.parse(localStorage.getItem("permisos"));
  //ID
  const idPoliza = useRef();
  const idCliente = useRef();
  const idTitular = useRef();
  const idVehiculo = useRef();
  // const idColor = useRef();
  // const idMarca = useRef();
  // const idModelo = useRef();
  const idCobertura = useRef();
  //Contrato
  const TxtTipoContrato = useRef();
  const txtDesde = useRef();
  const txtHasta = useRef();
  const cmbEstado = useRef();
  const txtAcesor = useRef();
  const cmbSucursal = useRef();
  const txtLinea = useRef();
  //Contratante
  const cmbNacionalidad = useRef();
  const txtCedula = useRef();
  const txtNombre = useRef();
  const txtApellido = useRef();
  const txtFechaNaci = useRef();
  const cmbTelefono = useRef();
  const txtTelefono = useRef();
  const txtCorreo = useRef();
  const txtDirec = useRef();
  //Titular
  const cmbNacionalidadTitular = useRef();
  const txtCedulatTitular = useRef();
  const txtNombreTitular = useRef();
  const txtApellidoTitular = useRef();
  //Vehiculo
  const txtPlaca = useRef();
  const txtPuesto = useRef();
  const txtUso = useRef();
  const txtAño = useRef();
  const txtSerMotor = useRef();
  const txtClase = useRef();
  const txtColor = useRef();
  const txtSerCarroceria = useRef();
  const cmbTipo = useRef();
  const txtModelo = useRef();
  const txtMarca = useRef();
  const txtPeso = useRef();
  const txtCapTon = useRef();

  //Pago
  const cmbFormaPago = useRef();
  const txtReferencia = useRef();
  const txtBs = useRef();
  const txtDolar = useRef();

  //otros
  const txtNContrato = useRef();
  const txtTipoContrato = useRef();
  const txtFechaEmision = useRef();
  const txtFechaVencimiento = useRef();
  const txtDireccion = useRef();
  const txtPuestos = useRef();
  const txtAnio = useRef();
  const txtTipoVehiculo = useRef();
  const txtCapTone = useRef();
  const [vehiculo, setVehiculo] = useState();
  const [tipoContrato, setTipoContrato] = useState([]);
  const [estados, setEstados] = useState();
  const [acesor, setAcesor] = useState();
  const [sucursal, setSucursal] = useState();
  const [transporte, setTransporte] = useState();
  const [uso, setUso] = useState();
  const [clase, setClase] = useState();
  const [tipo, setTipo] = useState();

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
  const [mostrar1, setMostrar1] = useState(false);
  const [mostrar2, setMostrar2] = useState(false);
  const [mostrar3, setMostrar3] = useState(false);

  const [mostrar4, setMostrar4] = useState(false);

  const [mostrar5, setMostrar5] = useState(false);

  const [mostrar6, setMostrar6] = useState(false);

  const [mostrar7, setMostrar7] = useState(false);
  const [mostrar8, setMostrar8] = useState(false);
  const [mostrar9, setMostrar9] = useState(false);

  const [idContrato, setIdContrato] = useState();
  const [operacion, setOperacion] = useState(0);
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

  /*********************************************** FUNCINES DE VALIDACION***********************************************************/

  const salir = () => {
    setValorSeleccionado({
      contrato_nombre: "",
      estado_nombre: "Portuguesa",
      usuario_usuario: user.toString(),
      sucursal_nombre: suc.toString(),
      transporte_nombre: "",
      usoVehiculo_nombre: "",
      clase_nombre: "",
      tipoVehiculo_nombre: "",
    });
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
  const consultarVehiculo = async ($placa) => {
    if ($placa == null || $placa == "") {
      setMensaje({
        mostrar: true,
        titulo: "Error.",
        texto: "Vehiculo no encontrado",
        icono: "error",
      });
    } else {
      let endpoint = op.conexion + "/vehiculo/ConsultarUno?Placa=" + $placa;
      let bodyF = new FormData();
      setActivate(true);
      await fetch(endpoint, {
        method: "POST",
        body: bodyF,
      })
        .then((res) => res.json())
        .then((response) => {
          setActivate(false);
          if (response == "" || response == null || response == []) {
            setMensaje({
              mostrar: true,
              titulo: "Error.",
              texto: "Vehiculo no encontrado",
              icono: "error",
            });
          } else {
            txtPuesto.current.value = response.vehiculo_puesto;
            txtAño.current.value = response.vehiculo_año;
            txtSerMotor.current.value = response.vehiculo_serialMotor;
            txtSerCarroceria.current.value = response.vehiculo_serialCarroceria;
            txtColor.current.value = response.color_nombre;
            txtMarca.current.value = response.marca_nombre;
            txtModelo.current.value = response.modelo_nombre;
            txtPeso.current.value = response.vehiculo_peso;
            txtCapTon.current.value = response.vehiculo_capTon;
            txtUso.current.value = response.usoVehiculo_nombre;
            cmbTipo.current.value = response.tipoVehiculo_nombre;
            txtClase.current.value = response.clase_nombre;
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
    }
  };

  const consultarContrato = async ($cedula, $placa) => {
    if ($cedula && $placa) {
      let endpoint = op.conexion + "poliza/ConsultarContrato";
      let bodyF = new FormData();
      bodyF.append("Cedula", $cedula);
      bodyF.append("Placa", $placa);

      setActivate(true);

      try {
        let response = await fetch(endpoint, {
          method: "POST",
          body: bodyF,
        });

        let data = await response.json();
        setActivate(false);
      } catch (error) {
        console.error(error);
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto: error.message,
          icono: "informacion",
        });
      }
    }
  };

  const tuFuncionEspecifica = async () => {
    if (
      txtCedula.current.value.length > 5 &&
      txtPlaca.current.value.length > 4
    ) {
      let endpoint = op.conexion + "/poliza/encontrarContrato";
      let bodyF = new FormData();
      bodyF.append(
        "Cedula",
        cmbNacionalidad.current.value + txtCedula.current.value
      );
      bodyF.append("Placa", txtPlaca.current.value);
      setActivate(true);
      await fetch(endpoint, {
        method: "POST",
        body: bodyF,
      })
        .then((res) => res.json())
        .then((response) => {
          setActivate(false);
          if (response.code == 200) {
            setMensaje({
              mostrar: true,
              titulo: "Contrato ya registrado.",
              texto: response.res,
              icono: "informacion",
            });
            setOperacion(3);
            idPoliza.current.value = response.contrato[0].poliza_id;
            idCliente.current.value = response.contrato[0].cliente_id;
            idTitular.current.value = response.contrato[0].titular_id;
            idVehiculo.current.value = response.contrato[0].vehiculo_id;
            idCobertura.current.value = response.contrato[0].nota_id;
            //TxtTipoContrato.current.value = response.contrato[0].contrato_nombre;
            txtDesde.current.value = response.contrato[0].poliza_fechaInicio;
            txtHasta.current.value =
              response.contrato[0].poliza_fechaVencimiento;
            var cedula = response.contrato[0].cliente_cedula.split("-");
            cmbNacionalidad.current.value = cedula[0] + "-";
            txtCedula.current.value = cedula[1];
            txtNombre.current.value = response.contrato[0].cliente_nombre;
            txtApellido.current.value = response.contrato[0].cliente_apellido;
            txtFechaNaci.current.value =
              response.contrato[0].cliente_fechaNacimiento;
            var telefono = response.contrato[0].cliente_telefono.split("-");
            cmbTelefono.current.value = telefono[0] + "-";
            txtTelefono.current.value = telefono[1];
            txtCorreo.current.value = response.contrato[0].cliente_correo;
            txtDirec.current.value = response.contrato[0].cliente_direccion;
            // if (!response.contrato[0].estado_nombre) {
            //   cmbEstado.current.value = "Portuguesa";
            // } else {
            //   cmbEstado.current.value = response.contrato[0].estado_nombre;
            // }

            // if (response.contrato[0].usuario_usuario == null) {
            //   txtAcesor.current.value = "MFIGUEROA";
            // } else {
            //   txtAcesor.current.value = response.contrato[0].usuario_usuario;
            // }
            // cmbSucursal.current.value = response.contrato[0].sucursal_nombre;
            // if (!response.contrato[0].linea_nombre) {
            //   txtLinea.current.value = "";
            // } else {
            //   txtLinea.current.value = response.contrato[0].linea_nombre;
            // }
            var cedulaTitular = response.contrato[0].titular_cedula.split("-");
            cmbNacionalidadTitular.current.value = cedulaTitular[0] + "-";
            txtCedulatTitular.current.value = cedulaTitular[1];
            txtNombreTitular.current.value =
              response.contrato[0].titular_nombre;
            txtApellidoTitular.current.value =
              response.contrato[0].titular_apellido;
            txtPlaca.current.value = response.contrato[0].vehiculo_placa;
            txtPuesto.current.value = response.contrato[0].vehiculo_puesto;
            //txtUso.current.value = response.contrato[0].usoVehiculo_nombre;
            txtAño.current.value = response.contrato[0].vehiculo_año;
            txtSerMotor.current.value =
              response.contrato[0].vehiculo_serialMotor;
            //txtClase.current.value = response.contrato[0].clase_nombre;
            txtColor.current.value = response.contrato[0].color_nombre;
            txtSerCarroceria.current.value =
              response.contrato[0].vehiculo_serialCarroceria;
            // cmbTipo.current.value = response.contrato[0].tipoVehiculo_nombre;
            txtModelo.current.value = response.contrato[0].modelo_nombre;
            txtMarca.current.value = response.contrato[0].marca_nombre;
            txtPeso.current.value = response.contrato[0].vehiculo_peso;
            txtCapTon.current.value = response.contrato[0].vehiculo_capTon;
            if (response.contrato[0].nota_tipoPago == null) {
              cmbFormaPago.current.value = 0;
            } else {
              cmbFormaPago.current.value = response.contrato[0].nota_tipoPago;
            }
            setValorSeleccionado({
              ...valorSeleccionado,
              contrato_nombre: response.contrato[0].contrato_nombre,
              estado_nombre: response.contrato[0].estado_nombre
                ? response.contrato[0].estado_nombre
                : "",
              usuario_usuario: user,
              sucursal_nombre: suc,
              transporte_nombre: response.contrato[0].linea_nombre
                ? response.contrato[0].linea_nombre
                : "",
              usoVehiculo_nombre: response.contrato[0].usoVehiculo_nombre,
              clase_nombre: response.contrato[0].clase_nombre,
              tipoVehiculo_nombre: response.contrato[0].tipoVehiculo_nombre,
            });
            txtReferencia.current.value = response.contrato[0].nota_referencia;
            txtDolar.current.value = response.contrato[0].nota_monto;
            txtBs.current.value = (
              response.contrato[0].nota_monto * dolarbcv
            ).toFixed(2);
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
    }
  };

  const consultarTitular = async ($cedula) => {
    let endpoint = op.conexion + "/cliente/consultarCedulaTitular";
    let bodyF = new FormData();
    bodyF.append("cedula", $cedula);
    setActivate(true);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        if (response.code == 400) {
          setMensaje({
            mostrar: true,
            titulo: "Error.",
            texto: response.res,
            icono: "error",
          });
        } else {
          txtNombreTitular.current.value = response.cliente.titular_nombre;
          txtApellidoTitular.current.value = response.cliente.titular_apellido;
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
  const consultarCliente = async ($cedula) => {
    let endpoint = op.conexion + "/cliente/consultarCedulaCliente";
    let bodyF = new FormData();
    bodyF.append("cedula", $cedula);
    setActivate(true);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        if (response.code == 400) {
          setMensaje({
            mostrar: true,
            titulo: "Error.",
            texto: response.res,
            icono: "error",
          });
        } else {
          txtFechaNaci.current.value = response.cliente.cliente_fechaNacimiento;
          txtNombre.current.value = response.cliente.cliente_nombre;
          txtApellido.current.value = response.cliente.cliente_apellido;
          let telefono = response.cliente.cliente_telefono.split("-");
          if (telefono[1] == null) {
            cmbTelefono.current.value = "0412-";
            txtTelefono.current.value = "";
          } else {
            cmbTelefono.current.value = telefono[0] + "-";
            txtTelefono.current.value = telefono[1];
          }

          txtCorreo.current.value = response.cliente.cliente_correo;
          txtDirec.current.value = response.cliente.cliente_direccion;
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
  const actualizarCertificado = async () => {
    let endpoint = "";
    if (operacion === 2) {
      endpoint = op.conexion + "/poliza/editar";
    } else if (operacion === 3) {
      endpoint = op.conexion + "/poliza/renovar";
    } else {
      endpoint = op.conexion + "/poliza/registrar";
    }

    setActivate(true);

    //setLoading(false);

    let bodyF = new FormData();

    //ID
    bodyF.append("ID", idPoliza.current.value);
    bodyF.append("idCliente", idCliente.current.value);
    bodyF.append("idTitular", idTitular.current.value);
    bodyF.append("idVehiculo", idVehiculo.current.value);
    bodyF.append("idCobertura", idCobertura.current.value);
    //Contrato
    bodyF.append("fechaInicio", txtDesde.current.value);
    bodyF.append("fechaVencimiento", txtHasta.current.value);
    bodyF.append("tipoContrato", valorSeleccionado.contrato_nombre);
    bodyF.append("Estado", valorSeleccionado.estado_nombre);
    bodyF.append("Usuario", valorSeleccionado.usuario_usuario);
    bodyF.append("Sucursal", valorSeleccionado.sucursal_nombre);
    //Contratante
    bodyF.append(
      "Cedula",
      cmbNacionalidad.current.value + txtCedula.current.value
    );
    bodyF.append("Nombre", txtNombre.current.value);
    bodyF.append("Apellido", txtApellido.current.value);
    bodyF.append("fechaNacimiento", txtFechaNaci.current.value);
    bodyF.append(
      "Telefono",
      cmbTelefono.current.value + txtTelefono.current.value
    );
    bodyF.append("Correo", txtCorreo.current.value);
    bodyF.append("Direccion", txtDirec.current.value);
    //titular
    bodyF.append(
      "cedulaTitular",
      cmbNacionalidadTitular.current.value + txtCedulatTitular.current.value
    );
    bodyF.append("nombreTitular", txtNombreTitular.current.value);
    bodyF.append("apellidoTitular", txtApellidoTitular.current.value);

    //Vehiculo
    bodyF.append("Placa", txtPlaca.current.value);
    bodyF.append("Puesto", txtPuesto.current.value);
    bodyF.append("Ano", txtAño.current.value);
    bodyF.append("serialMotor", txtSerMotor.current.value);
    bodyF.append("serialCarroceria", txtSerCarroceria.current.value);
    bodyF.append("Color", txtColor.current.value);
    bodyF.append("Uso", valorSeleccionado.usoVehiculo_nombre);
    bodyF.append("Clase", valorSeleccionado.clase_nombre);
    bodyF.append("Tipo", valorSeleccionado.tipoVehiculo_nombre);
    bodyF.append("Modelo", txtModelo.current.value);
    bodyF.append("Marca", txtMarca.current.value);
    if (txtPeso.current.value == "" || txtCapTon.current.value == "") {
      bodyF.append("Peso", "0.00");
      bodyF.append("Capacidad", "0.00");
    } else {
      bodyF.append("Peso", txtPeso.current.value);
      bodyF.append("Capacidad", txtCapTon.current.value);
    }

    //Cobertura
    var monto = txtBs.current.value.replace(",", ".");
    bodyF.append("danoCosas", monto * 0.4);
    bodyF.append("danoPersonas", monto * 0.2);
    bodyF.append("fianza", monto * 0.1);
    bodyF.append("asistencia", monto * 0.1);
    bodyF.append("apov", monto * 1);
    bodyF.append("muerte", monto * 0.1);
    bodyF.append("invalidez", monto * 0);
    bodyF.append("medico", monto * 0);
    bodyF.append("grua", monto * 0.1);
    bodyF.append("monto", monto);

    //Pago
    bodyF.append("metodoPago", cmbFormaPago.current.value);
    bodyF.append("Referencia", txtReferencia.current.value);
    bodyF.append("cantidadDolar", txtDolar.current.value);
    bodyF.append("precioDolar", dolarbcv.toFixed(2));
    bodyF.append("token", token);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        if (response.code == 200) {
          setMensaje({
            mostrar: true,
            titulo: "Exito.",
            texto: response.res,
            icono: "exito",
          });
        }
        if (response.code == 400) {
          setMensaje({
            mostrar: true,
            titulo: "Error.",
            texto: response.res,
            icono: "error",
          });
        }
        setIdContrato(response.id);
      })
      .catch((error) =>
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto: error.res,
          icono: "informacion",
        })
      )
      .finally(() => {
        disabledButton = false;
      });
  };

  const selecionarPrecio = async () => {
    if (valorSeleccionado.contrato_nombre === "") {
      setMensaje({
        mostrar: true,
        titulo: "Notificación",
        texto: "No se puede consultar sin el contrato seleccionado",
        icono: "informacion",
      });
      return false;
    }

    if (valorSeleccionado.tipoVehiculo_nombre === "") {
      setMensaje({
        mostrar: true,
        titulo: "Notificación",
        texto: "No se puede consultar sin el tipo de vehiculo seleccionado",
        icono: "informacion",
      });
      return false;
    }

    let endpoint = op.conexion + "/tipo_vehiculo/ConsultarPrecio";
    setActivate(true);
    let bodyF = new FormData();
    bodyF.append("Contrato", valorSeleccionado.contrato_nombre);
    bodyF.append("Tipo", valorSeleccionado.tipoVehiculo_nombre);
    bodyF.append("Sucursal", idsucursal);

    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);

        if (response[0]) {
          txtDolar.current.value = response[0]["precio_monto"];

          txtBs.current.value = (
            response[0]["precio_monto"] * dolarbcv
          ).toFixed(2);

          setTipoContrato(response);
        } else {
          setMensaje({
            mostrar: true,
            titulo: "Notificación",
            texto:
              "No hay un registro de presio de para este tipo de vehiuvlo y su tipo contrato",
            icono: "informacion",
          });
        }

        //  txtDolar.current.value(response.precio_monto);
      })
      .catch((error) => console.log("Precio: Falta uno de los parametros"));
  };

  const selecionarTipoContrato = async () => {
    let endpoint = op.conexion + "/tipo_contrato/ConsultarTodos";
    setActivate(true);
    let bodyF = new FormData();
    // bodyF.append("ID", user_id)
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        if (permisos.length > 19) {
          if (permisos[20] == 1) {
            const validatedContract = response.filter(
              (contract) =>
                contract.contrato_id == "1" || contract.contrato_id == "3"
            );
            setTipoContrato(validatedContract);
          } else {
            const validatedContract = response.filter(
              (contract) => contract.contrato_id == "1"
            );
            setTipoContrato(validatedContract);
          }
        } else {
          const validatedContract = response.filter(
            (contract) => contract.contrato_id == "1"
          );
          setTipoContrato(validatedContract);
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

  const selecionarEstado = async () => {
    let endpoint = op.conexion + "/estado/ConsultarTodos";
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

        setEstados(response);
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

  const selecionarSucursal = async () => {
    let endpoint = op.conexion + "/sucursal/ConsultarTodos";
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
        setSucursal(response);
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

  const selecionarTransporte = async () => {
    let endpoint = op.conexion + "/transporte/ConsultarTodos";
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
        setTransporte(response);
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

  const selecionarUso = async () => {
    let endpoint = op.conexion + "/usoVehiculo/ConsultarTodos";
    setActivate(true);
    let bodyF = new FormData();
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setUso(response);
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

  const selecionarClase = async () => {
    let endpoint = op.conexion + "/claseVehiculo/ConsultarTodos";
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
        setClase(response);
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

  const selecionarTipo = async () => {
    let endpoint = "";
    if (typeof tipoContrato === "object") {
      endpoint = `${
        op.conexion
      }/tipo_vehiculo/ConsultarTodos?Sucursal=${idsucursal}&Contrato=${1}`;
    } else {
      endpoint = `${op.conexion}/tipo_vehiculo/ConsultarTodos?Sucursal=${idsucursal}&Contrato=${tipoContrato}`;
    }
    setActivate(true);
    let bodyF = new FormData();
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setTipo(response);
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
    disabledButton = true;
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
  // Para poder la fecha en rcv

  let fechaSistema = moment();
  let fechaHasta = fechaSistema.clone().add(1, "year");

  const check = (e) => {
    var textV = "which" in e ? e.which : e.keyCode,
      char = String.fromCharCode(textV),
      regex = /[a-z]/gi;
    if (!regex.test(char)) e.preventDefault();
    return false;
  };
  const seleccionarCliente = (
    nombre,
    apellido,
    cedula,
    nacionalidad,
    correo,
    codigo,
    telefono,
    dir
  ) => {
    cmbNacionalidad.current.value = nacionalidad + "-";
    txtCedula.current.value = cedula;
    txtApellido.current.value = apellido;
    txtNombre.current.value = nombre;
    cmbTelefono.current.value = codigo + "-";
    txtTelefono.current.value = telefono;
    txtCorreo.current.value = correo;
    txtDirec.current.value = dir;
    let item = document.getElementById("ced");
    item.className -= " form-text fw-bold visible ";
    item.className += " form-text fw-bold hidden ";
    setMostrar(false);
  };
  const seleccionarVehiculo = (
    placa,
    puesto,
    uso,
    ano,
    serMotor,
    clase,
    color,
    serCarroceria,
    tipo,
    modelo,
    marca,
    peso,
    capTotal
  ) => {
    setMostrar8(false);

    txtPlaca.current.value = placa;
    txtPuesto.current.value = puesto;
    txtUso.current.value = uso;
    txtAño.current.value = ano;
    txtSerMotor.current.value = serMotor;
    txtClase.current.value = clase;
    txtColor.current.value = color;
    txtSerCarroceria.current.value = serCarroceria;
    cmbTipo.current.value = tipo;
    txtModelo.current.value = modelo;
    txtMarca.current.value = marca;
    txtPeso.current.value = peso;
    txtCapTon.current.value = capTotal;
    setMostrar(false);
    selecionarPrecio();
  };
  const seleccionarTitular = (nombre, apellido, cedula, nacionalidad) => {
    setMostrar9(false);
    cmbNacionalidadTitular.current.value = nacionalidad + "-";
    txtCedulatTitular.current.value = cedula;
    txtNombreTitular.current.value = nombre;
    txtApellidoTitular.current.value = apellido;
    setMostrar(false);
  };

  const cerrarModal = () => {
    setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
    props.onHideCancela2(idContrato);
  };

  const validarTitular = (e) => {
    if (e.target.value === txtCedula.current.value) {
      txtNombreTitular.current.value = txtNombre.current.value;
      txtApellidoTitular.current.value = txtApellido.current.value;
    } else {
      txtNombreTitular.current.value = "";
      txtApellidoTitular.current.value = "";
    }
  };
  const buscarSucursal = async ($a) => {
    let endpoint = op.conexion + "/sucursal/buscarSucursal";
    setActivate(true);
    let bodyF = new FormData();
    bodyF.append("Nombre", $a);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setValorSeleccionado({
          ...valorSeleccionado,
          sucursal_nombre: response[0]["sucursal_nombre"],
          usuario_usuario: $a,
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

  function soloLetras(event) {
    if (
      (event.keyCode != 32 && event.keyCode < 65) ||
      (event.keyCode > 90 && event.keyCode < 97) ||
      event.keyCode > 122
    )
      event.returnValue = false;
  }
  const handleFormaPagoChange = () => {
    const selectedOption = cmbFormaPago.current.value;

    // Si la opción seleccionada es "Efectivo" o "Punto", deshabilita el input de referencia; de lo contrario, habilítalo.
    if (selectedOption === "1" || selectedOption === "3") {
      txtReferencia.current.disabled = true;
      txtReferencia.current.value = "";
    } else {
      txtReferencia.current.disabled = false;
    }
  };
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

  const selectTipoContrato = (nombre) => {
    setMostrar1(false);
    TxtTipoContrato.current.value = nombre;
  };

  const selectAcesor = (nombre) => {
    setMostrar2(false);
    txtAcesor.current.value = nombre;
  };

  const selectSucursal = (nombre) => {
    setMostrar3(false);
    cmbSucursal.current.value = nombre;
  };

  const selectTransporte = (nombre) => {
    setMostrar4(false);
    txtLinea.current.value = nombre;
  };

  const selectUso = (nombre) => {
    setMostrar5(false);
    txtUso.current.value = nombre;
  };

  const selectClase = (nombre) => {
    setMostrar6(false);
    txtClase.current.value = nombre;
  };

  const selectTipo = (nombre, precio) => {
    setMostrar7(false);
    cmbTipo.current.value = nombre;
    txtDolar.current.value = precio;
    let bs = parseFloat(dolarbcv);
    let total = parseFloat(precio) * bs;
    txtBs.current.value = formatMoneda(
      total.toString().replace(",", "").replace(".", ","),
      ",",
      ".",
      2
    );
  };

  const igualA = async (e) => {
    let contratante = cmbNacionalidad.current.value + txtCedula.current.value;
    let titular =
      cmbNacionalidadTitular.current.value + txtCedulatTitular.current.value;

    if (e == 1) {
      if (contratante === titular) {
        txtNombre.current.value = txtNombreTitular.current.value;
        txtApellido.current.value = txtApellidoTitular.current.value;
      }
    } else if (e == 2) {
      if (titular === contratante) {
        txtNombreTitular.current.value = txtNombre.current.value;
        txtApellidoTitular.current.value = txtApellido.current.value;
      }
    }
  };

  const [contrato, setContrato] = useState([]);

  const selecionarRegistros = async (id) => {
    let endpoint = op.conexion + "/poliza/ConsultarUno?ID=" + id;
    setActivate(true);
    // let bodyF = new FormData();
    //    bodyF.append("ID", id)
    await fetch(endpoint, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setContrato(response[0].contrato_nombre);
        setValorSeleccionado({
          ...valorSeleccionado,
          contrato_nombre: response[0].contrato_nombre,
          estado_nombre: response[0].estado_nombre
            ? response[0].estado_nombre
            : "",
          usuario_usuario: idUser != 57 ? user : response[0].usuario_usuario,
          sucursal_nombre: idUser != 57 ? suc : response[0].sucursal_nombre,
          transporte_nombre: response[0].linea_nombre
            ? response[0].linea_nombre
            : "",
          usoVehiculo_nombre: response[0].usoVehiculo_nombre,
          clase_nombre: response[0].clase_nombre,
          tipoVehiculo_nombre: response[0].tipoVehiculo_nombre,
        });
        // setValorSeleccionado({
        //   contrato_nombre:"BASICO",
        //   estado_nombre:'1',
        //   usuario_usuario:"MARIANNY DEL CARMEN",
        //   sucursal_nombre:"GUANARITO",
        //   transporte_nombre:'hola',
        //   usoVehiculo_nombre:"PARTICULAR",
        //   clase_nombre:"AUTOMOVIL",
        //   tipoVehiculo_nombre:"camion 750"
        // });
        idPoliza.current.value = response[0].poliza_id;
        // contrato_nombre: response[0].contrato_nombre,
        // estado_nombre: response[0].estado_nombre ?  response[0].estado_nombre : '',
        // usuario_usuario: response[0].usuario_usuario,
        // sucursal_nombre:response[0].sucursal_nombre,
        // transporte_nombre: response[0].linea_nombre ?  response[0].linea_nombre : '',
        // usoVehiculo_nombre: response[0].usoVehiculo_nombre,
        // clase_nombre:response[0].clase_nombre,
        // tipoVehiculo_nombre: response[0].tipoVehiculo_nombre

        idCliente.current.value = response[0].cliente_id;
        idTitular.current.value = response[0].titular_id;
        idVehiculo.current.value = response[0].vehiculo_id;
        idCobertura.current.value = response[0].nota_id;
        txtDesde.current.value = response[0].poliza_fechaInicio;
        txtHasta.current.value = response[0].poliza_fechaVencimiento;
        var cedula = response[0].cliente_cedula.split("-");
        cmbNacionalidad.current.value = cedula[0] + "-";
        txtCedula.current.value = cedula[1];
        txtNombre.current.value = response[0].cliente_nombre;
        txtApellido.current.value = response[0].cliente_apellido;
        txtFechaNaci.current.value = response[0].cliente_fechaNacimiento;
        var telefono = response[0].cliente_telefono.split("-");
        if (telefono[0] != "" && telefono[1] != "") {
          cmbTelefono.current.value = telefono[0] + "-";
          txtTelefono.current.value = telefono[1];
        } else {
          cmbTelefono.current.value = "0414-";
          txtTelefono.current.value = "";
        }

        txtCorreo.current.value = response[0].cliente_correo;
        txtDirec.current.value = response[0].cliente_direccion;

        var cedulaTitular = response[0].titular_cedula.split("-");
        cmbNacionalidadTitular.current.value = cedulaTitular[0] + "-";
        txtCedulatTitular.current.value = cedulaTitular[1];
        txtNombreTitular.current.value = response[0].titular_nombre;
        txtApellidoTitular.current.value = response[0].titular_apellido;
        txtPlaca.current.value = response[0].vehiculo_placa;
        txtPuesto.current.value = response[0].vehiculo_puesto;

        txtAño.current.value = response[0].vehiculo_año;
        txtSerMotor.current.value = response[0].vehiculo_serialMotor;

        txtColor.current.value = response[0].color_nombre;
        txtSerCarroceria.current.value = response[0].vehiculo_serialCarroceria;

        txtModelo.current.value = response[0].modelo_nombre;
        txtMarca.current.value = response[0].marca_nombre;
        txtPeso.current.value = response[0].vehiculo_peso;
        txtCapTon.current.value = response[0].vehiculo_capTon;
      })
      .catch((error) => {
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto: error.res,
          icono: "informacion",
        });
      });
  };

  function validarIguales(e) {
    if (e == 1) {
      if (txtModelo.current.value == txtMarca.current.value) {
        txtModelo.current.value = "";
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto: "El modelo del vehiculo no puede ser igual a la marca",
          icono: "informacion",
        });
      }
    }
    if (e == 2) {
      if (txtMarca.current.value == txtModelo.current.value) {
        txtMarca.current.value = "";
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto: "La marca del vehiculo no puede ser igual al modelo",
          icono: "informacion",
        });
      }
    }
    if (e == 3) {
      if (txtSerMotor.current.value == txtSerCarroceria.current.value) {
        txtSerMotor.current.value = "";
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto:
            "El serial del motor no puede ser igual al serial de carroceria",
          icono: "informacion",
        });
      }
    }
    if (e == 4) {
      if (txtSerCarroceria.current.value == txtSerMotor.current.value) {
        txtSerCarroceria.current.value = "";
        setMensaje({
          mostrar: true,
          titulo: "Notificación",
          texto:
            "El serial del carroceria no puede ser igual al serial del motor",
          icono: "informacion",
        });
      }
    }
  }

  const [selectedContrato, setSelectedContrato] = useState(null);

  const handleChange = (event, newValue) => {
    setSelectedContrato(newValue); // newValue contiene el objeto seleccionado
    setValorSeleccionado({
      ...valorSeleccionado,
      contrato_nombre: newValue.contrato_nombre,
    });
  };

  const validarInput = (e) => {
    let item = document.getElementById(e.target.name);
    if (
      !e.target.value ||
      (e.target.name === "ced" && e.target.value.length < 8)
    ) {
      item.className -= " form-text fw-bold hidden ";
      item.className += " form-text fw-bold visible ";
    } else {
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
        selecionarClase();
        selecionarTipoContrato();
        selecionarEstado();
        selecionarAcesor();
        selecionarSucursal();
        selecionarTransporte();
        selecionarUso();
        selecionarTipo();
        setOperacion(props.operacion);
        if (props.operacion === 2 || props.operacion === 3) {
          selecionarRegistros(props.idCliente);
        }
        setOperacion(props.operacion);
      }}
    >
      <Modal.Header className="bg-danger">
        <Modal.Title style={{ color: "#fff" }}>
          <Modal.Title style={{ color: "#fff" }}>
            {operacion == 1
              ? "Registro de RCV"
              : operacion == 2
              ? "Editar de RCV"
              : operacion == 3
              ? "Renovar de RCV"
              : "Registro de RCV"}
          </Modal.Title>{" "}
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
        <CatalogoVehiculo
          show={mostrar8}
          onHideCancela={() => {
            setMostrar8(false);
          }}
          onHideCatalogo={seleccionarVehiculo}
        />

        <CatalogoClientes
          show={mostrar}
          onHideCancela={() => {
            setMostrar(false);
          }}
          onHideCatalogo={seleccionarCliente}
        />

        <CatalogoTitular
          show={mostrar9}
          onHideCancela={() => {
            setMostrar9(false);
          }}
          onHideCatalogo={seleccionarTitular}
        />

        <CatalogoTipoContrato
          records={tipoContrato}
          show={mostrar1}
          onHideCancela={() => {
            setMostrar1(false);
          }}
          onHideCatalogo={selectTipoContrato}
        />

        <CatalogoAcesor
          records={acesor}
          show={mostrar2}
          onHideCancela={() => {
            setMostrar2(false);
          }}
          onHideCatalogo={selectAcesor}
        />

        <CatalogoSucursal
          records={sucursal}
          show={mostrar3}
          onHideCancela={() => {
            setMostrar3(false);
          }}
          onHideCatalogo={selectSucursal}
        />

        <CatalogoTransporte
          records={transporte}
          show={mostrar4}
          onHideCancela={() => {
            setMostrar4(false);
          }}
          onHideCatalogo={selectTransporte}
        />

        <CatalogoUso
          records={uso}
          show={mostrar5}
          onHideCancela={() => {
            setMostrar5(false);
          }}
          onHideCatalogo={selectUso}
        />

        <CatalogoClase
          records={clase}
          show={mostrar6}
          onHideCancela={() => {
            setMostrar6(false);
          }}
          onHideCatalogo={selectClase}
        />
        <CatalogoTipo
          records={tipo}
          show={mostrar7}
          onHideCancela={() => {
            setMostrar7(false);
          }}
          onHideCatalogo={selectTipo}
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

        <ul class="nav nav-tabs mb-2" id="ex1" role="tablist">
          <li class="nav-item" role="presentation">
            <a
              class="nav-link rounded bg-danger active"
              id="ex1-tab-1"
              data-mdb-toggle="tab"
              href="#ex1-tabs-1"
              role="tab"
              aria-controls="ex1-tabs-1"
              aria-selected="true"
            >
              Datos del Cliente
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a
              class="nav-link rounded bg-info"
              id="ex1-tab-2"
              data-mdb-toggle="tab"
              href="#ex1-tabs-2"
              role="tab"
              aria-controls="ex1-tabs-2"
              aria-selected="false"
            >
              Datos del Vehiculo
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a
              onClick={() => {
                selecionarPrecio();
                setVariable(true);
              }}
              class="nav-link rounded bg-warning"
              id="ex1-tab-3"
              data-mdb-toggle="tab"
              href="#ex1-tabs-3"
              role="tab"
              aria-controls="ex1-tabs-3"
              aria-selected="false"
            >
              Forma de Pago
            </a>
          </li>
        </ul>

        <div class="tab-content" id="ex1-content">
          <div
            class="tab-pane fade show active"
            id="ex1-tabs-1"
            role="tabpanel"
            aria-labelledby="ex1-tab-1"
          >
            <div class="col-md-12 row mx-auto pt-2">
              <div class="col-md-5">
                <div class="input-group input-group-sm mb-2 ">
                  <input type="hidden" ref={idPoliza} />
                  <input type="hidden" ref={idCliente} />
                  <input type="hidden" ref={idTitular} />
                  <input type="hidden" ref={idVehiculo} />
                  <input type="hidden" ref={idCobertura} />

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
                        style={{ color: "#90EE90" }}
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
              </div>
              <div class="col-md-1"></div>
              <div class="col-md-3">
                <div class="input-group input-group-sm mb-2">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Desde
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    ref={txtDesde}
                    disabled
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    defaultValue={fechaSistema.format("YYYY-MM-DD")}
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="input-group input-group-sm mb-2">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Hasta
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    ref={txtHasta}
                    disabled
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    defaultValue={fechaHasta.format("YYYY-MM-DD")}
                  />
                </div>
              </div>
              <fieldset class="border rounded-3 p-3 row mx-auto">
                <legend
                  class="float-none w-auto px-3 fw-bold"
                  style={{ fontSize: 15 }}
                >
                  Datos del contratante
                </legend>
                <div className="input-group input-group-sm mb-1 col-md-5">
                  <span
                    style={{ background: "red" }}
                    className="input-group-text"
                    id="inputGroup-sizing-sm"
                  >
                    Cedula:
                  </span>
                  <select
                    disabled={
                      (operacion == 3 && idUser != 57) ||
                      (idUser != 57 && operacion === 2)
                    }
                    className="form-select col-md-1"
                    ref={cmbNacionalidad}
                    aria-label="Default select example"
                    style={{ padding: 0 }} // Estilo en línea para quitar el padding
                  >
                    <option value="V-">V-</option>
                    <option value="E-">E-</option>
                    <option value="J-">J-</option>
                    <option value="G-">G-</option>
                  </select>
                  <input
                    type="text"
                    className="form-control"
                    disabled={
                      (operacion == 3 && idUser != 57) ||
                      (idUser != 57 && operacion == 2)
                    }
                    ref={txtCedula}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    onBlur={validarInput}
                    name="cedcon"
                    onChange={(e) => {
                      validaSoloNumero(e);
                      tuFuncionEspecifica();
                      igualA(1);
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() =>
                      consultarCliente(
                        cmbNacionalidad.current.value + txtCedula.current.value
                      )
                    }
                  >
                    <i className="fa fa-search"></i>
                  </button>

                  <div id="cedcon" className="form-text hidden">
                    Debe ingresar caracteres númericos con una longitud(8-9)
                  </div>
                </div>
                <div class="col-md-3"></div>
                <div class="col-md-4 mb-1">
                  <div class="input-group input-group-sm">
                    <span
                      style={{ background: "#90EE90" }}
                      class="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Fecha Nacimiento
                    </span>
                    <input
                      disabled={operacion == 3 && idUser != 57}
                      type="date"
                      ref={txtFechaNaci}
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      name="fechacon"
                      onBlur={validarInput}
                    />
                  </div>
                  <div id="fechacon" class="form-text hidden">
                    Debe ingresar fecha valida
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="input-group input-group-sm mb-2">
                    <span
                      style={{ background: "#90EE90" }}
                      class="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Nombre
                    </span>
                    <input
                      type="text"
                      disabled={operacion == 3 && idUser != 57}
                      maxLength={25}
                      ref={txtNombre}
                      class="form-control "
                      name="nomtac"
                      onBlur={validarInput}
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) =>
                        (e.target.value = e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <div id="nomtac" class="form-text hidden">
                    Solo puedes ingresar caracteres alfabéticos con una
                    longitut(3-25)
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group input-group-sm mb-2">
                    <span
                      style={{ background: "#90EE90" }}
                      class="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Apellido
                    </span>
                    <input
                      disabled={operacion == 3 && idUser != 57}
                      type="text"
                      ref={txtApellido}
                      maxLength={25}
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) =>
                        (e.target.value = e.target.value.toUpperCase())
                      }
                      onBlur={validarInput}
                      name="apecon"
                    />
                  </div>
                  <div id="apecon" class="form-text hidden">
                    Solo puedes ingresar caracteres alfabéticos con una
                    longitut(3-25)
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="input-group input-group-sm mb-2">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Telefono
                    </span>
                    <select
                      class="form-select col-md-4"
                      ref={cmbTelefono}
                      aria-label="Default select example"
                    >
                      <option value="0414-">0414</option>
                      <option value="0424-">0424</option>
                      <option value="0422-">0422</option>
                      <option value="0416-">0416</option>
                      <option value="0426-">0426</option>
                      <option value="0412-">0412</option>
                    </select>
                    <input
                      type="text"
                      class="form-control"
                      maxLength={7}
                      ref={txtTelefono}
                      name="telfcon"
                      onBlur={validarInput}
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={validaSoloNumero}
                    />
                  </div>
                  <div id="telfcon" class="form-text hidden">
                    Debe ingresar caracteres númericos con una longitud(8-9).
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="input-group input-group-sm mb-2">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Correo
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      maxLength={30}
                      ref={txtCorreo}
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) =>
                        (e.target.value = e.target.value.toUpperCase())
                      }
                    />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="input-group input-group-sm mb-2">
                    <span
                      style={{ background: "#90EE90" }}
                      class="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Direción
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      maxLength={100}
                      ref={txtDirec}
                      name="direccioncon"
                      onBlur={validarInput}
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) =>
                        (e.target.value = e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <div id="direccioncon" class="form-text hidden">
                    Debe ingresar la direccion
                  </div>
                </div>
                <div class="col-md-4 mb-1 mt-1">
                  {/* <div class="input-group input-group-sm mb-2 ">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Estado:{" "}
                    </span>
                     <select
                      disabled={operacion === 3}
                      class="form-select"
                      ref={cmbEstado}
                      aria-label="Default select example"
                    >
                      {estados &&
                        estados.map((item, index) => (
                          <option key={index} value={item.estado_id}>
                            {" "}
                            {item.estado_nombre}{" "}
                          </option>
                        ))}
                    </select>

                    <Typeahead
                      id="myTypeahead"
                      onChange={(selected) => {
                        if (
                          selected &&
                          selected.length > 0 &&
                          selected[0].estado_nombre
                        ) {
                          setValorSeleccionado({
                            ...valorSeleccionado,
                            estado_nombre: selected[0].estado_nombre,
                          });
                        }
                      }}
                      labelKey="estado_nombre"
                      options={estados}
                      placeholder="Seleccionar"
                      ref={cmbEstado}
                      bsSize="small"
                      defaultSelected={
                        valorSeleccionado
                          ? [`${valorSeleccionado.estado_nombre}`]
                          : ""
                      }
                      selected={
                        valorSeleccionado.estado_nombre !== ""
                          ? [`${valorSeleccionado.estado_nombre}`]
                          : ""
                      }
                    />
                  </div>*/}

                  {estados && Array.isArray(estados) && estados.length > 0 && (
                    <Autocomplete
                      value={valorSeleccionado}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setValorSeleccionado({
                            ...valorSeleccionado,
                            estado_nombre: newValue.estado_nombre,
                          });
                        }
                      }}
                      options={estados}
                      sx={{ width: "100%" }}
                      size="small"
                      getOptionLabel={(option) => option.estado_nombre}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Estado"
                          variant="outlined"
                        />
                      )}
                    />
                  )}
                </div>
                <div className="col-md-4 mb-1 mt-1">
                  {acesor && Array.isArray(acesor) && acesor.length > 0 && (
                    <Autocomplete
                      value={valorSeleccionado}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setValorSeleccionado({
                            ...valorSeleccionado,
                            usuario_usuario: newValue.usuario_usuario,
                          });
                          buscarSucursal(newValue.usuario_usuario);
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
                      disabled={idUser != 57}
                    />
                  )}
                </div>

                <div class="col-md-4 mb-1 mt-1">
                  {/*  <div class="input-group input-group-sm mb-2 ">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Sucursal:{" "}
                    </span>

                  <input
                      disabled
                      defaultValue={operacion === 1 ? suc : ""}
                      type="text"
                      class="form-control"
                      ref={sucursal}
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                    idUser === 57 ? (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                          setMostrar3(true);
                        }}
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    ) : null

                    <Typeahead
                      id="myTypeahead"
                      onKeyDown={(a) => {
                        setValorSeleccionado({
                          ...valorSeleccionado,
                          sucursal_nombre: a.target.value,
                        });
                      }}
                      onChange={(selected) => {
                        if (
                          selected &&
                          selected.length > 0 &&
                          selected[0].sucursal_nombre
                        ) {
                          if (selected[0] && selected[0].sucursal_nombre) {
                            console.log(selected[0].sucursal_nombre);
                            setValorSeleccionado({
                              ...valorSeleccionado,
                              sucursal_nombre: selected[0].sucursal_nombre,
                            });
                          }
                        }
                      }}
                      labelKey="sucursal_nombre"
                      options={sucursal}
                      placeholder="Seleccionar"
                      ref={cmbSucursal}
                      bsSize="small"
                      defaultSelected={
                        valorSeleccionado
                          ? [`${valorSeleccionado.sucursal_nombre}`]
                          : ""
                      }
                      selected={
                        valorSeleccionado.sucursal_nombre !== ""
                          ? [`${valorSeleccionado.sucursal_nombre}`]
                          : ""
                      }
                    />
                  </div>*/}
                  {sucursal &&
                    Array.isArray(sucursal) &&
                    sucursal.length > 0 && (
                      <Autocomplete
                        value={valorSeleccionado}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setValorSeleccionado({
                              ...valorSeleccionado,
                              sucursal_nombre: newValue.sucursal_nombre,
                            });
                          }
                        }}
                        options={sucursal}
                        sx={{ width: "100%" }}
                        size="small"
                        getOptionLabel={(option) => option.sucursal_nombre}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Sucursal"
                            variant="outlined"
                          />
                        )}
                        disabled={idUser != 57}
                      />
                    )}
                  <div id="sucursal" class="form-text hidden">
                    Debe ingresar nombre del uso
                  </div>
                </div>
                <div class="col-md-6">
                  {/*<div class="input-group input-group-sm mb-2 ">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Linea de Transporte:{" "}
                    </span>
                   <select class="form-select" ref={txtLinea} aria-label="Default select example">

                      {transporte && transporte.map((item, index) => (
                        <option key={index} value={item.transporte_id} > {item.transporte_nombre} </option>
                      ))}
                    </select

                    <input
                      disabled
                      type="text"
                      class="form-control"
                      ref={txtLinea}
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                    <button
                      type="button"
                      class="btn btn-success"
                      onClick={() => {
                        setMostrar4(true);
                      }}
                    >
                      <i class="fa fa-search"></i>
                    </button>>
                    <Typeahead
                      id="myTypeahead"
                      onKeyDown={(a) => {
                        setValorSeleccionado({
                          ...valorSeleccionado,
                          transporte_nombre: a.target.value,
                        });
                      }}
                      onChange={(selected) => {
                        if (
                          selected &&
                          selected.length > 0 &&
                          selected[0].transporte_nombre
                        ) {
                          if (selected[0] && selected[0].transporte_nombre) {
                            console.log(selected[0].transporte_nombre);
                            setValorSeleccionado({
                              ...valorSeleccionado,
                              transporte_nombre: selected[0].transporte_nombre,
                            });
                          }
                        }
                      }}
                      labelKey="transporte_nombre"
                      options={transporte}
                      placeholder="Seleccionar"
                      ref={txtLinea}
                      bsSize="small"
                      defaultSelected={
                        valorSeleccionado
                          ? [`${valorSeleccionado.transporte_nombre}`]
                          : ""
                      }
                      selected={
                        valorSeleccionado.transporte_nombre !== ""
                          ? [`${valorSeleccionado.transporte_nombre}`]
                          : ""
                      }
                    />
                  </div>*/}

                  {/* {transporte &&
                    Array.isArray(transporte) &&
                    transporte.length > 0 && (
                      <Autocomplete
                        value={valorSeleccionado}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            console.log(newValue.transporte_nombre);
                            setValorSeleccionado({
                              ...valorSeleccionado,
                              transporte_nombre: newValue.transporte_nombre,
                            });
                          }
                        }}
                        options={transporte}
                        sx={{ width: "100%" }}
                        size="small"
                        getOptionLabel={(option) => option.transporte_nombre}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Linea de Transporte"
                            variant="outlined"
                          />
                        )}
                      />
                    )} */}
                </div>
              </fieldset>
              <fieldset class="border rounded-3 p-3 row mx-auto">
                <legend
                  class="float-none w-auto px-3 fw-bold"
                  style={{ fontSize: 15 }}
                >
                  Titular
                </legend>
                <div class=" mb-1 col-md-5">
                  <div class="input-group input-group-sm">
                    <span
                      style={{ background: "red" }}
                      class="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Cedula:
                    </span>
                    <select
                      disabled={
                        (operacion == 3 && idUser != 57) ||
                        (idUser != 57 && operacion === 2)
                      }
                      class="form-select col-md-3"
                      ref={cmbNacionalidadTitular}
                      aria-label="Default select example"
                    >
                      <option value="V-">V-</option>
                      <option value="E-">E-</option>
                      <option value="J-">J-</option>
                      <option value="G-">G-</option>
                    </select>
                    <input
                      disabled={
                        (operacion == 3 && idUser != 57) ||
                        (idUser != 57 && operacion == 2)
                      }
                      type="text"
                      className="form-control"
                      ref={txtCedulatTitular}
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      name="ced2"
                      onBlur={validarInput}
                      onChange={(e) => {
                        validaSoloNumero(e);
                        igualA(2);
                      }}
                    />

                    <button
                      type="button"
                      class="btn btn-success"
                      onClick={() => {
                        consultarTitular(
                          cmbNacionalidadTitular.current.value +
                            txtCedulatTitular.current.value
                        );
                      }}
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                  <div id="ced2" class="form-text hidden">
                    Debe ingresar la cedula titular
                  </div>
                </div>
                <div class="col-md-9"></div>

                <div class="col-md-6">
                  <div class="input-group input-group-sm mb-2">
                    <span
                      style={{ background: "#90EE90" }}
                      class="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Nombre
                    </span>
                    <input
                      maxLength={25}
                      type="text"
                      ref={txtNombreTitular}
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      name="nomti"
                      onBlur={validarInput}
                      onChange={(e) =>
                        (e.target.value = e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <div id="nomti" class="form-text hidden">
                    Debe ingresar el nombre del titular
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group input-group-sm mb-2">
                    <span
                      style={{ background: "#90EE90" }}
                      class="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Apellido
                    </span>
                    <input
                      maxLength={50}
                      type="text"
                      ref={txtApellidoTitular}
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) =>
                        (e.target.value = e.target.value.toUpperCase())
                      }
                      name="apeti"
                      onBlur={validarInput}
                    />
                  </div>
                  <div id="apeti" class="form-text hidden">
                    Debe ingresar el apellido del titular
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="ex1-tabs-2"
            role="tabpanel"
            aria-labelledby="ex1-tab-2"
          >
            <div class="col-md-12 row mx-auto">
              <div class="col-md-4 my-auto">
                <div class="input-group input-group-sm mb-2">
                  <span
                    style={{ background: "red" }}
                    class="input-group-text"
                    id="inputGroup-sizing-sm"
                  >
                    Placa
                  </span>
                  <input
                    disabled={
                      (operacion == 3 && idUser != 57) ||
                      (idUser != 57 && operacion == 2)
                    }
                    type="text"
                    ref={txtPlaca}
                    maxLength={10}
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    name="placa"
                    onBlur={validarInput}
                    onChange={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                      tuFuncionEspecifica(e);
                    }}
                  />
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={() => {
                      consultarVehiculo(txtPlaca.current.value);
                    }}
                  >
                    <i class="fa fa-search"></i>
                  </button>
                </div>
                <div id="placa" class="form-text hidden">
                  Debe ingresar la plca del vehiculo
                </div>
              </div>
              <div class="col-md-4 my-auto">
                <div class="input-group input-group-sm mb-2">
                  <span
                    style={{ background: "#90EE90" }}
                    class="input-group-text"
                    id="inputGroup-sizing-sm"
                  >
                    Puesto
                  </span>
                  <input
                    disabled={operacion == 3 && idUser != 57}
                    type="text"
                    maxLength={2}
                    ref={txtPuesto}
                    class="form-control"
                    aria-label="Sizing example input"
                    name="puestos"
                    onBlur={validarInput}
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={validaSoloNumero}
                  />
                </div>

                <div id="puestos" class="form-text hidden">
                  Debe ingresar los puestos delvehivulo
                </div>
              </div>

              <div class="col-md-4 mb-1">
                {/* <div class="input-group input-group-sm mb-2">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Uso
                  </span>

                  <select class="form-select" ref={txtUso} aria-label="Default select example">
                    {uso && uso.map((item, index) => (
                      <option key={index} value={item.usoVehiculo_id} > {item.usoVehiculo_nombre} </option>
                    ))}
                  </select>
                  <input
                    disabled
                    type="text"
                    class="form-control"
                    ref={txtUso}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={() => {
                      setMostrar5(true);
                    }}
                  >
                    <i class="fa fa-search"></i>
                  </button>

                  <Typeahead
                    id="myTypeahead"
                    onKeyDown={(a) => {
                      setValorSeleccionado({
                        ...valorSeleccionado,
                        usoVehiculo_nombre: a.target.value,
                      });
                    }}
                    onChange={(selected) => {
                      if (
                        selected &&
                        selected.length > 0 &&
                        selected[0].usoVehiculo_nombre
                      ) {
                        if (selected[0] && selected[0].usoVehiculo_nombre) {
                          console.log(selected[0].usoVehiculo_nombre);
                          setValorSeleccionado({
                            ...valorSeleccionado,
                            usoVehiculo_nombre: selected[0].usoVehiculo_nombre,
                          });
                        }
                      }
                    }}
                    labelKey="usoVehiculo_nombre"
                    options={uso}
                    placeholder="Seleccionar"
                    ref={txtUso}
                    bsSize="small"
                    defaultSelected={
                      valorSeleccionado
                        ? [`${valorSeleccionado.usoVehiculo_nombre}`]
                        : ""
                    }
                    selected={
                      valorSeleccionado.usoVehiculo_nombre !== ""
                        ? [`${valorSeleccionado.usoVehiculo_nombre}`]
                        : ""
                    }
                  />
                </div>*/}
                {uso && Array.isArray(uso) && uso.length > 0 && (
                  <Autocomplete
                    value={valorSeleccionado}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setValorSeleccionado({
                          ...valorSeleccionado,
                          usoVehiculo_nombre: newValue.usoVehiculo_nombre,
                        });
                      }
                    }}
                    options={uso}
                    sx={{ width: "100%" }}
                    size="small"
                    style={{ color: "#90EE90" }}
                    getOptionLabel={(option) => option.usoVehiculo_nombre}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Uso Vehiculo"
                        variant="outlined"
                      />
                    )}
                  />
                )}
              </div>

              <div class="col-md-4 my-auto">
                <div class="input-group input-group-sm mb-2">
                  <span
                    style={{ background: "#90EE90" }}
                    class="input-group-text"
                    id="inputGroup-sizing-sm"
                  >
                    Año
                  </span>
                  <input
                    disabled={operacion == 3 && idUser != 57}
                    type="text"
                    class="form-control text-right"
                    maxLength={4}
                    ref={txtAño}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    name="anio"
                    onBlur={validarInput}
                    onChange={(e) => {
                      validaSoloNumero(e);
                      let valor = e.target.value;
                      const añoActual = new Date().getFullYear();
                      const añoMinimo = 1950;
                      // Limitar la longitud a 4 dígitos
                      valor = valor.slice(0, 4);
                      if (valor.length === 4) {
                        const añoLimite = añoActual + 1; // Permitir solo el año actual y el siguiente
                        if (valor > añoLimite) {
                          e.target.value = añoLimite;
                        } else if (valor < añoMinimo) {
                          e.target.value = añoMinimo;
                        } else {
                          e.target.value = valor;
                        }
                      } else {
                        e.target.value = valor;
                      }
                    }}
                  />
                </div>
                <div id="anio" class="form-text hidden">
                  Debe ingresar año del vehiculo
                </div>
              </div>

              <div class="col-md-4 my-auto">
                <div class="input-group input-group-sm mb-2">
                  <span
                    style={{ background: "#90EE90" }}
                    class="input-group-text"
                    id="inputGroup-sizing-sm"
                  >
                    Ser. Motor
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    maxLength={20}
                    ref={txtSerMotor}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    name="serialM"
                    onBlur={validarInput}
                    onChange={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                      validarIguales(3); // Asegúrate de que esta línea esté formateada correctamente
                    }}
                  />
                </div>
                <div id="serialM" class="form-text hidden">
                  Debe ingresar serial del motor
                </div>
              </div>
              <div class="col-md-4 mt-2 mb-1">
                {/*<div class="input-group input-group-sm mb-2">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Clase
                  </span>

                  *<select class="form-select" ref={txtClase} aria-label="Default select example">
                    {clase && clase.map((item, index) => (
                      <option key={index} value={item.claseVehiculo_id} > {item.clase_nombre} </option>
                    ))}
                  </select>
                  <input
                    disabled
                    type="text"
                    class="form-control"
                    ref={txtClase}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={() => {
                      setMostrar6(true);
                    }}
                  >
                    <i class="fa fa-search"></i>
                  </button>
                  <Typeahead
                    id="myTypeahead"
                    onKeyDown={(a) => {
                      setValorSeleccionado({
                        ...valorSeleccionado,
                        clase_nombre: a.target.value,
                      });
                    }}
                    onChange={(selected) => {
                      if (
                        selected &&
                        selected.length > 0 &&
                        selected[0].clase_nombre
                      ) {
                        if (selected[0] && selected[0].clase_nombre) {
                          console.log(selected[0].clase_nombre);
                          setValorSeleccionado({
                            ...valorSeleccionado,
                            clase_nombre: selected[0].clase_nombre,
                          });
                        }
                      }
                    }}
                    labelKey="clase_nombre"
                    options={clase}
                    placeholder="Seleccionar"
                    ref={txtClase}
                    bsSize="small"
                    defaultSelected={
                      valorSeleccionado
                        ? [`${valorSeleccionado.clase_nombre}`]
                        : ""
                    }
                    selected={
                      valorSeleccionado.clase_nombre !== ""
                        ? [`${valorSeleccionado.clase_nombre}`]
                        : ""
                    }
                  />
                </div>*/}
                {clase && Array.isArray(clase) && clase.length > 0 && (
                  <Autocomplete
                    value={valorSeleccionado}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        console.log(newValue.clase_nombre);
                        setValorSeleccionado({
                          ...valorSeleccionado,
                          clase_nombre: newValue.clase_nombre,
                        });
                      }
                    }}
                    options={clase}
                    sx={{ width: "100%" }}
                    size="small"
                    style={{ color: "#90EE90" }}
                    getOptionLabel={(option) => option.clase_nombre}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Clase Vehiculo"
                        variant="outlined"
                      />
                    )}
                  />
                )}
              </div>

              <div class="col-md-4 my-auto">
                <div class="input-group input-group-sm mb-2">
                  <span
                    style={{ background: "#90EE90" }}
                    class="input-group-text"
                    id="inputGroup-sizing-sm"
                  >
                    Color
                  </span>
                  <input
                    maxLength={20}
                    type="text"
                    class="form-control"
                    ref={txtColor}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    name="colors"
                    onBlur={validarInput}
                    onChange={(e) => {
                      validaSoloLetras(e);
                      e.target.value = e.target.value.toUpperCase();
                    }}
                  />
                </div>
                <div id="colors" class="form-text hidden">
                  Debe ingresar color del vehiculo
                </div>
              </div>

              <div class="col-md-4 my-auto">
                <div class="input-group input-group-sm mb-2">
                  <span
                    style={{ background: "#90EE90" }}
                    class="input-group-text"
                    id="inputGroup-sizing-sm"
                  >
                    Ser. Carroceria
                  </span>
                  <input
                    disabled={operacion == 3 && idUser != 57}
                    type="text"
                    class="form-control"
                    maxLength={20}
                    ref={txtSerCarroceria}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    name="carroceria"
                    onBlur={validarInput}
                    onChange={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                      validarIguales(4);
                    }}
                  />
                </div>
                <div id="carroceria" class="form-text hidden">
                  Debe ingresar serial de la carroceria
                </div>
              </div>
              <div class="col-md-4 mt-2 mb-1">
                {/*<div class="input-group input-group-sm mb-2">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Tipo
                  </span>
                 * <select
                    class="form-select"
                    ref={cmbTipo}
                    aria-label="Default select example"
                  >
                    {tipo &&
                      tipo.map((item, index) => (
                        <option key={index} value={item.tipoVehiculo_id}>
                          {" "}
                          {item.tipoVehiculo_nombre}{" "}
                        </option>
                      ))}
                  </select>
                  <input
                    disabled
                    type="text"
                    class="form-control"
                    ref={cmbTipo}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={() => {
                      setMostrar7(true);
                    }}
                  >
                    <i class="fa fa-search"></i>
                  </button> 
                  <Typeahead
                    id="myTypeahead"
                    onKeyDown={(a) => {
                      setValorSeleccionado({
                        ...valorSeleccionado,
                        tipoVehiculo_nombre: a.target.value,
                      });
                    }}
                    onChange={(selected) => {
                      if (
                        selected &&
                        selected.length > 0 &&
                        selected[0].tipoVehiculo_nombre
                      ) {
                        if (selected[0] && selected[0].tipoVehiculo_nombre) {
                          console.log(selected[0].tipoVehiculo_nombre);
                          setValorSeleccionado({
                            ...valorSeleccionado,
                            tipoVehiculo_nombre:
                              selected[0].tipoVehiculo_nombre,
                          });
                        }
                      }
                    }}
                    labelKey="tipoVehiculo_nombre"
                    options={tipo}
                    placeholder="Seleccionar"
                    ref={cmbTipo}
                    bsSize="small"
                    defaultSelected={
                      valorSeleccionado
                        ? [`${valorSeleccionado.tipoVehiculo_nombre}`]
                        : ""
                    }
                    selected={
                      valorSeleccionado.tipoVehiculo_nombre !== ""
                        ? [`${valorSeleccionado.tipoVehiculo_nombre}`]
                        : ""
                    }
                  />
                </div>*/}
                {tipo && Array.isArray(tipo) && tipo.length > 0 && (
                  <Autocomplete
                    value={valorSeleccionado}
                    onChange={(event, newValue) => {
                      console.log(newValue);
                      if (newValue) {
                        setValorSeleccionado({
                          ...valorSeleccionado,
                          tipoVehiculo_nombre: newValue.tipoVehiculo_nombre,
                        });
                      }
                    }}
                    disabled={
                      (operacion == 3 && idUser != 57) ||
                      (idUser != 57 && operacion === 2)
                    }
                    options={tipo}
                    sx={{ width: "100%" }}
                    size="small"
                    style={{ color: "#90EE90" }}
                    getOptionLabel={(option) => option.tipoVehiculo_nombre}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tipo Vehiculo"
                        variant="outlined"
                      />
                    )}
                  />
                )}
                {/* {tipo && Array.isArray(tipo) && tipo.length > 0 && (
                  <Autocomplete
                    value={valorSeleccionado}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setValorSeleccionado({
                          ...valorSeleccionado,
                          tipoVehiculo_nombre: newValue.tipoVehiculo_nombre,
                        });
                      }
                    }}
                    options={tipo}
                    sx={{ width: "100%" }}
                    size="small"
                    getOptionLabel={(option) => option.tipoVehiculo_nombre}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tipo Vehiculo"
                        variant="outlined"
                      />
                    )}
                  />
                )} */}
              </div>

              <div class="col-md-4">
                <div class="input-group input-group-sm mb-2">
                  <span
                    style={{ background: "#90EE90" }}
                    class="input-group-text"
                    id="inputGroup-sizing-sm"
                  >
                    Modelo
                  </span>
                  <input
                    disabled={operacion == 3 && idUser != 57}
                    maxLength={50}
                    type="text"
                    class="form-control"
                    ref={txtModelo}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    name="modelov"
                    onBlur={validarInput}
                    onChange={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                      validarIguales(1);
                    }}
                  />
                </div>
                <div id="modelov" class="form-text hidden">
                  Debe ingresar modelo del vehiculo
                </div>
              </div>

              <div class="col-md-4">
                <div class="input-group input-group-sm mb-2">
                  <span
                    style={{ background: "#90EE90" }}
                    class="input-group-text"
                    id="inputGroup-sizing-sm"
                  >
                    Marca
                  </span>
                  <input
                    disabled={operacion == 3 && idUser != 57}
                    maxLength={50}
                    type="text"
                    class="form-control"
                    ref={txtMarca}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    name="marcav"
                    onBlur={validarInput}
                    onChange={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                      validarIguales(2);
                    }}
                  />
                </div>
                <div id="marcav" class="form-text hidden">
                  Debe ingresar marca del vehiculo
                </div>
              </div>

              <div class="col-md-4">
                <div class="input-group input-group-sm mb-2">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Peso
                  </span>
                  <input
                    disabled
                    maxLength={10}
                    type="text"
                    class="form-control"
                    ref={txtPeso}
                    name="pesov"
                    onBlur={validarInput}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={handleInputMontoChange}
                  />
                </div>
                <div id="pesov" class="form-text hidden">
                  Debe ingresar peso del vehiculo
                </div>
              </div>

              <div class="col-md-4">
                <div class="input-group input-group-sm mb-2">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Cap. Ton.
                  </span>
                  <input
                    disabled
                    maxLength={10}
                    type="text"
                    class="form-control"
                    ref={txtCapTon}
                    name="toneladas"
                    onBlur={validarInput}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={handleInputMontoChange}
                  />
                </div>
                <div id="toneladas" class="form-text hidden">
                  Debe ingresar capacidad de toneladas
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="ex1-tabs-3"
            role="tabpanel"
            aria-labelledby="ex1-tab-3"
          >
            <div class="col-md-12 row mx-auto">
              <div class="col-md-4">
                <div class="input-group input-group-sm mb-2">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Forma de Pago{" "}
                  </span>

                  <select
                    class="form-select"
                    ref={cmbFormaPago}
                    aria-label="Default select example"
                    onChange={handleFormaPagoChange}
                  >
                    <option value="0">Pago Movil</option>
                    <option value="1">Efectivo</option>
                    <option value="2">Transferencia</option>
                    <option value="3">Punto</option>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <div class="input-group input-group-sm mb-2">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Referencia
                  </span>
                  <input
                    maxLength={4}
                    type="text"
                    class="form-control"
                    ref={txtReferencia}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={validaSoloNumero}
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="input-group input-group-sm mb-2">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Cantidad a pagar en $
                  </span>
                  <input
                    disabled
                    type="text"
                    class="form-control"
                    name="dolar"
                    ref={txtDolar}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={handleInputMontoChange}
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="input-group input-group-sm mb-2">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Cantidad a pagar en bs
                  </span>
                  <input
                    disabled
                    type="text"
                    class="form-control"
                    ref={txtBs}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={handleInputMontoChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      {variable == true && (
        <Modal.Footer>
          <button
            className="btn btn-sm btn-success rounded-pill col-md-2"
            disabled={props.operacion == 4 ? true : false || disabledButton}
            onClick={onChangeValidar}
          >
            <i className="fas fa-check-circle"> Aceptar</i>
          </button>
          <button
            ref={btnCancela}
            onClick={salir}
            className="btn btn-sm btn-danger rounded-pill col-md-2"
          >
            <i className="fas fa-window-close"> Salir</i>
          </button>
        </Modal.Footer>
      )}
    </Modal>
  );
};
