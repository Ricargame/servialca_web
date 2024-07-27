import React, { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../context/auth";
import banner2 from "../imagenes/banner2.jpeg";
import logo from "../imagenes/logo1.png";

export default function PaginaWeb() {
  const [loading, setLoading] = useState(false);
  let op = require("../modulos/datos");
  const context = useContext(AuthContext);
  return (
    <div className="col-md-12 px-0 mx-auto ">
      <nav class="navbar navbar-expand-lg navbar-light bg-danger fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand py-2" href="#">
            <img src={logo} className="logo-navbar" alt="MDN" />
          </a>
          <button
            class="navbar-toggler btn btn-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-lg-end"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav mb-2 mb-lg-0">
              {/* <li class="nav-item">
                <a class="nav-link" href="#home">
                  <i class="fas fa-home"></i> Casa
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#quienes">
                  <i class="fas fa-id-card-alt"></i> Quienes Somos
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#contact">
                  <i class="fas fa-address-book"></i> Contactanos
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/galeria">
                  <i class="fas fa-camera"></i> Galeria
                </a>
              </li> */}
              <li class="nav-item">
                <a class="nav-link" href="/login">
                  <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div id="slider" className="container-fluid mt-5 pt-5">
        <figure className="w-100">
          <img
            src={banner2}
            style={{ width: "100%", height: "calc(100vh - 207px)"}}
            className="img-fluid"
          />
        </figure>
      </div>
      <footer class="text-center text-white bg-servial mb-3">
        <div class="container p-4 pb-0">
          <section class="mb-4">
            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fab fa-facebook-f"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fab fa-twitter"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fab fa-google"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fab fa-instagram"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fab fa-github"></i>
            </a>
          </section>
          <div>
            © 2020 Copyright:
            <a
              class="text-white"
              href="https://servialcarcv.com/"
              target="_blank"
            >
              Servialcarcv.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
