import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { AuthProvider } from "./context/auth";
import Login from "./pages/Login";
import MenuImpuestoPP from "./pages/escritorio";
import "./Hero.css";
import { MensajeSiNo } from "./components/mensajesCerrar";
import { AuthContext } from "../src/context/auth";
import PaginaWeb from "./pages/paginaWeb";
import Galeria from "./pages/galeria";

function App(props) {
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;
  const [mensaje, setMensaje] = useState({
    mostrar: false,
    icono: "",
    titulo: "",
    texto: "",
  });

  let timer,
    currSeconds = 0;

  function resetTimer() {
    clearInterval(timer);
    currSeconds = 0;
   // timer = setInterval(startIdleTimer, 1000);
  }

  function handleNoClick() {
    setMensaje({
      mostrar: false,
      icono: "",
      titulo: "",
      texto: "",
    });
    resetTimer(); // Reiniciar el temporizador cuando se hace clic en "No"
  }

  window.onload = resetTimer;
  window.onmousemove = resetTimer;
  window.onmousedown = resetTimer;
  window.ontouchstart = resetTimer;
  window.onclick = resetTimer;
  window.onkeypress = resetTimer;

  function startIdleTimer() {
    currSeconds++;
  
    if (currSeconds === 180 && pathname !== "/login" && pathname !== "/") {
      setMensaje({
        mostrar: true,
        icono: "error",
        titulo: "Alerta",
        texto: "La Sesión expirará en 10 segundos ",
      });
    }
  
    if (currSeconds === 1900 && pathname !== "/login" && pathname !== "/") {
      setMensaje({
        mostrar: true,
        icono: "error",
        titulo: "Alerta",
        texto: "La Sesión expirará en 20 segundos ",
      });
    }
  
    if (currSeconds >= 180 && pathname !== "/login" && pathname !== "/") {
      const tiempoDespuesDe180 = currSeconds - 180;
  
      if (tiempoDespuesDe180 % 10 === 0) {
        setMensaje({
          mostrar: true,
          icono: "error",
          titulo: "Alerta",
          texto: `La Sesión expirará en ${tiempoDespuesDe180} segundos `,
        });
      }
    }
  
    // Esta sección debería estar dentro de un bloque condicional
    if (currSeconds >= 2000 && pathname !== "/login" && pathname !== "/") {
      window.location.href = "/login";
      setMensaje({
        mostrar: false,
        icono: "",
        titulo: "",
        texto: "",
      });
    }
  }

  useEffect(() => {
    resetTimer(); // Reiniciar el temporizador cuando el componente se monta o actualiza
  }, [pathname]);

  return (
    <div>
      <MensajeSiNo
        mensaje={mensaje}
        onHideSi={() => {
          window.location.href = "/login";
        }}
        onHideNo={handleNoClick}
      />
      {pathname === "/" || pathname === "/galeria" ? (
        <Router>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Login} />
          <Route exact path="/galeria" component={Login} />
        </Router>
      ) : (
        <AuthProvider>
          <Router>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Login} />
            <Route exact path="/galeria" component={Login} />

            {pathname !== "/" && pathname !== "/login" && (
              <div>
                <MenuImpuestoPP />
              </div>
            )}
          </Router>
        </AuthProvider>
      )}
    </div>
  );
}

export default App;
