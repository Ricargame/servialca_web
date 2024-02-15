import React, { useRef, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

function ImagenBot() {
  return (
    <Modal>
      <Modal.Body style={{ textAlign: "center" }}>
        <img src="../../imagenes/qr.png" alt="QR Code" />
      </Modal.Body>
    </Modal>
  );
}

export default ImagenBot;
