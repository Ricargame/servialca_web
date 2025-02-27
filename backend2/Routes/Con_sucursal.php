<?php
require_once("./Models/cls_sucursal.php");

class Con_sucursal extends cls_sucursal
{
	public function __construct()
	{
		parent::__construct();
		$this->id = isset($_POST["ID"]) ? $_POST["ID"] : null;
		$this->nombre = isset($_POST["Nombre"]) ? $_POST["Nombre"] : null;
		$this->direccion = isset($_POST["Direccion"]) ? $_POST["Direccion"] : null;
		$this->reporte = isset($_POST["Reporte"]) ? $_POST["Reporte"] : null;
		$this->estatus = isset($_POST["Estatus"]) ? $_POST["Estatus"] : null;
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

	public function buscarSucursal()
	{
		$resultado = $this->GetSucursal($_POST["Nombre"]);
		Response($resultado, 200);
	}
}
