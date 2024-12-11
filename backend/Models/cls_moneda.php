<?php
require_once("cls_db.php");

abstract class cls_moneda extends cls_db
{
	protected $moneda;
	public function __construct()
	{
		parent::__construct();
	}

protected function Editar()
{
    // Si est¨¢s recibiendo valores con coma, convi¨¦rtelos a punto
    if (strpos($this->moneda, ',') !== false) {
        $this->moneda = str_replace(',', '.', $this->moneda);
    }

    $sql = $this->db->prepare("UPDATE preciodolar SET dolar_monto = ? WHERE dolar_id = 1");
    if ($sql->execute([$this->moneda])) {
        return true;
    } else {
        $errorInfo = $sql->errorInfo();
        error_log("Error en la ejecuci¨®n de la consulta: " . implode(", ", $errorInfo));
        return false;
    }
}

	protected function GetAll()
	{
		$sql = $this->db->prepare("SELECT * FROM preciodolar WHERE dolar_id = 1");
		if ($sql->execute()) {
			$resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
		} else {
			$resultado = [];
		}
		return $resultado;
	}

}
