<?php
require_once("./Models/cls_moneda.php");
class Con_moneda extends cls_moneda
{
     public function __construct()
    {
        parent::__construct();
        $this->moneda = isset($_POST["Precio"]) ? $_POST["Precio"] : null;
    }

    public function guardar()
    {
        $resultado = $this->Editar();
        Response($resultado, 200);
    }

    public function ConsultarTodos()
    {
        $resultado = $this->GetAll();
        Response($resultado, 200);
    }

}
