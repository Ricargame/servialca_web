<?php
require_once("./Models/cls_pagos.php");

class Con_pagos extends cls_pagos
{
    public function __construct()
    {
        parent::__construct();
        $this->id = isset($_POST["id"]) ? $_POST["id"] : null;
        $this->usuario = isset($_POST["usuario"]) ? $_POST["usuario"] : null;
        $this->monto = isset($_POST["monto"]) ? $_POST["monto"] : null;
        $this->referencia = isset($_POST["referencia"]) ? $_POST["referencia"] : null;
    }

    public function Editar()
    {
        $resultado = $this->Edit();
        Response($resultado, 200);
    }

    public function ConsultarTodos()
    {
        $resultado = $this->GetAll();
        Response($resultado, 200);
    }

    public function ConsultarUno()
    {
        $resultado = $this->GetOne($_POST["ID"]);
        Response($resultado, 200);
    }
    public function Registrar() {
        $resultado = $this->Save();
        Response($resultado, 200);
    }
}
