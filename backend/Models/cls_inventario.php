<?php
require_once("cls_db.php")

abstract class cls_inventario extends cls_db{
    public function__construct() {
        parent::__construct();
    }
    protected function GetAll() {
        $sql = $this->db->prepare("SELECT * FROM inventario")
        if ($sql->execute()) {
			$resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
		} else {
			$resultado = [];
		}
		return $resultado;
    }
}
