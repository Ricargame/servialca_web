<?php
date_default_timezone_set('America/Caracas');
require_once("cls_db.php");

abstract class cls_ladilla extends cls_db
{
    protected $id;

    public function __construct()
    {
        parent::__construct();
    }

    public function ladilla()
{
    $sql = $this->db->prepare("SELECT vip FROM poliza WHERE poliza_id = ?");
    $sql->execute([$this->id]);
    $datos = $sql->fetch(PDO::FETCH_ASSOC);
    if ($datos['vip'] == 0) {
        $sql = $this->db->prepare("UPDATE poliza SET vip = 1 WHERE poliza_id = ?");
        $sql->execute([$this->id]);
        return true;
    }
    if($datos['vip'] == 1){
        $sql = $this->db->prepare("UPDATE poliza SET vip = 2 WHERE poliza_id = ?");
        $sql->execute([$this->id]);
        return true;
    } else {
        $sql = $this->db->prepare("UPDATE poliza SET vip = 0 WHERE poliza_id = ?");
        $sql->execute([$this->id]);
        return true;
    }
}
public function cantidadContratos(){
    $sql = $this->db->prepare("SELECT MAX(poliza_id) AS max_poliza_id FROM poliza");
    $sql->execute();
    $resultado = $sql->fetch(PDO::FETCH_ASSOC);
    return $resultado;
}
public function reporte($desde, $hasta) {
    // Validar formato de fecha
    $datePattern = '/^\d{4}-\d{2}-\d{2}$/';
    if (!preg_match($datePattern, $desde) || !preg_match($datePattern, $hasta)) {
        throw new InvalidArgumentException("Las fechas deben estar en formato YYYY-MM-DD.");
    }

    $queryGeneral = "
        SELECT
            usuario.usuario_id,
            usuario.usuario_nombre, 
            usuario.usuario_usuario,
            SUM(COALESCE(debitocredito.nota_monto, 0)) AS total_nota_monto, 
            SUM(COALESCE(coberturas.totalPagar, 0)) AS total_totalPagar,
            CASE WHEN usuario.usuario_id = 57 THEN 1 ELSE 0 END AS es_usuario_57
        FROM 
            debitocredito 
        INNER JOIN 
            usuario ON usuario.usuario_id = debitocredito.usuario_id
        INNER JOIN 
            poliza ON poliza.debitoCredito = debitocredito.nota_id
        INNER JOIN 
            coberturas ON coberturas.cobertura_id = poliza.cobertura_id
        WHERE 
            debitocredito.nota_fecha BETWEEN ? AND ? 
            AND usuario.usuario_usuario IS NOT NULL 
            AND usuario.usuario_usuario <> ''
            AND usuario.usuario_id <> 57
        GROUP BY 
            usuario.usuario_id, usuario.usuario_nombre, usuario.usuario_usuario
    ";

    $queryUsuario57 = "
        SELECT 
            SUM(COALESCE(debitocredito.nota_monto, 0)) AS total_nota_monto, 
            SUM(COALESCE(coberturas.totalPagar, 0)) AS total_totalPagar
        FROM 
            debitocredito 
        INNER JOIN 
            usuario ON usuario.usuario_id = debitocredito.usuario_id
        INNER JOIN 
            poliza ON poliza.debitoCredito = debitocredito.nota_id
        INNER JOIN 
            coberturas ON coberturas.cobertura_id = poliza.cobertura_id
        WHERE 
            debitocredito.nota_fecha BETWEEN ? AND ? 
            AND usuario.usuario_usuario IS NOT NULL 
            AND usuario.usuario_usuario <> ''
            AND usuario.usuario_id = 57
    ";

    try {
        $stmtGeneral = $this->db->prepare($queryGeneral);
        $stmtGeneral->execute([$desde, $hasta]);
        $results = $stmtGeneral->fetchAll(PDO::FETCH_ASSOC);

        $stmtUsuario57 = $this->db->prepare($queryUsuario57);
        $stmtUsuario57->execute([$desde, $hasta]);
        $totalesUsuario57 = $stmtUsuario57->fetch(PDO::FETCH_ASSOC);

        // Asegurar valores no nulos
        $totalesUsuario57 = [
            'total_nota_monto' => $totalesUsuario57['total_nota_monto'] ?? 0,
            'total_totalPagar' => $totalesUsuario57['total_totalPagar'] ?? 0
        ];

        return [
            'results' => $results,
            'totales_usuario_57' => $totalesUsuario57
        ];
    } catch (PDOException $e) {
        error_log("Error en la consulta de base de datos: " . $e->getMessage());
        throw new RuntimeException("Error en la consulta de base de datos. Consulte el log para más detalles.");
    }
}

    public function esconderRcv($id) {
        $sql = $this->db->prepare("UPDATE poliza SET poliza_estatus = 0 WHERE poliza_id = ?");
        $sql->execute([$id]);
            return [
					"data" => [
						"res" => "RCV Eliminado"
					],
					"code" => 200
				];
    }
    
    protected function GetAll()
  {
    $sql = $this->db->prepare("SELECT usuario.*, roles.*, sucursal.*  FROM usuario 
      INNER JOIN roles ON roles.roles_id = usuario.roles_id 
      INNER JOIN sucursal ON sucursal.sucursal_id = usuario.sucursal_id WHERE usuario_id > 56 AND usuario_usuario IS NOT NULL AND usuario_estatus = 1
      ORDER BY usuario.usuario_id DESC");

    if ($sql->execute())
      $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    else
      $resultado = [];

    return $resultado;
  }
  protected function getAllDeudores() {
      $sql = $this->db->prepare("SELECT *, usuario.* FROM deudores 
      INNER JOIN usuario ON usuario.usuario_id = deudores.usuario_id
      WHERE estatus = 1");
       if ($sql->execute())
      $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    else
      $resultado = [];

    return $resultado;
  }
  protected function registrarDeudores($id, $monto, $desde, $hasta) {
    try {

        // Preparar la consulta SQL
        $sql = $this->db->prepare("INSERT INTO deudores(usuario_id, monto, desde, hasta) VALUES(?,?,?,?)");

        // Ejecutar la consulta con los parámetros
        if ($sql->execute([$id, $monto, $desde, $hasta])) {
            // Retornar éxito si la consulta se ejecuta correctamente
            return [
                "data" => [
                    "res" => "Deuda Agregada"
                ],
                "code" => 200
            ];
        } else {
            // Retornar error si la ejecución falla
            return [
                "data" => [
                    "res" => "Error al agregar la deuda"
                ],
                "code" => 500
            ];
        }
    } catch (PDOException $e) {
        // Capturar excepciones de PDO (errores de base de datos)
        return [
            "data" => [
                "res" => "Error en la base de datos: " . $e->getMessage()
            ],
            "code" => 500
        ];
    }
}
}
?>