<?php
require_once("cls_db.php");

abstract class cls_pagos extends cls_db {
    protected $id, $usuario, $monto, $fecha, $referencia;
    public function __construct()
	{
		parent::__construct();
	}
	protected function GetOne() {
    $sql = $this->db->prepare("SELECT pagos.*, usuario.* FROM pagos
        INNER JOIN usuario ON usuario.usuario_id = pagos.pagos_id_usuario
        WHERE pagos_id = ?
    ");
    
    if ($sql->execute([$this->id])) {
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    } else {
        $resultado = [];
    }
    
    return $resultado;
}
	protected function GetAll() {
    $sql = $this->db->prepare("SELECT pagos.*, usuario.* FROM pagos
        INNER JOIN usuario ON usuario.usuario_id = pagos.pagos_id_usuario
        ORDER BY pagos_id DESC
    ");
    
    if ($sql->execute()) {
        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    } else {
        $resultado = [];
    }
    
    return $resultado;
}

	protected function save() {
    $this->fecha = date('Y-m-d H:i:s'); // Asignar la fecha actual

    $sql = $this->db->prepare("INSERT INTO pagos(pagos_id_usuario, pagos_monto_bs, pagos_fecha, pagos_referencia) VALUES(?,?,?,?)");
    $ejecutado = $sql->execute([$this->usuario, $this->monto, $this->fecha, $this->referencia]); // Ejecutar la consulta

    if ($ejecutado) { // Verificar si la consulta se ejecut¨® correctamente
        $resultado = "Registro exitoso";
    } else {
        $resultado = "Registro Fallido";
    }

    return $resultado;
}
   protected function Edit() {
    try {
        $sql = $this->db->prepare("UPDATE pagos SET pagos_monto_bs = ?, pagos_referencia = ?, pagos_id_usuario = ? WHERE pagos_id = ?");
        $ejecutado = $sql->execute([$this->monto, $this->referencia, $this->usuario, $this->id]);

        if ($ejecutado) { 
            return "Registro exitoso";
        } else {
            return "Registro Fallido";
        }
    } catch (PDOException $e) {
        return "Error: " . $e->getMessage();
    }
}


}