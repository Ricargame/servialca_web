import React, { useState, useEffect, useRef } from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  InputAdornment,
} from "@material-ui/core";
import { Loader, Dimmer } from "semantic-ui-react";
import { Search } from "@material-ui/icons";
import axios from "axios";
/* import { Dona, Torta } from '../graficos/graficos'; */
/* import CartasAgentes from './cartasAgentes'; */
import { Mensaje, MensajeSiNo } from "../mensajes";
/* import { GestionarExpendedor } from './modalExpendedor'; */
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function TablaReportes() {
  var op = require("../../modulos/datos");
  let token = localStorage.getItem("jwtToken");
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const fechasistema = JSON.parse(localStorage.getItem("fechasistema"));
  const [valorSeleccionado, setValorSeleccionado] = useState(null);
  let el;
  let municipios = [];

  const headCells = [
    {
      id: "ced",
      color: "rgba(5, 81, 130, 1)",
      label: "Fecha",
      textAlign: "center",
    },
    {
      id: "ced",
      color: "rgba(5, 81, 130, 1)",
      label: "Rerencia",
      textAlign: "center",
    },
    {
      id: "nombre",
      color: "rgba(5, 81, 130, 1)",
      label: "Concepto",
      textAlign: "center",
    },
    {
      id: "ape",
      color: "rgba(5, 81, 130, 1)",
      label: "Monto",
      textAlign: "center",
    },
    {
      id: "ape",
      color: "rgba(5, 81, 130, 1)",
      label: "Opcion",
      textAlign: "center",
    },
  ];

  const colores = [
    "#17a2b8",
    "#ffae00",
    "#dc3545",
    "#BDB76B",
    "#7B68EE",
    "#4B0082",
    "#00ffff",
    "#0080ff",
    "#0000ff",
    "#8000ff",
    "#ff00ff",
    "#ff0080",
  ];

  const cmbTipo = useRef();
  const cmbDato = useRef();

  const txtDesde = useRef();
  const reporte = useRef();
  const txtHasta = useRef();

  const [mensaje, setMensaje] = useState({
    mostrar: false,
    titulo: "",
    texto: "",
    icono: "",
  });
  const [mensajesino, setMensajesino] = useState({
    mostrar: false,
    titulo: "",
    texto: "",
    icono: "",
  });
  const txtBuscador = useRef();
  const [cuentas, setCuentas] = useState();
  const [saldo, setSaldo] = useState(0.0);
  const [mostrar, setMostrar] = useState(false);
  const [mostrar4, setMostrar4] = useState(false);
  const [titulo1, setTitulo1] = useState();
  const [desabilitar, setDesabilitar] = useState(false);
  const [activate, setActivate] = useState(false);
  const [records, setRecords] = useState([]);
  const [expendedor, setExpendedor] = useState([]);
  const [operacion, setOperacion] = useState(1);
  const [btnAgre, setBtnAgre] = useState(true);
  const [persona, setPersona] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [ciudades, setCiudades] = useState();
  const [credito, setCredito] = useState();
  const [total, setTotal] = useState(0);
  const [activos, setActivos] = useState(0);
  const [inactivos, setInactivos] = useState(0);
  const [municipiosEx, setMunicipiosEx] = useState([]);
  const [municipiosData, setMunicipiosData] = useState([]);
  const [iglesia, setIglesia] = useState();
  const [notaDebito, setNotaDebito] = useState();
  const [estado, setEstado] = useState();
  const [idcuentabancaria, setIdCuentaBancaria] = useState("");
  const [datos, setDatos] = useState([]);

  const generarReporte = async (e) => {
    e.preventDefault();
    // if (cmbTipo.current.value = 3) {
    //   window.open(
    //     `${op.conexion}/reporteNuevo`
    //   );
    // }
    window.open(
      `${op.conexion}/reporteGeneral?Sucursal=${valorSeleccionado.id}&Desde=${txtDesde.current.value}&Hasta=${txtHasta.current.value}`
    );
  };

  const seleccionaOperacion = (id, op) => (e) => {
    e.preventDefault();
    setOperacion(op);
    if (op === 1) {
      setMostrar(true);
    }
  };

  const handleCancela2 = () => {
    setExpendedor("");
    setCredito("");
  };

  const handleCloseSi = () => {
    setActivate(false);

    setMostrar4(false);
    setMensajesino({ mostrar: false, titulo: "", texto: "", icono: "" });
  };

  const handleCloseNo = () => {
    setMostrar4(false);
  };

  const cerrarModal = () => {
    setMostrar(false);
    setIglesia("");
  };
  useEffect(() => {
    /*  setActivate(true); */
  }, []);

  const selecionarUsuarios = async () => {
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
        let array = [];

        for (let i = 0; i < response.length; i++) {
          array.push({
            id: response[i].usuario_id,
            nombre: response[i].usuario_nombre,
             reporte: "0"
          });
        }

        setRecords(array);
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
  const seleccionarUsuario = async () => {
    let endpoint = op.conexion + "/Auth/consultarTodos"
    setActivate(true);
    await fetch(endpoint, {
      method: "GET",
    })
    .then((res) => res.json())
    .then((response) => {
      setActivate(false);
      let array = [];
      for (let i = 0; i < response.length; i++) {
        array.push({
          id: response[i].usuario_id,
          nombre: response[i].usuario_usuario,
          reporte: "0"
        })
        setRecords(array)
      }
    })
  }
  const selecionarSucursal = async () => {
    let endpoint = op.conexion + "/sucursal/ConsultarTodos";
    console.log(endpoint);
    setActivate(true);

    await fetch(endpoint, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        let array = [];

        for (let i = 0; i < response.length; i++) {
          array.push({
            id: response[i].sucursal_id,
            nombre: response[i].sucursal_nombre,
            reporte: response[i].reporte,
          });
        }

        setRecords(array);
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

  const consulta = (e) => {
    if (parseInt(e.target.value) === 5) {
      setDesabilitar(false);
      seleccionarUsuario();
    } else if (parseInt(e.target.value) === 4) {
      setDesabilitar(false);
      selecionarSucursal();
    } else {
      setRecords([]);
      setDesabilitar(true);
    }
  };

  const changeData = (value) => {
    const fechaActual = new Date();

    // Calculamos la nueva fecha "Desde" según el valor del reporte

    switch (value) {
      case "0":
        fechaActual.setDate(fechaActual.getDate() + 7); // 7 días

        break;

      case "1":
        fechaActual.setDate(fechaActual.getDate() + 15); // 15 días

        break;

      case "2":
        fechaActual.setMonth(fechaActual.getMonth() + 1); // 1 mes

        break;

      case "3":
        fechaActual.setMonth(fechaActual.getMonth() + 3); // 3 meses

        break;

      default:
        break;
    }

    const fechaDesdeFormateada = fechaActual.toISOString().split("T")[0];
    const fechaActual2 = new Date().toISOString().split("T")[0];
    // Establecemos la fecha "Desde"

    txtDesde.current.value = fechaActual2;

    // También puedes establecer "Hasta" si lo deseas

    txtHasta.current.value = fechaDesdeFormateada; // Cambia esto si quieres otra lógica para "Hasta"
  };

  const handleSelectChange = () => {
    const selectedId = valorSeleccionado.id;

    // Busca el item correspondiente en records

    const selectedItem = records.find((item) => item.id === selectedId);
    if (selectedItem) {
      changeData(selectedItem.reporte.toString()); // Llama a changeData con el reporte del item seleccionado
    }
  };
  useEffect(() => {
    // Obtener la fecha actual en el formato "YYYY-MM-DD"
  }, []);
  // const generar = () => {
  //   let sigue = true;

  //   if (cmbTipo.current.value === "") {
  //     sigue = false;
  //     setMensaje({
  //       mostrar: true,
  //       titulo: "Notificación",
  //       texto: "Seleccione un tipo de reposrte",
  //       icono: "informacion",
  //     });
  //     cmbTipo.current.focus();
  //   } else if (cmbDato.current.value === "") {
  //     sigue = false;
  //     setMensaje({
  //       mostrar: true,
  //       titulo: "Notificación",
  //       texto: "Seleccione un regsitro",
  //       icono: "informacion",
  //     });
  //     cmbDato.current.focus();
  //   } else if (txtDesde.current.value === "") {
  //     sigue = false;
  //     setMensaje({
  //       mostrar: true,
  //       titulo: "Notificación",
  //       texto: "Ingrese una fecha de inicio",
  //       icono: "informacion",
  //     });
  //     txtDesde.current.focus();
  //   } else if (txtHasta.current.value === "") {
  //     sigue = false;
  //     setMensaje({
  //       mostrar: true,
  //       titulo: "Notificación",
  //       texto: "Ingrese una fecha Final",
  //       icono: "informacion",
  //     });
  //     txtHasta.current.focus();
  //   } else if (txtDesde.current.value > txtHasta.current.value) {
  //     sigue = false;
  //     setMensaje({
  //       mostrar: true,
  //       titulo: "Notificación",
  //       texto: "La fecha de inicio no debe ser mayora a la fecha final",
  //       icono: "informacion",
  //     });
  //     txtHasta.current.focus();
  //   }

  //   if (sigue) {
  //     window.open(
  //       `${op.conexion}/reporte_Ingreso_egreso?nota_id=${
  //         cmbTipo.current.value
  //       }&sucursal_id=${cmbDato.current.value}&user_id=${
  //         cmbDato.current.value
  //       }&fechaInicio=${moment(txtDesde.current.value).format(
  //         "YYYY-MM-DD"
  //       )}&fechaFin=${moment(txtHasta.current.value).format("YYYY-MM-DD")}`
  //     );
  //   }
  // };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div className="row col-md-12 py-4 px-2">
        <div className="row col-md-12 mx-auto ">
          <div className="col-md-10 card mx-auto py-3">
            <div className="col-md-12 mx-auto row">
              <div className="col-md-12 mx-auto d-flex justify-content-center px-3 mb-4">
                <h3 className="text-dark">Genearar Reporte</h3>
              </div>

              <div className="col-12 p-2 row">
  {/* Grupo Tipo y Autocomplete */}
  <div className="d-flex align-items-center col-md-6 mb-2">
    <div className="me-2 flex-shrink-0">
      <div className="input-group input-group-sm">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          Tipo:
        </span>
        <select
          className="form-select"
          aria-label="Default select example"
          ref={cmbTipo}
          onChange={consulta}
        >
          <option value=" ">Seleccionar</option>
          <option value="5">Usuario</option>
          <option value="4">Sucursal</option>
          <option value="RCV">RCV</option>
          <option value="Renovación">Renovaciones</option>
          <option value="Seguro">Certificados Médicos</option>
          <option value="Licencia">Licencias</option>
          <option value="1">Ingresos</option>
          <option value="0">Egresos</option>
          <option value="2">Ingreso y Egreso</option>
          <option value="3">Nuevo Formato</option>
        </select>
      </div>
    </div>
    <div className="flex-grow-1">
      <Autocomplete
        disabled={desabilitar}
        value={valorSeleccionado}
        onChange={(event, newValue) => {
          setValorSeleccionado(newValue);
          handleSelectChange()
        }}
        options={records}
        size="small"
        getOptionLabel={(option) => option.nombre}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Seleccionar"
            variant="outlined"
            size="small"
            InputProps={{
              ...params.InputProps,
              style: { fontSize: "12px", padding: "4px" }, // Opcional: ajusta la tipografía y el espaciado
            }}
            InputLabelProps={{
              style: { fontSize: "12px" }, // Opcional: ajusta el tamaño del label
            }}
          />
        )}
        sx={{
          "& .MuiAutocomplete-input": {
            fontSize: "12px", // Ajusta el tamaño del texto en el input
          },
          "& .MuiOutlinedInput-root": {
            padding: "4px", // Reduce el espaciado del input
          },
        }}
      />
    </div>
        </div>
  {/* Grupo Desde */}
  <div className="col-md-3 mb-2">
    <div className="input-group input-group-sm">
      <span className="input-group-text" id="inputGroup-sizing-sm">
        Desde:
      </span>
      <input
        type="date"
        className="form-control"
        ref={txtDesde}
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
      />
    </div>
  </div>

  {/* Grupo Hasta */}
  <div className="col-md-3 mb-2">
    <div className="input-group input-group-sm">
      <span className="input-group-text" id="inputGroup-sizing-sm">
        Hasta:
      </span>
      <input
        type="date"
        className="form-control"
        ref={txtHasta}
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
      />
    </div>
  </div>
</div>

              <div className="col-md-5 mx-auto row">
                <button
                  type="button"
                  onClick={generarReporte}
                  class="btn col-md-6 btn-sm mx-auto rounded-pill btn-primary"
                >
                  Generar{" "}
                </button>
                <button
                  type="button"
                  class="btn col-md-6 btn-sm mx-auto rounded-pill btn-danger"
                >
                  limpiar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dimmer active={activate} inverted>
        <Loader inverted>cargando...</Loader>
      </Dimmer>
      <Mensaje
        mensaje={mensaje}
        onHide={() =>
          setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" })
        }
      />
      <MensajeSiNo
        mensaje={mensajesino}
        onHideNo={() =>
          setMensajesino({ mostrar: false, titulo: "", texto: "", icono: "" })
        }
        onHideSi={handleCloseSi}
      />
    </div>
  );
}
export default TablaReportes;
