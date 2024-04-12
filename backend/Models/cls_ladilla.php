<?php
require_once("cls_db.php");

abstract class cls_ladilla extends cls_db
{
	public function __construct()
	{
		parent::__construct();
	}

	protected function updateVip($id)
	{
		$sql = $this->db->prepare("SELECT * FROM poliza WHERE poliza_id = ?");
		if ($sql->execute([$id])) $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
		
	}
}
