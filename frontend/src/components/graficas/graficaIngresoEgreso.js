import React, { useEffect, useContext, useState, useRef } from "react";

import { Mensaje } from "../mensajes";
import { Loader, Dimmer } from "semantic-ui-react";
import { Doughnut } from "react-chartjs-2";

import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import axios from "axios";
import useTable from "../useTable";
import { TableBody, TableRow, TableCell } from "@material-ui/core";

function GraficosIngresos() {
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

  const headCells = [
    {
      label: "N° de contrato",
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
      label: "Asesor",
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
      label: "Debito/Credito",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Motivo",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
    {
      label: "Tipo de pago",
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
      label: "Monto",
      textAlign: "center",
      backgroundColor: "#e70101bf",
      color: "white",
    },
  ];

  const txtDate1 = useRef();
  const txtDate2 = useRef();
  const [rcv, setRcv] = useState();
  const [renovacion, setRenovacion] = useState();
  const [seguro, setSeguro] = useState();
  const [licencia, setLicencia] = useState();
  const [egreso, setEgreso] = useState();
  const [otroIngreso, setOtroIngreso] = useState();
  const [enero, setEnero] = useState();
  const [febrero, setFebrero] = useState();
  const [marzo, setMarzo] = useState();
  const [abril, setAbril] = useState();
  const [mayo, setMayo] = useState();
  const [junio, setJunio] = useState();
  const [julio, setJulio] = useState();
  const [agosto, setAgosto] = useState();
  const [septiembre, setSeptiembre] = useState();
  const [octubre, setOctubre] = useState();
  const [noviembre, setNoviembre] = useState();
  const [diciembre, setDiciembre] = useState();
  const codigo = JSON.parse(localStorage.getItem("codigo"));
  const permiso = JSON.parse(localStorage.getItem("permiso"));
  const [mostrar, setMostrar] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [records, setRecords] = useState([]);

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
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo ",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Movimientos anual",
        data: [
          enero,
          febrero,
          marzo,
          abril,
          mayo,
          junio,
          julio,
          agosto,
          septiembre,
          octubre,
          noviembre,
          diciembre,
        ],
        backgroundColor: "rgb(149, 187, 227)",
      },
    ],
  };

  const data2 = {
    labels: [
      "RCV",
      "Certificado medico",
      "Renovación",
      "Licencias",
      "Egresos",
      "Otros ingresos",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [rcv, seguro, renovacion, licencia, egreso, otroIngreso],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const { TblContainer, TblHead, recordsAfterPagingAndSorting, TblPagination } =
    useTable(records, headCells, filterFn);

  const selecionarRegistros = async (e) => {
    let endpoint = op.conexion + "/grafica/Diario";
    setActivate(true);
    let bodyF = new FormData();
    bodyF.append("Desde", txtDate1.current.value);
    bodyF.append("Hasta", txtDate2.current.value);
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setRecords(response);
        // Inicializamos variables para las sumas
        let sumaRcv = 0;
        let sumaRenovacion = 0;
        let sumaSeguro = 0;
        let sumaEgreso = 0;
        let otroIngreso = 0;
        let sumaLicencia = 0;
        // Iteramos sobre los objetos en el array response
        response.forEach((item) => {
          if (item.nota_motivo === "RCV") {
            sumaRcv++;
          } if (item.nota_motivo === "Renovación") {
            sumaRenovacion++;
          } if (
            item.nota_motivo === "Seguro" ||
            item.nota_motivo === "Medico"
          ) {
            sumaSeguro++;
          } if (item.nota_IngresoEgreso === 0) {
            sumaEgreso++;
          } if (item.nota_motivo === "Licencia") {
            sumaLicencia++;
          }
        });

        // Asignamos las sumas a las variables de estado correspondientes
        setRcv(sumaRcv);
        setRenovacion(sumaRenovacion);
        setSeguro(sumaSeguro);
        setEgreso(sumaEgreso);
        setOtroIngreso(otroIngreso);
        setLicencia(sumaLicencia);
        cantidadContrato()
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

  const selecionarRegistrosAnual = async (e) => {
    let endpoint = op.conexion + "/grafica/Anual";
    setActivate(true);
    let bodyF = new FormData();
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        setEnero(response.Enero);
        setFebrero(response.Febrero);
        setMarzo(response.Marzo);
        setAbril(response.Abril);
        setMayo(response.Mayo);
        setJunio(response.Junio);
        setJulio(response.Julio);
        setAgosto(response.Agosto);
        setSeptiembre(response.Septiembre);
        setOctubre(response.Octubre);
        setNoviembre(response.Noviembre);
        setDiciembre(response.Diciembre);
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
  const obtenerFechaHoy = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    txtDate1.current.value = `${year}-${month}-${day}`;
    txtDate2.current.value = `${year}-${month}-${day}`;
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) => {
            if (
              (x.idcuentabancaria !== null
                ? String(x.idcuentabancaria).includes(target.value)
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
  const [cantidad, setCantidad] = useState(0);
  const [cantidad2, setCantidad2] = useState(0);
  const cantidadContrato = async () => {
    const desde = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // first day of the month
    const hasta = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0); // last day of the month
  
    let endpoint = op.conexion + "/ladilla/totalReport";
    setActivate(true);
    await fetch(`${endpoint}?desde=${txtDate1.current.value}&hasta=${txtDate2.current.value}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        let total = response.results.reduce((acc, current) => acc + parseFloat(current.total_nota_monto), 0);
        let total2 = response.results.reduce((acc, current) => acc + parseFloat(current.total_totalPagar), 0).toFixed(2)
        setCantidad(total / 2);
        setCantidad2(total2	 / 2);
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
  
  // helper function to pad single-digit numbers with a zero
  function padZero(num) {
    return (num < 10 ? "0" : "") + num;
  }
  useEffect(() => {
    obtenerFechaHoy();
    selecionarRegistros();
    selecionarRegistrosAnual();
    cantidadContrato();
  }, []);

  const regPre = () => {
    setMostrar(true);
    setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
  };

  return (
    <div className="col-md-12 mx-auto p-2">
      <div className="col-12 py-2">
        <div className="col-18 row d-flex justify-content-between py-2 mt-5 mb-3">
          <h2 className=" col-5 text-light">Grafica de Ingreso Y Egreso</h2>
          <h2 className="col-3 text-light">
            Total Obtenido este Mes $:{" "}
            <span style={{ color: "red" }}>{cantidad}$</span>
          </h2>
          <h2 className="col-3 text-light">
            Total Obtenido este Mes bs:{" "}
            <span style={{ color: "red" }}>{cantidad2}bs</span>
          </h2>
        </div>
      </div>
      <div className="col-md-12 bg-light py-2 rounded row py-5">
        <div className="row col-md-6 d-flex justify-content-between mb-2">
          <Bar options={options} data={data} />
        </div>
        <div className="row col-md-6 d-flex justify-content-between mb-2">
          <Doughnut data={data2} />
        </div>
        <div className="row col-md-12 d-flex justify-content-between mb-4 mt-3">
          <input
            type="text"
            className=" col-md-3 form-control form-control-sm rounded-pill mb-4 "
            onChange={handleSearch}
            placeholder="Buscar"
          />

          <div className="col-md-5 mx-auto mb-4 row">
            <div class="input-group input-group-sm  col-md-6 mx-auto mb-1">
              <span class="input-group-text" id="addon-wrapping">
                Desde:
              </span>
              <input
                type="date"
                class="form-control"
                ref={txtDate1}
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <div class="input-group input-group-sm  col-md-6 mx-auto mb-1">
              <span class="input-group-text" id="addon-wrapping">
                Hasta:
              </span>
              <input
                type="date"
                class="form-control"
                ref={txtDate2}
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
              <button
                type="button"
                onClick={selecionarRegistros}
                class="btn btn-success"
              >
                <i class="fa-solid fa-magnifying-glass"></i>Buscar
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
                      {item.poliza_id}
                    </TableCell>
                    <TableCell
                      className="align-baseline"
                      style={{ textAlign: "center", alignItems: "center" }}
                    >
                      {new Date(
                        item.nota_fecha + "T00:00:00-04:00"
                      ).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
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
                      {item.usuario_nombre}
                    </TableCell>
                    <TableCell
                      className="align-baseline"
                      style={{ 
                        textAlign: "center", 
                        alignItems: "center",
                        color: item.usuario_nombre == "MIGUEL" ? "red" : "inherit"
                    }}
                      
                    >
                      {item.sucursal_nombre}
                    </TableCell>
                    <TableCell
                      className="align-baseline"
                      style={{ textAlign: "center", alignItems: "center" }}
                    >
                      {item.nota_IngresoEgreso == 0 ? "Egreso" : "Ingreso"}
                    </TableCell>
                    <TableCell
                      className="align-baseline"
                      style={{ textAlign: "center", alignItems: "center" }}
                    >
                      {
                      item.nota_motivo == 'RCV' ? "RCV" :
                      item.nota_motivo == 'Seguro' ? "Certificado Medico" :
                      item.nota_motivo == 'Medico' ? "Certificado Medico" : 
                      item.nota_motivo == 'Renovación' ? "Renovación" :
                      item.nota_motivo == 'Licencia' ? "Licencia":
                      'Otros'
                      }
                    </TableCell>
                    <TableCell
                      className="align-baseline"
                      style={{ textAlign: "center", alignItems: "center" }}
                    >
                      {item.nota_tipoPago == 1
                        ? "Efectivo"
                        : item.nota_tipoPago == 2
                        ? "Transferencia"
                        : item.nota_tipoPago == 3
                        ? "Punto"
                        : "Pago Móvil"}
                    </TableCell>

                    <TableCell
                      className="align-baseline"
                      style={{ textAlign: "center", alignItems: "center" }}
                    >
                      {item.nota_referencia}
                    </TableCell>
                    <TableCell
                      className="align-baseline"
                      style={{ textAlign: "center", alignItems: "center" }}
                    >
                      {item.nota_monto + " $"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </div>
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

export default GraficosIngresos;
