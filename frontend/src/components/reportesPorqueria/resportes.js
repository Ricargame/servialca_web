import React, { useState, useEffect, useRef } from "react";
import { Loader, Dimmer } from "semantic-ui-react";


function Reporte() {
  var op = require("../../modulos/datos");
  const username = JSON.parse(localStorage.getItem("username"));
  const idUser = JSON.parse(localStorage.getItem("user_id"));
  const txtDesde = useRef();
  const txtHasta = useRef();

  const generarReporte = async () => {
    if (idUser != 57) {
      window.open(
        `${op.conexion}/reporteVendedoresUno?Nombre=${username}&Desde=${txtDesde.current.value}&Hasta=${txtHasta.current.value}`
      );
    }
    window.open(
      `${op.conexion}/reporteVendedores?Desde=${txtDesde.current.value}&Hasta=${txtHasta.current.value}`
    );
  };
  const [desde, setDesde] = useState(new Date().toISOString().split('T')[0]);

  const [hasta, setHasta] = useState(new Date().toISOString().split('T')[0]);
  useEffect(() => {

    txtDesde.current.value = desde;

    txtHasta.current.value = hasta;

  }, [desde, hasta]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div className="row col-md-12 py-4 px-2">
        <div className="row col-md-12 mx-auto ">
          <div className="col-md-10 card mx-auto py-3">
            <div className="col-md-12 mx-auto row">
              <div className="col-md-12 mx-auto d-flex justify-content-center px-3 mb-4">
                <h3 className="text-dark">Genearar Reporte</h3>
              </div>

              <div className="col-12 p-2 row justify-content-center">
                <div class="input-group input-group-sm mb-2 col-md-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Desde:
                  </span>
                  <input
                    ref={txtDesde}
                    type="date"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </div>
                <div class="input-group input-group-sm mb-2 col-md-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Hasta:
                  </span>
                  <input
                    ref={txtHasta}
                    type="date"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </div>
              </div>
              <div className="col-md-5 mx-auto row">
                <button
                 onClick={generarReporte}
                  type="button"
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

      <Dimmer inverted>
        <Loader inverted>cargando...</Loader>
      </Dimmer>
    </div>
  );
}
export default Reporte;
