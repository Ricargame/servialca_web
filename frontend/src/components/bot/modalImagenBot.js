import React, { useRef, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
/* import { Mensaje, MensajeSiNo } from "../mensajes"; */
import { validaSoloNumero } from "../../util/varios";

export const ModalImagenBot = (props) => {
  /*  variables de estados */

  const btnCancela = useRef();
  const [mensaje, setMensaje] = useState({
    mostrar: false,
    titulo: "",
    texto: "",
    icono: "",
  });

  const [operacion, setOperacion] = useState(0);

  /*********************************************** FUNCINES DE VALIDACION***********************************************************/

  const salir = () => {
    props.onHideCancela();
  };

  const cerrarModal = () => {
    setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
    props.onHideCancela();
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
      }}
    >
      <Modal.Header className="bg-danger">
        <Modal.Title style={{ color: "#fff" }}>QR ChatBot</Modal.Title>
        <button
          ref={btnCancela}
          className="btn"
          style={{ border: 0, margin: 0, padding: 0, color: "#ffffff" }}
          onClick={salir}
        >
          <i className="far fa-window-close"></i>
        </button>
      </Modal.Header>
      <Modal.Body
        style={{
          color: "rgb(106, 115, 123)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src="http://62.72.7.45:3001/"
            alt="QR Code"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button
          ref={btnCancela}
          onClick={salir}
          className="btn btn-sm btn-danger rounded-pill"
        >
          <i className="fas fa-window-close">Salir</i>
        </button>
      </Modal.Footer>
    </Modal>
  );
};
