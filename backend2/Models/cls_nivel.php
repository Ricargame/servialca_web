<?php
require_once("cls_db.php");

abstract class cls_nivel extends cls_db
{
	protected $id, $idcontrato, $idtipo, $monto, $estatus;

	public function __construct()
	{
		parent::__construct();
	}
	protected function Update() {
	    $sql = $this->db->prepare("UPDATE precio2 SET tipoVehiculo_id = ?, tipoContrato_id = ?, precio_monto = ? WHERE precio_id = ?");
	    if ($sql->execute([$this->idtipo, $this->idcontrato, $this->monto, $this->id])) {
	        return [
			    "data" => [
				    "res" => "Registro exitoso"
				    ],
					"code" => 200
				];
	    }
	}
    protected function Save() {
        $sql2 = $this->db->prepare("SELECT * FROM precio2 WHERE tipoVehiculo_id = ? AND tipoContrato_id = ?");
        $sql2->execute([$this->idtipo, $this->idcontrato]);
        $resultado = $sql2->fetchAll(PDO::FETCH_ASSOC);
        if ($resultado < 1) {
            $sql = $this->db->prepare("INSERT INTO precio2(tipoVehiculo_id, tipoContrato_id, monto) VALUES(?,?,?)");
            if ($sql->execute([$this->idtipo, $this->idcontrato, $this->monto])) {
                if ($sql->rowCount() > 0) {
    				return [
    					"data" => [
    						"res" => "Registro exitoso"
    					],
    					"code" => 200
    				];
    			} else {
    				return [
    					"data" => [
    						"res" => "El registro ha fallado"
    					],
    					"code" => 400
    				];
    			}
            }
        } else {
            	return [
    					"data" => [
    						"res" => "Ya existe un registro"
    					],
    					"code" => 200
    				];
        }
    }
	protected function GetAll()
    {
        $sql = $this->db->prepare("
            SELECT * FROM precio2 
            INNER JOIN tipocontrato ON tipocontrato.contrato_id = precio2.tipoContrato_id
            INNER JOIN tipovehiculo ON tipovehiculo.tipoVehiculo_id = precio2.tipoVehiculo_id
        ");
        if ($sql->execute()) {
            $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $resultado = [];
        }
        return $resultado;
    }
    	protected function GetOne($id)
    {
        $sql = $this->db->prepare("
            SELECT * FROM precio2 
            INNER JOIN tipocontrato ON tipocontrato.contrato_id = precio2.tipoContrato_id
            INNER JOIN tipovehiculo ON tipovehiculo.tipoVehiculo_id = precio2.tipoVehiculo_id
            WHERE precio_id = ?
        ");
        if ($sql->execute([$id])) {
            $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $resultado = [];
        }
        return $resultado;
    }
}
