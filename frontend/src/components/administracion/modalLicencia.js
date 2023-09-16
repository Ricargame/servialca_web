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
  validaSoloLetras
} from "../../util/varios";

import axios from "axios";
import moment from "moment";
import { Mensaje } from "../mensajes";
import CatalogoClientes from "../../catalogos/catalogoClientes";

<<<<<<< HEAD
export const ModalCertificadoMedico = (props) => {
=======
export const ModalLicencia = (props) => {
>>>>>>> 1ad0a02783bba7d4c187225e55d6c089084d3bd0
  /*  variables de estados */

  let op = require("../../modulos/datos");
  let token = localStorage.getItem("jwtToken");


  const txtEdad = useRef();
  const txtNombre = useRef();
  const txtTipoSangre = useRef();
  const txtCedula = useRef();
<<<<<<< HEAD
  const cmbLentes = useRef();
  const cmbPago = useRef();
  const cmbNacionalidad = useRef();

  const txtDatosPastor = useRef();
  const txtReferencia = useRef()
  const txtBs = useRef();
  const txtDolar = useRef();

  const txtFechaNaci = useRef();
  const txtApellido = useRef();
  const [edad, setEdad] = useState('');
=======
  const cmbTipoLicencia = useRef();
  const cmbPago = useRef();
  const cmbNacionalidad = useRef();
  const cmbTelefono = useRef();
  const txtTelefono = useRef();
  const txtDatosPastor = useRef();
  const txtReferencia = useRef()
  const txtTotal = useRef();
  const txtDolar = useRef();
  const cmbLentes = useRef();
  const txtAbono = useRef();
  const txtCorreo = useRef();
  const txtApellido = useRef();
const txtRestante = useRef();
const check1 = useRef();
const check2 = useRef();
const check3 = useRef();
const check4 = useRef();



>>>>>>> 1ad0a02783bba7d4c187225e55d6c089084d3bd0


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



  const actualizarCertificado = async () => {
    let endpoint = op.conexion + "/poliza/registrarCertificado";
    console.log(endpoint)
    setActivate(true)



    //setLoading(false);

    let bodyF = new FormData()

    bodyF.append("Nombre", cmbNacionalidad.current.value + txtNombre.current.value)
    bodyF.append("Apellido", txtApellido.current.value)
    bodyF.append("Cedula", txtCedula.current.value)
<<<<<<< HEAD
    bodyF.append("fechaNacimiento", txtFechaNaci.current.value)
    bodyF.append("Edad", txtEdad.current.value)
    bodyF.append("tipoSangre", txtTipoSangre.current.value)
    bodyF.append("Lente", cmbLentes.current.value)
=======
    bodyF.append("fechaNacimiento", txtCorreo.current.value)
    bodyF.append("Edad", txtEdad.current.value)
    bodyF.append("tipoSangre", txtTipoSangre.current.value)
    bodyF.append("Lente", cmbTipoLicencia.current.value)
>>>>>>> 1ad0a02783bba7d4c187225e55d6c089084d3bd0
    bodyF.append("metodoPago", cmbPago.current.value)
    bodyF.append("Referencia", txtReferencia.current.value)
    bodyF.append("cantidadDolar", txtDolar.current.value)
    bodyF.append("Telefono", null)
    bodyF.append("Direccion", null)



    await fetch(endpoint, {
      method: "POST",
      body: bodyF
    }).then(res => res.json())
      .then(response => {


        setActivate(false)
        console.log(response)

        setMensaje({
          mostrar: true,
          titulo: "Exito.",
          texto: "Registro Guardado Exitosamente",
          icono: "exito",
        });




      })
      .catch(error =>
        setMensaje({ mostrar: true, titulo: "Notificación", texto: error.res, icono: "informacion" })
      )

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



<<<<<<< HEAD
  const check = (e) => {
=======

  /*const check = (e) => {
>>>>>>> 1ad0a02783bba7d4c187225e55d6c089084d3bd0
    var textV = "which" in e ? e.which : e.keyCode,
      char = String.fromCharCode(textV),
      regex = /[a-z]/ig;
    if (!regex.test(char)) e.preventDefault(); return false;
<<<<<<< HEAD
  }
=======
  }*/
>>>>>>> 1ad0a02783bba7d4c187225e55d6c089084d3bd0
  const seleccionarCliente = (nombre, apellido, cedula) => {

    console.log(nombre, apellido, cedula)
    txtCedula.current.value = cedula;
    txtApellido.current.value = apellido;
    txtNombre.current.value = nombre;
    setMostrar(false);

  }

  const cerrarModal = () => {
    setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
    props.onHideCancela()

  }

  function soloLetras(event) {
    if ((event.keyCode != 32) && (event.keyCode < 65) || (event.keyCode > 90) && (event.keyCode < 97) || (event.keyCode > 122))
      event.returnValue = false;
  }
<<<<<<< HEAD
  function calcularEdad() {
    const fechaNacimiento = new Date(txtFechaNaci.current.value);
    fechaNacimiento.setHours(0, 0, 0, 0);

    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    const diferenciaDias = Math.floor((fechaActual - fechaNacimiento) / (1000 * 60 * 60 * 24));
    const edadCalculada = Math.floor(diferenciaDias / 365.25);

    // Actualizar el estado de la variable 'edad' con el valor calculado
    setEdad(edadCalculada);

  }


=======
>>>>>>> 1ad0a02783bba7d4c187225e55d6c089084d3bd0

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
        setOperacion(props.operacion);

        if (props.operacion !== 1) {
          setValues(props.persona);
          console.log(props.persona);
        }
      }}
    >
      <Modal.Header className="bg-danger">
        <Modal.Title style={{ color: "#fff" }}>
<<<<<<< HEAD
          Registrar Certificado Medico
=======
          Registrar Licencia
>>>>>>> 1ad0a02783bba7d4c187225e55d6c089084d3bd0
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
          onHideCancela={() => { setMostrar(false) }}
          onHideCatalogo={seleccionarCliente}

        />

        <Mensaje
          mensaje={mensaje}
          onHide={() => {
            mensaje.titulo === 'Exito.' ? cerrarModal() :
              setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
          }} />

        <div className="col-md-12 row mx-auto">
          <div class="input-group input-group-sm mb-3 col-md-4">
            <span class="input-group-text" id="inputGroup-sizing-sm">Cedula:</span>
            <select class="form-select" ref={cmbNacionalidad} aria-label="Default select example">

              <option value="V-">V-</option>
              <option value="E-">E-</option>
              <option value="J-">J-</option>
              <option value="G-">G-</option>

            </select>
            <input type="text" class="form-control" ref={txtCedula} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
            <button type="button" class="btn btn-success" onClick={() => { setMostrar(true) }}><i class="fa fa-search"></i></button>
          </div>
          <div class=" col-md-7"></div>
          <div class="input-group input-group-sm mb-3 col-md-6">
            <span class="input-group-text" id="inputGroup-sizing-sm">Nombres:</span>
            <input type="text" class="form-control" onChange={soloLetras} ref={txtNombre} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
          </div>
          <div class="input-group input-group-sm mb-3 col-md-6">
            <span class="input-group-text" id="inputGroup-sizing-sm">Apellidos:</span>
            <input type="text" class="form-control" ref={txtApellido} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
          </div>
          <div class="input-group input-group-sm mb-3 col-md-4">
<<<<<<< HEAD
            <span class="input-group-text" id="inputGroup-sizing-sm">Fecha de Nacimiento:</span>
            <input type="date" class="form-control" onChange={calcularEdad} ref={txtFechaNaci} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
          </div>
          <div class="input-group input-group-sm mb-3 col-md-2">
            <span class="input-group-text" id="inputGroup-sizing-sm">Edad:</span>
            <input type="text" value={edad} class="form-control text-right" maxLength={2} ref={txtEdad} onChange={handleInputNumChange} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
          </div>
          <div class="input-group input-group-sm mb-3 col-md-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Tipo de Sangre:</span>
            <input type="text" class="form-control" ref={txtTipoSangre} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
          </div>
=======
            <span class="input-group-text" id="inputGroup-sizing-sm">Correo:</span>
            <input type="text" class="form-control" ref={txtCorreo} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
          </div>
          <div class="input-group input-group-sm mb-3 col-md-4">
            <span class="input-group-text" id="inputGroup-sizing-sm">Telefono</span>
            <select class="form-select col-md-4" ref={cmbTelefono} aria-label="Default select example">

              <option value="0414-">0414</option>
              <option value="0424-">0424</option>
              <option value="0416-">0416</option>
              <option value="0426-">0426</option>
              <option value="0412-">0412</option>



            </select>
            <input type="text" class="form-control" ref={txtTelefono} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={handleInputNumChange} />
          </div>
          <div class="input-group input-group-sm mb-3 col-md-4">
            <span class="input-group-text" id="inputGroup-sizing-sm">Tipo de Sangre:</span>
            <input type="text" class="form-control" ref={txtTipoSangre} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
          </div>
          <div class="input-group input-group-sm mb-3 col-md-4">
            <span class="input-group-text" id="inputGroup-sizing-sm">Tipo De Licencia:</span>
            <select class="form-select" ref={cmbTipoLicencia} aria-label="Default select example">
              <option value=" ">Seleccionar</option>

              <option value="0">Licencia de 2da</option>
              <option value="1">Licencia de 3da</option>
              <option value="2">Licencia de 4da</option>
              <option value="0">Licencia de 5da</option>




            </select>
          </div>
          <div className="col-md-4 mx-auto row">
            <div class="form-check col my-auto">
              <input class="form-check-input my-auto" ref={check1} type="checkbox" value="" id="flexCheckDefault"/>
              <label class="form-check-label my-auto" >
                2da
              </label>
            </div>
            <div class="form-check col my-auto">
              <input class="form-check-input my-auto" ref={check2} type="checkbox" value="" id="flexCheckDefault"/>
              <label class="form-check-label my-auto" >
               3ra
              </label>
            </div>
            <div class="form-check col my-auto">
              <input class="form-check-input my-auto" ref={check3} type="checkbox" value="" id="flexCheckDefault"/>
              <label class="form-check-label my-auto" >
               4ta
              </label>
            </div>
            <div class="form-check col my-auto">
              <input class="form-check-input my-auto" ref={check4} type="checkbox" value="" id="flexCheckDefault"/>
              <label class="form-check-label my-auto" >
                5ta
              </label>
            </div>
          </div>
>>>>>>> 1ad0a02783bba7d4c187225e55d6c089084d3bd0
          <div class="input-group input-group-sm mb-3 col-md-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Usa lentes:</span>
            <select class="form-select" ref={cmbLentes} aria-label="Default select example">

              <option value="1">Si</option>
              <option value="0">No</option>

            </select>
          </div>
<<<<<<< HEAD
=======
         
>>>>>>> 1ad0a02783bba7d4c187225e55d6c089084d3bd0
          <div class="input-group input-group-sm mb-3 col-md-4">
            <span class="input-group-text" id="inputGroup-sizing-sm">Forma de Pago:</span>
            <select class="form-select" ref={cmbPago} aria-label="Default select example">

              <option value="0">Pago Movil</option>
              <option value="1">Efectivo</option>
              <option value="2">Transferencia</option>
              <option value="3">Punto</option>


            </select>
          </div>
<<<<<<< HEAD
=======
          <div class="col-md-5"></div>

>>>>>>> 1ad0a02783bba7d4c187225e55d6c089084d3bd0
          <div class="input-group input-group-sm mb-3 col-md-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Referencia:</span>
            <input type="text" class="form-control" ref={txtReferencia} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
          </div>
<<<<<<< HEAD
          <div class="input-group input-group-sm mb-3 col-md-5">
            <span class="input-group-text" id="inputGroup-sizing-sm">Cantidad:</span>
            <input type="text" class="form-control text-right" ref={txtBs} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Bolivares" onChange={handleInputMontoChange} />
            <input type="text" class="form-control text-right" ref={txtDolar} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Dolares" onChange={handleInputMontoChange} />
          </div>

=======
          <div class="col-md-6"></div>
          <div class="input-group input-group-sm mb-3 col-md-2">
            <span class="input-group-text" id="inputGroup-sizing-sm">Total:</span>
            <input type="text" class="form-control text-right" ref={txtTotal} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled onChange={handleInputMontoChange} />
          </div>

          <div class="input-group input-group-sm mb-3 col-md-2">
            <span class="input-group-text" id="inputGroup-sizing-sm">Abono:</span>
            <input type="text" class="form-control text-right" ref={txtAbono} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={handleInputMontoChange} />
          </div>

          <div class="input-group input-group-sm mb-3 col-md-2">
            <span class="input-group-text" id="inputGroup-sizing-sm">Restante:</span>
            <input type="text" class="form-control text-right" ref={txtRestante} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={handleInputMontoChange} />
          </div>

          
>>>>>>> 1ad0a02783bba7d4c187225e55d6c089084d3bd0

        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-sm btn-success rounded-pill col-md-2"
          disabled={props.operacion === 4 ? true : false}
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
    </Modal>
  );
};