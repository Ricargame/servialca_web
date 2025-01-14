<?php
require_once("./Models/cls_nivel.php");

class Con_nivel extends cls_nivel
{
  public function __construct()
  {
    parent::__construct();
    $this->id = isset($_POST["ID"]) ? $_POST["ID"] : null;
    $this->idtipo = isset($_POST["idTipo"]) ? $_POST["idTipo"] : null;
    $this->idcontrato = isset($_POST["idContrato"]) ? $_POST["idContrato"] : null;
    $this->monto = isset($_POST["Monto"]) ? $_POST["Monto"] : null;
    $this->estatus = isset($_POST["Estatus"]) ? $_POST["Estatus"] : null;
  }

  public function registrar()
  {
    $resultado = $this->Save();
    Response($resultado["data"], $resultado["code"]);
  }

  public function actualizar()
  {
    $resultado = $this->Update();
    Response($resultado["data"], $resultado["code"]);
  }

  public function ConsultarUno()
  {
    $resultado = $this->GetOne($_GET['ID']);
    Response($resultado, 200);
  }

  public function ConsultarTodos()
  {
    $resultado = $this->GetAll();
    Response($resultado, 200);
  }
}
