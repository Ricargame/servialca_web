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

    // Consulta SQL para los datos generales excluyendo al usuario 57
    $queryGeneral = "
        SELECT 
            usuario.usuario_nombre, 
            usuario.usuario_usuario,
            SUM(debitocredito.nota_monto) AS total_nota_monto, 
            SUM(coberturas.totalPagar) AS total_totalPagar
        FROM 
            debitocredito 
        INNER JOIN 
            usuario ON usuario.usuario_id = debitocredito.usuario_id
        LEFT JOIN  -- Cambiar a LEFT JOIN
            medico ON medico.debitoCredito_id = debitocredito.nota_id
        INNER JOIN 
            poliza ON poliza.debitoCredito = debitocredito.nota_id
        INNER JOIN 
            coberturas ON coberturas.cobertura_id = poliza.cobertura_id
        WHERE 
            debitocredito.nota_fecha BETWEEN ? AND ? 
            AND usuario.usuario_usuario IS NOT NULL 
            AND usuario.usuario_usuario <> ''
            AND usuario.usuario_id <> 57  -- Excluir usuario 57
        ORDER BY 
            debitocredito.nota_fecha ASC
    ";

    // Consulta SQL para los datos específicos del usuario 57
    $queryUsuario57 = "
        SELECT 
            SUM(debitocredito.nota_monto) AS total_nota_monto, 
            SUM(coberturas.totalPagar) AS total_totalPagar
        FROM 
            debitocredito 
        INNER JOIN 
            usuario ON usuario.usuario_id = debitocredito.usuario_id
        LEFT JOIN  -- Cambiar a LEFT JOIN
            medico ON medico.debitoCredito_id = debitocredito.nota_id
        INNER JOIN 
            poliza ON poliza.debitoCredito = debitocredito.nota_id
        INNER JOIN 
            coberturas ON coberturas.cobertura_id = poliza.cobertura_id
        WHERE 
            debitocredito.nota_fecha BETWEEN ? AND ? 
            AND usuario.usuario_usuario IS NOT NULL 
            AND usuario.usuario_usuario <> ''
            AND usuario.usuario_id = 57
        ORDER BY 
            debitocredito.nota_fecha ASC
    ";

    try {
        // Ejecutar consulta para datos generales
        $stmtGeneral = $this->db->prepare($queryGeneral);
        $stmtGeneral->execute([$desde, $hasta]);
        $results = $stmtGeneral->fetchAll(PDO::FETCH_ASSOC);

        // Ejecutar consulta para datos del usuario 57
        $stmtUsuario57 = $this->db->prepare($queryUsuario57);
        $stmtUsuario57->execute([$desde, $hasta]);
        $totalesUsuario57 = $stmtUsuario57->fetch(PDO::FETCH_ASSOC);
        
        // Asegurarse de que no sean nulos
        $totalesUsuario57 = [
            'total_nota_monto' => $totalesUsuario57['total_nota_monto'] ?? 0,
            'total_totalPagar' => $totalesUsuario57['total_totalPagar'] ?? 0
        ];

        return [
            'results' => $results,
            'totales_usuario_57' => $totalesUsuario57
        ];
    } catch (PDOException $e) {
        // Manejo de errores de base de datos
        throw new RuntimeException("Error en la consulta de base de datos: " . $e->getMessage());
    }
}
}
?>