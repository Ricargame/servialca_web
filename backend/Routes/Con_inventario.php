<?php
require_once("./Models/cls_inventario.php");

class Con_inventario extends cls_inventario
{
  public function __construct()
  {
    parent::__construct();
    $this->id = isset($_POST["ID"]) ? $_POST["ID"] : null;
    $this->nombre = isset($_POST["Nombre"]) ? $_POST["Nombre"] : null;
    $this->cantidad = isset($_POST["Cantidad"]) ? $_POST["Cantidad"] : null;
    $this->codigo = isset($_POST["Codigo"]) ? $_POST["Codigo"] : null;
  }

  public function registrar()
  {
    $resultado = $this->Save();
    Response($resultado["data"], $resultado["code"]);
  }

  public function actualizar()
  {
    $resultado = $this->update();
    Response($resultado["data"], $resultado["code"]);
  }

  public function eliminar()
  {
    $resultado = $this->Delete();
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