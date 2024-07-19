import React, { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";
import axios from "axios";
import { MensajeAlert, MensajeMinimal } from "../components/Alerta";
import { Loader, Dimmer, Label, Item } from "semantic-ui-react";
import md5 from "md5";
import { Mensaje } from "../components/mensajes";
import logo from "../imagenes/logo1.png";
import banner1 from "../imagenes/banner1.jpeg";
import Fade from "react-reveal/Fade";
import "./style.css";
function PaginaWeb(props) {
  const [loading, setLoading] = useState(false);

  let op = require("../modulos/datos");
  const [values, setValues] = useState(0);
  const context = useContext(AuthContext);
  const [activate, setActivate] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const span = useRef();
  const [token, setToken] = useState();
  const [idzona, setIdZona] = useState();
  const [mostrar, setMostrar] = useState(false);
  const [mensaje, setMensaje] = useState({
    mostrar: false,
    titulo: "",
    texto: "",
    icono: "",
  });

  const { onChange, onSubmit } = useForm(loginUserCallback, {
    username: "mfigueroa",
    password: "+11078879*",
  });

  const [records, setRecords] = useState([]);

  const selecionarRegistrosTexts = async () => {
    let endpoint = op.conexion + "/panel/ConsultarTodosTexts";
    console.log(endpoint);
    setActivate(true);
    await fetch(endpoint, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        console.log(response);
        setValues(response[0]);
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

  const selecionarRegistros = async () => {
    let endpoint = op.conexion + "/panel/ConsultarTag";
    setActivate(true);
    //setLoading(false);
    let bodyF = new FormData();
    await fetch(endpoint, {
      method: "POST",
      body: bodyF,
    })
      .then((res) => res.json())
      .then((response) => {
        setActivate(false);
        console.log(response);
        let carrusel_1 = "";
        let carrusel_2 = "";
        let carrusel_3 = "";
        let img_banner = "";
        let img_login = "";
        let img_home = "";
        let img_about = "";

        console.log("aqui");

        for (let i = 0; i < response.length; i++) {
          if (response[i].tag && response[i].tag.toString() === "carrusel_1") {
            carrusel_1 = response[i].ruta_img;
          } else if (
            response[i].tag &&
            response[i].tag.toString() === "carrusel_2"
          ) {
            carrusel_2 = response[i].ruta_img;
          } else if (
            response[i].tag &&
            response[i].tag.toString() === "carrusel_3"
          ) {
            carrusel_3 = response[i].ruta_img;
          } else if (
            response[i].tag &&
            response[i].tag.toString() === "img_banner"
          ) {
            img_banner = response[i].ruta_img;
          } else if (
            response[i].tag &&
            response[i].tag.toString() === "img_login"
          ) {
            img_login = response[i].ruta_img;
          } else if (
            response[i].tag &&
            response[i].tag.toString() === "img_home"
          ) {
            img_home = response[i].ruta_img;
          } else if (
            response[i].tag &&
            response[i].tag.toString() === "img_about"
          ) {
            img_about = response[i].ruta_img;
          }
        }

        console.log("aqui2");

        setRecords({
          carrusel_1: carrusel_1,
          carrusel_2: carrusel_2,
          carrusel_3: carrusel_3,
          img_banner: img_banner,
          img_login: img_login,
          img_home: img_home,
          img_about: img_about,
        });

        console.log(records);
        console.log("aqui3");
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

  useEffect(() => {
    context.logout();
    selecionarRegistros();
    //selecionarRegistrosWeb();
    selecionarRegistrosTexts();
  }, []);

  const txtUserName = useRef(null);
  const txtPassword = useRef(null);

  function loginUserCallback() {
    setLoading(true);
    console.log("listo");
  }

  function isInViewport(elem) {
    var distance = elem.getBoundingClientRect();
    return (
      distance.top <
        (window.innerHeight || document.documentElement.clientHeight) &&
      distance.bottom > 0
    );
  }

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
      {/* <div id="slider">
        <figure>
          {records.slice(0, 3).map((item, index) => (
            <img
              key={item.id_file}
              src={op.conexion + "/ImgPanel/" + item.ruta_img}
              alt=""
            />
          ))}
        </figure>
      </div>*/}

      <div id="slider">
        <figure>
          <img src="../"/>
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
export default PaginaWeb;
