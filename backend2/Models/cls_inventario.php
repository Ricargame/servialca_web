<?php
require_once("cls_db.php");

abstract class cls_inventario extends cls_db
{
	protected $id, $nombre, $cantidad, $codigo;

	public function __construct()
	{
		parent::__construct();
	}
    protected function Save()
	{
		try {
			if (empty($this->nombre)) {
				return [
					"data" => [
						"res" => "El nombre del producto no puede estar vacío",
						"code" => 400
					],
					"code" => 400
				];
			}
// 			$result = $this->SearchByNombre($this->nombre);
// 			if (isset($result["producto_nombre"])) {
// 				return [
// 					"data" => [
// 						"res" => "Este nombre del producto ($this->nombre) ya existe",
// 						"code" => 400
// 					],
// 					"code" => 400
// 				];
// 			}
			$sql = $this->db->prepare("INSERT INTO producto(producto_nombre,producto_cantidad,producto_codigo) VALUES(?,?,?)");
			$sql->execute([$this->nombre, $this->cantidad, $this->codigo]);
			$this->id = $this->db->lastInsertId();
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
		} catch (PDOException $e) {
			return [
				"data" => [
					'res' => "Error de consulta: " . $e->getMessage()
				],
				"code" => 400
			];
		}
	}
	protected function update()
	{
		try {
// 			$res = $this->GetDuplicados();
// 			if (isset($res[0])) {
// 				return [
// 					"data" => [
// 						"res" => "Estas duplicando los datos de otro producto"
// 					],
// 					"code" => 400
// 				];
// 			}
			$sql = $this->db->prepare("UPDATE producto SET
            producto_nombre = ?, producto_cantidad = ?, producto_codigo = ?  WHERE producto_id = ?");
			if ($sql->execute([$this->nombre, $this->cantidad, $this->codigo, $this->id])) {
				// $this->reg_bitacora([
				// 	"table_name" => "roles",
				// 	"des" => "Actualización de roles (id:$this->id, nombre: $this->nombre, comision: $this->comision)"
				// ]);
				return [
					"data" => [
						"res" => "Actualización de datos exitosa"
					],
					"code" => 300
				];
			}
			return [
				"data" => [
					"res" => "Actualización de datos fallida"
				],
				"code" => 400
			];
		} catch (PDOException $e) {
			return [
				"data" => [
					'res' => "Error de consulta: " . $e->getMessage()
				],
				"code" => 400
			];
		}
	}
	protected function GetAll()
	{
		$sql = $this->db->prepare("SELECT * FROM producto ORDER BY producto_id DESC");
		if ($sql->execute()) $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
		else $resultado = [];
		return $resultado;
	}
		protected function GetOne($id)
	{
		$sql = $this->db->prepare("SELECT * FROM producto WHERE producto_id = ?");
		if ($sql->execute([$id])) $resultado = $sql->fetch(PDO::FETCH_ASSOC);
		else $resultado = [];
		return $resultado;
	}
}
