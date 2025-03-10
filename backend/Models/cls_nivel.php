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
    try {
        $sql = $this->db->prepare("INSERT INTO precio2(tipoVehiculo_id, tipoContrato_id, precio_monto) VALUES(?,?,?)");
        if ($sql->execute([$this->idtipo, $this->idcontrato, $this->monto])) {
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
    } catch (PDOException $e) {
        return [
            "data" => [
                "res" => "Error: " . $e->getMessage()
            ],
            "code" => 500
        ];
    }
}
	protected function GetAll($id)
    {
        $sql = $this->db->prepare("
            SELECT * FROM precio2 
            INNER JOIN tipocontrato ON tipocontrato.contrato_id = precio2.tipoContrato_id
            INNER JOIN tipovehiculo ON tipovehiculo.tipoVehiculo_id = precio2.tipoVehiculo_id
            WHERE tipoContrato_id = ?
            GROUP BY tipovehiculo.tipoVehiculo_nombre
        ");
        if ($sql->execute([$id])) {
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
