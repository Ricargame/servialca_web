<?php
require_once("./Models/cls_tipo_vehiculo.php");

class Con_tipo_vehiculo extends cls_tipo_vehiculo
{
	public function __construct()
	{
		parent::__construct();
		$this->id = isset($_POST["ID"]) ? $_POST["ID"] : null;
		$this->nombre = isset($_POST["tipoVehiculo_nombre"]) ? $_POST["tipoVehiculo_nombre"] : null;
    $this->precio = isset($_POST["tipoVehiculo_precio"]) ? $_POST["tipoVehiculo_precio"] : null;
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
}